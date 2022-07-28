import React, { useState, useEffect } from "react";
import WordTyping from "./WordTyping";
import MonstersMove from "./MonstersMove";
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
    const [monsters, setMonsters] = useState([]);
    const [removedMon, setRemovedMon] = useState(1);

    //ACTIONS
    // start actions
    const start = () => {
        if (status !== "started") {
            if (status === "ended") {
                reset();
            }

            //set time loop
            if (status === "waiting") {
                const newIntervalId = setInterval(() => {
                    setTime((prevTime) => prevTime + 1);
                }, 1000);
                setIntervalId(newIntervalId);
                console.log("time is " + time);
                setStatus("started");
                setTimeRunning(true);
            }
        }
    };

    //reset actions
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

    //set ended behaviour
    useEffect(() => {
        if (status === "ended") {
            setTimeRunning(false);

            //set score to localstorage
            const data = localStorage.getItem('listOfProfiles');
            console.log(data);
            if (data) {
                const listOfProfiles = JSON.parse(data);
                console.log(listOfProfiles);
                var currentGame = [];
                const currentDate = new Date().toLocaleDateString();
                // update Max Score to localstorage
                if (listOfProfiles) {
                    console.log(listOfProfiles);
                    const newListOfProfiles = listOfProfiles
                        .map(profile => {
                            if (profile.current) {
                                currentGame = { name: profile.name, id: profile.id, score: score, date: currentDate };
                                console.log(currentGame);
                                if (score > profile.maxScore) {
                                    return { ...profile, maxScore: score }
                                } else {
                                    return { ...profile }
                                }
                            } else {
                                return { ...profile }
                            }
                        });
                    localStorage.setItem('listOfProfiles', JSON.stringify(newListOfProfiles));

                    // set score to score history in localstorage
                    const scoreData = localStorage.getItem('scoreHistory');
                    if (scoreData) {
                        const scoreHistory = JSON.parse(scoreData);
                        if (scoreHistory) {
                            const newScoreHistory = scoreHistory.slice();
                            newScoreHistory.push(currentGame);
                            localStorage.setItem('scoreHistory', JSON.stringify(newScoreHistory));
                        }
                    } else {
                        const newGameArr = [];
                        newGameArr.push(currentGame);
                        localStorage.setItem('scoreHistory', JSON.stringify(newGameArr));
                    }
                }
            }
        }
    }, [status]);

    //MONSTERS SETUP
    // remove monster according to clearMon value
    const removeMonster = (id) => {
        if (clearMon) {
            //remove the monster that matches the id
            const idCheck = (m) => (("mon-" + id) === m.props.id);
            const isFound = monsters.some(idCheck);
            // console.log("finding " + id + " " + isFound);
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
            // console.log("removing mon " + removedMon);
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

    // add monsters faster when time >20s
    useEffect(() => {
        if (timeRunning) {
            if (time > 0 && time <= 20) {
                if (time % 3 === 0) { addMonster(); }
            } else if (time > 20) {
                if (time % 2 === 0) { addMonster(); }
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
        // console.log(monsters);
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
        // console.log("init")
        // console.log(initmonsterlist);
    }

    useEffect(() => {
        initMon();
    }, []);



    return (
        <div >
            <h1>WORD FIGHT</h1>
            <div className="score"> <span >Score: {score}</span>
                <button className="btn" onClick={start}>
                    {(status === "ended")? "RESET" : "GO!"}
                </button>

            </div>
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
                <image className="castle" href={castle} width="24" height="6" x='0' y='18.6' />
            </svg>
        </div>
    );

}
