/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { createContext, useState } from "react";

export const ClientContext = createContext([]);

export default function client(props) {
  const [userInfo, setUserInfo] = useState([]);

  return (
    <ClientContext.Provider value={{ userInfo, setUserInfo }}>
      {props.children}
    </ClientContext.Provider>
  );
}
