import { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useSnackbar } from "notistack";
import { base } from "../api";

const AdminUserPass = () => {
  const [newPassword, setNewPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const baseURL = base + "/auth";
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      
      setUsername(decodedToken.sub);
      setRole(decodedToken.role);
    }
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No hay token disponible");
      return;
    }
    const requestBody = {
      username,
      newPassword,
    };
    try {
      await axios.post(`${baseURL}/change-password`, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      enqueueSnackbar("Contraseña cambiada exitosamente", {
        variant: "success",
      });
    } catch (error) {
      console.error("Error al cambiar la contraseña", error);
      enqueueSnackbar("Error al cambiar la contraseña", { variant: "error" });
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ fontSize: "2rem" }}>
            Cambiar Contraseña
          </Typography>
          <Box component="form" onSubmit={handleChangePassword} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="Nueva Contraseña"
              type="password"
              id="newPassword"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              InputProps={{
                sx: { fontSize: "1.2rem" },
              }}
              InputLabelProps={{
                sx: { fontSize: "1.2rem" },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, fontSize: "1.2rem" }}
            >
              Cambiar Contraseña
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default AdminUserPass;
