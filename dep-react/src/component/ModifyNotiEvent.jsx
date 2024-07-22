import { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import { base } from "../api";

// eslint-disable-next-line react/prop-types
const ModifyNotiEvent = ({ open, handleClose, data, handleSave }) => {
  const [formData, setFormData] = useState({ ...data });
  const [selectedFile, setSelectedFile] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setFormData({ ...data });
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (name, value, suffix) => {
    const formattedDate = `${value}${suffix}`;
    setFormData((prevData) => ({ ...prevData, [name]: formattedDate }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && !file.type.startsWith("image/")) {
      enqueueSnackbar("Solo se permiten archivos de imagen.", { 
        variant: "error" });
      setSelectedFile(null);
      return;
    }
    setSelectedFile(file);
  };

  const validateDates = () => {
    const { fechaInicio, fechaFin, visibleInicio, visibleFin } = formData;
    const errors = [];

    if (new Date(fechaInicio) > new Date(fechaFin)) {
      errors.push("La fecha de inicio debe ser menor o igual a la fecha de fin.");
    }
    if (new Date(visibleInicio) > new Date(visibleFin)) {
      errors.push("La fecha visible de inicio debe ser menor o igual a la fecha visible de fin.");
    }

    return errors;
  };

  const handleSaveChanges = async () => {
    const validationErrors = validateDates();
    if (validationErrors.length > 0) {
      validationErrors.forEach(error => enqueueSnackbar(error, { variant: "error" }));
      return;
    }

    let updatedFormData = { ...formData };

    if (selectedFile) {
      const imageData = new FormData();
      imageData.append("file", selectedFile);

      try {
        const response = await axios.post(`${base}/upload/image`, imageData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        updatedFormData = {
          ...updatedFormData,
          linkImagen: response.data,
        };
      } catch (error) {
        console.error("Error uploading image:", error);
        enqueueSnackbar("Error uploading image", { variant: "error" });
        return;
      }
    }

    handleSave(updatedFormData);
    handleClose();
  };

  const handleDiscardAndClose = () => {
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <form>
          <TextField
            fullWidth
            margin="normal"
            label="Titulo"
            name="titulo"
            value={formData.titulo || ""}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="tipo-label">Tipo</InputLabel>
            <Select
              labelId="tipo-label"
              id="tipo"
              value={formData.tipo || ""}
              label="Tipo"
              name="tipo"
              onChange={handleChange}
            >
              <MenuItem value="Noticia">Noticia</MenuItem>
              <MenuItem value="Evento">Evento</MenuItem>
            </Select>
          </FormControl>

          <Grid item xs={12}>
            <Button variant="contained" component="label">
              Subir Imagen
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
            {formData.linkImagen && (
              <Typography variant="body2" component="p">
                Imagen seleccionada: {formData.linkImagen}
              </Typography>
            )}
          </Grid>
          <TextField
            fullWidth
            margin="normal"
            label="Informacion"
            name="linkInformacion"
            value={formData.linkInformacion || ""}
            onChange={handleChange}
          />

          <Grid container spacing={2} rowSpacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">
                Rango de duracion en calendario
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <label>Fecha Inicio:</label>
              <input
                type="date"
                name="fechaInicio"
                value={
                  formData.fechaInicio ? formData.fechaInicio.split("T")[0] : ""
                }
                onChange={(e) =>
                  handleDateChange("fechaInicio", e.target.value, "T00:00:00")
                }
              />
            </Grid>
            <Grid item xs={6}>
              <label>Fecha Fin:</label>
              <input
                type="date"
                name="fechaFin"
                value={formData.fechaFin ? formData.fechaFin.split("T")[0] : ""}
                onChange={(e) =>
                  handleDateChange("fechaFin", e.target.value, "T24:00:00")
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                Rango de duracion visible al publico
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <label>Visible Inicio:</label>
              <input
                type="date"
                name="visibleInicio"
                value={
                  formData.visibleInicio
                    ? formData.visibleInicio.split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  handleDateChange("visibleInicio", e.target.value, "T00:00:00")
                }
              />
            </Grid>
            <Grid item xs={6}>
              <label>Visible Fin:</label>
              <input
                type="date"
                name="visibleFin"
                value={
                  formData.visibleFin ? formData.visibleFin.split("T")[0] : ""
                }
                onChange={(e) =>
                  handleDateChange("visibleFin", e.target.value, "T24:00:00")
                }
              />
            </Grid>
          </Grid>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveChanges}
            >
              Guardar Cambios
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleDiscardAndClose}
            >
              Descartar Cambios y Cerrar
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default ModifyNotiEvent;
