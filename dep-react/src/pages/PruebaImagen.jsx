import { useState } from "react";
import axios from "axios";
import { Button, Box, Typography, Container, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { base } from "../api";

const theme = createTheme();

const PruebaImagen = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageName, setImageName] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const token = localStorage.getItem("token");
  const cargar = base + "/upload/image";
  const consumir = base + "/upload/image/";

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleImageNameChange = (event) => {
    setImageName(event.target.value);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      enqueueSnackbar("Please select a file to upload.", { variant: "warning" });
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(cargar, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
      });
      enqueueSnackbar(response.data, { variant: "success" });
    } catch (error) {
      enqueueSnackbar("File upload failed.", { variant: "error" });
    }
  };

  const handleFetchImage = async () => {
    if (!imageName) {
      enqueueSnackbar("Please enter an image name.", { variant: "warning" });
      return;
    }

    try {
      const response = await axios.get(consumir + imageName, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        responseType: "blob",
      });
      const url = URL.createObjectURL(response.data);
      setImageSrc(url);
    } catch (error) {
      enqueueSnackbar("Failed to fetch image.", { variant: "error" });
    }
  };

  const handleDeleteImage = async () => {
    if (!imageName) {
      enqueueSnackbar("Please enter an image name.", { variant: "warning" });
      return;
    }

    try {
      const response = await axios.delete(consumir + imageName, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      enqueueSnackbar(response.data, { variant: "success" });
      setImageSrc(null); // Clear the displayed image if deletion is successful
    } catch (error) {
      enqueueSnackbar("Failed to delete image.", { variant: "error" });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Cargar y Solicitar Imágenes
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <input type="file" onChange={handleFileChange} />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleUpload}
            >
              Subir Imagen
            </Button>
          </Box>
          <TextField
            fullWidth
            label="Nombre de la Imagen"
            value={imageName}
            onChange={handleImageNameChange}
            sx={{ mt: 3 }}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleFetchImage}
          >
            Solicitar Imagen
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="error"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleDeleteImage}
          >
            Eliminar Imagen
          </Button>
          {imageSrc && (
            <Box
              component="img"
              sx={{ mt: 3 }}
              src={imageSrc}
              alt="Fetched Image"
            />
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default PruebaImagen;
