$(function () {
// YOUR CODE HERE:
  var app = {};

  app.init = function() {
    return true;
  };

  app.send = function(message) {
    $.ajax({
      // always use this url
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
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
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
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: we suck!');
      }
    });
  };

  app.server = 'https://api.parse.com/1/classes/chatterbox';

  app.getMessages = function(messages) {
    console.log(messages);
    app.clearMessages();
    for(var i = 0; i < 10; i++) {
      if(messages[i].text === undefined || messages[i].text.length >= 0) {
        //messages[i].text = 'Im a loser who doesnt know how to type';
      }
      if (messages[i][0] !== '<' || messages[i].split('function()').length <= 1 || messages[i].split('<script>').length <= 1 || messages[i].split('()').length <= 1 || messages[i].split('prompt()').length <= 1) {
        $('#chats').append('<p>' + messages[i].username + ': ' + messages[i].text + ' ' +
          messages[i].createdAt + '</p>').addClass('.message');
      } else {
        console.log(messages[i].text);
      }
    }
  };

  app.clearMessages = function() {
    $('#chats').empty();
  };

  app.addMessage = function(message) {
    console.log(message);
    $('#chats').append('<p>' + message.username + ': ' + message.text + ' ' +
      message.createdAt +'</p>').addClass('.message');
  };


  app.fetch();

  setInterval(function(){
    app.fetch();
  }, 3000);

  app.addRoom = function(roomName){
    var newOption = ('<option>').text(roomName);
    $('select').append(newOption);
  };

  $('#button').on('click', function(){
    var roomName = alert($(this).val());
    app.addRoom(roomName);
  });



  var username = (document.URL).split('=')[1];
  console.log(username);
  $('#userSubmit').on('click', function() {
    var userInput = $('#userInput').val();
    var userObject = {
      username: username,
      text: userInput,
    };

    app.send(userObject);
    $('#userInput').val('');
  });
});
