import React from "react";

import { lower } from "../utils";

export default function Highlight({ children, toHighlight }) {
  const regex = new RegExp(`(${toHighlight})`, "i");
  return children.split(regex).map((chunk, index) => {
    if (lower(chunk) === lower(toHighlight)) {
      return <mark key={index}>{chunk}</mark>;
    }
  });
}
