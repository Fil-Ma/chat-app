const express = require("express");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./server/users");
const PORT = 4000;
const app = express();

const cors = require("cors");
const { io } = require("socket.io-client");
const http = require("http").Server(app);

app.use(cors());

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3030"
    }
});

socketIO.on('connection', (socket) => {
    console.log(`${socket.id} user just connected!`);

    // handle user connection to room
    socket.on('join', ({ name, room }, callback) => {
        let user;
        try {
            user = addUser({ 
                id: socket.id, 
                name, 
                room
            });
        } catch(err) {
            callback(err);
        }

        // emit message to the user joining
        socket.emit('message', { 
            user: 'admin', 
            text: `${user.name}, welcome to room ${user.room}.` 
        });

        // broadcast message to all users beside the user joining
        socket.broadcast.to(user.room).emit(
            'message', 
            { 
                user: "admin",
                text: `${user.name}, has joined` 
            }
        );

        socket.join(user.room);

        socketIO.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        });
        callback();
    });
  
    //sends the message to all the users on the server
    socket.on('sendMessage', (message, callback) => {
        
        const user = getUser(socket.id);
        socketIO.to(user.room).emit(
            'message', 
            { 
                user: user.name, 
                text: message
            }
        );

        socketIO.to(user.room).emit(
            'roomData',
            {
                room: user.room,
                users: getUsersInRoom(user.room)
            }
        )
        callback();
    });
  
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if (user) {
            io.to(user.room).emit(
                'message',
                {
                    user: 'admin',
                    text: `${user.name} left` 
                }
            )
        }
    });
});

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})