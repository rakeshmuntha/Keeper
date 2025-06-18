import { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

function Noteitem(props) {
    const context = useContext(NoteContext);
    const { mode } = context;
    const { note, updatenote, onDeleteClick } = props;

    return (
        <div className='col-md-3'>
            <div className={`card my-3 bg-${mode === 'dark' ? 'black' :'light'} text-${mode === 'dark' ? 'light' : 'dark'} border-${mode === 'dark' ? 'light' : 'grey'}`}>
                <div className="card-body">
                    <div className="d-flex align-items-baseline justify-content-between">
                        <h5 className="card-title">{note.title}</h5>
                        <div>
                            <i className="fa-solid fa-trash mx-2" style={{ cursor: 'pointer' }} onClick={() => onDeleteClick(note)}></i>
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
    );
}

export default Noteitem;