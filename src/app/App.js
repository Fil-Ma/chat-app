import React, { useState, useEffect, Suspense } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { io } from 'socket.io-client';

import PrivateRoute from "../components/PrivateRoute";
import Login from "../components/login/Login";
import Home from "../components/home/Home";
import LoadingPage from "../components/loading-screen/LoadingPage";
// lazy imports
const ChatRoom = React.lazy(() => import("../components/chat-room/ChatRoom"));
const JoinChatRoomForm = React.lazy(() => import("../components/join-form/JoinChatRoomForm"));
const NotFound = React.lazy(() => import("../components/not-found-page/NotFound"));

import { dictionaryList } from "../languages";
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

    // language
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
    function submitLogin(event) {
        event.preventDefault();
        try {
            // check if userName is valid
            if (typeof userName !== "string" || userName.length < 3 || userName.length > 12) {
                throw new Error(dictionaryList[language].login["format-error"]);
            }

            // check if userName already exists
            checkUsernameTaken(userName, language);
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


    // handle socket event join
    function handleEmitJoin({ name, room }) {
        socket.emit("join", {name, room}, (error) => {
            if(error) {
                alert(error);
            }
        });
    }

    // handle user joining room
    function handleEnterChatRoom(event) {
        event.preventDefault();
        try {
            const roomInt = parseInt(room);
            if (typeof roomInt !== "number" || roomInt < 1000 || roomInt > 10000) {
                throw new Error(dictionaryList[language]["join-room"]["code-error"]);
            }
            checkRoomExists(room, language);

        } catch(err) {
            setJoinRoomError(err);
            setRoom("");
            return;
        }
        
        setJoinRoomError(null);
        handleEmitJoin({ name: userName, room });
        navigate(`/chat/${room}`);
    };

    // handle creation of a new room
    function handleCreateChatRoom(event) {
        event.preventDefault();
        const roomId = Math.floor(Math.random()*9000) + 1000;
        const newRoom = roomId.toString();
        setRoom(newRoom);
        handleEmitJoin({ name: userName, room: newRoom });
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

    // general utility to handle leave event
    function handleLeave() {
        socket.emit("leave", (error) => {
            if(error) {
                alert(error);
            }
        });
        // reset states
        setRoom("");
        setRoomMessages([])
        setRoomUsers([]);
    };

    // handle click on leave button from chat room
    function handleClickLeaveRoom(event) {
        event.preventDefault();
        handleLeave();
        navigate("/home");
    };

    // handle user clicking back button from chat room
    function handleHistoryBackFromRoom() {
        if (room !== "") {
            handleLeave();
        }
    }

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
                            handleHistoryBackFromRoom={handleHistoryBackFromRoom}
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
                        <LanguageContext.Provider value={language}>
                            <Suspense fallback={<LoadingPage />}>
                                <ChatRoom
                                    roomMessages={roomMessages}
                                    users={roomUsers}
                                    userName={userName}
                                    handleLeave={handleClickLeaveRoom}
                                    handleSubmit={handleSendMessage}
                                    newMessage={newMessage}
                                    setNewMessage={setNewMessage} />
                            </Suspense>
                        </LanguageContext.Provider>
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
