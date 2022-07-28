import React, { useState, useEffect, useRef } from "react";
// import {ReactComponent as Monster} from '../images/random.svg';
// import monster from '../images/random.svg';
import Monsters from "./Monsters";
import axios from 'axios';
import WordTyping from "./WordTyping";

export default function Gameplay() {

    // set up states
    const [status, setStatus] = useState("waiting");
    const [time, setTime] = useState(0);
    // const [timeRunning, setTimeRunning] = useState(false);
    const [score, setScore] = useState(0);
    const [clearMon, setClearMon] = useState(false);

    // stop watch loop
    // useEffect(() => {
    //     let interval;
    //     if (timeRunning) {
    //         interval = setInterval(() => {
    //             setTime((prevTime) => prevTime + 1);
    //         }, 1000);
    //     } else if (!timeRunning) {
    //         clearInterval(interval);
    //     }
    //     // return () => clearInterval(interval);
    // }, [timeRunning]);

    const removeMonster = () => {
        if (clearMon) {

        }
    }

    return (
        <div className="gameshell stack-large">

            <h1>How Fast Can You Type?</h1>

            <div className="score">Score: {score}</div>

            <WordTyping
                status={status}
                setStatus={setStatus}
                score={score}
                setScore={setScore}
                clearMon={clearMon}
                setClearMon={setClearMon}
            />
            <svg
                viewBox="0 0 24 24"
                xmlns="<http://www.w3.org/2000/svg>"
                width="100%"
                height="600px"
                style={{ backgroundColor: "black" }}
            >
                <Monsters x="3" y="20" />
                <Monsters x="6" y="0" />
                <Monsters x="10" y="10" />
                <Monsters x="14" y="0" />
                <Monsters x="16" y="0" />
                <Monsters x="18" y="3" />
                <Monsters x="20" y="0" />
                <Monsters x="23" y="2" />
                {/* <Monster height="2" x="3" y="0"/>
                <Monster height="2" x="3" y="20"/> 
                <image className="monster" href={monster} height="2" x="3" y="0"/>
                <image className="monster" href={monster} height="2" x="3" y="20"/> */}

            </svg>

        </div>
    );

}
