var MessagesView = {

  $chats: $('#chats'),
  
  initialize: function() {
    //creating the message
    MessagesView.renderMessage();
  },

  
  renderMessage: function() {
    //attach message to DOM - needs to be created for each 
    App.fetch(function(data) { 
      for (var i = data.results.length - 1; i >= 0; i--) {
        var message = MessageView.render({
          username: _.escape(data.results[i].username),
          text: _.escape(data.results[i].text),
        });
        MessagesView.$chats.prepend(message);
      }
    });  
  } 
}

// need to add logic to check if message is already on the page, then don't add again
  
