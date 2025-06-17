import NoteContext from '../context/notes/NoteContext';
import React, { useContext, useState } from 'react';

function AddNote(props) {
    const context = useContext(NoteContext);
    const { addnote, mode } = context;

    const [note, setnote] = useState({ title: "", description: "", tag: "" });

    const handleclick = (e) => {
        e.preventDefault();
        addnote(note.title, note.description, note.tag === "" ? 'Default' : note.tag);
        setnote({ title: "", description: "", tag: "" });
        props.showalert("Notes Added Successfully", "success");
    }

    const onchange = (e) => {
        // console.log(e);
        setnote({ ...note, [e.target.name]: e.target.value });
    }
    return (
        <div className={`bg-${mode === 'dark' ? 'black' : 'light'} text-${mode === 'light' ? 'dark' : 'light'}`}>
            <form>
                <div className='container my-4'>
                    <h2>Add a Note</h2>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            className={`form-control bg-${mode === 'dark' ? 'black' : 'light'} text-${mode === 'light' ? 'dark' : 'light'}`}
                            id="title"
                            name='title'
                            aria-describedby="emailHelp"
                            onChange={onchange}
                            value={note.title}
                            minLength={1}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input
                            type="text"
                            className={`form-control bg-${mode === 'dark' ? 'black' : 'light'} text-${mode === 'light' ? 'dark' : 'light'}`}
                            id="description"
                            name='description'
                            onChange={onchange}
                            value={note.description}
                            minLength={1}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input
                            type="text"
                            className={`form-control bg-${mode === 'dark' ? 'black' : 'light'} text-${mode === 'light' ? 'dark' : 'light'}`}
                            id="tag"
                            name='tag'
                            onChange={onchange}
                            value={note.tag}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={note.title.length < 1 || note.description.length < 1}
                        className="btn btn-primary"
                        onClick={handleclick}
                    >
                        Add Note
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddNote