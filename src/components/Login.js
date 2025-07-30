import { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import NoteContext from '../context/notes/NoteContext';

function Login(props) {

    const context = useContext(NoteContext);
    const { mode } = context;
    const [showBanner, setShowBanner] = useState(true);


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

            if (json.success) {
                localStorage.setItem('token', json.authToken);
                props.showalert("Logged Successfully", "success");
                navigate('/');
            }
            else { props.showalert("Invalid Credentials!", "danger"); }
        }
        catch (error) {

        }
    }

    const onchange = (e) => {
        // console.log(e);
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <>
            <div className={`mt-3 bg-${mode === 'dark' ? 'black' : 'light'} text-${mode === 'light' ? 'dark' : 'light'} p-3 rounded`}>
                <form onSubmit={handlesubmit} className='my-4'>
                    <div className="w-50 mx-auto">
                        <h2 className="mb-3">Login to continue to Keeper</h2>
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
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
                {showBanner && (
                    <div
                        className="border rounded shadow text-dark p-3 mt-2 mx-auto"
                        style={{
                            backgroundColor: 'rgb(203, 236, 243)',
                            width: '450px',
                            fontSize: '15px',
                            paddingRight: '20px'
                        }}
                    >
                        <div className="d-flex justify-content-between align-items-start">
                            <div>
                                <strong>Don’t want to sign up right now?</strong><br />
                                Use this temporary demo account to explore the application:<br />

                                <div className="d-flex align-items-center mt-1">
                                    <strong className="me-1">Email:</strong> demoApp@Keeper.com
                                    <button
                                        className="btn btn-sm btn"
                                        onClick={() => navigator.clipboard.writeText('demoApp@Keeper.com')}
                                        title="Copy Email"
                                    >
                                        <i className="fa-solid fa-copy"></i>
                                    </button>
                                </div>

                                <div className="d-flex align-items-center">
                                    <strong className="me-1">Password:</strong> demoApp@1234
                                    <button
                                        className="btn btn-sm btn"
                                        onClick={() => navigator.clipboard.writeText('demoApp@1234')}
                                        title="Copy Password"
                                    >
                                        <i className="fa-solid fa-copy"></i>
                                    </button>
                                </div>

                                <div className="d-flex align-items-center mt-1">
                                Please wait for a moment until the backend starts....
                                </div>
                            </div>

                            <button
                                className="btn-close ms-2"
                                onClick={() => setShowBanner(false)}
                            ></button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Login