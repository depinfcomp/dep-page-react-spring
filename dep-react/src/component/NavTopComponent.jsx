import "../css/nav.css";
import Paper from "@mui/material/Paper";
import logo from "../assets/flayers/logo.png";

const NavTopComponent = () => {
  return (
    <div>
      <div className="fcen-depmate-banner">
        <div className="banner-content">
          <span>Departamento de</span>
          <span style={{ fontWeight: 'bold' }}>Informática y Computación</span>
        </div>
        <div className="banner-logo">
          <img src={logo} alt="UNAL Logo" />
        </div>
      </div>
    </div>
  );
};

export default NavTopComponent;
