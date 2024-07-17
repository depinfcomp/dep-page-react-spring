import React, { useState } from "react";
import { TextField, Button, Container, Typography, Modal, Box } from "@mui/material";
import { useSnackbar } from "notistack";

const MasInformacionPage = ({ open, handleClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    confirmarEmail: "",
    telefono: "",
    institucion: "",
    comentario: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, confirmarEmail } = formData;
  
    if (email !== confirmarEmail) {
      enqueueSnackbar("Los correos electrónicos no coinciden", { variant: "error" });
      return;
    }
  
    try {
      const response = await fetch('http://192.168.1.24/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: "Acme <onboarding@resend.dev>",
          to: ["infycomputacion_man@unal.edu.co"],
          subject: "Nueva solicitud de información",
          html: `
            <p><strong>Nombre completo:</strong> ${formData.nombre} ${formData.apellidos}</p>
            <p><strong>Correo electrónico:</strong> ${formData.email}</p>
            <p><strong>Teléfono:</strong> ${formData.telefono}</p>
            <p><strong>Institución:</strong> ${formData.institucion}</p>
            <p><strong>Comentario o mensaje:</strong> ${formData.comentario}</p>
          `,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Error al enviar el correo');
      }
  
      const data = await response.json();
      console.log('Correo enviado:', data);
      enqueueSnackbar('Información enviada con éxito', { variant: "success" });
      handleClose(); // Cierra el modal después de enviar el correo
    } catch (err) {
      console.error('Error al enviar el correo:', err);
      enqueueSnackbar('Error al enviar el correo', { variant: "error" });
    }
  };
  

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="solicitar-informacion-modal"
      aria-describedby="formulario-para-solicitar-informacion"
    >
      <Box sx={modalStyle}>
        <Typography component="h1" variant="h5" id="solicitar-informacion-modal">
          Solicitar Información
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="nombre"
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            InputLabelProps={{ style: { fontSize: '1.25rem' } }}
            inputProps={{ style: { fontSize: '1.25rem' } }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="apellidos"
            label="Apellidos"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            InputLabelProps={{ style: { fontSize: '1.25rem' } }}
            inputProps={{ style: { fontSize: '1.25rem' } }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo electrónico"
            name="email"
            value={formData.email}
            onChange={handleChange}
            InputLabelProps={{ style: { fontSize: '1.25rem' } }}
            inputProps={{ style: { fontSize: '1.25rem' } }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="confirmarEmail"
            label="Confirmar el correo electrónico"
            name="confirmarEmail"
            value={formData.confirmarEmail}
            onChange={handleChange}
            InputLabelProps={{ style: { fontSize: '1.25rem' } }}
            inputProps={{ style: { fontSize: '1.25rem' } }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="telefono"
            label="Teléfono"
            name="telefono"
            value={formData.telefono}
            inputProps={{ maxLength: 16, style: { fontSize: '1.25rem' } }}
            onChange={handleChange}
            InputLabelProps={{ style: { fontSize: '1.25rem' } }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="institucion"
            label="Institución"
            name="institucion"
            value={formData.institucion}
            onChange={handleChange}
            InputLabelProps={{ style: { fontSize: '1.25rem' } }}
            inputProps={{ style: { fontSize: '1.25rem' } }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="comentario"
            label="Comentario o mensaje"
            name="comentario"
            multiline
            rows={4}
            value={formData.comentario}
            onChange={handleChange}
            InputLabelProps={{ style: { fontSize: '1.25rem' } }}
            inputProps={{ style: { fontSize: '1.25rem' } }}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ fontSize: '1.25rem' }}>
            Enviar
          </Button>
          <Button onClick={handleClose} fullWidth variant="outlined" sx={{ mt: 2, fontSize: '1.25rem' }}>
            Cerrar
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default MasInformacionPage;
