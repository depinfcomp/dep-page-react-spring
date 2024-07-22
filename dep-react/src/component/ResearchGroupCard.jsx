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
import { base } from "../api";
import axios from "axios";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const ResearchGroupCard = ({ group }) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleButtonClick = (url, message) => {
    if (!url) {
      enqueueSnackbar(message, { variant: "error" });
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const consumir = base + "/upload/image/";
  const [imagenVer, setImagenVer] = useState(null);

  const handleFetchImage = async () => {
    try {// eslint-disable-next-line react/prop-types
      const response = await axios.get(consumir + group.image, {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps, react/prop-types
  }, [group.image]);

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
          image={imagenVer || "/Logos/broken-image.png"}
          // eslint-disable-next-line react/prop-types
          alt={group.nombre}
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
              {// eslint-disable-next-line react/prop-types
              group.nombre}
            </Typography>
            <Typography variant="body3" color="textSecondary">
              {// eslint-disable-next-line react/prop-types
              group.fullname}
            </Typography>
            <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
              {// eslint-disable-next-line react/prop-types
              group.tipo === "GRUPO" && (
                <>
                  <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    startIcon={<LanguageIcon />}
                    onClick={() =>
                      handleButtonClick(
                        // eslint-disable-next-line react/prop-types
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
                        // eslint-disable-next-line react/prop-types
                        group.grupolac,
                        "URL de GrupLAC no disponible"
                      )
                    }
                  >
                    GrupLAC
                  </Button>
                </>
              )}
              {// eslint-disable-next-line react/prop-types
              group.tipo === "SEMILLERO" && (
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  startIcon={<InfoIcon />}
                  onClick={() =>
                    handleButtonClick(
                      // eslint-disable-next-line react/prop-types
                      group.url,
                      "URLno disponible"
                    )
                  }
                >
                  Más Información
                </Button>
              )}
              {// eslint-disable-next-line react/prop-types
              group.tipo === "LABORATORIO" && (
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  startIcon={<InfoIcon />}
                  onClick={() =>
                    handleButtonClick(
                      // eslint-disable-next-line react/prop-types
                      group.url,
                      "URLno disponible"
                    )
                  }
                >
                  Más Información
                </Button>
              )}
            </Box>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default ResearchGroupCard;
