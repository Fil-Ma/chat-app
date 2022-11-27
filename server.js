const express = require("express");
const PORT = 4000;
const app = express();

const cors = require("cors");
const { io } = require("socket.io-client");
const http = require("http").Server(app);

const UserService = require("./server/users");
const UserServiceInstance = new UserService();

app.use(cors());

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3030"
    }
});

// handle socket.io operations
socketIO.on('connection', (socket) => {

    socket.on('connect', () => {
        console.log(`${socket.id} user just connected!`);
    });
    
    // handle user connection to room
    socket.on('join', (data) => {
        
        const { name, room } = data;
        const user = UserServiceInstance.addUser({ 
            id: socket.id, 
            name, 
            room
        });

        if (!user) {
            return;
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
            users: UserServiceInstance.getUsersInRoom(user.room)
        });
    });
  
    //sends the message to all the users on the server
    socket.on('sendMessage', (message) => {
        
        const user = UserServiceInstance.getUser(socket.id);
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
                users: UserServiceInstance.getUsersInRoom(user.room)
            }
        )
    });
  
    socket.on('disconnect', () => {
        const user = UserServiceInstance.removeUser(socket.id);
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