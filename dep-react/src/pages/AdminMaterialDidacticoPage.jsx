import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Box, Typography, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import AdminMaterialDidacticoModal from "../component/AdminMaterialDidacticoModal";
import { useSnackbar } from "notistack";
import { base } from "../api";

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

const AdminMaterialDidactico = () => {
  const token = localStorage.getItem("token");
  const materialDidacticoURL = base + "/api/materialDidactico";
  const [materiales, setMateriales] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

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

  const handleOpenModal = (data) => {
    setSelectedData(data);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedData(null);
  };

  const handleSaveChanges = async (updatedData) => {
    if (updatedData.id) {
      setMateriales((prevData) =>
        prevData.map((item) =>
          item.id === updatedData.id ? updatedData : item
        )
      );
      const { id, ...dataWithoutId } = updatedData;
      try {
        await axios.put(`${materialDidacticoURL}/${id}`, dataWithoutId, {
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
        const response = await axios.post(materialDidacticoURL, updatedData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMateriales((prevData) => [...prevData, response.data]);
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
      await axios.delete(`${materialDidacticoURL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMateriales((prevData) => prevData.filter((item) => item.id !== id));
      enqueueSnackbar("Registro eliminado exitosamente", { variant: "success" });
    } catch (error) {
      console.error("Error al eliminar el registro:", error);
      enqueueSnackbar("Error al eliminar el registro", { variant: "error" });
    }
  };

  const columns = [
    { field: "autor", headerName: "Autor", width: 170 },
    { field: "titulo", headerName: "Título", width: 200 },
    { field: "descripcion", headerName: "Descripción", width: 650 },
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
          Administración de Material Didáctico
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
            rows={materiales}
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
          <AdminMaterialDidacticoModal
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

export default AdminMaterialDidactico;

