import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom";
import "./Login.css"
import styled from "styled-components";


const LoginForm = styled.main`
width: 50%;
    border: 1px solid #009A9C;
    border-radius: 10px;
    padding: 47px 100px;
    text-align: center;
    margin: auto;
   
`

export const Login = () => {
    const [loginUser, setLoginUser] = useState({ email: "" })
    const [existDialog, setExistDialog] = useState(false)
    const apiURL = "http://localhost:8088"

    const history = useHistory()

    const handleInputChange = (event) => {
        const newUser = { ...loginUser }
        newUser[event.target.id] = event.target.value
        setLoginUser(newUser)
    }


    const existingUserCheck = () => {
        
        return fetch(`${apiURL}/users?email=${loginUser.email}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists) {
                    
                    sessionStorage.setItem("otoi_user", exists.id)
                    history.push("/")
                } else {
                    setExistDialog(true)
                }
            })
    }

    return (
        <div className="login-body">
        <LoginForm className="container--login">
            <dialog className="dialog dialog--auth" open={existDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={e => setExistDialog(false)}>Close</button>
            </dialog>
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>OTOI</h1>
                    <h4>Please sign in</h4>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            id="email"
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus
                            value={loginUser.email}
                            onChange={handleInputChange} />
                    </fieldset>
                    <fieldset>
                        <button type="submit" className="sign-in">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register" className="register">Register for an account</Link>
            </section>
        </LoginForm>
        </div>
    )
}