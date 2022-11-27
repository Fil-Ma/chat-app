import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { io } from 'socket.io-client';

import PrivateRoute from "../components/PrivateRoute";
import Login from "../components/Login";
import Home from "../components/Home";
import ChatRoom from "../components/ChatRoom";
import JoinChatRoomForm from "../components/JoinChatRoomForm";
import NotFound from "../components/NotFound";

const socket = io('http://localhost:4000', { 
    autoConnect: false 
});

export default function App() {
    const [socketIsConnected, setSocketIsConnected] = useState(socket.connected);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // username , room and new message to send in chat
    const [userName, setUserName] = useState("");
    const [room, setRoom] = useState(0);
    const [newMessage, setNewMessage] = useState("");

    // messages and users in the room
    const [roomMessages, setRoomMessages] = useState("");
    const [users, setUsers] = useState([]); 

    const navigate = useNavigate();

    // listen to event of type message to refresh messages list
    useEffect(() => {
        socket.on('message', (message) => setRoomMessages(
            [
                ...roomMessages, 
                message
            ]
        ));
      }, [socket, roomMessages]);
    
    // listen to event of type room data to refresh list of users in room
    useEffect(() => {
        socket.on('roomData', ({ roomUsers }) => setUsers(roomUsers));
    }, [socket, users]);

    // handle user login
    function submitLogin(event) {
        event.preventDefault();
        if (userName) {
            setIsLoggedIn(true);
        }
        navigate("/home");
        if (!socketIsConnected) {
            socket.connect();
            setSocketIsConnected(true);
        }
    }

    // handle user logout
    function logout(event) {
        event.preventDefault();
        setUserName("");
        setIsLoggedIn(false);
        navigate("/");
        // disconnect socket
        if (socketIsConnected) {
            socket.disconnect();
            socket.emit("disconnect");
            setSocketIsConnected(false);
        }
    }

    // handle click on button "join chatroom"
    function handleClickJoinChatRoom(event) {
        event.preventDefault();
        navigate("/join_chatroom");
    }

    // handle user joining room
    function handleEnterChatRoom(event) {
        event.preventDefault();
        socket.emit("join", {name: userName, room}, (error) => {
            if(error) {
                alert(error);
            }
        });
        navigate(`/chat/${room}`);
    }

    // handle creation of a new room
    function handleCreateChatRoom(event) {
        event.preventDefault();
        const roomId = Math.floor(Math.random()*9000) + 1000;
        setRoom(roomId);
        navigate(`/chat/${roomId}`);
    }

    // handle user sending message
    function handleSendMessage(event) {
        event.preventDefault();
        socket.emit("sendMessage", newMessage);
        setNewMessage("");
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
                            handleClickCreate={handleCreateChatRoom}
                            handleClickJoin={handleClickJoinChatRoom} />
                    </PrivateRoute>
                } />

            <Route 
                path="/join_chatroom"
                element={
                    <PrivateRoute isLoggedIn={isLoggedIn}>
                        <JoinChatRoomForm
                            setRoom={setRoom}
                            handleSubmit={handleEnterChatRoom} />
                    </PrivateRoute>
                } />

            <Route 
                path="/chat/:room"
                element={
                    <PrivateRoute isLoggedIn={isLoggedIn}>
                        <ChatRoom
                            roomMessages={roomMessages}
                            room={room}
                            users={users}
                            handleSubmit={handleSendMessage}
                            setMessage={setNewMessage} />
                    </PrivateRoute>
                } />
            
            <Route 
                path="*"
                element={ <NotFound /> } />
            
        </Routes>
    )
}
