import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {

    let navigate = useNavigate();
    const handleclick = () =>
    {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (

        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNoteBook</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        
                    </ul>

                    {!localStorage.getItem('token') ?
                    <>
                    <Link className="btn btn-outline-light mx-2" to="/login" role="button">Login</Link>
                    <Link className="btn btn-outline-light mx-2" to="/signup" role="button">SignUp</Link>
                    </>
                    // eslint-disable-next-line
                    : <button className="btn btn-dark mx-2" onClick={handleclick} role="button">Logout</button>}
                    
                </div>
            </div>
        </nav>

    )
}

export default Navbar