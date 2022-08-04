import React from "react";

export default function Score(props) {

  return <li className="scorelist" >
    <ul>
      <li>{props.name} </li>
      <li>{props.score} </li>
      <li>{props.date} </li>
    </ul>
  </li>;
}