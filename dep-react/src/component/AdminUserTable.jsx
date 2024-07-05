// AdminUserTable.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { DataGrid } from '@mui/x-data-grid'; // Import DataGrid
import { base } from "../api";

const AdminUserTable = ({ users, setUsers }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const baseURL = base ;

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No hay token disponible");
        return;
      }
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setCurrentUser(decodedToken.sub);
    };

    fetchCurrentUser();
  }, []);

  const handleDeleteUser = async (userA) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No hay token disponible");
      return;
    }
    try {
      if (userA.role === "DOCE") {
        await axios.delete(`${baseURL}/user/dir/${userA.username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      await axios.delete(`${baseURL}/user/dir/${userA.username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter(user => user.username !== userA.username));
      enqueueSnackbar('Usuario eliminado con éxito', { variant: 'success' });
    } catch (error) {
      console.error("Error deleting user:", error);
      enqueueSnackbar('Error al eliminar el usuario', { variant: 'error' });
    }
  };

  const columns = [
    { field: 'username', headerName: 'Username', flex: 1 },
    { field: 'role', headerName: 'Role', flex: 1 },
    {
      field: 'eliminar',
      headerName: 'Eliminar',
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleDeleteUser(params.row)}
        >
          Eliminar
        </Button>
      ),
    },
  ];

  const getRowId = (row) => row.username; // Assuming username is unique and can be used as ID

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ fontSize: "2rem" }}>
          Administración de Usuarios
        </Typography>
        <div style={{ height: 400, width: '100%', marginTop: 16 }}>
          <DataGrid
            rows={users.filter(user => user.username !== currentUser)}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
            getRowId={getRowId} // Specify the getRowId function
          />
        </div>
      </Box>
    </Container>
  );
};

export default AdminUserTable;
