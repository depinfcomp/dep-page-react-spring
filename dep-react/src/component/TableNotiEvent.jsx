import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Box, Typography, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import ModifyModal from "./ModifyNotiEvent";
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

const TableNotiEvent = () => {
  
  const token = localStorage.getItem("token");
  const notiEventURL = base + "/api/NoticiasEventos";
  const [NotiEven, setnotiEven] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchnotiEvent();
  }, []);

  const fetchnotiEvent = async () => {
    try {
      const response = await axios.get(`${notiEventURL}/noAuth`);
      setnotiEven(response.data);
    } catch (error) {
      console.error("Error fetching fetchnotiEvent:", error);
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

    if (!updatedData.linkImagen) {
      enqueueSnackbar("Debe cargar una imagen antes de guardar.", { variant: "error" });
      return;
    }
    
    if (updatedData.idNoticiaEvento) {
      setnotiEven((prevData) =>
        prevData.map((item) =>
          item.idNoticiaEvento === updatedData.idNoticiaEvento
            ? updatedData
            : item
        )
      );
      const { idNoticiaEvento, ...dataWithoutId } = updatedData;
      try {
        await axios.put(`${notiEventURL}/${idNoticiaEvento}`, dataWithoutId, {
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
        const response = await axios.post(notiEventURL, newData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setnotiEven((prevData) => [...prevData, response.data]);
        enqueueSnackbar("Registro creado exitosamente", { variant: "success" });
      } catch (error) {
        console.error("Error al crear el registro:", error);
        enqueueSnackbar("Error al crear el registro", { variant: "error" });
      }
    }
    handleCloseModal();
  };

  const handleDelete = async (id,image) => {
    try {
      await axios.delete(`${notiEventURL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      await axios.delete(`${base}/upload/image/${image}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      setnotiEven((prevData) => prevData.filter((item) => item.idNoticiaEvento !== id));
      enqueueSnackbar("Registro eliminado exitosamente", { variant: "success" });
    } catch (error) {
      console.error("Error al eliminar el registro:", error);
      enqueueSnackbar("Error al eliminar el registro", { variant: "error" });
    }
  };

  const columns = [
    { field: "fechaCreacion", headerName: "Fecha Creacion", width: 160 },
    { field: "titulo", headerName: "Titulo", width: 150 },
    { field: "tipo", headerName: "Tipo", width: 100 },
    { field: "linkImagen", headerName: "Imagen", width: 150 },
    { field: "linkInformacion", headerName: "Informacion", width: 150 },
    { field: "fechaInicio", headerName: "Fecha Inicio", width: 150 },
    { field: "fechaFin", headerName: "Fecha Fin", width: 150 },
    { field: "visibleInicio", headerName: "Visible Inicio", width: 150 },
    { field: "visibleFin", headerName: "Visible Fin", width: 150 },
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
            onClick={() => handleDelete(params.row.idNoticiaEvento, params.row.linkImagen)}
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
          Administracion Noticias Y Eventos
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
            rows={NotiEven}
            columns={columns}
            getRowId={(row) => row.idNoticiaEvento}
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
          <ModifyModal
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

export default TableNotiEvent;
