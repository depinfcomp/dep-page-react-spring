/*DocenteList*/

import { useEffect, useState } from 'react';
import { getDocentes } from '../api';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const DocenteList = ({ onSelect }) => {
  const [docentes, setDocentes] = useState([]);
  const [selectedDocente, setSelectedDocente] = useState('');

  useEffect(() => {
    const fetchDocentes = async () => {
      try {
        const response = await getDocentes();
        setDocentes(response.data);
      } catch (error) {
        console.error('Error fetching docentes:', error);
      }
    };

    fetchDocentes();
  }, []);

  const handleChange = (event) => {
    const selected = event.target.value;
    setSelectedDocente(selected);
    onSelect(selected);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="docente-select-label">Docentes</InputLabel>
      <Select
        labelId="docente-select-label"
        id="docente-select"
        value={selectedDocente}
        label="Docente"
        onChange={handleChange}
      >
        {docentes.map((docente) => (
          <MenuItem key={docente.idDocente} value={docente}>
            {docente.nombre}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DocenteList;
