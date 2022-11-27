import React from "react";

export default function ChatTools({ users, room }) {
    
    return (
        <aside>
            <h3>Room: {room}</h3>
            <ul>
                {   
                    users.length > 0
                        ? users.map((user, index) => {
                            return (
                                <li key={index}>
                                    {user}
                                </li>
                            )
                        })
                        : <h3>No user available</h3>
                }
            </ul>
        </aside>
    )
}