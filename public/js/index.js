var socket = io();
socket.on('connect',function(){
  console.log("connected to server");
});

socket.on('newMessage',function(newMsg){
  console.log(newMsg);
  var li = jQuery('<li></li>')
  li.text(`${newMsg.from}: ${newMsg.text}`);
  jQuery('#messages').append(li);
});
socket.on('disconnect',function(){
  console.log("connection to server lost.");
});

jQuery('#message-form').on('submit',function(e){
  e.preventDefault();
  socket.emit('createMessage',{from:"sam",text:jQuery('[name=message]').val()},function(response){
    console.log(response);
  });
});
