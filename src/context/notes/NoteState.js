import NoteContext from "./NoteContext";
import React, { useState } from 'react';

const NoteState = (props) => {
    const notesInitial =
        [
            {
                "_id": "6833078dc606a2152e30a273",
                "user": "6832d69c2b10e8c2238cb0e4",
                "title": "my title 2",
                "description": "this is my world",
                "tag": "pers.  onal",
                "date": "2025-05-25T12:05:33.632Z",
                "__v": 0
            },
            {
                "_id": "6836f4f8961550a45f214054",
                "user": "6832d69c2b10e8c2238cb0e4",
                "title": "my title 3",
                "description": "this is my world",
                "tag": "pers.  onal",
                "date": "2025-05-28T11:35:20.376Z",
                "__v": 0
            },{
                "_id": "6833078dc606a2152e30a273",
                "user": "6832d69c2b10e8c2238cb0e4",
                "title": "my title 2",
                "description": "this is my world",
                "tag": "pers.  onal",
                "date": "2025-05-25T12:05:33.632Z",
                "__v": 0
            },
            {
                "_id": "6836f4f8961550a45f214054",
                "user": "6832d69c2b10e8c2238cb0e4",
                "title": "my title 3",
                "description": "this is my world",
                "tag": "pers.  onal",
                "date": "2025-05-28T11:35:20.376Z",
                "__v": 0
            },{
                "_id": "6833078dc606a2152e30a273",
                "user": "6832d69c2b10e8c2238cb0e4",
                "title": "my title 2",
                "description": "this is my world",
                "tag": "pers.  onal",
                "date": "2025-05-25T12:05:33.632Z",
                "__v": 0
            },
            {
                "_id": "6836f4f8961550a45f214054",
                "user": "6832d69c2b10e8c2238cb0e4",
                "title": "my title 3",
                "description": "this is my world",
                "tag": "pers.  onal",
                "date": "2025-05-28T11:35:20.376Z",
                "__v": 0
            },{
                "_id": "6833078dc606a2152e30a273",
                "user": "6832d69c2b10e8c2238cb0e4",
                "title": "my title 2",
                "description": "this is my world",
                "tag": "pers.  onal",
                "date": "2025-05-25T12:05:33.632Z",
                "__v": 0
            },
            {
                "_id": "6836f4f8961550a45f214054",
                "user": "6832d69c2b10e8c2238cb0e4",
                "title": "my title 3",
                "description": "this is my world",
                "tag": "pers.  onal",
                "date": "2025-05-28T11:35:20.376Z",
                "__v": 0
            },
            {
                "_id": "6836f4fc961550a45f214056",
                "user": "6832d69c2b10e8c2238cb0e4",
                "title": "my title 4",
                "description": "this is my world",
                "tag": "pers.  onal",
                "date": "2025-05-28T11:35:24.903Z",
                "__v": 0
            }
        ]
    const [notes, setnotes] = useState(notesInitial);


    return (
        < NoteContext.Provider value={{ notes, setnotes }} >
            { /*the things notestate wants to give, give in value element */}
            {props.children}
        </NoteContext.Provider >
    )
}

export default NoteState;