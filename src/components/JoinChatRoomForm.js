import React from "react";

export default function JoinChatRoomForm({
    handleSubmit,
    setRoom
}) {

    return (
        <form className="join-chat" onSubmit={handleSubmit}>
            <label htmlFor="room-id">Enter the code of the chatroom you want to join:</label>
            <input 
                type="text"
                name="room-id"
                placeholder="Room code"
                onChange={(e) => setRoom(e.target.value)}
                required
                autoFocus />
            <input type="submit" value="Join now" />
        </form>
    )
}