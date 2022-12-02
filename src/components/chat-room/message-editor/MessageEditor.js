import "./message-editor.css";
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";

export default function MessageEditor({ 
    setNewMessage, 
    newMessage,
    handleSubmit 
}) {

    return (
        <form className="message-editor" onSubmit={handleSubmit}>
            <input 
                type="text"
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
                autoFocus
                placeholder="Text" />
            <button type="submit">
                <FontAwesomeIcon icon={faLocationArrow} size="xl" />
            </button>
        </form>
    )
}