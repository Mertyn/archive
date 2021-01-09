var game = null;

function init() {
  game = new Phaser.Game(256, 144);
  game.state.add("MainGame", MainGame);
  game.state.start("MainGame");
}

var MainGame = function() {}

MainGame.prototype = {
  preload: function() {
    game.load.spritesheet("player", "assets/img/player.png", 16, 16);
    game.load.spritesheet("particle", "assets/img/particle.png", 1, 1);

    // Map and Tileset
    game.load.tilemap("map", "assets/map/map.csv");
    game.load.image("tileset", "assets/img/tileset.png");
  },

  create: function() {
    // Set up scale and errythin'
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.renderer.renderSession.roundPixels = true;

    //game.stage.backgroundColor = "#e9f7d1";
    game.stage.backgroundColor = "#212121";

    createPlayer();
    createMap();
    map.build(true);

    spaceBar = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    mouse = game.input.mousePointer;
    finger = game.input.pointer1;
  },

  update: function() {

  },

  render: function() {
    // game.debug.body(player);
    // game.debug.text(60, 5, 10);
  }
};

function goFull() {
  if (this.game.scale.isFullScreen) {
    this.game.scale.stopFullScreen();
  }
  else {
    this.game.scale.startFullScreen();
  }
}
