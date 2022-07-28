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

  // edit functions
  function addProfile(name) {
    const newProfile = { id: "profile-" + nanoid(), name: name, maxScore: 0, current: false };
    const addedProfileList = profiles.slice();
    addedProfileList.push(newProfile);
    setProfiles(addedProfileList);
  }

  function deleteProfile(id) {
    const answer = window.confirm("Removing profile will also remove the related score records, are you sure?");
    if (answer) {
      const remainingProfiles = profiles.filter(profile => id !== profile.id);
      setProfiles(remainingProfiles);
    }
  }

  function editProfile(id, newName) {
    const editedProfilesList = profiles.map(profile => {
      if (id === profile.id) {
        return { ...profile, name: newName }
      }
      return profile;
    })
    setProfiles(editedProfilesList);

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
