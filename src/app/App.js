import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { io } from 'socket.io-client';

import PrivateRoute from "../components/PrivateRoute";
import Login from "../components/Login";
import Home from "../components/Home";
import Chat from "../components/Chat";

const socket = io('http://localhost:4000');

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();

    function submitLogin(event) {
        event.preventDefault();
        if (userName) {
            setIsLoggedIn(true);
        }
        navigate("/home");
    }

    function logout(event) {
        event.preventDefault();
        setUserName("");
        setIsLoggedIn(false);
        navigate("/");
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
                            handleLogout={logout} />
                    </PrivateRoute>
                } />

            <Route 
                path="/chat/:id"
                element={
                    <PrivateRoute isLoggedIn={isLoggedIn}>
                        <Chat 
                            socket={socket} />
                    </PrivateRoute>
                } />
        </Routes>
    )
}
