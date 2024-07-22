import { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Container, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { base } from "../api";
import LaunchIcon from '@mui/icons-material/Launch';

const theme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          "& .MuiDataGrid-cell": {
            fontSize: "15px",
            lineHeight: "1.5",
            whiteSpace: "normal",
            wordWrap: "break-word",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontSize: "20px",
          },
        },
      },
    },
  },
});

const MaterialDidactico = () => {
  const materialDidacticoURL = base + "/api/materialDidactico";
  const [materiales, setMateriales] = useState([]);

  useEffect(() => {
    fetchMateriales();
  }, []);

  const fetchMateriales = async () => {
    try {
      const response = await axios.get(`${materialDidacticoURL}/noAuth`);
      setMateriales(response.data);
    } catch (error) {
      console.error("Error fetching materiales didacticos:", error);
    }
  };

  const columns = [
    { field: "autor", headerName: "Autor", width: 170 },
    { field: "titulo", headerName: "Título", width: 200 },
    {
      field: "descripcion",
      headerName: "Descripción",
      width: 650,
      renderCell: (params) => (
        <div style={{ whiteSpace: "normal", wordWrap: "break-word" }}>
          {params.value}
        </div>
      ),
    },
    {
      field: "enlace",
      headerName: "Enlace",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          href={params.value}
          target="_blank"
          startIcon={<LaunchIcon />}
        >
          Enlace
        </Button>
      ),
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography
          component="h1"
          variant="h5"
          align="center"
          sx={{ fontSize: "3rem", marginTop: 3, marginBottom: 3 }}
        >
          Material Didáctico
        </Typography>

        <div style={{ height: 500, width: "100%", marginBottom: "50px" }}>
          <DataGrid
            rows={materiales}
            columns={columns}
            getRowId={(row) => row.id}
            rowHeight={80} // Ajusta esta propiedad según tus necesidades
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[7]}
            autoHeight
          />
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default MaterialDidactico;
