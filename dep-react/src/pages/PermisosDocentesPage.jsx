import { useState } from "react";
import SolicitudPermiso from "../component/SolicitudPermiso";
import ListaPermisoDocente from "../component/ListaPermisoDocente";
import { Container, Button, Box } from "@mui/material";

const PermisosDocentesPage = () => {
  const [activeTab, setActiveTab] = useState();

  return (
    <>
      <Container sx={{ marginBottom: 5 }}>
        <Box
          display="flex"
          justifyContent="center" // Center the buttons
          mb={2}
          mt={4} // Add top margin
        >
          <Button
            variant={activeTab === "solicitud" ? "contained" : "outlined"}
            onClick={() => setActiveTab("solicitud")}
            sx={{ fontSize: "1.2rem", marginRight: 2 }} // Increase font size and add right margin
          >
            Solicitar Permiso
          </Button>
          <Button
            variant={activeTab === "lista" ? "contained" : "outlined"}
            onClick={() => setActiveTab("lista")}
            sx={{ fontSize: "1.2rem" }} // Increase font size
          >
            Mis Permisos
          </Button>
        </Box>

        {activeTab === "solicitud" ? (
          <SolicitudPermiso />
        ) : (
          <ListaPermisoDocente />
        )}
      </Container>
    </>
  );
};

export default PermisosDocentesPage;
