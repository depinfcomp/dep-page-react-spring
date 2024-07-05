import PropTypes from 'prop-types';
import { Paper, Button, Box } from '@mui/material';

function Item({ item }) {
  return (
    <Paper>
      <Box sx={{ position: 'relative' }}>
        <img src={item.linkImagen} alt={item.titulo} style={{ width: '100%' }} />
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
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
  }).isRequired,
};

export default Item;
