// AppContent.js
import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Alert from './Alert';
import Login from './Login';
import Signup from './Signup';
import NoteContext from '../context/notes/NoteContext';

function AppContent({ alert, showalert }) {
    const { mode } = useContext(NoteContext);

    useEffect(() => {
        document.body.style.backgroundColor = mode === 'light' ? '#F8F9FA' : 'black';
    }, [mode]);

    return (
        <BrowserRouter>
            <div style={{ zoom: 0.8 }}>
                <Navbar />
                <Alert alert={alert} />
                <div className="container">
                    <Routes>
                        <Route exact path='/' element={<Home showalert={showalert} />} />
                        <Route exact path='/login' element={<Login showalert={showalert} />} />
                        <Route exact path='/signup' element={<Signup showalert={showalert} />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default AppContent;