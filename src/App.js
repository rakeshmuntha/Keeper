import { useState } from 'react';
import NoteState from './context/notes/NoteState';
import AppContent from './components/AppContent';

function App() {
    const [alert, setalert] = useState(null);

    const showalert = (message, type) => {
        setalert({ msg: message, type: type });
        setTimeout(() => {
            setalert(null);
        }, 3000);
    };

    return (
        <NoteState>
            <AppContent alert={alert} showalert={showalert} />
        </NoteState>
    );
}

export default App;