import React from "react"
// import Highlight from "./Highlight"

export default function User(props) {
  return (
    <>
      <p>{`${props.name}`}</p>
      <div>
        <img src={props.image} alt={`${props.name}`} />
      </div>
      <p>{`${props.email}`}</p>
      <hr />
    </>
  )
}
