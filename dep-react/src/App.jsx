import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Main from "./pages/MainPage.jsx";
import HeadComponent from "./component/HeadComponent";
import Footer from "./component/FooterComponent";
import NoticiasPage from "./pages/NoticiasPage.jsx";
import DocentesPage from "./pages/DocentesPage.jsx";
import ProgramasPage from "./pages/ProgramasPage.jsx";
import EventosPage from "./pages/EventosPage.jsx";
import InvestigacionPage from "./pages/InvestigacionPage.jsx";
import Grupos from "./pages/InvGruposPage.jsx";
import Semilleros from "./pages/InvSemillerosPage.jsx";
import Laboratorios from "./pages/InvLaboratoriosPage.jsx";
import PermisosDocentesPage from "./pages/PermisosDocentesPage.jsx";
import GestionPermisosPage from "./pages/GestionPermisosPage.jsx";
import MaterialDidactico from "./pages/MaterialDidactico.jsx";
import NotiEvebAdmin from "./pages/NotiEvenAdminPage.jsx";
import SobreDepPage from "./pages/SobreDepPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProtectedRoute from "./component/AUTH/ProtectedRoute.jsx";
import GuestRoute from "./component/AUTH/GuestRoute.jsx";
import PerfilPage from "./pages/PerfilPage.jsx";
import EnlacesInteresPage from "./pages/EnlacesInteresAdminPage.jsx";
import DoceAdminPage from "./pages/DoceAdminPage.jsx";
import UserAdminPage from "./pages/UserAdminPage.jsx";
import GeneralInfo from "./component/GeneralInfo";
import PosgradosPage from "./pages/PosgradosPage.jsx";
import PregradosPage from "./pages/PregradosPage.jsx";
import NavTopComponent from "./component/NavTopComponent";
import NavMidComponent from "./component/NavMidComponent";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import avatarImage from "./assets/imagenes/avatar.jpg";
import MasInformacionPage from "./pages/MasInformacionPage.jsx";
import FloatingButton from "./component/FloatingButton.jsx";
import PruebaImagen from "./pages/PruebaImagen.jsx";
import AdmiInvestigacionPage from "./pages/AdmiInvestigacionPage.jsx";
import AdminProgramasPage from "./pages/AdminProgramasPage.jsx";
import AdminMaterialDidacticopage from "./pages/AdminMaterialDidacticoPage.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const adminRoutes = [
    "/login",
    "/permisos",
    "/gestion-permisos",
    "/noti-even-admin",
    "/UserAdmin",
    "/perfil",
    "/enlaces-interes",
    "/DoceAdmin",
    "/admi-investigacion"
  ];

  return (
    <BrowserRouter>
      <HeadComponent />
      <NavTopComponent />
      <NavMidComponent
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <Routes>
        <Route index element={<Main />} />
        <Route path="/docentes" element={<DocentesPage />} />
        <Route path="/noticias" element={<NoticiasPage />} />
        <Route path="/programas" element={<ProgramasPage />} />
        <Route path="/eventos" element={<EventosPage />} />
        <Route path="/investigacion" element={<InvestigacionPage />} />
        
        <Route path="/grupos" element={<Grupos />} />
        <Route path="/semilleros" element={<Semilleros />} />
        <Route path="/laboratorios" element={<Laboratorios />} />
        
        <Route path="/MaterialDidactico" element={<MaterialDidactico />} />
        <Route path="/sobre-departamento" element={<SobreDepPage />} />
        <Route path="/ADSI" element={<GeneralInfo />} />
        <Route path="/posgrados" element={<PosgradosPage />} />
        <Route path="/pregrados" element={<PregradosPage />} />
        <Route path="/mas-informacion" element={<MasInformacionPage />} />
        <Route path="/prueba-imagen" element={<PruebaImagen />} />

        {/* rutas de adminitracion */}
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage setIsAuthenticated={setIsAuthenticated} />
            </GuestRoute>
          }
        />
        <Route
          path="/permisos"
          element={
            <ProtectedRoute roleAllowed={["DOCE"]}>
              <PermisosDocentesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gestion-permisos"
          element={
            <ProtectedRoute roleAllowed={["DIR"]}>
              <GestionPermisosPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/noti-even-admin"
          element={
            <ProtectedRoute roleAllowed={["AUX", "DIR", "ADMIN"]}>
              <NotiEvebAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/UserAdmin"
          element={
            <ProtectedRoute roleAllowed={["DIR", "ADMIN"]}>
              <UserAdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <ProtectedRoute roleAllowed={["DOCE", "DIR", "ADMIN", "AUX"]}>
              <PerfilPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/enlaces-interes"
          element={
            <ProtectedRoute roleAllowed={["DIR", "ADMIN", "AUX"]}>
              <EnlacesInteresPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admi-investigacion"
          element={
            <ProtectedRoute roleAllowed={["DIR", "ADMIN", "AUX"]}>
              <AdmiInvestigacionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admi-programas"
          element={
            <ProtectedRoute roleAllowed={["DIR", "ADMIN", "AUX"]}>
              <AdminProgramasPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admi-materialDidactico"
          element={
            <ProtectedRoute roleAllowed={["DIR", "ADMIN", "AUX"]}>
              <AdminMaterialDidacticopage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/DoceAdmin"
          element={
            <ProtectedRoute roleAllowed={["DIR", "ADMIN"]}>
              <DoceAdminPage /> 
            </ProtectedRoute>
          }
        />
      </Routes>
      <LocationBasedComponents adminRoutes={adminRoutes} />
      <Footer />
    </BrowserRouter>
  );
}

// limitar renderizado botones flotantes
// eslint-disable-next-line react/prop-types
function LocationBasedComponents({ adminRoutes }) {
  const location = useLocation();
  // eslint-disable-next-line react/prop-types
  const isOnAdminRoute = adminRoutes.includes(location.pathname);

  return !isOnAdminRoute ? (
    <>
      <FloatingWhatsApp
        phoneNumber="573108187034"
        accountName="Departamento Informatica"
        statusMessage="Disponible"
        chatMessage="Hola necesitas ayuda?"
        placeholder="Hola necesitas ayuda?"
        avatar={avatarImage}
        allowEsc={true}
        allowClickAway
      />
      <FloatingButton />
    </>
  ) : null;
}

export default App;
