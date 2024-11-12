import React, { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import './Login.css';

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submit(e) {
        e.preventDefault();



        try {
            await axios.post("http://localhost:8000/", {
                email, password
            })
                .then(res => {
                    if (res.data.status === "exist") {
                        const userId = res.data.userId;
                        localStorage.setItem("userId", userId);
                        navigate("/AddTask", { state: { userId } })

                    }
                    else if (res.data.status === "Does not exist") {
                        alert("User have not Signed up")
                    }
                })
                .catch(e => {
                    alert("Wrong Details")
                    console.log(e);
                })
        }
        catch (e) {
            console.log(e);
        }
    }


    return (
        <div className="login-container">
            <form action="POST" className="login-form">
                <h1 className="h2"><i>Login</i></h1>
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" name="username" id="username" />
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="username" name="username" id="password" />

                <button type="submit" onClick={submit}>Login</button>


                <Link to="/signup" className="login-link">Signup Page</Link>

            </form>

        </div>
    )
}

export default Login