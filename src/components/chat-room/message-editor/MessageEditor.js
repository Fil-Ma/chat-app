import "./message-editor.css";
import React from "react";

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
            <input type="submit" value="Send" />
        </form>
    )
}