import React from "react";
import App from "./pages/App";
import ClientProvider from "./stores/client";

function Root() {
  return (
    <ClientProvider>
      <App />
    </ClientProvider>
  );
}

export default Root;
