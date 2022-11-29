import React, { useEffect } from "react";
import { dictionaryList, languageOptions } from "../languages";
import ChatRoom from "./ChatRoom";

export default function Home({ 
    userName, 
    handleLogout,
    handleClickJoin,
    handleClickCreate,
    language,
    setLanguage
}) {
    
    // handle language selection
    function handleLanguageSelection(event) {
        setLanguage(event.target.value)
    }

    // set language in local storage when it changes
    useEffect(() => {
        localStorage.setItem("language", language);
    }, [language]);

    return (
        <div className="home-container">
            <header>
                <label htmlFor="language-selection">{dictionaryList[language].home["select"]}</label>
                <select 
                    name="language-selection" 
                    value={language}
                    onChange={handleLanguageSelection}>
                    {
                        Object.keys(languageOptions).map((languageKey, index) => {
                            return (
                                <option value={languageKey} key={index}>
                                    {languageOptions[languageKey]}
                                </option>
                            )
                        })
                    }
                </select>
                <button onClick={handleLogout}>Logout</button>
            </header>
            <main>
                <div className="welcome">
                    <h2>
                        {
                            dictionaryList[language].home["welcome"] + " " + userName + dictionaryList[language].home["entry-text"]
                        }
                    </h2>
                </div>
                <div className="utilities">
                    <button 
                        onClick={handleClickCreate}
                    >{dictionaryList[language].home["start-room-btn"]}</button>
                    <button
                        onClick={handleClickJoin}
                    >{dictionaryList[language].home["join-room-btn"]}</button>
                </div>
            </main>
        </div>
    )
}