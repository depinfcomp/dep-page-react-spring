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
import { useSnackbar } from "notistack";
import axios from "axios";
import { base } from "../api";

// eslint-disable-next-line react/prop-types
const ModalProgramas = ({ open, handleClose, data, handleSave }) => {
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

  const handleSaveChanges = async () => {
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
          image: response.data,
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && !file.type.startsWith("image/")) {
      enqueueSnackbar("Solo se permiten archivos de imagen.", { variant: "error" });
      setSelectedFile(null);
      return;
    }
    setSelectedFile(file);
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
            label="Título"
            name="titulo"
            value={formData.titulo || ""}
            onChange={handleChange}
            InputLabelProps={{ style: { fontSize: '1.2rem' } }}
            inputProps={{ style: { fontSize: '1.2rem' } }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Fecha Inscripción"
            name="fechaInscripcion"
            type="date"
            value={formData.fechaInscripcion || ""}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
              style: { fontSize: '1.2rem' },
            }}
            inputProps={{ style: { fontSize: '1.2rem' } }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Fecha Cierre"
            name="fechaCierre"
            type="date"
            value={formData.fechaCierre || ""}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
              style: { fontSize: '1.2rem' },
            }}
            inputProps={{ style: { fontSize: '1.2rem' } }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Contacto"
            name="contacto"
            value={formData.contacto || ""}
            onChange={handleChange}
            InputLabelProps={{ style: { fontSize: '1.2rem' } }}
            inputProps={{ style: { fontSize: '1.2rem' } }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Link Información"
            name="linkInformacion"
            value={formData.linkInformacion || ""}
            onChange={handleChange}
            InputLabelProps={{ style: { fontSize: '1.2rem' } }}
            inputProps={{ style: { fontSize: '1.2rem' } }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Link Inscripción"
            name="linkInscripcion"
            value={formData.linkInscripcion || ""}
            onChange={handleChange}
            InputLabelProps={{ style: { fontSize: '1.2rem' } }}
            inputProps={{ style: { fontSize: '1.2rem' } }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Descripción"
            name="descripcion"
            value={formData.descripcion || ""}
            onChange={handleChange}
            InputLabelProps={{ style: { fontSize: '1.2rem' } }}
            inputProps={{ style: { fontSize: '1.2rem' } }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="tipo-label" sx={{ fontSize: '1.2rem' }}>Tipo</InputLabel>
            <Select
              labelId="tipo-label"
              id="tipo"
              value={formData.tipo || ""}
              label="Tipo"
              name="tipo"
              onChange={handleChange}
              sx={{ fontSize: '1.2rem' }}
            >
              <MenuItem value="PREGRADO" sx={{ fontSize: '1.2rem' }}>PREGRADO</MenuItem>
              <MenuItem value="POSGRADO" sx={{ fontSize: '1.2rem' }}>POSGRADO</MenuItem>
            </Select>
          </FormControl>
          <Grid item xs={12}>
            <Button variant="contained" component="label" >
              Subir Imagen
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
            {formData.image && (
              <Typography variant="body2" component="p" >
                Imagen seleccionada: {formData.image}
              </Typography>
            )}
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
              sx={{ fontSize: '1.2rem' }}
            >
              Guardar
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDiscardAndClose}
              sx={{ fontSize: '1.2rem' }}
            >
              Cancelar
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalProgramas;