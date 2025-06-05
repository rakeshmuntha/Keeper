import {useState} from 'react'
import { useNavigate } from "react-router-dom";

function Signup(props) {

    const [credentials, setcredentials] =  useState({name: "", email: "" , password: "", cpassword: ""});
    let navigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();
        const {name, email, password} = credentials
        try {
            // API call
            const response = await fetch(`http://localhost:3000/api/auth/createuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name, email, password}),
            });

            const json = await response.json();
            console.log(json);

            if(json.success)
            {
                localStorage.setItem('token', json.authToken);
                navigate('/');
                props.showalert("Account Created Successfully", "success");
            } 
            else{
                props.showalert("Invalid Credentials!", "danger");
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
        <div className='mt-3'>
            <h2>Create an Account</h2>
            <form onSubmit={handlesubmit} className='mt-4'>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="test" className="form-control" id="name" name='name' aria-describedby="emailHelp" value={credentials.name} onChange={onchange} required/>
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={credentials.email} onChange={onchange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onchange} required minLength={2}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' value={credentials.password} onChange={onchange} required minLength={2}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup