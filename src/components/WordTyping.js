import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';

export default function WordTyping(props) {

    // set up states
    const [wordList, setWordList] = useState(() => { "" });
    const [currCharIndex, setCurrCharIndex] = useState(0);
    const [currDisplayWords, setCurrDisplayWords] = useState("");
    const [countCorrectWords, setCountCorrectWords] = useState(1);

    //set useref
    const inputRef = useRef(null);
    const outputRef = useRef(null);
    const alertRef = useRef(null);

    //start, reset, end functions
    useEffect(() => {
        if (props.status === "started") {
            outputRef.current.focus();
            outputRef.current.innerHTML = "";
        }
        if (props.status === "waiting") {
            props.setLoading(true);
            alertRef.current.innerHTML = "";
        }
        if (props.status === "ended") {
            alertRef.current.innerHTML = "Sorry, you lose!";
        }
    }, [props.status]);

    useEffect(() => {
        props.setLoading(true);
    }, []);

    //fetch the word list
    useEffect(() => {
        async function fetchData() {
            if (props.loading) {
                console.log("fetch data");
                const apiUrl = 'https://cors-anywhere-0iv1.onrender.com/http://metaphorpsum.com/paragraphs/5';
                const res = await axios.get(apiUrl);
                const loaded_words = res.data.replace(/\s+/g, " ");
                props.setLoaded(true);
                setWordList(loaded_words);
                props.setLoading(false);
                console.log(loaded_words);
            }
        }
        fetchData();
    }, [props.loading]);

    // initiate the wordlist after first load
    useEffect(() => {
        if (props.loaded) {
            setCurrDisplayWords(wordList);
            setCountCorrectWords(1);
            setCurrCharIndex(0);
            props.setLoaded(false)
        }
    }, [props.loaded]);

    //watch the typing
    const handleKeyDown = (e) => {
        const keyCode = e.keyCode;
        const typedChar = e.key;
        e.preventDefault();

        // no effect if the game is finished
        if (props.status === "finished") {
            return;
        }

        // check if input char is correct
        if (typedChar === wordList.charAt(currCharIndex)) {
            setCurrCharIndex(currCharIndex + 1);
            
            if (typedChar.length === 1) {
                outputRef.current.innerHTML += typedChar;
            }
            // when a spacebar is pressed and match with expected char
            if (keyCode === 32) {
                outputRef.current.innerHTML = "";
                let currentDisWord = wordList.substring(currCharIndex + 1, currCharIndex + 80);
                setCurrDisplayWords(currentDisWord);
                props.setScore(props.score + 30);
                setCountCorrectWords(countCorrectWords + 1);
                alertRef.current.innerHTML = "";
                if (countCorrectWords >= 3) {
                    props.setScore(props.score + 50);
                    props.setClearMon(true);
                    setCountCorrectWords(1);
                    alertRef.current.innerHTML = "3 combos in a row! Hurray!"
                }
            }
        } else {
            //error input
            if (typedChar.length === 1) {
                alertRef.current.innerHTML = "";
                outputRef.current.innerHTML += `<span class="wrongText">${typedChar}</span>`
                setCountCorrectWords(1);
                props.setScore(props.score - 10);
            }
        }

    };

    const handleClick = (e) => {
        setTimeout(() => e.current.focus(), 0);
    }

    return (

        <div className="stack-small">

            <div className="gamealert" ref={alertRef}></div>
            <div>
                <p>Spell:</p>
                <div className="input" tabIndex="-1" ref={inputRef}>
                    {currDisplayWords}
                </div>
            </div>
            <div>
                <p>Type here:</p>
                {(props.status === "started") ?
                    (
                        <div className="output" tabIndex="0"
                            onKeyDown={handleKeyDown}
                            onClick={handleClick}
                            ref={outputRef}
                        >
                        </div>
                    ) :
                    (
                        <div className="output" tabIndex="-1" ref={outputRef} >
                            {(props.status === "ended") ? "Press RESET to continue" : "Press GO to start!"}
                        </div>
                    )}
            </div>
        </div>
    );

}
