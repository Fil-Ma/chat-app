import React, { useState, useEffect, Suspense } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { io } from 'socket.io-client';

import PrivateRoute from "../components/PrivateRoute";
import Login from "../components/Login";
import Home from "../components/Home";
import LoadingPage from "../components/LoadingPage";
// lazy imports
const ChatRoom = React.lazy(() => import("../components/ChatRoom"));
const JoinChatRoomForm = React.lazy(() => import("../components/JoinChatRoomForm"));
const NotFound = React.lazy(() => import("../components/NotFound"));

import { checkUsernameTaken, checkRoomExists } from "../api/utils";
import { LanguageContext } from "./contexts/LanguageContext";

const socket = io('http://localhost:4000', { 
    autoConnect: false 
});

export default function App() {
    const [socketIsConnected, setSocketIsConnected] = useState(socket.connected);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // username , room and new message to send in chat
    const [userName, setUserName] = useState("");
    const [room, setRoom] = useState("");
    const [newMessage, setNewMessage] = useState("");

    // messages and users in the room
    const [roomMessages, setRoomMessages] = useState([]);
    const [roomUsers, setRoomUsers] = useState([]);
    
    // errors
    const [loginError, setLoginError] = useState(null);
    const [joinRoomError, setJoinRoomError] = useState(null);

    const [language, setLanguage] = useState(
        localStorage.getItem("language") || "en"
    );
    const navigate = useNavigate();

    // listen to event of type message to refresh messages list
    useEffect(() => {
        socket.on('message', (message) => {
            setRoomMessages(
                [
                    ...roomMessages, 
                    message
                ]
            );
        });
        
        return () => {
            socket.off('message');
        };
      }, [socket, roomMessages]);
    
    // listen to event of type room data to refresh list of users in room
    useEffect(() => {
        socket.on('roomData', ({ users }) => {
            if (users) {
                setRoomUsers(users);
            } else {
                setRoomUsers([])
            }
        });
        
        return () => {
            socket.off('roomData');
        };
    }, [socket, roomUsers]);

    // handle user login
    async function submitLogin(event) {
        event.preventDefault();
        try {
            // check if userName is valid
            if (typeof userName !== "string" || userName.length < 3 || userName.length > 12) {
                throw new Error("Your username must be more than 3 and less than 12 characters long");
            }

            // check if userName already exists
            await checkUsernameTaken(userName);
        } catch(err) {
            setLoginError(err);
            setUserName("");
            return;
        }

        // login
        setIsLoggedIn(true);
        setLoginError(null);
        navigate("/home");
        // socket connection
        if (!socketIsConnected) {
            socket.connect();
            setSocketIsConnected(true);
        }
        
    };

    // handle user logout
    function logout(event) {
        event.preventDefault();
        setUserName("");
        setIsLoggedIn(false);
        navigate("/");
        // disconnect socket
        if (socketIsConnected) {
            socket.disconnect();
            setSocketIsConnected(false);
        }
    };

    // handle click on button "join chatroom"
    function handleClickJoinChatRoom(event) {
        event.preventDefault();
        navigate("/join_chatroom");
    };

    // handle user joining room
    async function handleEnterChatRoom(event) {
        event.preventDefault();
        try {
            const roomInt = parseInt(room);
            if (typeof roomInt !== "number" || roomInt < 1000 || roomInt > 10000) {
                throw new Error("Invalid room code");
            }
            await checkRoomExists(room);

        } catch(err) {
            setJoinRoomError(err);
            setRoom("");
            return;
        }
        
        setJoinRoomError(null);

        socket.emit("join", {name: userName, room}, (error) => {
            if(error) {
                alert(error);
            }
        });
        navigate(`/chat/${room}`);
    };

    // handle creation of a new room
    function handleCreateChatRoom(event) {
        event.preventDefault();
        const roomId = Math.floor(Math.random()*9000) + 1000;
        const newRoom = roomId.toString();
        setRoom(newRoom);
        socket.emit("join", {name: userName, room: newRoom}, (error) => {
            if(error) {
                alert(error);
            }
        });
        navigate(`/chat/${newRoom}`);
    };

    // handle user sending message
    function handleSendMessage(event) {
        event.preventDefault();
        socket.emit("sendMessage", newMessage, (error) => {
            if(error) {
                alert(error);
            }
        });
        setNewMessage("");
    };

    // handle leave room
    function handleClickLeaveRoom(event) {
        event.preventDefault();
        socket.emit("leave");
        // reset states
        setRoom("");
        setRoomMessages([])
        setRoomUsers([]);
        navigate("/home");
    };

    return (
        <Routes>

            <Route 
                path="/" 
                element={
                    <LanguageContext.Provider value={language}>
                        <Login 
                            loginError={loginError}
                            handleSubmit={submitLogin}
                            userName={userName}
                            setUserName={setUserName} />
                    </LanguageContext.Provider>
                } />

            <Route 
                path="/home" 
                element={
                    <PrivateRoute isLoggedIn={isLoggedIn}>
                        <Home 
                            userName={userName} 
                            language={language}
                            setLanguage={setLanguage}
                            handleLogout={logout}
                            handleClickCreate={handleCreateChatRoom}
                            handleClickJoin={handleClickJoinChatRoom} />
                    </PrivateRoute>
                } />

            <Route 
                path="/join_chatroom"
                element={
                    <PrivateRoute isLoggedIn={isLoggedIn}>
                        <LanguageContext.Provider value={language}>
                            <Suspense fallback={<LoadingPage />}>
                                <JoinChatRoomForm
                                    setRoom={setRoom}
                                    room={room}
                                    joinRoomError={joinRoomError} 
                                    handleSubmit={handleEnterChatRoom} />
                            </Suspense>
                        </LanguageContext.Provider>
                    </PrivateRoute>
                } />

            <Route 
                path="/chat/:room"
                element={
                    <PrivateRoute isLoggedIn={isLoggedIn}>
                        <Suspense fallback={<LoadingPage />}>
                            <ChatRoom
                                roomMessages={roomMessages}
                                users={roomUsers}
                                handleLeave={handleClickLeaveRoom}
                                handleSubmit={handleSendMessage}
                                newMessage={newMessage}
                                setNewMessage={setNewMessage} />
                        </Suspense>
                    </PrivateRoute>
                } />
            
            <Route 
                path="*"
                element={ 
                    <Suspense fallback={<LoadingPage />}>
                        <NotFound />
                    </Suspense> 
                } />

        </Routes>
    )
}
