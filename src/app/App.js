import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import socketIO from 'socket.io-client';

import PrivateRoute from "../components/PrivateRoute";
import Login from "../components/Login";
import Home from "../components/Home";
import Chat from "../components/Chat";

const socket = socketIO.connect('http://localhost:4000');

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");

    function submitLogin(event) {
        event.preventDefault();
        if (userName) {
            setIsLoggedIn(true);
        }
    }

    return (
        <div className="app-container">
            <BrowserRouter>
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
                                userName={userName} />
                        </PrivateRoute>
                    } />

                <Route 
                    path="/chat/:id"
                    element={
                        <PrivateRoute isLoggedIn={isLoggedIn}>
                            <Chat />
                        </PrivateRoute>
                    } />

            </BrowserRouter>
        </div>
    )
}
