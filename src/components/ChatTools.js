import React, { useContext } from "react";
import { LanguageContext } from "../app/contexts/LanguageContext";
import { dictionaryList } from "../languages";

export default function ChatTools({ 
    users, 
    room,
    handleLeave
}) {
    const language = useContext(LanguageContext);

    return (
        <aside className="chat-tools">
            <div className="room-general-info">
                <h3>
                    {
                        dictionaryList[language].chat.tools["room-info"] + ": " + room
                    }
                </h3> 
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
                                {user.name}
                            </li>
                        )
                    })
                }
            </ul>
        </aside>
    )
}