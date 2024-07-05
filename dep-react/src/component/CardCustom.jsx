import PropTypes from "prop-types";
import "./card.css";
import Button from "@mui/material/Button";
import DescriptionIcon from "@mui/icons-material/Description";
import { keyframes } from "@emotion/react";
import { useLocation } from "react-router-dom";

// Define the hover animation using keyframes
const hoverAnimation = keyframes`
  0% {
    background-color: white;
    transform: scale(1);
  }
  50% {
    background-color: lightgray;
    transform: scale(1.05);
  }
  100% {
    background-color: gray;
    transform: scale(1.1);
  }
`;

function CardCustom({ title, text, url, email, onViewCurriculum }) {
  const location = useLocation();

  const handleViewCurriculum = () => {
    if (url) {
      if (location.pathname === "/") {
        window.open(url, "_blank");
      } else if (location.pathname === "/docentes") {
        onViewCurriculum(url, title);
      }
    }
  };

  return (
    <div className="card text-center bg-dark animate__animated animate__fadeInUp border-blue">
      <div className="card-body text-light">
        <h4 className="card-title">{title}</h4>
        <p className="card-text text-secondary">{text || "-"}</p>
        <a href={`mailto:${email}`} className="email-icon mt-2">
          <i className="fa fa-envelope"></i> <span>{email}</span>
        </a>
        <Button
          variant="contained"
          startIcon={<DescriptionIcon />}
          onClick={handleViewCurriculum}
          sx={{
            backgroundColor: "white",
            color: "black",
            fontWeight: "bold",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              animation: `${hoverAnimation} 0.5s forwards`,
            },
          }}
        >
          Ver currículum
        </Button>
      </div>
    </div>
  );
}

CardCustom.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  url: PropTypes.string,
  email: PropTypes.string.isRequired,
  onViewCurriculum: PropTypes.func.isRequired,
};

export default CardCustom;