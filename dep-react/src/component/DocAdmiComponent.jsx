import CardCustom from "./CardCustom";
import "./card.css";
import { useEffect, useState } from "react";
import SearchBarComponent from "./SearchBarComponent";
import { Container, Grid, Box, Modal, Typography, Button, Paper } from "@mui/material";
import axios from "axios";
import { base } from "../api";

const docenteURL = base + "/api/docentes";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const containerStyle = {
  marginBottom: '30px', 
};

const Docentes = () => {
  const [sortedCards, setSortedCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [isFirstOpen, setIsFirstOpen] = useState(true);

  useEffect(() => {
    fetchDocentes();
  }, []);

  const fetchDocentes = async () => {
    try {
      const response = await axios.get(`${docenteURL}/noAuth`);
      setSortedCards(response.data);
    } catch (error) {
      console.error("Error fetching Docentes:", error);
    }
  };

  const handleOpen = (url, title) => {
    if (isFirstOpen) {
      window.open(url, "_blank");
      setIsFirstOpen(false);
    } else {
      setSelectedUrl(url);
      setSelectedTitle(title);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUrl(null);
    setSelectedTitle("");
  };

  const filteredCards = sortedCards.filter(
    (card) =>
      (card.posicion === "Docente" || !card.posicion) &&
      card.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  const rows = [];
  for (let i = 0; i < filteredCards.length; i += 4) {
    rows.push(filteredCards.slice(i, i + 4));
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
      }}
      style={containerStyle}
    >
      <Box
        sx={{
          marginBottom: 4,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <SearchBarComponent
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </Box>
      <Grid container spacing={2} sx={{ margin: "auto", width: "100%" }}>
        {rows.map((row, rowIndex) => (
          <Grid container spacing={2} key={rowIndex}>
            {row.map((card, cardIndex) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={cardIndex}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <CardCustom
                  title={card.nombre}
                  text={"-"}
                  url={card.cvlac}
                  email={card.correo}
                  onViewCurriculum={() => handleOpen(card.cvlac, card.nombre)}
                  sx={{ width: "100%", height: "100%" }} // Define the width and height of the card here
                />
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>

      <Modal open={open} onClose={handleClose}>
        <Paper sx={style}>
          <Typography variant="h6" component="h2">
            {selectedTitle}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <iframe
              src={selectedUrl}
              title={selectedTitle}
              width="100%"
              height="400px"
              frameBorder="0"
            />
          </Box>
          <Box sx={{ mt: 2, textAlign: "right" }}>
            <Button
              onClick={() => window.open(selectedUrl, "_blank")}
              variant="contained"
              color="primary"
              sx={{ mr: 2 }}
            >
              Abrir en nueva pestaña
            </Button>
            <Button onClick={handleClose} variant="contained" color="secondary">
              Cerrar
            </Button>
          </Box>
        </Paper>
      </Modal>
    </Container>
  );
};

const Administrativos = () => {
  const [sortedCards, setSortedCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [isFirstOpen, setIsFirstOpen] = useState(true);

  useEffect(() => {
    fetchAdministrativos();
  }, []);

  const fetchAdministrativos = async () => {
    try {
      const response = await axios.get(`${docenteURL}/noAuth`);
      setSortedCards(response.data);
    } catch (error) {
      console.error("Error fetching Administrativos:", error);
    }
  };

  const handleOpen = (url, title) => {
    if (isFirstOpen) {
      window.open(url, "_blank");
      setIsFirstOpen(false);
    } else {
      setSelectedUrl(url);
      setSelectedTitle(title);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUrl(null);
    setSelectedTitle("");
  };

  const filteredCards = sortedCards.filter(
    (card) =>
      card.posicion !== "Docente" &&
      card.posicion != null &&
      card.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  const rows = [];
  for (let i = 0; i < filteredCards.length; i += 4) {
    rows.push(filteredCards.slice(i, i + 4));
  }

  const handleOpenInNewTab = (url) => {
    window.open(url, "_blank");
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        
      }}
    >
      <Grid container spacing={2} sx={{ margin: "auto", width: "100%" }}>
        {rows.map((row, rowIndex) => (
          <Grid container spacing={2} key={rowIndex}>
            {row.map((card, cardIndex) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                key={cardIndex}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <CardCustom
                  title={card.nombre}
                  text={card.posicion}
                  url={card.cvlac}
                  email={card.correo}
                  onViewCurriculum={() => handleOpen(card.cvlac, card.nombre)}
                  sx={{ width: "100%", height: "100%" }} // Define the width and height of the card here
                />
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>

      <Modal open={open} onClose={handleClose}>
        <Paper sx={style}>
          <Typography variant="h6" component="h2">
            {selectedTitle}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <iframe
              src={selectedUrl}
              title={selectedTitle}
              width="100%"
              height="400px"
              frameBorder="0"
            />
          </Box>
          <Box sx={{ mt: 2, textAlign: "right" }}>
            <Button
              onClick={handleClose}
              variant="contained"
              color="secondary"
            >
              Cerrar
            </Button>
            <Button
              onClick={() => handleOpenInNewTab(selectedUrl)}
              variant="contained"
              color="primary"
              sx={{ ml: 1 }}
            >
              Abrir en nueva pestaña
            </Button>
          </Box>
        </Paper>
      </Modal>
    </Container>
  );
};

export { Docentes, Administrativos };
