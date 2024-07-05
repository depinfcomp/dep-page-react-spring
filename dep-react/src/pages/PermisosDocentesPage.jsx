/*PermisosDocentesPage*/
import NavTopComponent from "../component/NavTopComponent";
import NavMidComponent from "../component/NavMidComponent";
import SolicitudPermiso from "../component/SolicitudPermiso";
import { Container } from "@mui/material";

const PermisosDocentesPage = () => {
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

export default PermisosDocentesPage;
