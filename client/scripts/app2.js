  var addFriend= function(){
    console.log('hey im here');
    var $newFriend = $(this).val();
    alert($newFriend);
    var friendNode = $('<p>'+$newFriend+'</p>');
    $('#friends').append(friendNode);
  };


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





app.addRoom = function(roomName){
  var optionNode = $('<option>')
    .addClass(roomName)
    .text(roomName)
    .attr('selected', 'selected');
  $('select').append(optionNode);
};

app.clearMessages = function() {
    $('#chats').empty();
  };

app.roomStorage = {};
app.friends = {};

// helper functions
var filter = function(roomName) {
  var count = 0;
  var filterMessages = function(messages) {
    _.each(messages, function(message) {
      if (roomName === 'Lobby') {
        renderMessage(message);

        console.log('im undefined' + count);
        count++;
      } else if(message.roomname === roomName) {
        console.log('got in dafilter');
        renderMessage(message);
      }
      if (message.roomname !== undefined || message.roomname !== null) {
        if (app.roomStorage[message.roomname] === undefined) {
          app.roomStorage[message.roomname] = true;
          app.addRoom(message.roomname);
        }
      }
    });
  };
  return filterMessages;

};

var renderMessage = function(message){
  console.log(message);
  var usernameNode = $('<div class=username onClick='+ function(){return addFriend;} +'></div>');
  var textNode = $('<span class=text></span>');
  var dateNode = $('<span class=date></span>');
  var messageNode = $('<div class=message></div>');

  usernameNode.text(message.username + ': ');
  textNode.text(message.text + '');
  dateNode.text(message.createdAt + ' ');
  messageNode.append(usernameNode,textNode,dateNode);
  $('#chats').prepend(messageNode);
};



app.refresh = function() {
  app.fetch(filter());
  setInterval(function() {
    filter();
  }, 3000);
};
app.fetch(filter());
app.refresh();
// event handlers
$(function() {

  $('select').change(function(){
    app.clearMessages();
    var roomName = $(this).val();

    app.fetch(filter(roomName));
  });

  $('#button').on('click', function(){
    var roomName = prompt($(this).val());
    roomName.split(' ').join('');
    app.addRoom(roomName);
  });


});
