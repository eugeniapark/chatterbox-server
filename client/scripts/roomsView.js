var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function() {
    RoomsView.$button.on('click', Rooms.add)
  },

  renderRoom: function() {
    //when changed room, populate page according to room name
    var template = `<option>${roomname}</option>`;
    RoomsView.$select.append(template);
  }

};
