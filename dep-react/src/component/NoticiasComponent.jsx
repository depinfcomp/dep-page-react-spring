import Carousel from 'react-material-ui-carousel';
import Item from './carruselItemComponent';
// import { IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { base } from "../api";

/*const items = [
  { id: '1', title: 'congreso', image: '/flayers/Noticias/congreso.png', link: 'https://sco2.org/18ccc/' },
  { id: '3', title: 'Maestrie', image: '/flayers/Noticias/icons_2.png', link: 'https://ejemplo.com/pagina2' },
  { id: '2', title: 'DesarrolloMovil', image: '/flayers/Noticias/aplicaciones_moviles.jpg', link: 'https://www.fadmon.unal.edu.co/fileadmin/user_upload/facultad/proyectos2024/imagenescursos/aplicaciones%20m%C3%B3viles.pdf' },
];*/

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
