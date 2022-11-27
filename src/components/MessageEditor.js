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
                placeholder="start texting" />
            <input type="submit" value="Send" />
        </form>
    )
}