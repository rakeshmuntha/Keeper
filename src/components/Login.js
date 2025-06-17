import { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import NoteContext from '../context/notes/NoteContext';

function Login(props) {

    const context = useContext(NoteContext);
    const { mode } = context;

    const [credentials, setcredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();
    const host = process.env.REACT_APP_API_URL;

    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            // API call
            const response = await fetch(`${host}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password }),
            });

            const json = await response.json();
            console.log(json);

            if (json.success) {
                localStorage.setItem('token', json.authToken);
                props.showalert("Logged Successfully", "success");
                navigate('/');
            }
            else { props.showalert("Invalid Credentials!", "danger"); }
        }
        catch (error) {
            console.error('Error deleting note:', error);
        }
    }

    const onchange = (e) => {
        // console.log(e);
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className={`mt-3 bg-${mode} text-${mode === 'light' ? 'dark' : 'light'} p-3 rounded`}>
            <h2>Login to continue to iNoteBook</h2>
            <form onSubmit={handlesubmit} className='my-4'>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className={`form-control bg-${mode} text-${mode === 'light' ? 'dark' : 'light'}`}
                        id="email"
                        name='email'
                        aria-describedby="emailHelp"
                        value={credentials.email}
                        onChange={onchange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className={`form-control bg-${mode} text-${mode === 'light' ? 'dark' : 'light'}`}
                        id="password"
                        name='password'
                        value={credentials.password}
                        onChange={onchange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login