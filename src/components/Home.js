import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
// import Gameplay from "./Gameplay";
// import ProfileSelection from "./ProfileSelection";

function Home() {

  const [currProfile, setCurrProfile] = useState({
    name: "",
    maxScore: 0,
  });


  //get the current profile name
  useEffect(() => {
    const data = localStorage.getItem('listOfProfiles');
    if (data) {
      const listOfProfiles = JSON.parse(data);
      if (listOfProfiles) {
        // console.log(listOfProfiles);
        for (let i = 0; i < listOfProfiles.length; i++) {
          if (listOfProfiles[i].current) {
            setCurrProfile({ name: listOfProfiles[i].name, maxScore: listOfProfiles[i].maxScore });
            // console.log(listOfProfiles[i]);
          }
        }
      }
    }
  }, []);

  const withprofiletemplate = (
    <div className="currprofile">
      <div>
        <div>Current Profile</div>
        <div className="profileName">{currProfile.name}</div>
      </div>
      <div>
        <div>Best Score</div>
        <div>{currProfile.maxScore}</div>
      </div>
      <div>
        <Link to="/profileselection" tabIndex="-1" ><button className="btn" >Switch Profile</button></Link></div>
    </div>
  );

  const noprofiletemplate = (
    <div className="currprofile">
      <Link to="/profileselection" tabIndex="-1" >
        <button className="btn btn__lg" >Add Profile</button>
      </Link>
    </div>
  );

  return (
    <div className="homepage">

      <h1>WORD FIGHT</h1>
      {currProfile.name !=="" ? withprofiletemplate : noprofiletemplate}
      <div className="instructions list-bg">
        <h3>Instructions</h3>
        <p>Monsters are coming to our castle! Cast the spell by typing <span className="emphasize">three words correctly in a row</span> to erase a monster! Don't let them reach our castle!</p></div>
      <Link to="/gameplay" tabIndex="-1"> <button >Start </button></Link>
      <Link to="/leaderboard" tabIndex="-1"><button>Leader Board</button></Link>
      <Link to="/credits" tabIndex="-1"> <button>Credits</button></Link>
    </div>

  );
}

export default Home;
