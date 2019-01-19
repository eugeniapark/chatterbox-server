var App = {
  // we feel like this is the model
    // this initializes the functions below

  $spinner: $('.spinner img'),

  username: 'anonymous',

  initialize: function() {
    App.username = window.location.search.substr(10);
    //grabs username from user input

    FormView.initialize();
    RoomsView.initialize();
    MessagesView.initialize();
    Messages.initialize();    

    // Fetch initial batch of messages
    App.startSpinner();
    App.fetch(App.stopSpinner);

  },

  // this method uses Parse.readAll to get data from the server
    //then uses a callback on that data from the server
  fetch: function(callback = ()=>{}) {
    Parse.readAll((data) => {
      // examine the response from the server request:
      // console.log(data);
      callback(data);
    });
  },

  startSpinner: function() {
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function() {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  }
};
