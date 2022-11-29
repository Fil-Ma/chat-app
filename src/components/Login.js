import React, { useContext } from "react";
import { LanguageContext } from "../app/contexts/LanguageContext";
import { dictionaryList } from "../languages";

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
        <form className="login" onSubmit={handleSubmit}>
            <label htmlFor="username">{dictionaryList[language].login["label"]}</label>
            <input 
                type="text"
                name="username"
                placeholder={dictionaryList[language].login["input"]}
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