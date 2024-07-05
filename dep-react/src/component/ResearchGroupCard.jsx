import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import InfoIcon from '@mui/icons-material/Info';
import { useSnackbar } from 'notistack';

const ResearchGroupCard = ({ group }) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleButtonClick = (url, message) => {
    if (!url) {
      enqueueSnackbar(message, { variant: "error" });
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        minWidth: 250,
        maxWidth: 250,
        minHeight: 150,
        backgroundColor: "lightgray",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          sx={{ width: 150, }}
          image={group.image || "/Logos/broken-image.png"}
          alt={group.name}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          }}
        >
          <CardContent>
            <Typography variant="h6" component="div">
              {group.name}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {group.fullname}
            </Typography>
            <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                startIcon={<LanguageIcon />}
                onClick={() =>
                  handleButtonClick(
                    group.url,
                    "URL del sitio del grupo no disponible"
                  )
                }
              >
                Sitio del Grupo
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="secondary"
                startIcon={<InfoIcon />}
                onClick={() =>
                  handleButtonClick(
                    group.grupolac,
                    "URL de GrupLAC no disponible"
                  )
                }
              >
                GrupLAC
              </Button>
            </Box>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default ResearchGroupCard;
