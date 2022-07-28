import React, { useState, useEffect, useRef } from "react";
// import {ReactComponent as Monster} from '../images/random.svg';
// import monster from '../images/random.svg';
import Monsters from "./Monsters";
import WordDict from "./WordDict";
import axios from 'axios';

export default function Gameplay() {

    // set up states
    const [status, setStatus] = useState("waiting");
    const [loading, setLoading] = useState(false);
    const [time, setTime] = useState(0);
    // const [timeRunning, setTimeRunning] = useState(false);
    const [wordList, setWordList] = useState(() => { "" });
    const [currWordIndex, setcurrWordIndex] = useState(0);
    const [currCharIndex, setCurrCharIndex] = useState(0);
    const [currInput, setCurrInput] = useState("");
    const [currDisplayWords, setCurrDisplayWords] = useState("");
    const [correctIndex, setCorrectIndex] = useState(0);
    const [isError, setIsError] = useState(false);
    const [score, setScore] = useState(0);

    const WORDLIMIT = 10;
    const CHARLIMIT = 60;
    const [wordDictPter, setWordDictPter] = useState(0);
    const [prevInput, setPrevInput] = useState("");

    const [wordsCorrect, setWordsCorrect] = useState(new Set());
    const [inputWordsHistory, setInputWordsHistory] = useState({});

    const [history, setHistory] = useState({});
    const keyString = currWordIndex + "." + currCharIndex;
    const [currChar, setCurrChar] = useState("");

    //set useref
    const inputRef = useRef(null);
    const outputRef = useRef(null);
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


    //start, reset, end function
    let interval;

    const start = () => {
        if (status === "finished") {
            reset();
        }
        if (status !== "started") {
            setStatus("started");
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
            outputRef.current.focus();
            outputRef.current.innerHTML = "";
        }
    };

    const reset = () => {
        setStatus("waiting");
        setCurrDisplayWords(wordList);
        setTime(0);
        setcurrWordIndex(0);
        setCurrInput("");
        setScore(0);
        setLoading(true);
    };

    const end = () => {
        setStatus("finished");
        clearInterval(interval);
    };

    useEffect(() => {
        setLoading(true);
    }, []);

    //fetch the word list
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        async function fetchData() {
            if (loading) {
            console.log("fetch data");
            const apiUrl = 'http://metaphorpsum.com/paragraphs/10';
            const res = await axios.get(apiUrl);
            const loaded_words = res.data.replace(/\s+/g, " ");
            setLoaded(true);
            setWordList(loaded_words);
            setLoading(false);
            // console.log(loaded_words);
            }
        }
        fetchData();
    }, [loading]);

    // initiate the wordlist after first load
    useEffect(() => {
        if (loaded) {
            // console.log("initializing");
            // const generatedWordList = wordsGenerator(CHARLIMIT);
            setCurrDisplayWords(wordList);
        }
    }, [loaded]);

    // a generator to generate 2 lines to show
    // const wordsGenerator = (charlimit) => {
    //     let newWordString = wordList.substring(wordDictPter, wordDictPter+charlimit);
    //     setWordDictPter(wordDictPter + charlimit);
    //     console.log("new word string is " + newWordString);
    //     return newWordString;
    // }

    //watch the typing
    const handleKeyDown = (e) => {
        const keyCode = e.keyCode;
        const typedChar = e.key;
        e.preventDefault();

        // no effect if the game is finished
        if (status === "finished") {
            return;
        }

        // start the game by typing any thing
        if (status !== "started" && status !== "finished") {
            start();
            return;
        }

        // check if input char is correct
        console.log("expected: " + wordList.charAt(currCharIndex));
        console.log("typed: " + typedChar);
        if (typedChar === wordList.charAt(currCharIndex)) {
            setCurrCharIndex(currCharIndex + 1);
            setIsError(false);
            if (typedChar.length == 1) {
                outputRef.current.innerHTML += typedChar;
            }
            console.log(outputRef);
            console.log("correct");
            // clear the word when the spacebar is pressed and match with the char
            if (keyCode === 32) {
                outputRef.current.innerHTML = "";
                let currentDisWord = wordList.substring(currCharIndex + 1, currCharIndex + 80);
                setCurrDisplayWords(currentDisWord);
                setCorrectIndex(correctIndex + 1);
            }
        } else {
            setIsError(true);
            if (typedChar.length == 1) {
                outputRef.current.innerHTML += `<span class="wrongText">${typedChar}</span>`
            }
            console.log("wrong")
        }

        //end game => ! to be setup
        // if (currWordIndex + 1 === WORDLIMIT) {
        //     end();
        //     return;
        // }
    };

    // generate more words when typing
    // useEffect(() => {
    //     console.log("checking word count: " + currDisplayWords.split(" ").length);
    //     if (loaded && currDisplayWords.split(" ").length < WORDLIMIT) {
    //         const generatedWordList = wordList + wordsGenerator(WORDLIMIT);
    //         const generatedDisplay = currDisplayWords + wordsGenerator(WORDLIMIT);
    //         setWordList(generatedWordList);
    //         setCurrDisplayWords(generatedDisplay);
    //     }
    // }, [currDisplayWords]);

    // store the input 
    const handleChange = (e) => {
        setCurrInput(e.target.value);
    };

    return (

        <div
            className="stack-large">

            <h1>How Fast Can You Type?</h1>

            <button className="btn btn-circle btn-outline-success" onClick={start}>
                GO!
            </button>

            {/* <WordDict /> */}
            {(status === "started") ? (
                <div
                    className={`input ${(status === "started") ? ' active' : ''}${isError
                        ? ' is-error'
                        : ''}`}
                    ref={inputRef}
                >
                    {currDisplayWords}
                </div>
            ) : (
                <div className="input text-muted" tabIndex="-1" ref={inputRef}>
                    {currDisplayWords}
                </div>
            )}

            {(status === "started") ?
                (
                    <div className="output" tabIndex="0"
                        onKeyDown={handleKeyDown}
                        ref={outputRef}
                    >
                    </div>
                ) :
                (
                    <div className="output" tabIndex="-1" ref={outputRef} >
                        not yet started
                    </div>
                )}

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
