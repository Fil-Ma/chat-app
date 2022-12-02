const express = require("express");
const helmet = require("helmet");
// const morgan = require("morgan");
const cors = require("cors");
const Joi = require("joi");
const { param, validationResult } = require("express-validator");

/*
    SETUP SERVER 
*/

const { escapeHtml } = require("./server/utils");
const app = express();
const http = require("http").Server(app);

const UserService = require("./server/users");
const UserServiceInstance = new UserService();

const PORT = 4000;

app.use(cors());
app.use(helmet());
// app.use(morgan("dev"));

/*
    JOI CONFIGURATION FOR SANITIZATION
*/

const userSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(12).required(),
    room: Joi.string().min(4).max(4).required(),
});

const messageSchema = Joi.object({
    message: Joi.string(),
});

/*
    CONFIGURATION SOCKET SERVER
*/

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3030"
    }
});

// handle socket.io operations
socketIO.on('connection', (socket) => {

    // handle socket connection
    socket.on('connect', () => {
        console.log("# --------------------- #");
        console.log("incoming connect event");
        console.log("# --------------------- #");

        console.log(`${socket.id} user just connected!`);
    });
    
    // handle user connection to room
    socket.on('join', (data, callback) => {
        
        console.log("# --------------------- #");
        console.log("incoming join event");
        console.log("# --------------------- #");

        let user = undefined;

        try {
            const { value, error } = userSchema.validate(data);
            if (error) {
                throw new Error(error);
            }
            
            const { name, room } = value;

            user = UserServiceInstance.addUser({ 
                id: socket.id, 
                name, 
                room
            });
            console.log(`a new user is joining room ${user.room}`, user);

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

        } catch(err) {
            callback(err)
        }
    });

    // handle user leaving the room
    socket.on("leave", (callback) => {

        console.log("# --------------------- #");
        console.log("incoming leave event");
        console.log("# --------------------- #");

        try {
            const user = UserServiceInstance.removeUser(socket.id);
            
            console.log(`a user is leaving room ${user.room}`, user);
        
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

            callback();

        } catch(err) {
            callback(err);
        } 
    });
  
    //sends the message to all the users on the server
    socket.on('sendMessage', (messageText, callback) => {
        
        console.log("# --------------------- #");
        console.log("incoming send message event");
        console.log("# --------------------- #");

        const { value, error } = messageSchema.validate({ message: messageText });
        
        if (error) {
            callback(error);
        }

        const user = UserServiceInstance.getUserById(socket.id);
        const safeMessage = escapeHtml(value.message);

        socketIO.to(user.room).emit(
            'message', 
            { 
                user: user.name, 
                text: safeMessage
            }
        );
        
        socketIO.to(user.room).emit(
            'roomData',
            {
                room: user.room,
                users: UserServiceInstance.getUsersInRoom(user.room)
            }
        )

        callback();
    });
    
    // handle socket disconnect
    socket.on('disconnect', () => {

        console.log("# --------------------- #");
        console.log("incoming disconnect event");
        console.log("# --------------------- #");

        const user = UserServiceInstance.removeUser(socket.id);
        if (user) {
            socketIO.to(user.room).emit(
                'message',
                {
                    user: 'admin',
                    text: `${user.name} disconnected` 
                }
            )
        }
    });
});

/*
    /api GET METHODS
*/

// api get request to check if username already exists
app.get(
    '/api/users/:userName', 
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
        const { userName } = req.params;

        try {
            const errors = validationResult(req).array();
            if (errors.length > 0) {
                throw new Error(errors[0].msg);
            }

            const user = UserServiceInstance.getUserByName(userName);
            if (user) {
                throw new Error("User already exists");
            }

            res.status(200).send();

        } catch(err) {
            next(err);
        }
    }
);

// api get request to check if room exists
app.get(
    '/api/rooms/:roomId', 
    [
        param('roomId', 'Invalid room code')
            .trim()
            .escape()
            .isString()
    ],
    (req, res, next) => {
        const { roomId } = req.params;

        try {
            const errors = validationResult(req).array();
            if (errors.length > 0) {
                throw new Error(errors[0].msg);
            }

            const roomInt = parseInt(roomId);
            if (typeof roomInt !== "number" || roomInt < 1000 || roomInt > 10000) {
                throw new Error("Invalid room code");
            } 

            const room = UserServiceInstance.checkIfRoomExists(roomId);
            if (!room) {
                throw new Error("Room does not exists");
            }

            res.status(200).send();

        } catch(err) {
            next(err);
        }
    }
);

// error handler
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

/*
    START SERVER 
*/

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})