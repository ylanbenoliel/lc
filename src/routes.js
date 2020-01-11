import React from "react";
import Main from "./pages/Main";
import { BrowserRouter, Route } from "react-router-dom";

export default function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Main} />
    </BrowserRouter>
  );
}
