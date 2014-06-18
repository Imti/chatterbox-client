// App object functions/methods
var app = {};

app.fetch = function(callback) {
  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    data: {order:'-createdAt'},
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');

      callback(data.results);
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};





// need to add:




app.addRoom = function(roomName){
  var optionNode = $('<option>')
    .addClass(roomName)
    .text(roomName)
    .attr('selected', 'selected');
  $('select').append(optionNode);
};



// helper functions
var filter = function(roomName) {

  var filterMessages = function(messages) {
    _.each(messages, function(message) {
      if (message.roomname === undefined) {
        renderMessage(message);
      } else if(message.roomname === roomName) {
        console.log('got in dafilter');
        renderMessage(message);
      } else {
        console.log('got through da filter');
      }
    });
}
  return filterMessages;

};

var renderMessage = function(message){
  console.log(message);
  var usernameNode = $('<span class=username></span>');
  var textNode = $('<span class=text></span>');
  var dateNode = $('<span class=date></span>');
  var messageNode = $('<div class=message></div>');

  usernameNode.text(message.username + ': ');
  textNode.text(message.text + '');
  dateNode.text(message.createdAt + ' ');
  messageNode.append(usernameNode,textNode,dateNode);
  $('#chats').prepend(messageNode);
};


// event handlers
$(function() {

  $('select').change(function(){
    var roomName = $(this).val();
    app.fetch(filter(roomName));

  });

  $('#button').on('click', function(){
    var roomName = prompt($(this).val());
    roomName.split(' ').join('');
    app.addRoom(roomName);
  });



});
