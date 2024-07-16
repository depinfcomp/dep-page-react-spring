import Box from "@mui/material/Box";
import NoticiasComponent from "../component/NoticiasComponent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import "../css/sectionHeading.css";
import Paper from "@mui/material/Paper";
import EnlacesInteresComponent from "../component/EnlacesInteresComponent";


const Main = () => {
  return (
    <div style={{ maxWidth: "100%", overflowX: "hidden" }}>
      <Box>
        <Container disableGutters>
          <Grid container spacing={2} columnSpacing={5}>
            <Grid item xs={12} sm={6}>
              <div className="fcen-section-heading">
                <p style={{ fontSize: "30px" }}>Últimas noticias</p>
              </div>
              <Paper elevation={5} sx={{ margin: "20px" }}>
                <NoticiasComponent />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="fcen-section-heading">
                <p style={{ fontSize: "30px" }}>Enlaces Interes</p>
              </div>
              <div>
                <EnlacesInteresComponent />
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
    </div>
  );
};

export default Main;
