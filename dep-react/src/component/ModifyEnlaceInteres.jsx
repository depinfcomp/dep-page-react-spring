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
  Typography,
} from "@mui/material";

const ModifyEnlaceInteres = ({ open, handleClose, data, handleSave }) => {
  const [formData, setFormData] = useState({ ...data });

  useEffect(() => {
    setFormData({ ...data });
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveChanges = () => {
    handleSave(formData);
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
            name="text"
            value={formData.text || ""}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="URL"
            name="url"
            value={formData.url || ""}
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
              <MenuItem value="PUBLIC">PUBLIC</MenuItem>
              <MenuItem value="PRIVATE">PRIVATE</MenuItem>
            </Select>
          </FormControl>

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

export default ModifyEnlaceInteres;
