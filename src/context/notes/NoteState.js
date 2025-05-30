import NoteContext from "./NoteContext";
import React, { useState } from 'react';

const NoteState = (props) => {

    const host = 'http://localhost:3000';
    
    // Initialize with empty array instead of array with empty object
    const notesInitial = [];
    const [notes, setnotes] = useState(notesInitial);

    // GET all Notes
    const getnotes = async () => {
        try {
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: "GET",
                headers: {
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjgzMmQ2OWMyYjEwZThjMjIzOGNiMGU0In0sImlhdCI6MTc0ODE2MjI0OH0.yPi-Tp5ujh3igu7tcw4qhdt2-mTAJhKsK4nesn3q-3k",
                },
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch notes');
            }
            
            const json = await response.json();
            setnotes(json);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    }

    // Add a Note
    const addnote = async (title, description, tag) => {
        try {
            // API call
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjgzMmQ2OWMyYjEwZThjMjIzOGNiMGU0In0sImlhdCI6MTc0ODE2MjI0OH0.yPi-Tp5ujh3igu7tcw4qhdt2-mTAJhKsK4nesn3q-3k",
                },
                body: JSON.stringify({ title, description, tag }),
            });

            if (!response.ok) {
                throw new Error('Failed to add note');
            }

            const note = await response.json();
            setnotes(notes.concat(note));
        } catch (error) {
            console.error('Error adding note:', error);
        }
    }

    // Delete a Note
    const deletenote = async (id) => {
        try {
            // API call
            console.log(id);
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjgzMmQ2OWMyYjEwZThjMjIzOGNiMGU0In0sImlhdCI6MTc0ODE2MjI0OH0.yPi-Tp5ujh3igu7tcw4qhdt2-mTAJhKsK4nesn3q-3k",
                },
            });
            
            if (!response.ok) {
                throw new Error('Failed to delete note');
            }
            
            await response.json();
            
            // Instead of calling getnotes(), update state directly for better performance
            const newNotes = notes.filter(note => note._id !== id);
            setnotes(newNotes);
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    }

    // Edit a Note
    const editnote = async (id, title, description, tag) => {
        try {
            // API call
            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
                method: "PUT", // Should be PUT for updates, not POST
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjgzMmQ2OWMyYjEwZThjMjIzOGNiMGU0In0sImlhdCI6MTc0ODE2MjI0OH0.yPi-Tp5ujh3igu7tcw4qhdt2-mTAJhKsK4nesn3q-3k",
                },
                body: JSON.stringify({ title, description, tag }),
            });
            
            if (!response.ok) {
                throw new Error('Failed to update note');
            }
            
            await response.json();

            // Create new array instead of mutating existing one
            const newNotes = notes.filter((note) => note._id !== id);
            
            setnotes(newNotes);
        } catch (error) {
            console.error('Error editing note:', error);
        }
    }

    return (
        <NoteContext.Provider value={{ notes, setnotes, addnote, deletenote, editnote, getnotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;