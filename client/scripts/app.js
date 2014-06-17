$(function () {

  var app = {};
  app.server = 'https://api.parse.com/1/classes/chatterbox';

  app.init = function() {
    app.fetch();
    setInterval(function() {
      app.fetch();
    }, 3000);
  };

  app.send = function(message) {
    $.ajax({
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
        _.extend(message, data);
        app.addMessage(message);
        app.fetch();
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message');
      }
    });
  };

  app.fetch = function() {
    $.ajax({
      // always use this url
      url: app.server,
      type: 'GET',
      data: {order:'-createdAt'},
      success: function (data) {
        console.log('chatterbox: successful');
        app.getMessages(data.results);
        return data.results;
      },
      error: function (data) {
        console.error('chatterbox: failure');
      }
    });
  };


  app.getMessages = function(messages) {
    app.clearMessages();

    for(var i = 0; i < 15; i++) {

      var usernameNode = $('<span class=username></span>');
      var textNode = $('<span class=text></span>');
      var dateNode = $('<span class=date></span>');
      var messageNode = $('<div class=message></div>');

      usernameNode.text(messages[i].username + ': ');
      textNode.text(messages[i].text + '');
      dateNode.text(messages[i].createdAt + ' ');
      messageNode.append(usernameNode,textNode,dateNode);
      $('#chats').append(messageNode);
    }
  };

  app.clearMessages = function() {
    $('#chats').empty();
  };

  app.addMessage = function(message) {
    console.log(message);
    var usernameNode = $('<span class=username></span>');
    var textNode = $('<span class=text></span>');
    var dateNode = $('<span class=date></span>');
    var messageNode = $('<div class=message></div>');

    usernameNode.text(message.username + ': ');
    textNode.text(message.text + '');
    dateNode.text(message.createdAt + ' ');
    $('#chats').prepend(messageNode);
    messageNode.append(usernameNode,textNode,dateNode);
  };

  app.addRoom = function(roomName){
    var optionNode = $('<option>').addClass(roomName)
                                  .text(roomName)
                                  .attr('selected', 'selected');
    $('select').append(optionNode);
  };

  $('#button').on('click', function(){
    var roomName = prompt($(this).val());
    roomName.split(' ').join('');
    app.addRoom(roomName);
  });

  var username = (document.URL).split('=')[1];

  $('#userSubmit').on('click', function() {
    var userInput = $('#userInput').val();
    var userObject = {
      username: username,
      text: userInput,
    };

    app.send(userObject);
    $('#userInput').val('');
  });
  app.init();
});

