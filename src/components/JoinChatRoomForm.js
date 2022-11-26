import React from "react";

export default function JoinChatRoomForm() {

    return (
        <form className="join-chat">
            <label htmlFor="chat-id">Enter the code of the chatroom you want to join:</label>
            <input 
                type="number"
                name="chat-id"
                placeholder="Chat code"
                required
                autoFocus />
            <input type="submit" value="Join now" />
        </form>
    )
}