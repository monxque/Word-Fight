import React, { useEffect, useState } from "react";
import Monsters from "./Monsters";

export default function MonstersMove(props) {

  const [X, setX] = useState(Math.random() * 21 + 0.5);
  const [Y, setY] = useState(-1);
  const [moveSpeed, setMoveSpeed] = useState(2);

  //set monster move downwards according to time
  useEffect(() => {
    if (props.timeRunning) {
      setX(randomX(X));
      if (Y < 18) {
        setY(moveSpeed + Y);
      }
      if (Y === 19) {
        props.setStatus("ended");
      }
    }
  }, [props.timeRunning, props.time]);

  // reset the position when the game is reset
  useEffect(() => {
    if (props.status === "waiting") {
      setY(0);
    }
  }, [props.status]);

  //function to random the X coordinate
  const randomX = (X) => {
    if (Math.random() > 0.5 & X > 3)
      return X - Math.random() * 3;
    else
      if (X > 20)
        return X - Math.random() * 3;
      else
        return X + Math.random() * 3;
  }

  return (
    <Monsters id={props.id} x={X} y={Y} />
  );
}
