import { useState, useEffect, useRef } from "react";
import ModeloPermisoList from "./ModeloPermisoList";
import DateFields from "./DateFields";
import { createPermisoConModeloDocente } from "../api";
import {
  Button,
  Container,
  Typography,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";
import dayjs from "dayjs";
import emailjs from "emailjs-com";
import axios from "axios";
import { base } from "../api";

const SolicitudPermiso = () => {
  const form = useRef();
  const [currentDirector, setCurrentDirector] = useState(null);
  const [currentIdDocente, setCurrentIdDocente] = useState(null);
  const [selectedDocente, setSelectedDocente] = useState(null);
  const [selectedModelo, setSelectedModelo] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const baseURL = base;

  const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const monthsOfYear = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  const formatDateWithDay = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = monthsOfYear[date.getMonth()];
    return `${dayOfWeek} ${date.getDate()} de ${month}`;
  };

  useEffect(() => {
    if (startDate && endDate) {
      const formattedStartDate = formatDateWithDay(startDate);
      const formattedEndDate = formatDateWithDay(endDate);
      if (formattedStartDate === formattedEndDate) {
        setDescripcion(`el día ${formattedStartDate}`);
      } else {
        setDescripcion(`desde ${formattedStartDate} hasta ${formattedEndDate}`);
      }
    }
  }, [startDate, endDate]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No hay token disponible");
        return;
      }
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setCurrentIdDocente(decodedToken.idDocente);
    };
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (currentIdDocente) {
      const fetchDocente = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No hay token disponible");
          return;
        }
        try {
          const response = await axios.get(`${baseURL}/api/docentes/${currentIdDocente}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setSelectedDocente(response.data);

          const response2 = await axios.get(`${baseURL}/api/docentes/posicion`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCurrentDirector(response2.data);
        } catch (error) {
          console.error("Error fetching docente:", error);
        }
      };
      fetchDocente();
    }
  }, [currentIdDocente]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedDocente || !selectedModelo) {
      setSnackbarMessage("Por favor, seleccione un docente y un modelo de permiso.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    const permiso = {
      estadoPermisos: "Proceso",
      fechaSolicitud: dayjs().add(1, "day").format("YYYY-MM-DD"),
      fechaAutoriza: "",
      consecutivoPermisos: null,
      descripcionPermisos: descripcion,
      directorPermisos: currentDirector.nombre,
    };

    createPermisoConModeloDocente(
      selectedDocente.idDocente,
      selectedModelo.idModeloPermiso,
      permiso
    )
      .then((response) => {
        console.log("Permiso creado:", response.data);
        setSnackbarMessage("Permiso creado exitosamente.");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);

        // Enviar notificación por email
        sendEmail();
      })
      .catch((error) => {
        const errorMessage = error.response?.data || "Error creando el permiso.";
        console.error("Error creando el permiso:", errorMessage);
        setSnackbarMessage(errorMessage);
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      });
  };

  const sendEmail = () => {
    const templateParams = {
      name: selectedDocente.nombre,
      email: selectedDocente.correo,
      message: descripcion,
      copy_to: `${selectedDocente.correo},${currentDirector.correo},"depinfcomp_man@unal.edu.co"`,
      estado: "Proceso",
    };

    emailjs.send(
      "service_aktv2wd",
      "template_6s97vv6",
      templateParams,
      "vQenyxKZK9TX9WT5b"
    )
    .then((response) => {
      console.log("Email enviado con éxito!", response.status, response.text);
      setSnackbarMessage("Notificación enviada por email.");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    })
    .catch((error) => {
      console.error("Error al enviar el email:", error);
      setSnackbarMessage("Error al enviar la notificación por email.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    });
  };

  return (
    <Container sx={{ height: 400, width: "100%", marginTop: 10, marginBottom: 5 }}>
      <Typography variant="h3" sx={{ marginBottom: 5 }}>
        Solicitud de Permiso
      </Typography>

      <Typography variant="h5" sx={{ marginBottom: 1 }}>
        Docente Actual
      </Typography>
      {selectedDocente && (
        <Typography variant="body1" sx={{ marginBottom: 5 }}>
          {selectedDocente.nombre} ({selectedDocente.correo})
        </Typography>
      )}

      <Typography variant="h6" sx={{ marginBottom: 1, fontSize: 18 }}>
        Seleccionar Modelo de Permiso
      </Typography>
      <ModeloPermisoList onSelect={setSelectedModelo} />

      {selectedModelo?.nombreModelo === "Ausencia Remunerada" && (
        <DateFields
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      )}

      <Grid item xs={12} md={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!selectedDocente || !selectedModelo || !descripcion}
          fullWidth
          sx={{ marginBottom: 1 }}
        >
          Solicitar Permiso
        </Button>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SolicitudPermiso;
