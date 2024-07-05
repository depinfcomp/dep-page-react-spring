//import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ActionAreaCard() {
  return (
    // sx={{ transition: "0.2s", "&:hover": { transform: "scale(1.05)",},}}
    <Card sx={{ maxWidth: 345, transition: "0.2s", '&:hover': { transform: "scale(1.05)" } }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://www.cicerocomunicacion.es/wp-content/uploads/2017/03/Subir-imagenes-gratis-980x515.png"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
