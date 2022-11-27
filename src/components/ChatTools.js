import React from "react";

export default function ChatTools({ users, room }) {

    return (
        <aside>
            <h3>Room: {room}</h3>
            <ul>
                {
                    users.map((user) => {
                        return (
                            <li>
                                {user}
                            </li>
                        )
                    })
                }
            </ul>
        </aside>
    )
}