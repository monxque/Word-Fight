import React, { useEffect, useState } from "react";
import Monsters from "./Monsters";

export default function MonstersMove(props) {

  const [X, setX] = useState(Math.random() * 21 + 0.5);
  const [Y, setY] = useState(-1);
  const [moveSpeed, setMoveSpeed] = useState(2);

  //set monster move downwards according to time
  useEffect(() => {
    if (props.timeRunning) {
      // console.log("time is running")
      // increaseY();
      setX(randomX(X));
      if (Y < 18) {
        setY(moveSpeed + Y);
      }
      if (Y === 19) {
        props.setStatus("ended");
      }
    }
    else {
      // setX(X);
    }
    // setMoveSpeed(1);
  }, [props.timeRunning, props.time]);


  useEffect(() => {
    if (props.status === "waiting") {
      setY(0);
    }
  }, [props.status]);
  // const increaseY = () => {
  //   if (Y < 18) {
  //     setY(Y + 4);
  //   }
  // }

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
