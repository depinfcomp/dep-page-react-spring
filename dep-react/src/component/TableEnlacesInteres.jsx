import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Box, Typography, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import ModifyEnlaceInteres from "./ModifyEnlaceInteres";
import { useSnackbar } from "notistack";
import { base } from "../api";

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

const TableEnlacesInteres = () => {
  const token = localStorage.getItem("token");
  const baseURL = base;

  const [enlaces, setEnlaces] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchEnlaces();
  }, []);

  const fetchEnlaces = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/enlacesInteres`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEnlaces(response.data);
    } catch (error) {
      console.error("Error fetching enlaces:", error);
    }
  };

  const handleOpenModal = (data) => {
    const sanitizedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        value === null ? "" : value,
      ])
    );

    setSelectedData(sanitizedData);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedData(null);
  };

  const handleSaveChanges = async (updatedData) => {
    if (updatedData.idEnlacesInteres) {
      setEnlaces((prevData) =>
        prevData.map((item) =>
          item.idEnlacesInteres === updatedData.idEnlacesInteres ? updatedData : item
        )
      );
      const { idEnlacesInteres, ...dataWithoutId } = updatedData;
      try {
        await axios.put(`${baseURL}/api/enlacesInteres/${idEnlacesInteres}`, dataWithoutId, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        enqueueSnackbar("Cambios guardados exitosamente", {
          variant: "success",
        });
      } catch (error) {
        console.error("Error al guardar los cambios:", error);
        enqueueSnackbar("Error al guardar los cambios", { variant: "error" });
      }
    } else {
      const currentDate = new Date().toISOString().split("T")[0];
      const newData = { ...updatedData, fechaCreacion: currentDate };

      try {
        const response = await axios.post(`${baseURL}/api/enlacesInteres`, newData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEnlaces((prevData) => [...prevData, response.data]);
        enqueueSnackbar("Registro creado exitosamente", { variant: "success" });
      } catch (error) {
        console.error("Error al crear el registro:", error);
        enqueueSnackbar("Error al crear el registro", { variant: "error" });
      }
    }
    handleCloseModal();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/api/enlacesInteres/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEnlaces((prevData) => prevData.filter((item) => item.idEnlacesInteres !== id));
      enqueueSnackbar("Registro eliminado exitosamente", { variant: "success" });
    } catch (error) {
      console.error("Error al eliminar el registro:", error);
      enqueueSnackbar("Error al eliminar el registro", { variant: "error" });
    }
  };

  const columns = [
    { field: "text", headerName: "Titulo", width: 150 },
    { field: "url", headerName: "URL", width: 150 },
    { field: "tipo", headerName: "Tipo", width: 100 },
    {
      field: "actions",
      headerName: "Acciones",
      width: 300,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenModal(params.row)}
          >
            Modificar
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(params.row.idEnlacesInteres)}
            style={{ marginLeft: 8 }}
          >
            Eliminar
          </Button>
        </>
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
          sx={{ fontSize: "3rem", marginTop: 3 }}
        >
          Administración de Enlaces de Interés
        </Typography>

        <Box mb={2} marginTop={3} display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenModal({})}
          >
            Crear Nuevo Registro
          </Button>
        </Box>
        <div style={{ height: 500, width: "100%", marginBottom: "50px" }}>
          <DataGrid
            rows={enlaces}
            columns={columns}
            getRowId={(row) => row.idEnlacesInteres}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 7,
                },
              },
            }}
            pageSizeOptions={[7]}
          />
        </div>
        {selectedData && (
          <ModifyEnlaceInteres
            open={modalOpen}
            handleClose={handleCloseModal}
            data={selectedData}
            handleSave={handleSaveChanges}
          />
        )}
      </Container>
    </ThemeProvider>
  );
};

export default TableEnlacesInteres;
