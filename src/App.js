import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';

function App() {
    return (
        <NoteState>
            <BrowserRouter>
                <Navbar />
                <Alert message="Are you sure want to delete"/>
                <div className="container">
                    <Routes>
                        <Route exact path='/' element={<Home />} />
                        <Route exact path='/about' element={<About />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </NoteState>
    );
}

export default App;