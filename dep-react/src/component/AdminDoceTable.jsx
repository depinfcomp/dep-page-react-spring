import { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Box,
  Typography,
  Container,
  Modal,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
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

const AdminDoceTable = () => {
  const token = localStorage.getItem("token");
  const baseURL = base;

  //console.log(baseURL);

  const [docentes, setDocentes] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchDocentes();
  }, []);

  const fetchDocentes = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/docentes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDocentes(response.data);
    } catch (error) {
      console.error("Error fetching docentes:", error);
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
    if (updatedData.idDocente) {
      setDocentes((prevData) =>
        prevData.map((item) =>
          item.idDocente === updatedData.idDocente ? updatedData : item
        )
      );
      const { idDocente, ...dataWithoutId } = updatedData;
      try {
        console.log(dataWithoutId);
        await axios.put(`${baseURL}/api/docentes/${idDocente}`, dataWithoutId, {
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
        const response = await axios.post(`${baseURL}/api/docentes`, newData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDocentes((prevData) => [...prevData, response.data]);
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
      await axios.delete(`${baseURL}/api/docentes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDocentes((prevData) =>
        prevData.filter((item) => item.idDocente !== id)
      );
      enqueueSnackbar("Registro eliminado exitosamente", {
        variant: "success",
      });
    } catch (error) {
      console.error("Error al eliminar el registro:", error);
      enqueueSnackbar("Error al eliminar el registro", { variant: "error" });
    }
  };

  const columns = [
    { field: "idDocente", headerName: "ID", width: 100 },
    { field: "nombre", headerName: "Nombre", width: 400 },
    { field: "posicion", headerName: "Posicion", width: 400 },
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
            onClick={() => handleDelete(params.row.idDocente)}
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
          Administración de Docentes
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
            rows={docentes}
            columns={columns}
            getRowId={(row) => row.idDocente}
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
          <ModifyDocenteModal
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

const ModifyDocenteModal = ({ open, handleClose, data, handleSave }) => {
  const [docente, setDocente] = useState(data);

  useEffect(() => {
    setDocente(data);
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDocente((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    handleSave(docente);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...modalStyle, width: 400 }}>
        {/* nombre del modal */}
        <Typography variant="h5" component="h2">
          {docente.idDocente ? "Modificar Docente" : "Crear Docente"}
        </Typography>
        <TextField
          label="Nombre"
          name="nombre"
          value={docente.nombre || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
          sx={{
            "& .MuiInputBase-input": {
              fontSize: "1.3rem", // Tamaño de la letra del texto de entrada
            },
            "& .MuiInputLabel-root": {
              fontSize: "1.5rem", // Tamaño de la letra de la etiqueta
            },
          }}
        />
        <TextField
          label="Correo"
          name="correo"
          value={docente.correo || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
          sx={{
            "& .MuiInputBase-input": {
              fontSize: "1.3rem", // Tamaño de la letra del texto de entrada
            },
            "& .MuiInputLabel-root": {
              fontSize: "1.5rem", // Tamaño de la letra de la etiqueta
            },
          }}
        />
        <TextField
          label="CvLAC"
          name="cvlac"
          value={docente.cvlac || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
          sx={{
            "& .MuiInputBase-input": {
              fontSize: "1.3rem", // Tamaño de la letra del texto de entrada
            },
            "& .MuiInputLabel-root": {
              fontSize: "1.5rem", // Tamaño de la letra de la etiqueta
            },
          }}
        />
        {/* <TextField
          label="Posición"
          name="posicion"
          value={docente.posicion || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        /> */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="posicion-label" sx={{ fontSize: "1.2rem" }}>
            Posición
          </InputLabel>
          <Select
            labelId="posicion-label"
            label="Posición"
            name="posicion"
            value={docente.posicion || ""}
            onChange={handleChange}
            sx={{ fontSize: "1.2rem" }} // Tamaño de la letra del Select
          >
            <MenuItem value="Docente" sx={{ fontSize: "1.2rem" }}>
              Docente
            </MenuItem>
            <MenuItem value="Director" sx={{ fontSize: "1.2rem" }}>
              Director
            </MenuItem>
            <MenuItem value="Directora" sx={{ fontSize: "1.2rem" }}>
              Directora
            </MenuItem>
            <MenuItem
              value="Auxiliar administrativa"
              sx={{ fontSize: "1.2rem" }}
            >
              Auxiliar Administrativa
            </MenuItem>
            <MenuItem
              value="Auxiliar administrativo"
              sx={{ fontSize: "1.2rem" }}
            >
              Auxiliar Administrativo
            </MenuItem>
          </Select>
        </FormControl>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            style={{ marginLeft: 8 }}
          >
            Guardar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default AdminDoceTable;
