import "./chat-room.css";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import ChatBody from "./chat-body/ChatBody";
import ChatTools from "./chat-tools/ChatTools";
import MessageEditor from "./message-editor/MessageEditor";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";

export default function ChatRoom({
    roomMessages,
    users,
    userName,
    handleSubmit,
    handleLeave,
    newMessage,
    setNewMessage
}) {
    const { room } = useParams();
    const [isAsideOpenMobile, setIsAsideOpenMobile] = useState(false);
    const asideMenu = document.getElementsByClassName("chat-tools");
    const openAsideButton = document.getElementsByClassName("mobile-open-aside");

    function handleOpenMenuMobile(event) {
        event.preventDefault();
        if (!isAsideOpenMobile) {
            asideMenu[0].style.display = "block";
            openAsideButton[0].innerHTML = <FontAwesomeIcon icon={faAnglesRight} size="xl" inverse />
        } else {
            asideMenu[0].style.display = "none";
            openAsideButton[0].innerHTML = <FontAwesomeIcon icon={faAnglesLeft} size="xl" inverse />
        }
        
    }

    return (
        <main className="chat-room">
            <div className="chat-container">
                <div className="chat-body">
                    <ChatBody 
                        userName={userName}
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
        </main>
    )
}