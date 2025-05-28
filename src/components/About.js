import React, { useContext } from 'react';
import NoteContext from "../context/notes/NoteContext";

function About() {
    const a = useContext(NoteContext);

    return (
        <div>About {a.name} and he is a {a.class} </div>
    )
}

export default About;