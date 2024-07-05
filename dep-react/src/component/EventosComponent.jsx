/*EventosComponent*/
import CardNoticiasComponent from "../component/CardNoticiasComponent";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import axios from "axios";
import { base } from "../api";

const noticiasEventosURL = base + "/api/NoticiasEventos";

const EventosComponent = () => {
  
  const [noticiasData, setNotEven] = useState([]);

  useEffect(() => {
    fetchNoticiasData();
  }, []);

  const fetchNoticiasData = async () => {
    try {
        const response = await axios.get(`${noticiasEventosURL}/noAuth`);
        const now = new Date();
        
        const eventosDataFilter = response.data.filter(noticia => {
            if (noticia.tipo !== "Evento" || !noticia.visibleInicio || !noticia.visibleFin) {
                return false;
            }
            
            const visibleInicio = new Date(noticia.visibleInicio);
            const visibleFin = new Date(noticia.visibleFin);
            
            return now >= visibleInicio && now <= visibleFin;
        });

        setNotEven(eventosDataFilter);
    } catch (error) {
        console.error("Error fetching NoticiasComponent:", error);
    }
};



  return (
    <Grid container justifyContent="center">
      {noticiasData.map((noticia) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          key={noticia.id}
        >
          <CardNoticiasComponent
            imageSrc={noticia.linkImagen}
            title={noticia.titulo}
            buttonText="Más información"
            buttonLink={noticia.linkInformacion}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default EventosComponent;
