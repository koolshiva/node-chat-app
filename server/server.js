const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const message = require('./utils/message');
const validation = require('./utils/validation');
const Users = require('./utils/users');
const http = require('http');
var PUBLICPATH = path.join(__dirname,'../public');
const PORT = process.env.PORT || 3000;
var app = express();
app.use(express.static(PUBLICPATH));
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users.Users();
io.on('connection',(socket)=>{
  console.log("new user connected");
  //check for valid user and room
  socket.on('join',(params,callback)=>{
    if(!validation.isRealString(params.name)||!validation.isRealString(params.room)){
      return callback("Name or Room name is invalid");
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id,params.name,params.room);

    //broadcast updated user list
    io.to(params.room).emit('updatedUserList',users.getUserList(params.room));

    //welcome when a new user joins
    socket.emit('newMessage',message.generateMessage("admin","Welcome to the chat!"));

    //inform users when a new user joins
    socket.broadcast.to(params.room).emit('newMessage',message.generateMessage("admin",`${params.name} has joined`));

    callback();
  });

  //when a socket disconnects
  socket.on('disconnect',()=>{
    //remove user
    var user = users.removeUser(socket.id);
    //broadcast that a user left
    socket.broadcast.to(user.room).emit('newMessage',message.generateMessage("admin",`${user.name} has left.`));
    //broadcast updated user list
    io.to(user.room).emit('updatedUserList',users.getUserList(user.room));
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
