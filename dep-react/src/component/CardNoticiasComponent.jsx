import PropTypes from "prop-types";
import { base } from "../api";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";

const CardNoticiasComponent = ({ imageSrc, title, buttonText, buttonLink }) => {
  const consumir = base + "/upload/image/";
  const [imagenVer, setImagenVer] = useState(null);

  const handleFetchImage = useCallback(async () => {
    try {
      const response = await axios.get(consumir + imageSrc, {
        responseType: "blob", // Fetch as a blob
      });
      const imagenURL = URL.createObjectURL(response.data);
      setImagenVer(imagenURL);
    } catch (error) {
      console.error("Error fetching the image:", error);
    }
  }, [imageSrc, consumir]);

  useEffect(() => {
    handleFetchImage();
  }, [handleFetchImage]);

  return (
    <>
      <div className="wrapper">
        <div className="card">
          {imagenVer && <img src={imagenVer} alt={title} />}
          <div className="info">
            <h1>{title}</h1>
            <a href={buttonLink} className="btn">
              {buttonText}
            </a>
          </div>
        </div>
      </div>

      <style>
        {`
          .wrapper {
            display: flex;
            justify-content: center;
            width: 90%;
          }
          .card {
            width: 280px;
            height: 360px;
            background: #fff;
            display: flex;
            align-items: flex-end;
            padding: 2rem 1rem;
            position: relative;
            transition: 0.5s all ease-in-out;
          }
          .card:hover {
            transform: translateY(-10px);
          }
          .card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, rgba(13, 36, 63, 0.3), rgba(13, 36, 63, 1));
            z-index: 2;
            opacity: 0;
            transition: 0.5s all;
          }
          .card:hover::before {
            opacity: 1;
          }
          
          .card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: absolute;
            top: 0;
            left: 0;
          }
          .card .info {
            position: relative;
            color: #fff;
            z-index: 3;
            opacity: 0;
            transform: translateY(30px);
            transition: 0.5s all;
          }
          .card:hover .info {
            opacity: 1;
            transform: translateY(0);
          }
          
          .card .info h1 {
            line-height: 40px;
            margin-bottom: 10px;
          }
          .card .info p {
            font-size: 15px;
            letter-spacing: 1px;
            margin-bottom: 20px;
          }
          .card .info .btn {
            background: #fff;
            padding: 0.5rem 1rem;
            color: #000;
            font-size: 12px;
            cursor: pointer;
            border-radius: 20px;
            text-decoration: none;
            font-weight: bold;
            transition: .4s ease-in-out;
          }
          .card .info .btn:hover {
            background: #fc5185;
            color: #fff;
            box-shadow: 0 7px 10px rgba(0, 0, 0, 0.5);
          }
        `}
      </style>
    </>
  );
};

CardNoticiasComponent.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonLink: PropTypes.string.isRequired,
};

export default CardNoticiasComponent;

