import {
  Container,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Box,
} from "@mui/material";
import NavMidComponent from "../component/NavMidComponent";
import NavTopComponent from "../component/NavTopComponent";
import { useNavigate } from "react-router-dom";

const ProgramasPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div style={{ maxWidth: "100%", overflowX: "hidden" }}>
        {/* <NavTopComponent />
        <NavMidComponent /> */}
      </div>

      <Container sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            display="flex"
            justifyContent="center"
          >
            <Card
              className="investigacion-card"
              sx={{ width: 290, height: 400 }}
            >
              <CardActionArea onClick={() => navigate("/ADSI")}>
                <Box
                  className="fcen-section-heading"
                  display="flex"
                  justifyContent="center"
                >
                  <p style={{ fontSize: "20px" }}>Pregrados</p>
                </Box>
                <CardMedia
                  component="img"
                  height="300"
                  image="/public/svg/pregrado.svg"
                  alt="Pregrados"
                />
              </CardActionArea>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            display="flex"
            justifyContent="center"
          >
            <Card
              className="investigacion-card"
              sx={{ width: 290, height: 400 }}
            >
              <CardActionArea onClick={() => navigate("/posgrados")}>
                <Box
                  className="fcen-section-heading"
                  display="flex"
                  justifyContent="center"
                >
                  <p style={{ fontSize: "20px" }}>Posgrados</p>
                </Box>
                <CardMedia
                  component="img"
                  height="300"
                  image="/public/svg/posgrado.svg"
                  alt="Posgrados"
                />
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ProgramasPage;
