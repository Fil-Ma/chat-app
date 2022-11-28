import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function JoinChatRoomForm({
    handleSubmit,
    room,
    setRoom,
    joinRoomError
}) {

    return (
        <form className="join-chat" onSubmit={handleSubmit}>
            <label htmlFor="room-id">Enter the code of the chatroom you want to join:</label>
            <input 
                type="text"
                name="room-id"
                placeholder="Room code"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                required
                autoFocus />
            { 
                joinRoomError && (
                    <p className="join-room-error">
                        <FontAwesomeIcon icon={faTriangleExclamation} /> {joinRoomError.message}
                    </p> 
                )
            }
            <input type="submit" value="Join now" />
        </form>
    )
}