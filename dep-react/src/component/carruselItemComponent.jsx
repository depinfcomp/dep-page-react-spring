import PropTypes from 'prop-types';
import { Paper, Button, Box } from '@mui/material';
import { base } from "../api";
import axios from "axios";
import { useEffect, useState } from "react";

function Item({ item }) {
  const consumir = base + "/upload/image/";
  const [imagenVer, setImagenVer] = useState(null);

  const handleFetchImage = async () => {
    try {
      const response = await axios.get(consumir + item.linkImagen, {
        responseType: "blob", 
      });
      const imagenURL = URL.createObjectURL(response.data);
      setImagenVer(imagenURL); 
    } catch (error) {
      console.error("Error fetching the image:", error);
    }
  };

  useEffect(() => {
    handleFetchImage(); 
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.linkImagen]);

  return (
    <Paper>
      <Box sx={{ position: 'relative' }}>
        {imagenVer && ( // Render image only if imagenVer is not null
          <img src={imagenVer} alt={item.titulo} style={{ width: '100%' }} />
        )}
        <Button
          href={item.linkInformacion}
          variant="contained"
          color="primary"
          sx={{
            position: 'absolute',
            bottom: 16,
            left: 16,
          }}
        >
          Más información
        </Button>
      </Box>
    </Paper>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    linkImagen: PropTypes.string.isRequired,
    titulo: PropTypes.string.isRequired,
    linkInformacion: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
};

export default Item;
