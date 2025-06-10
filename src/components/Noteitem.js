import { useContext, useRef } from 'react'
import NoteContext from '../context/notes/NoteContext';

function Noteitem(props) {

    const context = useContext(NoteContext);
    const { deletenote } = context;
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

            <button type="button" ref={ref} style={{ display: 'none' }} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Launch static backdrop modal
            </button>


            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Delete Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure want to delete the notes ?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={ref1}>No</button>
                            <button type="button" className="btn btn-primary" onClick={shoulddelete}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-md-3'>
                <div className="card my-3">
                    <div className="card-body">
                        <div className="d-flex" style={    {alignItems: "baseline"}}>
                            <h5 className="card-title">{note.title}</h5>
                            <i className="fa-solid fa-trash mx-2" onClick={ondelete}></i>
                            <i className="fa-solid fa-pen" onClick={() => { updatenote(note) }}></i>
                        </div>

                        <p className="card-text">{note.description}</p>
                        <p className="card-text">{note.tag}</p>
                        {/* <a href="#" className="btn btn-primary">Go somewjererhere</a> */}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Noteitem