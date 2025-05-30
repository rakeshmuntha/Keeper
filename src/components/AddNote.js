import NoteContext from '../context/notes/NoteContext';
import React, { useContext, useState } from 'react';

function AddNote() {
    const context = useContext(NoteContext);
    const { addnote } = context;

    const [note, setnote] = useState({ title: "", description: "", tag: "default" });

    const handleclick = (e) => {
        e.preventDefault();
        addnote(note.title, note.description, note.tag);
    }

    const onchange = (e) => {
        // console.log(e);
        setnote({ ...note, [e.target.name]: e.target.value });
    }
    return (
        <div>
            <form>
                <div className='container my-4'>
                    <h2>Add a Node</h2>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onchange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description' onChange={onchange} />
                    </div><div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' onChange={onchange} />
                    </div>
                   
                    <button type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
                </div>
            </form >
        </div>
    )
}

export default AddNote