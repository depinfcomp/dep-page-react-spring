import { useEffect, useState } from "react";
import {
  Paper,
  ListItemButton,
  ListItemText,
  Box,
  Typography,
  List,
  ListSubheader,
} from "@mui/material";
import MasInformacionPage from "../pages/MasInformacionPage"; // Importa el modal
import { base } from "../api";

const EnlacesInteresComponent = () => {
  const baseURL = base; // Cambia esto a tu base URL

  const [enlaces, setEnlaces] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch(`${baseURL}/api/enlacesInteres/noAuth`)
      .then((response) => response.json())
      .then((data) => setEnlaces(data))
      .catch((error) => console.error("Error fetching enlaces:", error));
  }, []);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <Box component="section">
      <List
        align="center"
        sx={{
          width: "100%",
          maxWidth: 360,
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            sx={{
              bgcolor: "#1d265d",
              color: "white",
            }}
          />
        }
      >
        <Paper elevation={5} sx={{ margin: "10px" }}>
          <ListItemButton component="a" href="/MaterialDidactico">
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: 200,
                bgcolor: "grey.300",
              }}
            >
              <img
                src="/public/Logos/educacion_continua.png"
                alt="Educacion continua"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <Typography
                variant="h6"
                sx={{
                  position: "absolute",
                  bottom: 8,
                  left: 8,
                  color: "white",
                  fontSize: "1.5rem",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  padding: "4px 8px",
                }}
              >
                Material Didactico
              </Typography>
            </Box>
          </ListItemButton>
        </Paper>
        <Paper elevation={5} sx={{ margin: "15px" }}>
          <ListItemButton
            onClick={handleOpenModal}
            sx={{
              backgroundColor: "lightblue", // Cambia este valor al color que prefieras
             
            }}
          >
            <ListItemText
              primary={
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "1.50rem",
                    borderBottom: "1px solid black",
                  }}
                >
                  Solicitar Información
                </Typography>
              }
            />
          </ListItemButton>
          {enlaces.map((item, index) => (
            <ListItemButton key={index} component="a" href={item.url}>
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "1.50rem",
                      borderBottom: "1px solid black",
                    }}
                  >
                    {item.text}
                  </Typography>
                }
              />
            </ListItemButton>
          ))}
        </Paper>
      </List>
      <MasInformacionPage open={modalOpen} handleClose={handleCloseModal} />
    </Box>
  );
};

export default EnlacesInteresComponent;
