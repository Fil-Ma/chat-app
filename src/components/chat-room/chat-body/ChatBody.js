import "./chat-body.css";
import React, { useEffect } from "react";

export default function ChatBody({ roomMessages }) {
    
    useEffect(() => {
        const msgContainer = document.getElementsByClassName("messages-container")[0];
        msgContainer.scrollTop = msgContainer.scrollHeight;
    });

    return (
        <div className="messages-container">
            {   
                roomMessages.length > 0 
                    ? roomMessages.map((message, index) => {
                        let clsName = message.user === "admin" 
                            ? "system-msg message"
                            : "user-msg message"

                        return (
                            <div className={clsName} key={index}>
                                <div className="text">
                                    <p>
                                        {message.text}
                                    </p>
                                </div>
                                <div className="sender">
                                    <p >
                                        &#64;{message.user}
                                    </p>
                                </div>
                            </div>
                        )
                    })
                    : (null)
                
            }
        </div>
    )
}