import React from "react";

export default function User(props) {
  return (
    <>
      <p>{`${props.firstname} ${props.lastname}`}</p>
      <div>
        <img src={props.image} alt={`${props.firstname} ${props.lastname}`} />
      </div>
      <p>{props.email}</p>
      <hr />
    </>
  );
}
