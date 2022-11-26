import React from "react";

export default function Login({
    handleSubmit,
    setUserName
}) {

    return (
        <form className="login" onSubmit={handleSubmit}>
            <label htmlFor="username">Enter a username:</label>
            <input 
                type="text"
                name="username"
                placeholder="Username"
                autoFocus
                onChange={(event) => setUserName(event.target.value)}
                required />
            <input type="submit" value="Login" />
        </form>
    )
}