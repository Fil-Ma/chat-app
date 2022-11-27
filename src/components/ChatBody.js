import React from "react";

export default function ChatBody({ roomMessages }) {
    
    return (
        <div className="messages-container">
            {   
                roomMessages.length > 0 
                    ? roomMessages.map((message, index) => {
                        return (
                            <p key={index}>
                                {message.text}
                            </p>
                        )
                    })
                    : (null)
                
            }
        </div>
    )
}