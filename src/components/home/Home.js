import "./home.css";
import React, { useEffect } from "react";
import { dictionaryList, languageOptions } from "../../languages";
import welcomeBackgroundImage from "../../resources/welcome-background.png";

export default function Home({ 
    userName, 
    handleLogout,
    handleClickJoin,
    handleClickCreate,
    handleHistoryBackFromRoom,
    language,
    setLanguage
}) {
    
    // check if user clicked back from room
    handleHistoryBackFromRoom();
    
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
                <div className="language-select-container">
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
                </div>
                <button onClick={handleLogout}>Logout</button>
            </header>
            <main>
                <div className="welcome" style={{ backgroundImage: `url(${welcomeBackgroundImage})`}}>
                    <div className="text-container" >
                        <h2>
                            {
                                dictionaryList[language].home["welcome"] + " " + userName + "!"
                            }
                        </h2>
                        <h4>
                            {
                                dictionaryList[language].home["entry-text"]
                            }
                        </h4>
                    </div>
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