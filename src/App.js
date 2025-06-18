import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import React, { useState } from 'react';

function App() {

    document.body.style.backgroundColor = '#F8F9FA';

    const togglebackground = (mode) => {
        document.body.style.backgroundColor = mode === 'dark' ? '#F8F9FA' : 'black';
    };


    const [alert, setalert] = useState(null);
    const showalert = (message, type) => {
        setalert({ msg: message, type: type });

        setTimeout(() => {
            setalert(null);
        }, 3000);
    }

    return (
        <NoteState>
            <BrowserRouter>
                <div style={{ transform: 'scale(0.8)', transformOrigin: 'top left', width: '125%' }}>
                    <Navbar togglebackground={togglebackground} />

                    <Alert alert={alert} />

                    <div className="container">
                        <Routes>
                            <Route exacts path='/' element={<Home showalert={showalert} />} />
                            <Route exact path='/login' element={<Login showalert={showalert} />} />
                            <Route exact path='/signup' element={<Signup showalert={showalert} />} />
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        </NoteState>
    );
}

export default App;