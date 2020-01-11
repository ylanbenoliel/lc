import React from "react";
import ClientProvider from "./stores/client";
import Routes from "./routes";

export default function App() {
  return (
    <ClientProvider>
      <Routes />
    </ClientProvider>
  );
}
