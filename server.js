const express = require("express");
const PORT = 4000;
const app = express();

const cors = require("cors");
const http = require("http").Server(app);

app.use(cors());

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3030"
    }
});

socketIO.on('connection', (socket) => {
    console.log(`${socket.id} user just connected!`);
  
    //sends the message to all the users on the server
    socket.on('message', (data) => {
      socketIO.emit('messageResponse', data);
    });
  
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
});

app.get('/', (req, res, next) => {
    res.send("hello")
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})