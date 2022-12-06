import "./login.css";
import React, { useContext } from "react";
import { LanguageContext } from "../../app/contexts/LanguageContext";
import { dictionaryList } from "../../languages";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function Login({
    handleSubmit,
    userName,
    setUserName,
    loginError
}) {
    const language = useContext(LanguageContext);
    
    return (
        <main className="login">
            <form className="login" onSubmit={handleSubmit}>
                <label htmlFor="username">{dictionaryList[language].login["label"]}</label>
                <input 
                    type="text"
                    name="username"
                    placeholder={dictionaryList[language].login["input"]}
                    autoFocus
                    value={userName}
                    title="Only letters and numbers are allowed, no special characters"
                    pattern="^[a-zA-Z0-9-_]+$"
                    onChange={(event) => setUserName(event.target.value)}
                    required />
                { 
                    loginError && (
                        <p className="login-error">
                            <FontAwesomeIcon icon={faTriangleExclamation} /> {loginError.message}
                        </p> 
                    )
                }
                <input 
                    type="submit" 
                    className="dark-blue-background"
                    value="Login" />
            </form>
            <div className="logo-container">
                <div className="logo-image-container">
                    <img src="/images/chat-logo.png" alt="application logo" />
                </div>
                <h2>Chat app</h2>
            </div>
        </main>
    )
}