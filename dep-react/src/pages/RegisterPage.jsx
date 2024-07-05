// RegisterPage.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { base } from "../api";

const RegisterPage = ({ onRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [docenteId, setDocenteId] = useState("");
  const [docentes, setDocentes] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const baseURL = base;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchDocentes = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/docentes/sin-usuario`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDocentes(response.data);
      } catch (error) {
        console.error("Error fetching docentes:", error);
      }
    };

    fetchDocentes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No hay token disponible");
      return;
    }
    const requestBody = {
      username,
      password,
      role,
      docenteId: role === "DOCE" ? docenteId : null,
    };
    try {
      await axios.post(`${baseURL}/auth/register`, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      enqueueSnackbar("Registro exitoso", { variant: "success" });
      onRegister(); // Llamar a la función para actualizar la lista de usuarios
    } catch (error) {
      console.error("Error registrando", error);
      enqueueSnackbar("Registro fallido", { variant: "error" });
    }
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleDocenteChange = (event) => {
    setDocenteId(event.target.value);
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
          Registro Del Usuario
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
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-select-label">Role</InputLabel>
            <Select
              labelId="role-select-label"
              id="role-select"
              value={role}
              label="Role"
              onChange={handleRoleChange}
            >
              <MenuItem value="DIR">DIR</MenuItem>
              <MenuItem value="ADMIN">ADMIN</MenuItem>
              <MenuItem value="DOCE">DOCE</MenuItem>
              <MenuItem value="AUX">AUX</MenuItem>
            </Select>
          </FormControl>
          {role === "DOCE" && (
            <FormControl fullWidth margin="normal">
              <InputLabel id="docente-select-label">Docentes</InputLabel>
              <Select
                labelId="docente-select-label"
                id="docente-select"
                value={docenteId}
                label="Docente"
                onChange={handleDocenteChange}
              >
                {docentes.map((docente) => (
                  <MenuItem key={docente.idDocente} value={docente.idDocente}>
                    {docente.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, fontSize: "1.2rem" }}
          >
            Registrar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
