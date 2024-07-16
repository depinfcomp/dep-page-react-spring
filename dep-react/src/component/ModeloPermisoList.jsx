/*ModeloPermisoLis*/

import { useEffect, useState } from "react";
import { getModeloPermisos } from "../api";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "axios";
import { base } from "../api";

const ModeloPermisoList = ({ onSelect }) => {
  const [modelos, setModelos] = useState([]);
  const [selectedModelo, setSelectedModelo] = useState("");
  const baseURL = base + "/api/modeloPermisos";

  useEffect(() => {
    const fetchModelos = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${baseURL}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setModelos(response.data);
      } catch (error) {
        console.error("Error fetching modelos de permiso:", error);
      }
    };

    fetchModelos();
  }, []);

  const handleChange = (event) => {
    const selected = event.target.value;
    setSelectedModelo(selected);
    onSelect(selected);
  };

  return (
    <FormControl
      fullWidth
      sx={{
        marginBottom: 5,
        marginTop: 0.9,
        width: {
          xs: '100%',
          sm: '80%', 
          md: '60%', 
          lg: '50%', 
          xl: '40%', 
        },
      }}
    >
      <InputLabel id="modelo-select-label" sx={{ fontSize: "1.5rem" }}>
        Modelos de Permiso
      </InputLabel>
      <Select
        labelId="modelo-select-label"
        id="modelo-select"
        value={selectedModelo}
        label="Modelo de Permiso"
        onChange={handleChange}
      >
        {modelos.map((modelo) => (
          <MenuItem key={modelo.idModeloPermiso} value={modelo} sx={{ fontSize: "1.5rem" }}>
            {modelo.nombreModelo}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ModeloPermisoList;
