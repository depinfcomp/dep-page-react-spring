import { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import axios from "axios";
import { base } from "../api";

// eslint-disable-next-line react/prop-types
const AdminMaterialDidacticoModal = ({ open, handleClose, data, handleSave }) => {
  const [formData, setFormData] = useState({ ...data });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setFormData({ ...data });
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveChanges = async () => {
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
            label="Autor"
            name="autor"
            value={formData.autor || ""}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Título"
            name="titulo"
            value={formData.titulo || ""}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Descripción"
            name="descripcion"
            value={formData.descripcion || ""}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Enlace"
            name="enlace"
            value={formData.enlace || ""}
            onChange={handleChange}
          />
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
              Guardar
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDiscardAndClose}
            >
              Cancelar
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AdminMaterialDidacticoModal;
