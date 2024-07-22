/*EventosPage*/
import EventosComponent from "../component/EventosComponent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import "../css/sectionHeading.css";
import Paper from "@mui/material/Paper";
import CalendarComponent from "../component/CalendarComponent";

import { useEffect, useState } from "react";
import axios from "axios";
import { base } from "../api";

const noticiasEventosURL = base + "/api/NoticiasEventos";

const EventosPage = () => {
  const [eventosData, setNotEven] = useState([]);

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
        console.error("Error fetching Noticas:", error);
    }
};

  return (
    <>
      <Container disableGutters >
        <Grid container alignItems="flex-start" >
          <Grid item xs={12} sm={12}>
            <div className="fcen-section-heading">
              <p style={{ fontSize: "30px" }}>Calendario</p>
            </div>
            <Paper elevation={6} sx={{ marginLeft: "16px", marginRight: "16px" }}>
              <CalendarComponent events={eventosData} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12}>
            <div className="fcen-section-heading">
              <p style={{ fontSize: "30px" }}>Eventos</p>
            </div>
            <EventosComponent />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default EventosPage;
