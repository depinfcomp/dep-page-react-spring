import "../css/sectionHeading.css";
import { Container, Grid } from "@mui/material";
import ResearchGroupCard from "../component/ResearchGroupCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { base } from "../api";

const InvSemillerosPage = () => {

  const [gruposDeInvestigacion, setSortedCards] = useState([]);

  useEffect(() => {
    fetchInvestigacion();
  }, []);

  const fetchInvestigacion = async () => {
    try {
      const response = await axios.get(`${base}/api/investigacion/noAuth`);

      const filteredCards = response.data.filter((card) => card.tipo === "SEMILLERO");

      setSortedCards(filteredCards);
    } catch (error) {
      console.error("Error fetching SEMILLERO:", error);
    }
  };

  return (
    <>
      <div className="fcen-section-heading">
        <p style={{ fontSize: "60px" }}>Semilleros De Investigación</p>
      </div>
      <Container sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2} justifyContent="center">
          {gruposDeInvestigacion.map((grupo, index) => (
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
              <ResearchGroupCard group={grupo} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};
export default InvSemillerosPage;
