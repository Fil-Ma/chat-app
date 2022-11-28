const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const { param, validationResult } = require("express-validator");

const PORT = 4000;
const app = express();

const cors = require("cors");
const { io } = require("socket.io-client");
const http = require("http").Server(app);

const UserService = require("./server/users");
const UserServiceInstance = new UserService();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

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
    socket.on('join', (data, callback) => {
        
        const { name, room } = data;
        let user;

        try {
            user = UserServiceInstance.addUser({ 
                id: socket.id, 
                name, 
                room
            });
        } catch(err) {
            callback(err)
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

        callback();
    });

    socket.on("leave", () => {

        const user = UserServiceInstance.removeUser(socket.id);
        
        socket.leave(user.room);

        socket.broadcast.to(user.room).emit(
            'message', 
            { 
                user: "admin",
                text: `${user.name}, has left the room` 
            }
        );
        
        socketIO.to(user.room).emit('roomData', {
            room: user.room,
            users: UserServiceInstance.getUsersInRoom(user.room)
        });
    });
  
    //sends the message to all the users on the server
    socket.on('sendMessage', (message) => {
        
        const user = UserServiceInstance.getUserById(socket.id);
        
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

app.get(
    '/api/:userName', 
    [
        param('userName', 'Username must be of min 3, max 12 characters')
            .trim()
            .escape()
            .isString()
            .isLength({ 
                min: 3, 
                max: 12
            })
            .matches(/^[a-z\d]+$/i)
    ],
    (req, res, next) => {
        const { userName } = req.userName;

        try {
            const errors = validationResult(req).array();
            if (errors.length > 0) {
                throw new Error(errors[0].msg);
            }

            const user = UserServiceInstance.getUserByName(userName);
            if (user) {
                throw new Error("User already exists");
            }

            res.status(200).send(user);

        } catch(err) {
            console.log(err)
            next(err);
        }
    }
);

app.use((err, req, res, next) => {
    if (!err.message) {
      return res.status(err.status).send( "An error occured" );
    }

    const { message } = err;
    if (!err.status) {
      return res.status(500).send({ message });
    }

    return res.status(err.status).send({ message });

});


http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})