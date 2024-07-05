//import React from 'react';
//import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function SearchBarComponent({ searchTerm, setSearchTerm }) {
  return (
    <div className="search-bar mb-3">
      <TextField 
        id="outlined-search" 
        label="Buscar docente" 
        type="search" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          '& .MuiInputBase-input': {
            fontSize: '1.25rem', // tamaño de la letra
            fontWeight: 'bold' // negrilla
          },
          '& .MuiInputLabel-root': {
            fontSize: '1.25rem', // tamaño de la letra del label
            fontWeight: 'bold' // negrilla del label
          }
        }}
      />
      {/* <input
        type="text"
        className="form-control"
        placeholder="Buscar docente"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      /> */}
    </div>
  );
}

export default SearchBarComponent;
