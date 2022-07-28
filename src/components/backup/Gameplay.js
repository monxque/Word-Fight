import React, { useState, useEffect, useRef } from "react";
import WordTyping from "./WordTyping";
import MonstersMove from "./MonstersMove";
import { nanoid } from "nanoid";
import castle from '../images/castle.png';

export default function Gameplay() {

    // set up states
    const [status, setStatus] = useState("waiting");
    const [intervalId, setIntervalId] = useState(0);
    const [time, setTime] = useState(0);
    const [timeRunning, setTimeRunning] = useState(false);
    const [score, setScore] = useState(0);
    const [clearMon, setClearMon] = useState(false);
    const [monIDPter, setMonIDPter] = useState(1);
    const [addMon, setAddMon] = useState(false);
    const [monsters, setMonsters] = useState([]);
    const [monKey, setMonKey] = useState("");
    const [monLoaded, setMonLoaded] = useState(false);
    const [removedMon, setRemovedMon] = useState(1);

    //actions
    const start = () => {
        if (status !== "started") {
            if (status === "ended") {
                reset();
            }

            //set time loop
            const newIntervalId = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
            setIntervalId(newIntervalId);
            console.log("time is " + time);
            setStatus("started");
            setTimeRunning(true);
        }
    };

    const reset = () => {
        clearInterval(intervalId);
        setIntervalId(0);
        setStatus("waiting");
        // setCurrDisplayWords(wordList);
        setScore(0);
        // setLoading(true);
        setTimeRunning(false);
        setRemovedMon(1);
        initMon();
        console.log('stop now');
    };

    // const end = () => {
    //     setStatus("finished");
    //     clearInterval(interval);
    // };
    useEffect(() => {
        if (status === "ended") {
            setTimeRunning(false);
        }
        // return () => clearInterval(interval);
    }, [status]);

    // set time loop
    // useEffect(() => {
    //     let interval;
    //     if (timeRunning) {
    //         interval = setInterval(() => {
    //             setTime((prevTime) => prevTime + 1);
    //         }, 1000);
    //         console.log("time is " + time);
    //     } else {
    //         clearInterval(interval);
    //         setTime(0);
    //         console.log("stop now")

    //     }
    //     // return () => clearInterval(interval);
    // }, [timeRunning]);

    // remove monster according to clearMon value
    const removeMonster = (id) => {
        if (clearMon) {
            //remove the monster that matches the id
            const idCheck = (m) => ( ("mon-" + id) === m.props.id );
            const isFound = monsters.some(idCheck);
            console.log("finding "+id+" "+isFound);
            if (isFound) {
                const remainingMonsters = monsters.filter(monster => ("mon-" + id) !== monster.props.id);
                console.log(remainingMonsters);
                setMonsters(remainingMonsters);
                setRemovedMon(removedMon + 1);
            }
            setClearMon(false);
        }
    }

    useEffect(() => {
        if (clearMon) {
            console.log("removing mon " + removedMon);
            // if (removedMon <= monIDPter){
            removeMonster(removedMon);
            // }
        }
    }, [clearMon]);

    //add Monsters
    const addMonster = () => {
        const newMonster = <MonstersMove
            time={time}
            setTime={setTime}
            timeRunning={timeRunning}
            setTimeRunning={setTimeRunning}
            clearMon={clearMon}
            setClearMon={setClearMon}
            status={status}
            setStatus={setStatus}
            id={"mon-" + monIDPter}
            key={"mon-" + monIDPter}
        />;

        let addedMonList = monsters.slice();
        addedMonList.push(newMonster);
        setMonsters(addedMonList);
        setMonIDPter(monIDPter + 1);
    }

    useEffect(() => {
        if (timeRunning) {
            if (time > 0 && time <= 20) {
                if (time % 3 == 0) { addMonster(); }
            } else if (time > 20) {
                if (time % 2 == 0) { addMonster(); }
            }
        }
    }, [time, timeRunning]);

    const monsterlist = monsters
        .map(monster => (
            <MonstersMove
                time={time}
                setTime={setTime}
                timeRunning={timeRunning}
                setTimeRunning={setTimeRunning}
                clearMon={clearMon}
                setClearMon={setClearMon}
                status={status}
                setStatus={setStatus}
                id={monster.id}
                key={monster.key}
            />
        ));

    // initialize the monsters

    const initMon = () => {
        setMonsters([]);
        console.log(monsters);
        let initmonsterlist = [];
        let initNo = 1;
        for (let i = 1; i <= initNo; i++) {
            initmonsterlist.push(<MonstersMove
                time={time}
                setTime={setTime}
                timeRunning={timeRunning}
                setTimeRunning={setTimeRunning}
                clearMon={clearMon}
                setClearMon={setClearMon}
                status={status}
                setStatus={setStatus}
                id={"mon-" + i}
                key={"mon-" + i}
            />)
            setMonIDPter(initNo + 1);
            setMonsters(initmonsterlist);
        }
        console.log("init")
        console.log(initmonsterlist);
    }

    useEffect(() => {
        initMon();
    }, []);



    return (
        <div className="gameshell stack-large">

            <h1>How Fast Can You Type?</h1>
            <div className="score">Score: {score}</div>
            <button className="btn btn-circle btn-outline-success" onClick={start}>
                GO!
            </button>

            <button className="btn btn-circle btn-outline-success" onClick={reset}>
                RESET
            </button>
            <WordTyping
                status={status}
                setStatus={setStatus}
                score={score}
                setScore={setScore}
                clearMon={clearMon}
                setClearMon={setClearMon}
                timeRunning={timeRunning}
                setTimeRunning={setTimeRunning}
                setTime={setTime}
            />

            <svg
                className="playboard"
                viewBox="0 0 24 24"
                xmlns="<http://www.w3.org/2000/svg>"
            >

                {monsterlist}
                <image className="castle" href={castle} width="24" height="6" x='0' y='19' />
            </svg>
        </div>
    );

}
