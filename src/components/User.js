import React from "react";
import "../styles/user.css";

export default function User(props) {
  return (
    <tr>
      <td>{`${props.id}`}</td>
      <td>
        <img src={props.image} alt={`${props.name}`} />
      </td>
      <td>{`${props.name}`}</td>
      <td>{`${props.email}`}</td>
    </tr>
  );
}
