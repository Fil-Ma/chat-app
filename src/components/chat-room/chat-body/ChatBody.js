import "./chat-body.css";
import React, { useEffect } from "react";

export default function ChatBody({ roomMessages, userName }) {
    
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

                        let floatStyle = message.user === userName
                            ? { alignSelf: "flex-end"}
                            : { alignSelf: "flex-start"}

                        return (
                            <div className={clsName} key={index} style={floatStyle}>
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