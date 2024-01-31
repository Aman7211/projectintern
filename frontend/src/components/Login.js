import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


export default function Login() {

    const [credentials, setcredentials] = useState({email: "", password: "" })
     let navigate = useNavigate();
     const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:4000/api/v1/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })

        });
        const json = await response.json();
        if (!json.success) {
            alert("Enter Valid Credentials ")
        }
        if (json.success) {
            localStorage.setItem("userEmail", credentials.email);
            localStorage.setItem("authToken",json.authToken);
            console.log(localStorage.getItem("authToken"));
            navigate("/");
        }
    }
       const onchange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
        }

    return (
        <>
          <div>
          <div className='abc bg-primary text-white'>SIGN IN TO SAVE THE DOCUMENT</div>
            </div>
            <div className="container" style={{"marginBottom":"40px", "marginTop":"40px"}}>
                <form onSubmit={handleSubmit} >


                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onchange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onchange} />
                    </div>
                    <button type="submit" className="m-3 btn btn-primary">Submit</button>
                    <Link to="/signup" className='m-3 btn btn-danger'>I'm a new user</Link>
                </form>
            </div>
            <div>

      </div>
        </>
    )
}