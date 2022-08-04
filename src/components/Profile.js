import React, { useEffect, useRef, useState } from "react";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function Profile(props) {

  //set use states
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');

  const wasEditing = usePrevious(isEditing);

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  //handle change of name
  function handleChange(e) {
    setNewName(e.target.value);
  }

  //handle profile name change submission
  function handleSubmit(e) {
    e.preventDefault();
    props.editProfile(props.id, newName);
    setNewName('');
    setEditing(false);
  }

  //different templates for editing and viewing
  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="profile-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
          id={props.id}
          className="profile-text"
          type="text"
          value={newName}
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div className="btn-group">
        <button type="button" className="btn profile-cancel"
          onClick={() => setEditing(false)}>
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary profile-edit">
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      <div >
        <p htmlFor={props.id}>
          {props.name} <span className="curr-profile-label" htmlFor={props.id}>
          {props.current ? "(Current Profile)" : " "}
        </span>
        </p>
        
        <p htmlFor={props.id}>
          Maximum Score: {props.maxScore}
        </p>

      </div>

      <div className="btn-group">
        <button type="button" className="btn"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
        >
          Edit <span className="visually-hidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteProfile(props.id)}
        >
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => props.setCurrent(props.id)}
        >
          Select <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );

  //update the focus when editing and after editing
  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  return <li className="profile" > {isEditing ? editingTemplate : viewTemplate} </li>;
}