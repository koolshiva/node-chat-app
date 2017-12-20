var socket = io();
socket.on('connect',function(){
  console.log("connected to server");
});

socket.on('newMessage',function(newMsg){
  console.log(newMsg);
  var formattedTime = moment(newMsg.createdAt).format('h:mm a');
  var li = jQuery('<li></li>')
  li.text(`${newMsg.from} @ ${formattedTime}: ${newMsg.text}`);
  jQuery('#messages').append(li);
});
socket.on('disconnect',function(){
  console.log("connection to server lost.");
});

socket.on('newLocationMessage',function(newMsg){
  console.log(newMsg);
  var formattedTime = moment(newMsg.createdAt).format('h:mm a');
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My Current Location</a>');
  li.text(`${newMsg.from} @ ${formattedTime}: `);
  a.attr('href',newMsg.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit',function(e){
  e.preventDefault();
  var textBox = jQuery('[name=message]');
  socket.emit('createMessage',{from:"sam",text:textBox.val()},function(){
    textBox.val('');
  });
});
var locationButton = jQuery('#send-location');
locationButton.on('click',function(e){
  if(!navigator.geolocation){
    return alert("Geolocation not available in your browser.");
  }
  locationButton.attr('disabled','disabled').text('Sending Location...');
  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send Location');;
    socket.emit('createLocationMessage',{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude,
    });
  },function(){
    alert("unable to fetch geolocation.");
    locationButton.removeAttr('disabled').text('Send Location');
  })
});
