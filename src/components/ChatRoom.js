import React from "react";
import ChatBody from "./ChatBody";
import ChatTools from "./ChatTools";
import MessageEditor from "./MessageEditor";

export default function ChatRoom({
    roomMessages,
    room,
    users,
    handleSubmit,
    newMessage,
    setNewMessage
}) {
    
    return (
        <div className="chat-container">
            <div className="chat-body">
                <ChatBody 
                    roomMessages={roomMessages} />
                <MessageEditor 
                    newMessage={newMessage}
                    setNewMessage={setNewMessage}
                    handleSubmit={handleSubmit} />
            </div>
            <ChatTools 
                users={users}
                room={room} />
        </div>
    )
}