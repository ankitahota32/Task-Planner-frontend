import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import './Login.css';

function Login() {

    const history = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submit(e) {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8000/", {
               email,password 
            })
                .then(res => {
                    if (res.data === "exist") {
                    history("/home",{state:{id:email}})
                    }
                    else if(res.data === "Does not exist") {
                    alert("User have not Sign up")
                }
                })
                .catch(e => {
                    alert("Wrong Deatils")
                    console.log(e);
            })
        }
        catch (e){
            console.log(e);
        }
    }


    return (
        <div className="login-container">
            <form action="POST" className="login-form">
            <h1 className="h2"><i>Login</i></h1>
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" name="username" id="username" />
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" name="username" id="username" />

                <button type="submit" onClick={submit}>Login</button>


                <Link to="/signup" className="login-link">Signup Page</Link>
                
            </form>

            



        </div>
    )
}

export default Login