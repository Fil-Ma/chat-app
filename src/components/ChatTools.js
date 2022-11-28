import React from "react";

export default function ChatTools({ 
    users, 
    room,
    handleLeave
}) {
    
    return (
        <aside className="chat-tools">
            <div className="room-general-info">
                <h3>Room: {room}</h3> 
                <button 
                    className="leave-btn" 
                    onClick={handleLeave}
                >Leave</button>
            </div>
            
            <ul>
                {   
                    users.length > 0
                        ? users.map((user, index) => {
                            return (
                                <li key={index}>
                                    {user.name}
                                </li>
                            )
                        })
                        : <h3>No user available</h3>
                }
            </ul>
        </aside>
    )
}