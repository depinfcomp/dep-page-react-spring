import Carousel from 'react-material-ui-carousel';
import Item from './carruselItemComponent';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { base } from "../api";

import { useEffect, useState } from "react";
import axios from "axios";

const noticiasEventosURL = base + "/api/NoticiasEventos";

const NoticiasComponent = () => {

  const [items, setNotEven] = useState([]);

  useEffect(() => {
    fetchNoticiasData();
  }, []);

  const fetchNoticiasData = async () => {
    try {
        const response = await axios.get(`${noticiasEventosURL}/noAuth`);
        const now = new Date();
        
        const eventosDataFilter = response.data.filter(noticia => {
            if (noticia.tipo !== "Evento" && noticia.tipo !== "Noticia" || !noticia.visibleInicio || !noticia.visibleFin) {
                return false;
            }
            
            const visibleInicio = new Date(noticia.visibleInicio);
            const visibleFin = new Date(noticia.visibleFin);
            
            return now >= visibleInicio && now <= visibleFin;
        });

        setNotEven(eventosDataFilter);
    } catch (error) {
        console.error("Error fetching Docentes:", error);
    }
};


  return (
    <Carousel
      navButtonsAlwaysVisible
      NextIcon={<ArrowForwardIos />}
      PrevIcon={<ArrowBackIos />}
    >
      {items.map(item => <Item key={item.id} item={item} />)}
    </Carousel>
  );
}

export default NoticiasComponent;
