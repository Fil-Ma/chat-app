import React, { useContext } from "react";
import { LanguageContext } from "../app/contexts/LanguageContext";
import { dictionaryList } from "../languages";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function JoinChatRoomForm({
    handleSubmit,
    room,
    setRoom,
    joinRoomError
}) {
    const language = useContext(LanguageContext);

    return (
        <form className="join-chat" onSubmit={handleSubmit}>
            <label htmlFor="room-id">{dictionaryList[language]["join-room"].label}</label>
            <input 
                type="text"
                name="room-id"
                placeholder={dictionaryList[language]["join-room"].input}
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
            <input type="submit" value={dictionaryList[language]["join-room"].submit} />
        </form>
    )
}