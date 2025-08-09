import { useState, useEffect } from 'react';
import NoteState from './context/notes/NoteState';
import AppContent from './components/AppContent';

function App() {
    const [alert, setalert] = useState(null);
    const host = process.env.REACT_APP_API_URL;


    const showalert = (message, type) => {
        setalert({ msg: message, type: type });
        setTimeout(() => {
            setalert(null);
        }, 3000);
    };

    const hitbackend = async () => {
        fetch(`${host}`)
            .then(async (res) => {
                await res.text();
        })
    }

    useEffect(() => {
        hitbackend();
        // eslint-disable-next-line
    }, [])


    return (
        <NoteState>
            <AppContent alert={alert} showalert={showalert} />
        </NoteState>
    );
}

export default App;