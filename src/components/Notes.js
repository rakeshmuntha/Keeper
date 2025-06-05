import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

function Notes(props) {

    const context = useContext(NoteContext);
    const { notes, getnotes, editnote } = context;
    let navigate = useNavigate();

    useEffect(() => {
        
        if(localStorage.getItem('token')) getnotes();
        else navigate('/login');
        // eslint-disable-next-line

    }, [])

    const ref = useRef(null);
    const ref1 = useRef(null);
    const refclose = useRef(null);
    const [note, setnote] = useState({id: "", etitle: "", edescription: "", etag: "" });

    const updatenote = (currentnote) => {
        ref.current.click();
        setnote({_id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag});
    }

    const handleclick = (e) => {
        editnote(note._id, note.etitle, note.edescription, note.etag);
        refclose.current.click();
        props.showalert("Notes Updated Successfully", "success");
    }

    const onchange = (e) => {
        // console.log(e);
        setnote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <>
            <AddNote showalert= {props.showalert}/>
            <button type="button" className="btn btn-primary" ref={ref} style={{ display: 'none' }} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className='container my-4'>
                                    <h2>Edit Note</h2>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" value={note.etitle} onChange={onchange} minLength={1} required/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onchange} minLength={1} required/>
                                    </div><div className="mb-3">
                                        <label htmlFor="tag" className="form-label">Tag</label>
                                        <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onchange} />
                                    </div>
                                </div>
                            </form >
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length < 1 || note.edescription.length < 1 } className="btn btn-primary" onClick={handleclick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>





            <div className='row my-3'>
                <h2>Your Notes</h2>
                <div className="container mx-1">
                    {notes.length === 0 && 'No notes to Display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updatenote={updatenote} note={note} showalert={props.showalert}/>
                })}
            </div>
        </>
    )
}

export default Notes