import React from "react";
import { useParams } from "react-router-dom";

import ChatBody from "./ChatBody";
import ChatTools from "./ChatTools";
import MessageEditor from "./MessageEditor";

export default function ChatRoom({
    roomMessages,
    users,
    handleSubmit,
    handleLeave,
    newMessage,
    setNewMessage
}) {
    const { room } = useParams();
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
                handleLeave={handleLeave}
                users={users}
                room={room} />
        </div>
    )
}