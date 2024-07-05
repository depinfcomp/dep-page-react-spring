import {
    Container,
    Grid,
    Card,
    CardActionArea,
    CardMedia,
  } from "@mui/material";
  import NavMidComponent from "../component/NavMidComponent";
  import NavTopComponent from "../component/NavTopComponent";
  import "../css/sectionHeading.css";
  import "../css/investigacionPage.css";
  import { useNavigate } from "react-router-dom";
  
  const InvestigacionPage = () => {
    const navigate = useNavigate();
  
    return (
      <>
        <div style={{ maxWidth: "100%", overflowX: "hidden" }}>
          {/* <NavTopComponent />
          <NavMidComponent /> */}
        </div>
        <Container sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={4} display="flex" justifyContent="center">
              <Card className="investigacion-card" sx={{ width: 290, height: 400 }}>
                <CardActionArea onClick={() => navigate('/grupos')}>
                  <div className="fcen-section-heading">
                    <p style={{ fontSize: "20px" }}>Grupos De Investigación</p>
                  </div>
                  <CardMedia
                    component="img"
                    height="300"
                    image="/public/svg/grupo.svg"
                    alt="Grupos de investigacion"
                  />
                </CardActionArea>
              </Card>
            </Grid>
  
            <Grid item xs={12} sm={6} md={4} lg={4} display="flex" justifyContent="center">
              <Card className="investigacion-card" sx={{ width: 290, height: 400 }}>
                <CardActionArea onClick={() => navigate('/semilleros')}>
                  <div className="fcen-section-heading">
                    <p style={{ fontSize: "20px" }}>Semilleros De Investigación</p>
                  </div>
                  <CardMedia
                    component="img"
                    height="300"
                    image="/public/svg/semillero.svg"
                    alt="Semilleros De Investigación"
                  />
                </CardActionArea>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4} lg={4} display="flex" justifyContent="center">
              <Card className="investigacion-card" sx={{ width: 290, height: 400 }}>
                <CardActionArea onClick={() => navigate('/laboratorios')}>
                  <div className="fcen-section-heading">
                    <p style={{ fontSize: "20px" }}>Laboratorios De Investigación</p>
                  </div>
                  <CardMedia
                    component="img"
                    height="290"
                    
                    image="/public/svg/red-en-la-nube.svg"
                    alt="Laboratorios de investigacion"
                  />
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  };
  
  export default InvestigacionPage;
  