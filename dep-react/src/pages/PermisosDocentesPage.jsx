import { useState } from "react";
import SolicitudPermiso from "../component/SolicitudPermiso";
import ListaPermisoDocente from "../component/ListaPermisoDocente";
import { Container, Button, Box } from "@mui/material";

const PermisosDocentesPage = () => {
  const [activeTab, setActiveTab] = useState(null);

  return (
    <>
      <Container sx={{ marginBottom: 5 }}>
        <Box
          display="flex"
          justifyContent="center" 
          mb={2}
          mt={4} 
        >
          <Button
            variant={activeTab === "solicitud" ? "contained" : "outlined"}
            onClick={() => setActiveTab("solicitud")}
            sx={{ fontSize: "1.2rem", marginRight: 2 }} 
          >
            Solicitar Permiso
          </Button>
          <Button
            variant={activeTab === "lista" ? "contained" : "outlined"}
            onClick={() => setActiveTab("lista")}
            sx={{ fontSize: "1.2rem" }} 
          >
            Mis Permisos
          </Button>
        </Box>

        {activeTab === "solicitud" && <SolicitudPermiso />}
        {activeTab === "lista" && <ListaPermisoDocente />}
      </Container>
    </>
  );
};

export default PermisosDocentesPage;
