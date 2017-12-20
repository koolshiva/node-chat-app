var socket = io();
socket.on('connect',function(){
  var params = jQuery.deparam(window.location.search);
  socket.emit('join',params,function(err){
    if(err){
      alert("valid name and room name are required");
      window.location.href = "/";
    }else{
      console.log("no errors");
    }
  });
});

socket.on('updatedUserList',function(users){
  var ol = jQuery('<ol></ol>');
  users.forEach(function(user){
    ol.append(jQuery('<li></li>').text(user));
  });
  jQuery("#users").html(ol);
});

function scrollToBottom(){
  //selectors
  var messages = jQuery("#messages");
  var newMessage = messages.children('li:last-child');
  //heights
  var clientHeight = messages.prop('clientHeight');
  var scrollHeight = messages.prop('scrollHeight');
  var scrollTop = messages.prop('scrollTop');
  var newMsgHeight = newMessage.innerHeight();
  var prevMsgHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMsgHeight + prevMsgHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }

}

socket.on('newMessage',function(newMsg){
  console.log(newMsg);
  var formattedTime = moment(newMsg.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  newMsg.createdAt=formattedTime;
  var html = Mustache.render(template,newMsg);
  jQuery('#messages').append(html);
  scrollToBottom();
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
  scrollToBottom();
});

jQuery('#message-form').on('submit',function(e){
  e.preventDefault();
  var textBox = jQuery('[name=message]');
  socket.emit('createMessage',{text:textBox.val()},function(){
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
