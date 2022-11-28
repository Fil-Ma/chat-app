import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function Login({
    handleSubmit,
    userName,
    setUserName,
    loginError
}) {
    
    return (
        <form className="login" onSubmit={handleSubmit}>
            <label htmlFor="username">Enter a username:</label>
            <input 
                type="text"
                name="username"
                placeholder="Username"
                autoFocus
                value={userName}
                title="Only letters and numbers are allowed, no special characters"
                pattern="^[A-Za-z\d]+$"
                onChange={(event) => setUserName(event.target.value)}
                required />
            { 
                loginError && (
                    <p className="login-error">
                        <FontAwesomeIcon icon={faTriangleExclamation} /> {loginError.message}
                    </p> 
                )
            }
            <input type="submit" value="Login" />
        </form>
    )
}