import React, { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import './Singup.css'


function SignUp() {

    const history = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submit(e) {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8000/signup", {
                email, password

            })
                .then(res => {
                    if (res.data === "exist") {
                        alert("User already exists")
                    }
                    else if (res.data.status === "Does not exist") {
                        history("/")

                    }
                })
                .catch(e => {
                    alert("wrong details")
                    console.log(e);
                })

        }
        catch (e) {
            console.log(e);

        }

    }


    return (
        <div className="signup-container">

            <form action="POST" className="signup-form">
                <h1 className="h2"><i>Sign-Up</i></h1>
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" name="username" id="username" />
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" name="password" id="password" />

                <button type="submit" onClick={submit}>Signup</button>

                <Link to="/" className="signup-link">Login Page</Link>

            </form>




        </div>
    )
}

export default SignUp