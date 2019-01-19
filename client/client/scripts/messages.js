var Messages = {
    $chats: $('#chats'),
    $submit: $('.submit'),

    initialize: function() {
        Messages.$submit.on('click', Messages.handleSubmit);
    },  
 
    handleSubmit: function() {
        //sending to server
        var message = {
              username: App.username,
              text: $("#message").val(),//gets current text typed into input box
              roomname: 'lobby'
        };
        Parse.create(message);//ships off to server 

        
        //on submit - prepend new message to the top of #chats
    
        // pull from the server, only display the most recent messages that aren't already on the page
         
        // var newMessage = MessageView.render({ // 
        //     username: App.username,
        //     text: $("#message").val(),
        // });
        MessagesView.renderMessage();
        // MessagesView.$chats.prepend(newMessage);
       
    },


}
