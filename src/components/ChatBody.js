import React from "react";

export default function ChatBody({ roomMessages }) {
    
    return (
        <div className="messages-container">
            {   
                roomMessages.length > 0 
                    ? roomMessages.map((message) => {
                        return (
                            <p>
                                {message}
                            </p>
                        )
                    })
                    : (null)
                
            }
        </div>
    )
}