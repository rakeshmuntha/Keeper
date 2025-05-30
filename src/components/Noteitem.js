import {useContext} from 'react'
import NoteContext from '../context/notes/NoteContext';

function Noteitem(props) {

    const context = useContext(NoteContext);
    const { deletenote } = context;
    const {note, updatenote} = props;

    const handleonclick = () =>
    {
        deletenote(note._id);
    }

    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-trash mx-2" onClick={handleonclick}></i>
                        <i className="fa-solid fa-pen" onClick={() => {updatenote(note)}}></i>
                        </div>

                    <p className="card-text">{note.description}</p>
                    <p className="card-text">{note.tag}</p>
                    {/* <a href="#" className="btn btn-primary">Go somewjererhere</a> */}

                </div>
            </div>
        </div>
    )
}

export default Noteitem