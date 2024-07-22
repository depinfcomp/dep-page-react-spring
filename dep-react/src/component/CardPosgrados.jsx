import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { CardActionArea } from "@mui/material";
import { useSnackbar } from "notistack";
import { base } from "../api";
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ActionAreaCard({ group }) {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleButtonClick = (url, message) => {
    if (!url) {
      enqueueSnackbar(message, { variant: "error" });
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const consumir = base + "/upload/image/";
  const [imagenVer, setImagenVer] = useState(null);

  const handleFetchImage = async () => {
    try {
      // eslint-disable-next-line react/prop-types
      const response = await axios.get(consumir + group.image, {
        responseType: "blob",
      });
      const imagenURL = URL.createObjectURL(response.data);
      setImagenVer(imagenURL);
    } catch (error) {
      console.error("Error fetching the image:", error);
    }
  };

  useEffect(() => {
    handleFetchImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps, react/prop-types
  }, [group.image]);

  const isWithinDateRange = () => {
    const currentDate = new Date();
    const fechaInscripcion = new Date(group.fechaInscripcion);
    const fechaCierre = new Date(group.fechaCierre);
    return currentDate >= fechaInscripcion && currentDate <= fechaCierre;
  };

  const contacto = group.contacto.split(',').map(item => item.trim());

  return (
    <Card
      sx={{
        width: 345,
        height: 270,
        margin: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={imagenVer || "/Logos/broken-image.png"}
          alt={group.titulo}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {group.titulo}
          </Typography>
          <Typography variant="body3" color="text.secondary">
            {group.descripcion}
          </Typography>
        </CardContent>
        <CardActions>
          {isWithinDateRange() && (
            <Button
              variant="outlined"
              size="medium"
              color="primary"
              onClick={() =>
                handleButtonClick(
                  // eslint-disable-next-line react/prop-types
                  group.linkInscripcion,
                  "URL de GrupLAC no disponible"
                )
              }
            >
              Inscribirse
            </Button>
          )}
          <Button
            variant="outlined"
            size="medium"
            color="primary"
            onClick={() =>
              handleButtonClick(
                // eslint-disable-next-line react/prop-types
                group.linkInformacion,
                "URL de GrupLAC no disponible"
              )
            }
          >
            Mas Informacion
          </Button>
          <Button
            variant="outlined"
            size="medium"
            color="primary"
            onClick={handleOpen}
          >
            Contacto
          </Button>
        </CardActions>
      </CardActionArea>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Información de Contacto
          </Typography>
          {contacto.map((info, index) => (
            <Typography key={index} sx={{ mt: 2 }}>
              {info.includes('@') ? `Correo: ${info}` : `Teléfono: ${info}`}
            </Typography>
          ))}
          <Button
            variant="outlined"
            size="medium"
            color="primary"
            sx={{ mt: 1 }}
            onClick={handleClose}
          >
            Cerrar
          </Button>
        </Box>
      </Modal>
    </Card>
  );
}
