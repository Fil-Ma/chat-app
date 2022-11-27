import React from "react";
import ChatBody from "./ChatBody";
import ChatTools from "./ChatTools";
import MessageEditor from "./MessageEditor";

export default function ChatRoom({
    roomMessages,
    room,
    users,
    handleSubmit,
    setMessage
}) {

    return (
        <div className="chat-container">
            <div className="chat-body">
                <ChatBody 
                    roomMessages={roomMessages} />
                <MessageEditor 
                    setMessage={setMessage}
                    handleSubmit={handleSubmit} />
            </div>
            <ChatTools 
                users={users}
                room={room} />
        </div>
    )
}