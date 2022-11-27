import React from "react";

export default function MessageEditor({ setMessage, handleSubmit }) {

    return (
        <form className="message-editor" onSubmit={handleSubmit}>
            <input 
                type="text"
                onChange={(e) => setMessage(e.target.value)}
                placeholder="start texting" />
            <input type="submit" value="Send" />
        </form>
    )
}