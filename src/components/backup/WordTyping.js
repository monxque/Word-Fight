import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';

export default function WordTyping(props) {

    // set up states
    const [loading, setLoading] = useState(false);
    const [wordList, setWordList] = useState(() => { "" });
    const [currCharIndex, setCurrCharIndex] = useState(0);
    const [currDisplayWords, setCurrDisplayWords] = useState("");
    // const [correctWords, setCorrectWords] = useState(0);
    const [countCorrectWords, setCountCorrectWords] = useState(1);
    const [isError, setIsError] = useState(false);

    //set useref
    const inputRef = useRef(null);
    const outputRef = useRef(null);
    const alertRef = useRef(null);

    //start, reset, end function


    useEffect(() => {
        if (props.status === "started") {
            outputRef.current.focus();
            outputRef.current.innerHTML = "";
        }
        if (props.status === "waiting") {
            setLoading(true);
            alertRef.current.innerHTML = "";
        }
        if (props.status === "ended") {
            alertRef.current.innerHTML = "Sorry, you lose!";
        }
    }, [props.status]);

    useEffect(() => {
        setLoading(true);
    }, []);

    //fetch the word list
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        async function fetchData() {
            if (loading) {
                console.log("fetch data");
                const apiUrl = 'http://localhost:8080/http://metaphorpsum.com/paragraphs/5';
                const res = await axios.get(apiUrl);
                const loaded_words = res.data.replace(/\s+/g, " ");
                setLoaded(true);
                setWordList(loaded_words);
                setLoading(false);
                console.log(loaded_words);
            }
        }
        fetchData();
    }, [loading]);

    // initiate the wordlist after first load
    useEffect(() => {
        if (loaded) {
            setCurrDisplayWords(wordList);
            setCountCorrectWords(0);
            setCurrCharIndex(0);
            setLoaded(false)
        }
    }, [loaded]);

    //watch the typing
    const handleKeyDown = (e) => {
        const keyCode = e.keyCode;
        const typedChar = e.key;
        e.preventDefault();

        // no effect if the game is finished
        if (props.status === "finished") {
            return;
        }

        // start the game by typing any thing
        // if (props.status !== "started" && props.status !== "finished") {
        //     props.setStatus('started');
        //     return;
        // }

        // check if input char is correct
        // console.log("expected: " + wordList.charAt(currCharIndex));
        // console.log("typed: " + typedChar);
        if (typedChar === wordList.charAt(currCharIndex)) {
            setCurrCharIndex(currCharIndex + 1);
            setIsError(false);
            if (typedChar.length == 1) {
                outputRef.current.innerHTML += typedChar;
            }
            // console.log(outputRef);
            // console.log("correct");
            // when a spacebar is pressed and match with expected char
            if (keyCode === 32) {
                outputRef.current.innerHTML = "";
                let currentDisWord = wordList.substring(currCharIndex + 1, currCharIndex + 80);
                setCurrDisplayWords(currentDisWord);
                // setCorrectWords(correctWords + 1);
                props.setScore(props.score + 30);
                setCountCorrectWords(countCorrectWords + 1);
                alertRef.current.innerHTML = "";
                if (countCorrectWords >= 3) {
                    props.setScore(props.score + 50);
                    // console.log("add 50")
                    props.setClearMon(true);
                    setCountCorrectWords(0);
                    alertRef.current.innerHTML = "3 combos in a row! Hurray!"
                }
            }
        } else {
            //error input
            if (typedChar.length == 1) {
                setIsError(true);
                alertRef.current.innerHTML = "";
                outputRef.current.innerHTML += `<span class="wrongText">${typedChar}</span>`
                setCountCorrectWords(0);
                props.setScore(props.score - 10);
            }
            // console.log("wrong")
        }

        //end game => ! to be setup
        // if (currWordIndex + 1 === WORDLIMIT) {
        //     end();
        //     return;
        // }
    };

    return (

        <div className="stack-small">

            {/* <div className="score"><p>Score: {props.score} <span className="gamealert" ref={alertRef}></span></p></div>

            <button className="btn btn-circle btn-outline-success" onClick={start}>
                GO!
            </button>

            <button className="btn btn-circle btn-outline-success" onClick={reset}>
                RESET
            </button> */}

            <span className="gamealert" ref={alertRef}></span>
            {(props.status === "started") ? (
                <div
                    className={`input ${(props.status === "started") ? ' active' : ''}${isError
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

            {(props.status === "started") ?
                (
                    <div className="output" tabIndex="0"
                        onKeyDown={handleKeyDown}
                        ref={outputRef}
                    >
                    </div>
                ) :
                (
                    <div className="output" tabIndex="-1" ref={outputRef} >
                        Press GO to start!
                    </div>
                )}

        </div>
    );

}
