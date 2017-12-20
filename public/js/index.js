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

socket.on('newLocationMessage',function(newMsg){
  console.log(newMsg);
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My Current Location</a>');
  li.text(`${newMsg.from}:`);
  a.attr('href',newMsg.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit',function(e){
  e.preventDefault();
  socket.emit('createMessage',{from:"sam",text:jQuery('[name=message]').val()},function(response){
    console.log(response);
  });
});
var locationButton = jQuery('#send-location');
locationButton.on('click',function(e){
  if(!navigator.geolocation){
    return alert("Geolocation not available in your browser.");
  }
  navigator.geolocation.getCurrentPosition(function(position){
    console.log(position);
    socket.emit('createLocationMessage',{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude,
    });
  },function(){
    alert("unable to fetch geolocation.");
  })
});
