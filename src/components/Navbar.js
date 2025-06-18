import { useContext, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NoteContext from '../context/notes/NoteContext';

function Navbar(props) {
    const ref = useRef(null);
    const toggledarkmode = () =>
    {
        ref.current.click();
    }

    let navigate = useNavigate();
    const handleclick = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }
    const context = useContext(NoteContext);
    const { mode, setmode } = context;
    const darkclick = () => {
        setmode(mode === 'dark' ? 'light' : 'dark');
        props.togglebackground(mode);
    }

    return (
        <nav className={`navbar navbar-expand-lg bg-${mode === 'dark' ? 'black' : 'light'} navbar-${mode}`} style={{ boxShadow: mode === 'light' ? '0 4px 8px rgba(109, 108, 108, 0.2)' : '0 4px 8px rgba(205, 204, 204, 0.2)' }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" style={{ fontSize: '1.5rem', padding: '1rem' }}>iNoteBook</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                    </ul>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="21"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        className="bi bi-circle-half"
                        onClick={toggledarkmode}
                        style={{ color: mode === 'dark' ? 'white' : 'black' , cursor: 'pointer', marginRight: '1rem' }}
                    >
                        <path d="M8 15A7 7 0 1 0 8 1zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16" />
                    </svg>
                    {!localStorage.getItem('token') ?
                        <>
                            <Link className={`btn btn-outline-${mode === 'dark' ? 'light' : 'dark'} mx-2`} to="/login" role="button">Login</Link>
                            <Link className={`btn btn-outline-${mode === 'dark' ? 'light' : 'dark'} mx-2`} to="/signup" role="button">SignUp</Link>
                        </>
                        // eslint-disable-next-line
                        : <button className={`btn btn-outline-${mode === 'dark' ? 'light' : 'dark'} mx-2`} onClick={handleclick} role="button">Logout</button>}

                    <div className={`form-check form-switch text-dard`} style={{ display: 'none' }}>
                        <input style={{ display: 'none' }} ref={ref} className="form-check-input" type="checkbox" onClick={darkclick} role="switch" id="switchCheckDefault" defaultChecked />
                    </div>

                </div>
            </div>
        </nav>

    )
}

export default Navbar