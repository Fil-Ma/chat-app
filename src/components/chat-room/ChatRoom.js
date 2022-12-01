import "./chat-room.css";
import React from "react";
import { useParams } from "react-router-dom";

import ChatBody from "./chat-body/ChatBody";
import ChatTools from "./chat-tools/ChatTools";
import MessageEditor from "./message-editor/MessageEditor";

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