
import NavMidComponent from "../component/NavMidComponent";
import NavTopComponent from "../component/NavTopComponent";
import "../css/sectionHeading.css";
import { Container, Grid } from "@mui/material";
import ResearchGroupCard from "../component/ResearchGroupCard";

const InvGruposPage = () => {
  const gruposDeInvestigacion = [
    {
      name: "GAIA",
      fullname: "Grupo De Ambientes Inteligentes Adaptativos",
      url: "https://gaia.manizales.unal.edu.co/grupo_inv/grupo-de-investigacion-en-ambientes-inteligentes-adaptativos-gaia/",
      grupolac: "https://scienti.minciencias.gov.co/gruplac/jsp/visualiza/visualizagr.jsp?nro=00000000001906",
      image: "/Logos/gaia.png",
    },
    {
      name: "TGTI",
      fullname: "Teoría y Gestión de Tecnologías de Información",
      url: "https://tgtiunal.org/",
      grupolac: "https://scienti.minciencias.gov.co/gruplac/jsp/visualiza/visualizagr.jsp?nro=00000000009853",
      image: "/Logos/tgti.png",
    },
    {
      name: "Emprendimiento Empresarial",
      fullname: "Emprendimiento Empresarial",
      url: "",
      grupolac: "https://scienti.minciencias.gov.co/gruplac/jsp/visualiza/visualizagr.jsp?nro=00000000016635",
      image: "",
    },
  ];

  return (
    <>
      {/* <NavTopComponent />
      <NavMidComponent /> */}
      <div className="fcen-section-heading">
        <p style={{ fontSize: "60px" }}>Grupos De Investigación</p>
      </div>

      <Container sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2} justifyContent="center">
          {gruposDeInvestigacion.map((grupo, index) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={index} display="flex" justifyContent="center">
              <ResearchGroupCard group={grupo} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default InvGruposPage;


