States.Closed = function() {}
States.Closed.prototype = {
  create: function() {
    this.message = game.add.retroText(game.width/2, game.height/2, game.fonts.coderscrux, "the server closed", game);
    this.message.anchor.setTo(0.5);
  },

  update: function() {
  }
};
