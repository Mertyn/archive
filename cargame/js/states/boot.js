var game = null;

window.onload = function() {
  // game = new Phaser.Game(256, 244, Phaser.AUTO, null, null, false, false);
  game = new Phaser.Game(434, 244, Phaser.AUTO, null, null, false, false);
  game.state.add("Boot", States.Boot, true)
  game.state.add("Preload", States.Preload);
  game.state.add("Menu", States.Menu);
  game.state.add("Main", States.Main);
  game.state.add("Closed", States.Closed);

  window.onload = undefined;
}

States.Boot = function() {}
States.Boot.prototype = {
  preload: function() {
    // TODO: Load loading bar
  },

  create: function () {
    // Set up scale and errythin'
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.stage.disableVisibilityChange = true;
    game.stage.setBackgroundColor("#249FDE");

    // Keys setup
    inputs = {
      cursors:  game.input.keyboard.createCursorKeys(),
      wasd: {
        up: game.input.keyboard.addKey(Phaser.Keyboard.W),
        left: game.input.keyboard.addKey(Phaser.Keyboard.A),
        down: game.input.keyboard.addKey(Phaser.Keyboard.S),
        right: game.input.keyboard.addKey(Phaser.Keyboard.D)
      },
      space: game.input.keyboard.addKey(Phaser.Keyboard.SPACE)
    };

    // Socket client setup
    // game.client = new Client("192.168.2.113:8080", game);
    // game.client = new Client("localhost:8080", game);

    // Add plugins
    game.plugins.add(Phaser.Plugin.Retrotext);
    game.plugins.add(Phaser.Plugin.Client);

    // Start Preload
    game.state.start("Preload");
  }
};


States.Preload = function() {}
States.Preload.prototype = {
  preload: function() {
    // Load spritesheets
    game.load.path = "./assets/images/sprites/";
    game.load.spritesheet("taxi", "taxi.png", 19, 12);
    game.load.spritesheet("taxi_rotated", "taxi_rotated.png", 10, 19);
    game.load.spritesheet("vette", "vette.png", 12, 25);

    // Load ui images
    game.load.path = "./assets/images/ui/";
    game.load.image("title", "title.png");
    game.load.spritesheet("edit", "edit.png", 10, 10);
    game.load.spritesheet("random", "random.png", 10, 10);
    game.load.spritesheet("play", "play.png", 40, 14);

    // Load Retrofont images
    game.load.path = "./assets/fonts/";
    game.load.image("coderscrux", "coderscrux.png");
    game.load.image("smol", "smol.png");
  },

  create: function() {
    game.state.start("Menu");
  }
};
