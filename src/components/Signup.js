import { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import NoteContext from '../context/notes/NoteContext';

function Signup(props) {

    const context = useContext(NoteContext);
    const { mode } = context;

    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    let navigate = useNavigate();
    const host = process.env.REACT_APP_API_URL;

    const handlesubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, cpassword } = credentials
        try {
            if (password !== cpassword) {
                props.showalert("Passwords must be same!", "danger");
            }
            else {
                // API call
                const response = await fetch(`${host}/api/auth/createuser`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name, email, password }),
                });

                const json = await response.json();


                if (json.success) {
                    localStorage.setItem('token', json.authToken);
                    navigate('/');
                    props.showalert("Account Created Successfully", "success");
                }
                else {
                    props.showalert("Invalid Credentials!", "danger");
                }
            }
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
        <div className={`mt-3 bg-${mode === 'dark' ? 'black' : 'light'} text-${mode === 'light' ? 'dark' : 'light'} p-3 rounded`}>
            <form onSubmit={handlesubmit} className='mt-4'>
                <div className="w-50 mx-auto">
                    <h2 className="mb-3">Create an Account</h2>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className={`form-control bg-${mode === 'dark' ? 'black' : 'light'} text-${mode === 'light' ? 'dark' : 'light'}`}
                            id="name"
                            name='name'
                            aria-describedby="emailHelp"
                            value={credentials.name}
                            onChange={onchange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            className={`form-control bg-${mode === 'dark' ? 'black' : 'light'} text-${mode === 'light' ? 'dark' : 'light'}`}
                            id="email"
                            name='email'
                            aria-describedby="emailHelp"
                            value={credentials.email}
                            onChange={onchange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className={`form-control bg-${mode === 'dark' ? 'black' : 'light'} text-${mode === 'light' ? 'dark' : 'light'}`}
                            id="password"
                            name='password'
                            value={credentials.password}
                            onChange={onchange}
                            required
                            minLength={2}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            className={`form-control bg-${mode === 'dark' ? 'black' : 'light'} text-${mode === 'light' ? 'dark' : 'light'}`}
                            id="cpassword"
                            name='cpassword'
                            value={credentials.cpassword}
                            onChange={onchange}
                            required
                            minLength={2}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Signup