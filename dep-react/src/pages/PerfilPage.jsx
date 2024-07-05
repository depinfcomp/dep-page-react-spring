import { useState, useEffect } from "react";
import NavMidComponent from "../component/NavMidComponent";
import AdminUserPass from "../component/AdminUserPass";
import AdminUserTable from "../component/AdminUserTable";
import { Typography } from "@mui/material";

const PerfilPage = () => {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setRole(decodedToken.role);
      setUsername(decodedToken.sub); // Asumiendo que el nombre de usuario está presente en el token
    }
  }, []);

  return (
    <>
      {/* <NavMidComponent /> */}
      <Typography component="h1" variant="h5" sx={{ fontSize: "2rem", marginBottom: "20px" }}>
        Bienvenido, {username}
      </Typography>
      <AdminUserPass />
      {/* {(role === "DIR" || role === "ADMIN") && <AdminUserTable />} */}
    </>
  );
};

export default PerfilPage;
