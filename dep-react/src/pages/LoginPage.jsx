import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useSnackbar } from "notistack";
import { base } from "../api";

const LoginPage = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const baseURL = base;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/auth/login`, {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token); // Guarda el token en el almacenamiento local
      setIsAuthenticated(true);
      enqueueSnackbar("Login successful", { variant: "success" });
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true }); // Redirige al usuario a la página desde la que vino
    } catch (error) {
      console.error("Error logging in", error);
      enqueueSnackbar("Login failed", { variant: "error" });
      // Maneja el error de inicio de sesión (mostrar mensaje de error, etc.)
    }
  };

  return (
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
          Autenticacion Del Usuario
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              sx: { fontSize: "1.2rem" },
            }}
            InputLabelProps={{
              sx: { fontSize: "1.2rem" },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            iniciar sesion
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
