import React from "react";

export default function Login({
    handleSubmit,
    setUserName
}) {

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                placeholder="Enter a username"
                onChange={(event) => setUserName(event.target.value)}
                required />
            <input type="submit" value="Login" />
        </form>
    )
}