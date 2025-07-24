import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

function Notes(props) {

    const context = useContext(NoteContext);
    const { notes, getnotes, editnote, deletenote, mode, setnotes } = context;
    let navigate = useNavigate();
    const host = process.env.REACT_APP_API_URL;
    const lastModifiedRef = useRef(null);
    const time = useRef(null);

    const fetchNotes = async () => {
        try {
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: "GET",
                headers: {
                    "auth-token": localStorage.getItem('token'),
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch notes');
            }
            const json = await response.json();
            setnotes(json);
            // Update reference
            if (json.length > 0) {
                lastModifiedRef.current = json[json.length - 1].updatedAt;
            }
        }
        catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    const checkAndUpdate = async () => {
        const res = await fetch(`${host}/api/notes/lastModified`, {
            headers: { 'auth-token': localStorage.getItem('token') }
        });
        const data = await res.json();
        if (lastModifiedRef.current && lastModifiedRef.current && data.lastModified !== lastModifiedRef.current) {
            fetchNotes(); // Refresh only if something has changed
        }
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchNotes(); // initial notes
            time.current = setInterval(() => {
                checkAndUpdate();
            }, 5000);
        }
        else navigate('/login');
        // eslint-disable-next-line


        return () => {
            clearInterval(time.current);
        }
    }, []);

    const editRef = useRef(null);
    const editCloseRef = useRef(null);
    const deleteRef = useRef(null);
    const deleteCloseRef = useRef(null);

    const [note, setnote] = useState({ _id: "", etitle: "", edescription: "", etag: "" });
    const [deleteNoteId, setDeleteNoteId] = useState(null);

    const updatenote = (currentnote) => {
        editRef.current.click();
        setnote({ _id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag });
    };

    const handleclick = () => {
        editnote(note._id, note.etitle, note.edescription, note.etag);
        editCloseRef.current.click();
        props.showalert("Note Updated Successfully", "success");
    };

    const onchange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value });
    };

    const onDeleteClick = (note) => {
        setDeleteNoteId(note._id);
        deleteRef.current.click();
    };

    const confirmDelete = () => {
        deletenote(deleteNoteId);
        props.showalert("Note Deleted Successfully", "success");
        deleteCloseRef.current.click();
    };

    return (
        <>
            <AddNote showalert={props.showalert} />

            {/* Hidden Button for Edit Modal */}
            <button type="button" className="btn btn-primary" ref={editRef} style={{ display: 'none' }} data-bs-toggle="modal" data-bs-target="#editModal">
                Launch Edit Modal
            </button>

            {/* Edit Modal */}
            <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className={`modal-content bg-${mode === 'dark' ? 'black' : 'light'} text-${mode === 'dark' ? 'light' : 'dark'} border-${mode === 'dark' ? 'light' : 'dark'}`}>
                        <div className={`modal-header border-bottom border-${mode === 'dark' ? 'light' : 'dark'}`}>
                            <h1 className="modal-title fs-5" id="editModalLabel">Edit Note</h1>
                            <button type="button" className={`btn-close ${mode === 'dark' ? 'btn-close-white' : ''}`} data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className='container my-4'>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input type="text" className={`form-control bg-${mode === 'dark' ? 'black' : 'light'} text-${mode === 'dark' ? 'light' : 'dark'}`} id="etitle" name='etitle' value={note.etitle} onChange={onchange} minLength={1} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <input type="text" className={`form-control bg-${mode === 'dark' ? 'black' : 'light'} text-${mode === 'dark' ? 'light' : 'dark'}`} id="edescription" name='edescription' value={note.edescription} onChange={onchange} minLength={1} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tag" className="form-label">Tag</label>
                                        <input type="text" className={`form-control bg-${mode === 'dark' ? 'black' : 'light'} text-${mode === 'dark' ? 'light' : 'dark'}`} id="etag" name='etag' value={note.etag} onChange={onchange} />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className={`modal-footer border-top border-${mode === 'dark' ? 'light' : 'dark'}`}>
                            <button type="button" ref={editCloseRef} className={`btn btn-${mode === 'dark' ? 'light' : 'secondary'}`} data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length < 1 || note.edescription.length < 1} className="btn btn-primary" onClick={handleclick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hidden Button for Delete Modal */}
            <button type="button" className="btn btn-danger" ref={deleteRef} style={{ display: 'none' }} data-bs-toggle="modal" data-bs-target="#deleteModal">
                Launch Delete Modal
            </button>

            {/* Delete Modal */}
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className={`modal-content bg-${mode === 'dark' ? 'black' : 'light'} text-${mode === 'dark' ? 'light' : 'dark'} border-${mode === 'dark' ? 'light' : 'dark'}`}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="deleteModalLabel">Delete Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this note?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={deleteCloseRef}>No</button>
                            <button type="button" className="btn btn-primary" onClick={confirmDelete}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notes List */}
            <div className='row my-3'>
                <h2 className={`text-${mode === 'dark' ? 'light' : 'dark'}`}>Your Notes</h2>
                <div className={`container mx-1 text-${mode === 'dark' ? 'light' : 'dark'}`}>
                    {notes.length === 0 && 'No notes to display'}
                </div>
                {notes.map((note) => (
                    <Noteitem key={note._id} note={note} updatenote={updatenote} onDeleteClick={onDeleteClick} />
                ))}
            </div>
        </>
    );
}

export default Notes;