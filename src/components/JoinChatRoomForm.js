import React from "react";

export default function JoinChatRoomForm({
    handleSubmit,
    setRoom
}) {

    return (
        <form className="join-chat" onSubmit={handleSubmit}>
            <label htmlFor="chat-id">Enter the code of the chatroom you want to join:</label>
            <input 
                type="number"
                name="chat-id"
                placeholder="Chat code"
                onChange={(e) => setRoom(e.target.value)}
                required
                autoFocus />
            <input type="submit" value="Join now" />
        </form>
    )
}