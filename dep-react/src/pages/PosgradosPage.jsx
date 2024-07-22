import "../css/sectionHeading.css";
import { Container, Grid } from "@mui/material";
import ActionAreaCard from "../component/CardPosgrados";

import { useEffect, useState } from "react";
import axios from "axios";
import { base } from "../api";

const PosgradosPage = () => {
  const [gruposDePosgrado, setSortedCards] = useState([]);

  useEffect(() => {
    fetchProgramas();
  }, []);

  const fetchProgramas = async () => {
    try {
      const response = await axios.get(`${base}/api/programa/noAuth`);

      const filteredCards = response.data.filter(
        (card) => card.tipo === "POSGRADO"
      );

      setSortedCards(filteredCards);
    } catch (error) {
      console.error("Error fetching POSGRADO:", error);
    }
  };

  return (
    <>
      <div className="fcen-section-heading">
        <p style={{ fontSize: "60px" }}>Programas De Posgrado</p>
      </div>

      <Container sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2} justifyContent="center">
          {gruposDePosgrado.map((grupo, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={4}
              key={index}
              display="flex"
              justifyContent="center"
            >
              <ActionAreaCard group={grupo} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default PosgradosPage;
