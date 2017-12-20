const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const message = require('./utils/message');
const http = require('http');
var PUBLICPATH = path.join(__dirname,'../public');
const PORT = process.env.PORT || 3000;
var app = express();
app.use(express.static(PUBLICPATH));
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket)=>{
  console.log("new user connected");

  //welcome when a new user joins
  socket.emit('newMessage',message.generateMessage("admin","Welcome to the chat!"));

  //inform users when a new user joins
  socket.broadcast.emit('newMessage',message.generateMessage("admin","New User has joined"));

  //when a socket disconnects
  socket.on('disconnect',()=>{
    console.log("user was disconnected.");
  });

  //when a new message is emitted
  socket.on('createMessage',(newMessage,callback)=>{
    var newMsgWithDate = newMessage;
    console.log(newMessage);
    newMsgWithDate.createdAt = new Date();
    io.emit('newMessage',message.generateMessage(newMessage.from,newMessage.text));
    callback();
  });

  socket.on('createLocationMessage',(coords)=>{
    io.emit('newLocationMessage',message.generateLocationMessage('Admin',coords.latitude,coords.longitude));
  });
});

server.listen(PORT,()=>{
  console.log(`chat application running at PORT ${PORT}...`);
})
