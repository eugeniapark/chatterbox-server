var Rooms = {
    $room: $(".room"),
    add: function() {
        //adds rooms
        Rooms.$room.on('click', Rooms.handleAdd);
            //`<option value="lobby">${some text inside add room textbox}</option>`

        /*    initialize: function() {
        Messages.$submit.on('click', Messages.handleSubmit);
        */
    },
    
    handleAdd: function() {
      // grab the value from the text box and when clicking Submit, add to the room menu
    }

};