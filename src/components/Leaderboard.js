import React, { useEffect, useState } from "react";
import Score from "./Score";
import { nanoid } from "nanoid";
import FilterButton from "./FilterButton";

export default function Leaderboard() {

  const [scoreHistory, setScoreHistory] = useState([]);
  const [filter, setFilter] = useState('All');
  const [currProfileID, setCurrProfileID] = useState("");

  // get data from localStorage
  useEffect(() => {
    const scoreData = localStorage.getItem('scoreHistory');
    if (scoreData) {
      setScoreHistory(JSON.parse(scoreData));
    }

    const profileData = localStorage.getItem('listOfProfiles');
    if (profileData) {
      const listOfProfiles = JSON.parse(profileData);
      if (listOfProfiles) {
        for (let i = 0; i < listOfProfiles.length; i++) {
          if (listOfProfiles[i].current) {
            setCurrProfileID(listOfProfiles[i].id);
          }
        }
      }
    }

  }, []);


  //filter records
  const FILTER_MAP = {
    All: () => true,
    "Current Profile": score => score.id === currProfileID
  };

  const FILTER_NAMES = Object.keys(FILTER_MAP);

  const scoreList = scoreHistory
    .sort((firstItem, secondItem) => secondItem.score - firstItem.score)
    .filter(FILTER_MAP[filter])
    .slice(0, 10)
    .map(score => (
      <Score
        id={score.id}
        name={score.name}
        key={"score-" + nanoid()}
        score={score.score}
        date={score.date}
      />
    ));

    const filterList = FILTER_NAMES.map(name => (
      <FilterButton
        key={name}
        name={name}
        isPressed={name === filter}
        setFilter={setFilter}
      />
    ));
  return (
    <div>

      <h1>WORD FIGHT</h1>
      <h2> Leader Board (Top 10)</h2>
      <div className="btn-group stack-exception">
      {filterList}
    </div>
      <ul
        className="list-bg stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        <li className="scorelist" >
          <ul className="title">
            <li>Name</li>
            <li>Score</li>
            <li>Date</li>
          </ul>
        </li>
        {scoreList}
      </ul>
    </div>
  );
}