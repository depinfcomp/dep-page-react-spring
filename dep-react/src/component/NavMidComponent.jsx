import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import BookIcon from "@mui/icons-material/Book";
import BackupIcon from "@mui/icons-material/Backup";
import InfoIcon from "@mui/icons-material/Info";
import EventIcon from "@mui/icons-material/Event";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import LogoutIcon from "@mui/icons-material/Logout";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LinkIcon from "@mui/icons-material/Link";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NavMidComponent = ({ isAuthenticated, setIsAuthenticated }) => {
  const navLinks = [
    { title: "Inicio", path: "/", icon: <HomeIcon /> },
    { title: "Docentes", path: "/docentes", icon: <SchoolIcon /> },
    { title: "Programas académicos", path: "/programas", icon: <BookIcon /> },
    { title: "Investigación", path: "/investigacion", icon: <BackupIcon /> },
    { title: "Sobre El Departamento", path: "/sobre-departamento", icon: <InfoIcon /> },
    { title: "Eventos y Charlas", path: "/eventos", icon: <EventIcon /> },
  ];

  const protectedNavLinks = [
    { title: "Perfil", path: "/perfil", icon: <AdminPanelSettingsIcon /> },
  ];

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const userHasRole = (roles) => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      return roles.includes(decodedToken.role);
    }
    return false;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const renderNavLinks = (links) =>
    links.map((item) => (
      <ListItem button component="a" href={item.path} key={item.title}>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.title} />
      </ListItem>
    ));

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#2459B1" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            size="large"
            onClick={() => setOpen(true)}
            sx={{ display: { xs: "flex", sm: "none" } }}
            edge="start"
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {/* News */}
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navLinks.map((item) => (
              <Button
                color="inherit"
                key={item.title}
                component="a"
                href={item.path}
                startIcon={item.icon}
                sx={{ fontSize: 16, padding: "10px 20px" }}
              >
                {item.title}
              </Button>
            ))}
            {isAuthenticated &&
              protectedNavLinks.map((item) => (
                <Button
                  color="inherit"
                  key={item.title}
                  component="a"
                  href={item.path}
                  startIcon={item.icon}
                  sx={{ fontSize: 16, padding: "10px 20px" }}
                >
                  {item.title}
                </Button>
              ))}
            {isAuthenticated && userHasRole(["DIR"]) && (
              <Button
                color="inherit"
                component="a"
                href="/gestion-permisos"
                startIcon={<LockOpenIcon />}
                sx={{ fontSize: 16, padding: "10px 20px" }}
              >
                Permisos Docentes
              </Button>
            )}
            {isAuthenticated && userHasRole(["DIR", "AUX", "ADMIN"]) && (
              <Button
                color="inherit"
                component="a"
                href="/noti-even-admin"
                startIcon={<AddToQueueIcon />}
                sx={{ fontSize: 16, padding: "10px 20px" }}
              >
                Admin Noticias y Eventos
              </Button>
            )}
            {isAuthenticated && userHasRole(["DIR", "AUX", "ADMIN"]) && (
              <Button
                color="inherit"
                component="a"
                href="/enlaces-interes"
                startIcon={<LinkIcon />}
                sx={{ fontSize: 16, padding: "10px 20px" }}
              >
                Admin Enlaces Interes
              </Button>
            )}
            {isAuthenticated && userHasRole(["DOCE"]) && (
              <Button
                color="inherit"
                component="a"
                href="/permisos"
                startIcon={<LockIcon />}
                sx={{ fontSize: 16, padding: "10px 20px" }}
              >
                Solicitar Permiso
              </Button>
            )}
            {isAuthenticated && userHasRole(["DIR", "ADMIN"]) && (
              <Button
                color="inherit"
                component="a"
                href="/UserAdmin"
                startIcon={<HowToRegIcon />}
                sx={{ fontSize: 16, padding: "10px 20px" }}
              >
                Admin Usuario
              </Button>
            )}
            {isAuthenticated && userHasRole(["DIR", "ADMIN"]) && (
              <Button
                color="inherit"
                component="a"
                href="/DoceAdmin"
                startIcon={<HowToRegIcon />}
                sx={{ fontSize: 16, padding: "10px 20px" }}
              >
                Admin Docentes
              </Button>
            )}
            {isAuthenticated && (
              <Button
                color="inherit"
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
                sx={{ fontSize: 16, padding: "10px 20px" }}
              >
                Cerrar sesión
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {/* </Paper> */}

      <Drawer
        open={open}
        anchor="left"
        onClose={() => setOpen(false)}
        sx={{ display: { xs: "flex", sm: "none" } }}
      >
        <List sx={{ width: 250 }}>
          {renderNavLinks(navLinks)}
          {isAuthenticated && renderNavLinks(protectedNavLinks)}
          {isAuthenticated && userHasRole(["DIR"]) && (
            <ListItem button component="a" href="/gestion-permisos">
              <ListItemIcon><LockOpenIcon /></ListItemIcon>
              <ListItemText primary="Permisos Docentes" />
            </ListItem>
          )}
          {isAuthenticated && userHasRole(["DIR", "AUX", "ADMIN"]) && (
            <ListItem button component="a" href="/noti-even-admin">
              <ListItemIcon><AddToQueueIcon /></ListItemIcon>
              <ListItemText primary="Noticias y Eventos" />
            </ListItem>
          )}
          {isAuthenticated && userHasRole(["DIR", "AUX", "ADMIN"]) && (
            <ListItem button component="a" href="/enlaces-interes">
              <ListItemIcon><LinkIcon /></ListItemIcon>
              <ListItemText primary="Admin Enlaces Interes" />
            </ListItem>
          )}
          {isAuthenticated && userHasRole(["DOCE"]) && (
            <ListItem button component="a" href="/permisos">
              <ListItemIcon><LockIcon /></ListItemIcon>
              <ListItemText primary="Solicitar Permiso" />
            </ListItem>
          )}
          {isAuthenticated && userHasRole(["DIR", "ADMIN"]) && (
            <ListItem button component="a" href="/UserAdmin">
              <ListItemIcon><HowToRegIcon /></ListItemIcon>
              <ListItemText primary="Admin Usuario" />
            </ListItem>
          )}
          {isAuthenticated && userHasRole(["DIR", "ADMIN"]) && (
            <ListItem button component="a" href="/DoceAdmin">
              <ListItemIcon><HowToRegIcon /></ListItemIcon>
              <ListItemText primary="Admin Docentes" />
            </ListItem>
          )}
          {isAuthenticated && (
            <ListItem button onClick={handleLogout}>
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText primary="Cerrar sesión" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default NavMidComponent;
