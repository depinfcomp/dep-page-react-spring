import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { base } from "../api";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const ListaPermisoDocente = () => {
  const baseURL = base + "/api/permisos/permisosdocente/";
  const [listaPermisos, setListPermisosDocente] = useState([]);

  const theme = createTheme({
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            "& .MuiDataGrid-cell": {
              fontSize: "15px",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontSize: "20px",
            },
          },
        },
      },
    },
  });

  const fetchListaPermisos = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found");
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      console.log(`${baseURL}${decodedToken.idDocente}`);
      const response = await axios.get(`${baseURL}${decodedToken.idDocente}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setListPermisosDocente(response.data);
    } catch (error) {
      console.error("Error fetching Docentes:", error.message);
    }
  };

  useEffect(() => {
    fetchListaPermisos();
  }, []);

  const columns = [
    { field: "estadoPermisos", headerName: "Estado", width: 150 },
    { field: "fechaSolicitud", headerName: "Fecha Solicitud", width: 150 },
    { field: "fechaAutoriza", headerName: "Fecha Autoriza", width: 150 },
    { field: "consecutivoPermisos", headerName: "Consecutivo", width: 150 },
    { field: "descripcionPermisos", headerName: "Descripción", width: 150 },
    { field: "directorPermisos", headerName: "Director", width: 150 },
    { field: "nombreModelo", headerName: "Modelo Permiso", width: 150 },
  ];

  return (
    <>
      <Typography
        component="h1"
        variant="h5"
        align="center"
        sx={{ fontSize: "3rem", marginTop: 3 }}
      >
        Solicitud De Permisos
      </Typography>
      <ThemeProvider theme={theme}>
        <Box sx={{ height: 400, width: "100%", marginTop: 5, marginBottom: 5 }}>
          <DataGrid
            rows={listaPermisos || []}
            columns={columns}
            getRowId={(row) => row.idPermisos}
          />
        </Box>
      </ThemeProvider>
    </>
  );
};

export default ListaPermisoDocente;
