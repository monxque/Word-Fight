import React, { useEffect, useRef, useState } from "react";
import Profile from "./Profile";
import Form from "./Form";
import { nanoid } from "nanoid";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function ProfileSelection() {

  const [profiles, setProfiles] = useState([]);

  // get data from localStorage
  useEffect(() => {
    const data = localStorage.getItem('listOfProfiles');
    if (data) {
      setProfiles(JSON.parse(data));
    }
  }, []);

  // set data to localStorage
  useEffect(() => {
    localStorage.setItem('listOfProfiles', JSON.stringify(profiles));
  }, [profiles]);

  // clear localStorage
  const show_clear_alert = () => {
    if (!window.confirm("Removing all profiles will also clear all score records, are you sure?")) {
      return false;
    }
    removeProfiles();
  }

  const removeProfiles = () => {
    localStorage.clear();
    setProfiles([]);
  };

  // set profile list
  const profileList = profiles
    .map(profile => (
      <Profile
        id={profile.id}
        name={profile.name}
        key={profile.id}
        maxScore={profile.maxScore}
        current={profile.current}
        addProfile={addProfile}
        deleteProfile={deleteProfile}
        editProfile={editProfile}
        setCurrent={setCurrent}
      />
    ));

  // PROFILE UPDATE functions

  //add profiles
  function addProfile(name) {
    const data = localStorage.getItem('listOfProfiles');
    //if have existing profiles
    if (data) {
      //set all other profiles's current status as false
      const updatedProfiles = profiles.map(profile => {
        return { ...profile, current: false }
      });
      //add the new profile
      const newProfile = { id: "profile-" + nanoid(), name: name, maxScore: 0, current: true };
      updatedProfiles.push(newProfile);
      setProfiles(updatedProfiles);
    } else {
      //add the new profile
      const newProfile = { id: "profile-" + nanoid(), name: name, maxScore: 0, current: true };
      const addedProfileList = profiles.slice();
      addedProfileList.push(newProfile);
      setProfiles(addedProfileList);
    }
  }

  //remove profile and all records
  function deleteProfile(id) {
    const answer = window.confirm("Removing profile will also remove the related score records, are you sure?");
    if (answer) {
      const remainingProfiles = profiles.filter(profile => id !== profile.id);
      setProfiles(remainingProfiles);
    }
       //remove the records in score history too
       const scoreData = localStorage.getItem('scoreHistory');
       if (scoreData) {
         const scoreHistory = JSON.parse(scoreData);
         if (scoreHistory) {
           const newScoreHistory = scoreHistory.filter(score => id !== score.id);
           localStorage.setItem('scoreHistory', JSON.stringify(newScoreHistory));
         }
       }
  }

  //edit profile name
  function editProfile(id, newName) {
    const editedProfilesList = profiles.map(profile => {
      if (id === profile.id) {
        return { ...profile, name: newName }
      }
      return profile;
    })
    setProfiles(editedProfilesList);
    //update the name in score history too
    const scoreData = localStorage.getItem('scoreHistory');
    if (scoreData) {
      const scoreHistory = JSON.parse(scoreData);
      if (scoreHistory) {
        const newScoreHistory = scoreHistory.map(score => {
          if (id === score.id) {
            return { ...score, name: newName }
          }
          return score;
        })
        localStorage.setItem('scoreHistory', JSON.stringify(newScoreHistory));
      }
    }
  }

  //select current profile
  function setCurrent(id) {
    const updatedProfiles = profiles.map(profile => {
      // if this task has the same ID as the edited profile
      if (id === profile.id) {
        // if matched ID then change current value to true
        return { ...profile, current: true }
      } else {
        // change other profiles's current value to false
        return { ...profile, current: false }
      }
    });
    setProfiles(updatedProfiles);
  }

  //set focus for removing profile
  const listHeadingRef = useRef(null);
  const prevProfileLength = usePrevious(profiles.length);

  useEffect(() => {
    if (profiles.length - prevProfileLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [profiles.length, prevProfileLength]);

  return (
    <div >

      <h1>WORD FIGHT</h1>
      <Form addProfile={addProfile} />
      <div><button className="btn btn__danger btn__lg" type="button" onClick={show_clear_alert}>Remove All Profiles</button></div>

      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        Profile Lists
      </h2>
      <div className="list-bg">
        <ul
          role="list"
          className="stack-large stack-exception"
          aria-labelledby="list-heading"
        >
          {profileList}
        </ul>
      </div>
    </div>
  );
}

export default ProfileSelection;
