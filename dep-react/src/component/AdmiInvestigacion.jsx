// AdmiInvestigacion.js
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Box, Typography, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import ModalInvestigacion from "./ModalInvestigacion";
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

const AdmiInvestigacion = () => {
  const token = localStorage.getItem("token");
  const investigacionURL = base + "/api/investigacion";
  const [investigaciones, setInvestigaciones] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchInvestigaciones();
  }, []);

  const fetchInvestigaciones = async () => {
    try {
      const response = await axios.get(`${investigacionURL}/noAuth`);
      setInvestigaciones(response.data);
    } catch (error) {
      console.error("Error fetching investigaciones:", error);
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
      setInvestigaciones((prevData) =>
        prevData.map((item) =>
          item.id === updatedData.id ? updatedData : item
        )
      );
      const { id, ...dataWithoutId } = updatedData;
      try {
        await axios.put(`${investigacionURL}/${id}`, dataWithoutId, {
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
        const response = await axios.post(investigacionURL, updatedData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setInvestigaciones((prevData) => [...prevData, response.data]);
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
      await axios.delete(`${investigacionURL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setInvestigaciones((prevData) => prevData.filter((item) => item.id !== id));
      enqueueSnackbar("Registro eliminado exitosamente", { variant: "success" });
    } catch (error) {
      console.error("Error al eliminar el registro:", error);
      enqueueSnackbar("Error al eliminar el registro", { variant: "error" });
    }
  };

  const columns = [
    { field: "nombre", headerName: "Nombre", width: 150 },
    { field: "fullname", headerName: "Fullname", width: 150 },
    { field: "url", headerName: "URL", width: 150 },
    { field: "grupolac", headerName: "Grupo Lac", width: 150 },
    { field: "image", headerName: "Image", width: 150 },
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
          Administración de Investigaciones
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
            rows={investigaciones}
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
          <ModalInvestigacion
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

export default AdmiInvestigacion;
