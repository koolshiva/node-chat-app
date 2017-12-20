var socket = io();
socket.on('connect',function(){
  console.log("connected to server");
});

socket.on('newMessage',function(newMsg){
  console.log(newMsg);
  var formattedTime = moment(newMsg.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  newMsg.createdAt=formattedTime;
  var html = Mustache.render(template,newMsg);
  jQuery('#messages').append(html);
});
socket.on('disconnect',function(){
  console.log("connection to server lost.");
});

socket.on('newLocationMessage',function(newMsg){
  console.log(newMsg);
  var formattedTime = moment(newMsg.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  newMsg.createdAt=formattedTime;
  var html = Mustache.render(template,newMsg);
  jQuery('#messages').append(html);
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
