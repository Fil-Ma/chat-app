import React from "react";
import ChatBody from "./ChatBody";
import ChatTools from "./ChatTools";
import MessageEditor from "./MessageEditor";

export default function ChatRoom() {

    return (
        <div className="chat-container">
            <div className="chat-body">
                <ChatBody />
                <MessageEditor />
            </div>
            <ChatTools />
        </div>
    )
}