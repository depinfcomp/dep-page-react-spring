import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SnackbarProvider } from "notistack";

const styles = {
  snackbar: {
    fontSize: '18px', 
  },
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SnackbarProvider 
      maxSnack={3} 
      autoHideDuration={3000} 
      style={styles.snackbar} 
    >
      <App />
    </SnackbarProvider>
  </React.StrictMode>
);
