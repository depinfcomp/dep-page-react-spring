import { useState, useEffect } from "react";
import AdminUserPass from "../component/AdminUserPass";
import { Typography } from "@mui/material";

const PerfilPage = () => {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setRole(decodedToken.role);
      setUsername(decodedToken.sub); 
    }
  }, []);

  return (
    <>
      <Typography component="h1" variant="h5" sx={{ fontSize: "2rem", marginBottom: "20px" }}>
        Bienvenido, {username}
      </Typography>
      <AdminUserPass />
    </>
  );
};

export default PerfilPage;
