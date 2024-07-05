import NavMidComponent from "../component/NavMidComponent";
import NavTopComponent from "../component/NavTopComponent";
import "../css/sectionHeading.css";
import { Container, Grid } from "@mui/material";
import ResearchGroupCard from "../component/ResearchGroupCardSemillero";

const InvSemillerosPage = () => {
  const gruposDeInvestigacion = [
    {
      name: "Gestion De Contenidos En La Nube",
      fullname: "Gestion De Contenidos En La Nube",
      url: "",
      grupolac:
        "",
      image: "",
    },
    {
      name: "Gamificacion En La Enseñanza De Programacion",
      fullname: "Gamificacion En La Enseñanza De Programacion",
      url: "",
      grupolac:
        "",
      image: "",
    },
    // {
    //   name: "Programacion Competitiva",
    //   fullname: "Programacion Competitiva",
    //   url: "",
    //   grupolac:
    //     "",
    //   image: "",
    // },
    {
      name: "Riesgos En Proyectos De Universidades Publicas",
      fullname: "Riesgos En Proyectos De Universidades Publicas",
      url: "",
      grupolac:
        "",
      image: "",
    },
  ];
  return (
    <>
      {/* <NavTopComponent />
      <NavMidComponent /> */}
      <div className="fcen-section-heading">
        <p style={{ fontSize: "60px" }}>Semilleros De Investigación</p>
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
export default InvSemillerosPage;
