import SolicitudPermiso from "../component/ListPermisos";
import { Container } from "@mui/material";
import NavTopComponent from "../component/NavTopComponent";
import NavMidComponent from "../component/NavMidComponent";

const GestionPermisosPage = () => {
  return (
    <>
    {/* <NavTopComponent />
    <NavMidComponent /> */}
    <Container>
      <SolicitudPermiso />
    </Container>
    </>
  );
};

export default GestionPermisosPage;
