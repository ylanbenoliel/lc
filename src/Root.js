import React from "react";
import App from "./pages/App";
import ClientProvider from "./stores/client";
import { BrowserRouter as Router } from "react-router-dom";

function Root() {
  return (
    <ClientProvider>
      <Router>
        <App />
      </Router>
    </ClientProvider>
  );
}

export default Root;
