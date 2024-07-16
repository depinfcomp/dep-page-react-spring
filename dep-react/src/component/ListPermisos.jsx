import { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PDFAusenciaRemunerada from "../component/PDF/PDFAusenciaRemunerada";
import { DataGrid } from "@mui/x-data-grid";
import emailjs from "@emailjs/browser";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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

const ListPermisos = () => {
  const baseURL = base + "/api/permisos";
  const docenteURL = base + "/api/docentes";
  const modeloURL = base + "/api/modeloPermisos";

  const [Permisos, setListaPermisos] = useState([]);
  const [Docentes, setDocentes] = useState([]);
  const [Modelos, setModelos] = useState([]);
  const [open, setOpen] = useState(false);
  const [pdfOpen, setPdfOpen] = useState(false);
  const [selectedPermiso, setSelectedPermiso] = useState({
    estadoPermisos: "",
    consecutivoPermisos: "",
    fechaAutoriza: "",
  });

  const fetchPermisos = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(baseURL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setListaPermisos(response.data);
    } catch (error) {
      console.error("Error fetching Permisos:", error);
    }
  };

  const fetchDocentes = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(docenteURL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDocentes(response.data);
    } catch (error) {
      console.error("Error fetching Docentes:", error);
    }
  };

  const fetchModelos = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(modeloURL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setModelos(response.data);
    } catch (error) {
      console.error("Error fetching Modelos:", error);
    }
  };

  useEffect(() => {
    fetchPermisos();
    fetchDocentes();
    fetchModelos();
  }, []);

  const getDocenteName = (idPermiso) => {
    for (let docente of Docentes) {
      if (
        docente.permisosList.some((permiso) => permiso.idPermisos === idPermiso)
      ) {
        return docente.nombre;
      }
    }
    return "";
  };

  const getModeloName = (idPermiso) => {
    for (let modelo of Modelos) {
      if (
        modelo.permisosList.some((permiso) => permiso.idPermisos === idPermiso)
      ) {
        return modelo.nombreModelo;
      }
    }
    return "";
  };

  const handleOpen = (permiso) => {
    setSelectedPermiso(permiso);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPermiso(null);
  };

  const handlePdfOpen = (permiso) => {
    setSelectedPermiso(permiso);
    setPdfOpen(true);
  };

  const handlePdfClose = () => {
    setPdfOpen(false);
    setSelectedPermiso(null);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.put(
        `${baseURL}/${selectedPermiso.idPermisos}`,
        selectedPermiso,
        config
      );
      setListaPermisos(
        Permisos.map((permiso) =>
          permiso.idPermisos === selectedPermiso.idPermisos
            ? response.data
            : permiso
        )
      );
      setOpen(false);
      sendEmail();
      setSelectedPermiso(null);
    } catch (error) {
      console.error("Error updating permiso:", error);
    }
  };

  const handleEstadoChange = (event) => {
    const { value } = event.target;
    setSelectedPermiso({
      ...selectedPermiso,
      estadoPermisos: value,
      fechaAutoriza:
        value === "autorizado" ? new Date().toISOString().split("T")[0] : "",
    });
  };

  const getDocenteInfo = (idPermiso) => {
    for (let docente of Docentes) {
      if (
        docente.permisosList.some((permiso) => permiso.idPermisos === idPermiso)
      ) {
        return { nombre: docente.nombre, email: docente.correo };
      }
    }
    return { nombre: "", email: "" };
  };

  const sendEmail = () => {
    const docenteInfo = getDocenteInfo(selectedPermiso.idPermisos);
    const templateParams = {
      name: docenteInfo.nombre,
      email: docenteInfo.email,
      message: `El estado de su permiso ha sido actualizado a ${selectedPermiso.estadoPermisos}.`,
      copy_to: docenteInfo.email,
      estado: selectedPermiso.estadoPermisos,
    };

    emailjs
      .send(
        "service_aktv2wd",
        "template_6s97vv6",
        templateParams,
        "vQenyxKZK9TX9WT5b"
      )
      .then((response) => {
        console.log("Email enviado con éxito!", response.status, response.text);
      })
      .catch((error) => {
        console.error("Error al enviar el email:", error);
      });
  };

  const columns = [
    { field: "estadoPermisos", headerName: "Estado", width: 150 },
    { field: "fechaSolicitud", headerName: "Fecha Solicitud", width: 150 },
    { field: "fechaAutoriza", headerName: "Fecha Autoriza", width: 150 },
    { field: "consecutivoPermisos", headerName: "Consecutivo", width: 150 },
    { field: "descripcionPermisos", headerName: "Descripción", width: 150 },
    { field: "directorPermisos", headerName: "Director", width: 150 },
    {
      field: "docente",
      headerName: "Docente",
      width: 150,
      valueGetter: (value, row) => `${getDocenteName(row.idPermisos)}`,
    },
    {
      field: "modeloPermiso",
      headerName: "Modelo Permiso",
      width: 150,
      valueGetter: (value, row) => `${getModeloName(row.idPermisos)}`,
    },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 300,
      renderCell: (params) => (
        <>
          <Button variant="contained" onClick={() => handleOpen(params.row)}>
            Modificar
          </Button>
          {params.row.estadoPermisos === "autorizado" && (
            <Button
              variant="contained"
              style={{ marginLeft: 8 }}
              onClick={() => handlePdfOpen(params.row)}
            >
              Visualizar PDF
            </Button>
          )}
        </>
      ),
    },
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
            rows={Permisos}
            columns={columns}
            getRowId={(row) => row.idPermisos}
          />
        </Box>
      </ThemeProvider>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          {selectedPermiso && (
            <form>
              <FormControl fullWidth margin="normal">
                <InputLabel id="estado-label">Estado</InputLabel>
                <Select
                  labelId="estado-label"
                  value={selectedPermiso?.estadoPermisos || ""}
                  onChange={handleEstadoChange}
                >
                  <MenuItem value="rechazado">Rechazado</MenuItem>
                  <MenuItem value="autorizado">Autorizado</MenuItem>
                  <MenuItem value="Proceso">Proceso</MenuItem>
                </Select>
              </FormControl>
              {selectedPermiso?.estadoPermisos === "autorizado" && (
                <TextField
                  fullWidth
                  margin="normal"
                  label="Fecha de Autorización"
                  value={selectedPermiso?.fechaAutoriza || ""}
                  InputProps={{ readOnly: true }}
                />
              )}
              <TextField
                fullWidth
                margin="normal"
                label="Consecutivo"
                value={selectedPermiso?.consecutivoPermisos || ""}
                onChange={(e) =>
                  setSelectedPermiso({
                    ...selectedPermiso,
                    consecutivoPermisos: e.target.value,
                  })
                }
              />
              <Button variant="contained" color="primary" onClick={handleSave}>
                Guardar
              </Button>
            </form>
          )}
        </Box>
      </Modal>
      <Modal
        open={pdfOpen}
        onClose={handlePdfClose}
        aria-labelledby="pdf-modal-title"
        aria-describedby="pdf-modal-description"
      >
        <Box sx={{ ...style, width: "80%", height: "80%" }}>
          {selectedPermiso && (
            <>
              <PDFViewer width="100%" height="90%">
                <PDFAusenciaRemunerada
                  NOMBRE_DOCENTE={getDocenteName(selectedPermiso.idPermisos)}
                  FECHA_AUTORIZACION={selectedPermiso.fechaAutoriza}
                  CONSECUTIVO={selectedPermiso.consecutivoPermisos}
                  FECHA_SOLICITUD={selectedPermiso.fechaSolicitud}
                  DIAS_SOLICITADOS={selectedPermiso.descripcionPermisos}
                />
              </PDFViewer>
              <PDFDownloadLink
                document={
                  <PDFAusenciaRemunerada
                    NOMBRE_DOCENTE={getDocenteName(selectedPermiso.idPermisos)}
                    FECHA_AUTORIZACION={selectedPermiso.fechaAutoriza}
                    CONSECUTIVO={selectedPermiso.consecutivoPermisos}
                    FECHA_SOLICITUD={selectedPermiso.fechaSolicitud}
                    DIAS_SOLICITADOS={selectedPermiso.descripcionPermisos}
                  />
                }
                fileName="permiso_ausencia_remunerada.pdf"
              >
                {({ loading }) =>
                  loading ? (
                    "Cargando documento..."
                  ) : (
                    <Button variant="contained" color="primary">
                      Descargar PDF
                    </Button>
                  )
                }
              </PDFDownloadLink>
            </>
          )}
          <Button
            onClick={handlePdfClose}
            variant="contained"
            color="secondary"
          >
            Cerrar
          </Button>
        </Box>
      </Modal>
    </>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default ListPermisos;
