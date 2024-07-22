import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Box, Typography, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import ModalProgramas from "./ModalProgramas";
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

const AdminProgramas = () => {
  const token = localStorage.getItem("token");
  const programasURL = `${base}/api/programa`;
  const [programas, setProgramas] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchProgramas();
  }, []);

  const fetchProgramas = async () => {
    try {
      const response = await axios.get(`${programasURL}/noAuth`);
      setProgramas(response.data);
    } catch (error) {
      console.error("Error fetching programas:", error);
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
    if (updatedData.id) {
      setProgramas((prevData) =>
        prevData.map((item) =>
          item.id === updatedData.id ? updatedData : item
        )
      );
      const { id, ...dataWithoutId } = updatedData;
      try {
        await axios.put(`${programasURL}/${id}`, dataWithoutId, {
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
      try {
        const response = await axios.post(programasURL, updatedData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProgramas((prevData) => [...prevData, response.data]);
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
      await axios.delete(`${programasURL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProgramas((prevData) => prevData.filter((item) => item.id !== id));
      enqueueSnackbar("Registro eliminado exitosamente", { variant: "success" });
    } catch (error) {
      console.error("Error al eliminar el registro:", error);
      enqueueSnackbar("Error al eliminar el registro", { variant: "error" });
    }
  };

  const columns = [
    { field: "titulo", headerName: "Título", width: 150 },
    { field: "fechaInscripcion", headerName: "Fecha Inscripción", width: 150 },
    { field: "fechaCierre", headerName: "Fecha Cierre", width: 150 },
    { field: "contacto", headerName: "Contacto", width: 150 },
    { field: "linkInformacion", headerName: "Link Información", width: 150 },
    { field: "linkInscripcion", headerName: "Link Inscripción", width: 150 },
    { field: "descripcion", headerName: "Descripción", width: 150 },
    { field: "tipo", headerName: "Tipo", width: 150 },
    { field: "image", headerName: "Imagen", width: 150 },
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
            onClick={() => handleDelete(params.row.id)}
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
          Administración de Programas
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
            rows={programas}
            columns={columns}
            getRowId={(row) => row.id}
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
          <ModalProgramas
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

export default AdminProgramas;
