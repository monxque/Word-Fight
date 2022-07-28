import React, { useState } from "react";

function Form(props) {

    const [name, setName] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (name !== '') {
            props.addProfile(name);
            setName('');
        }
    }

    function handleChange(e) {
        setName(e.target.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="label-wrapper">
                <label htmlFor="new-profile-input" className="label__lg">
                    Add a new Profile
                </label>
            </h2>
            <input
                type="text"
                id="new-profile-input"
                className="input input__lg"
                name="text"
                autoComplete="off"
                value={name}
                onChange={handleChange}
            />
            <button type="submit" className="btn btn__primary">
                Add
            </button>
        </form>
    );
}

export default Form;