States.Menu = function() {}
States.Menu.prototype = {
  create: function() {
    game.player = {
      name: "",
      car: "taxi",
      color: 0xffffff
    };

    var FONT = {
      image: "coderscrux",
      charWidth: 6,
      charHeight: 9,
      chars: Phaser.RetroFont.TEXT_SET6
    };

    this.title = game.add.sprite(game.width/2, game.height/4, "title");
    this.title.anchor.setTo(0.5);
    // this.title.scale.setTo(10);

    // CHOOSE A NAME:
    this.chooseName = game.add.retroText(game.width/2, game.height/2 - 10, FONT, "choose a name:");
    this.chooseName.anchor.setTo(0.5);

    // JEFF
    this.playerName = game.add.retroText(game.width/2, game.height/2, FONT, "Jeff", game);
    this.playerName.anchor.setTo(0.5);
    this.playerName.tint = 0xffff00;

    // Edit icon
    this.edit = game.add.button(game.width/2 -7, game.height/2 +12, "edit", editName, this, 1, 0, 2);
    this.edit.anchor.setTo(0.5);

    // Random icon
    this.random = game.add.button(game.width/2 +7, game.height/2 +12, "random", randomName, this, 1, 0, 2);
    this.random.anchor.setTo(0.5);

    // Play button
    this.play = game.add.button(game.width/2, game.height - (game.height/3), "play", play, this, 1, 0, 2);
    this.play.anchor.setTo(0.5);

    // Chose name
    function editName() {
      var name = prompt("Type name", this.playerName.getText());
      if (name == "") name = `player${game.rnd.integerInRange(1, 999)}`;
      this.playerName.setText(name);
    }

    // Pick random name
    function randomName() {
      var names = [
        "jeff",
        "speedy black man",
        "finn the noob",
        "pussydestroyer69",
        "dick (richard)",
        "spaceman",
        "unknown",
        "pooplicker888",
        "elon",
        "booperdooper",
        "trump",
        "obama",
        "steve",
        "rick",
        `player${game.rnd.integerInRange(1, 999)}`,
        `driver${game.rnd.integerInRange(1, 999)}`,
        `theoutlaw${game.rnd.integerInRange(1, 999)}`
      ];

      name = game.rnd.pick(names);
      if (name == this.playerName.getText()) randomName();  // Pick again if it's the same name already chosen

      this.playerName.setText(name);
    }

    function play() {
      game.player.name = this.playerName.getText();
      game.state.start("Main");
    }
  }
};
