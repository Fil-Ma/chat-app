import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { io } from 'socket.io-client';

import PrivateRoute from "../components/PrivateRoute";
import Login from "../components/Login";
import Home from "../components/Home";
import ChatRoom from "../components/ChatRoom";
import JoinChatRoomForm from "../components/JoinChatRoomForm";

const socket = io('http://localhost:4000');

export default function App() {
    const [socketIsConnected, setSocketIsConnected] = useState(socket.connected);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [joinChatId, setJoinChatId] = useState(0);
    const navigate = useNavigate();

    // handle user login
    function submitLogin(event) {
        event.preventDefault();
        if (userName) {
            setIsLoggedIn(true);
        }
        navigate("/home");
    }

    // handle user logout
    function logout(event) {
        event.preventDefault();
        setUserName("");
        setIsLoggedIn(false);
        navigate("/");
    }

    // handle click on button "join chatroom"
    function handleClickJoinChatRoom(event) {
        event.preventDefault();
        navigate("/join_chatroom");
    }

    function handleSubmitJoinChatRoom(event) {
        event.preventDefault();
        if (typeof joinChatId === "number" && joinChatId !== 0) {
            navigate(`/chat/${joinChatId}`);
        }
    }

    return (
        <Routes>
            <Route 
                path="/" 
                element={
                    <Login 
                        handleSubmit={submitLogin}
                        setUserName={setUserName} />
                } />

            <Route 
                path="/home" 
                element={
                    <PrivateRoute isLoggedIn={isLoggedIn}>
                        <Home 
                            userName={userName} 
                            handleLogout={logout}
                            handleClickJoin={handleClickJoinChatRoom} />
                    </PrivateRoute>
                } />

            <Route 
                path="/join_chatroom"
                element={
                    <PrivateRoute isLoggedIn={isLoggedIn}>
                        <JoinChatRoomForm
                            socket={socket} 
                            setJoinChatId={setJoinChatId}
                            handleSubmit={handleSubmitJoinChatRoom} />
                    </PrivateRoute>
                } />

            <Route 
                path="/chat/:id"
                element={
                    <PrivateRoute isLoggedIn={isLoggedIn}>
                        <ChatRoom
                            socket={socket} />
                    </PrivateRoute>
                } />
        </Routes>
    )
}
