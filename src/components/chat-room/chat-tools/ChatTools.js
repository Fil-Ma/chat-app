import "./chat-tools.css";
import React, { useContext } from "react";
import { LanguageContext } from "../../../app/contexts/LanguageContext";
import { dictionaryList } from "../../../languages";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

export default function ChatTools({ 
    users, 
    room,
    handleLeave
}) {
    const language = useContext(LanguageContext);

    return (
        <aside className="chat-tools">
            <div className="room-general-info">
                <h4>
                    {
                        dictionaryList[language].chat.tools["room-info"] + ": " + room
                    }
                </h4> 
                <button 
                    className="leave-btn" 
                    onClick={handleLeave}
                >{dictionaryList[language].chat.tools["leave-btn"]}</button>
            </div>

            <ul>
                {   
                    users.map((user, index) => {
                        return (
                            <li key={index}>
                                <FontAwesomeIcon icon={faCircle} size="2xs" /> {user.name}
                            </li>
                        )
                    })
                }
            </ul>
        </aside>
    )
}