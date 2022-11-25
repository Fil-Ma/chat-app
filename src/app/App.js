import React from "react";
import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:4000');

export default function App() {

    return (
        <h1>This is my title</h1>
    )
}
