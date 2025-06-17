import { useContext, useRef } from 'react'
import NoteContext from '../context/notes/NoteContext';

function Noteitem(props) {

    const context = useContext(NoteContext);
    const { deletenote, mode } = context;
    const { note, updatenote } = props;
    const ref = useRef(null);
    const ref1 = useRef(null);


    const shoulddelete = () => {
        deletenote(note._id);
        props.showalert("Notes Deleted Successfully", "success");
        ref1.current.click();
    }

    const ondelete = () => {
        ref.current.click();
    }

    return (
        <>
            {/* Hidden trigger button for modal */}
            <button
                type="button"
                ref={ref}
                style={{ display: 'none' }}
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
            >
                Launch static backdrop modal
            </button>

            {/* Delete Confirmation Modal */}
            <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className={`modal-content bg-${mode} text-${mode === 'dark' ? 'light' : 'dark'}`}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Delete Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this note?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={ref1}>No</button>
                            <button type="button" className="btn btn-danger" onClick={shoulddelete}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Note Card */}
            <div className='col-md-3'>
                <div className={`card my-3 bg-${mode} text-${mode === 'dark' ? 'light' : 'dark'} border-${mode === 'dark' ? 'light' : 'dark'}`}>
                    <div className="card-body">
                        <div className="d-flex align-items-baseline justify-content-between">
                            <h5 className="card-title">{note.title}</h5>
                            <div>
                                <i className="fa-solid fa-trash mx-2" style={{ cursor: 'pointer' }} onClick={ondelete}></i>
                                <i className="fa-solid fa-pen" style={{ cursor: 'pointer' }} onClick={() => updatenote(note)}></i>
                            </div>
                        </div>
                        <p className="card-text">{note.description}</p>
                        <p className={`card-text text-${mode === 'dark' ? 'secondary' : 'muted'}`}>
                            <small>{note.tag}</small>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Noteitem