/**
 * This file defines and sets up the game object, boot and preload states
 */

var game = null;

init = function() {
  game = new Phaser.Game(177, 100, Phaser.AUTO, null, null, false, false);
  game.state.add("Boot", Boot, true);
  game.state.add("Preload", Preload)
  game.state.add("Main", Main);

  game.level = new LevelManager(game);
  game.stats = new StatTracker(game);

  game.goFull = function() {
    if (game.scale.isFullScreen) game.scale.stopFullScreen();
    else game.scale.startFullScreen();
  };

  game.setBrightness = function(lvl) {
    var colorPalette = ["#204632", "#537F39", "#AEC340", "#D7E894"];
    game.stage.setBackgroundColor(colorPalette[lvl]);
  };

  delete init;
}

var Boot = function() {};

Boot.prototype = {
  preload: function() {
    game.load.spritesheet("progress", "./assets/images/progress.png", 100, 2);
  },

  create: function() {
    // Set up scale and errythin'
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.renderer.renderSession.roundPixels = true;
    game.setBrightness(3);

    game.state.start("Preload");
  },

  update: function() {}
};

// Define preloading/loading screen state
var Preload = function () {};

Preload.prototype = {
  preload: function() {
    // Set up progressbar
    progressBG = game.add.sprite(0, 0, "progress");
    progressBG.anchor.setTo(0.5);
    progressBG.frame = 1;
    progressBG.scale.set(1.02, 2);
    progressBG.position.set(game.width/2, game.height/2);

    progressbar = game.add.sprite(0, 0, "progress");
    progressbar.position.set(38, 49);
    game.load.setPreloadSprite(progressbar);

    // ACTUAL PRELOADING:
    // Load all spritesheets and images
    game.load.path = "./assets/images/";
    game.load.spritesheet("player", "player.png", 16, 16);
    game.load.spritesheet("player_ladder", "player_ladder.png", 16, 16);
    game.load.spritesheet("particle", "particle.png", 1, 1);
    game.load.spritesheet("rat", "rat.png", 16, 6);
    game.load.spritesheet("squirrel", "squirrel.png", 16, 16);
    game.load.image("acorn", "acorn.png");
    game.load.spritesheet("light", "light.png", 32, 32);
    game.load.image("tileset", "tileset.png");

    // Load all maps
    game.load.path = "./assets/maps/";
    game.load.tilemap("level_1", "level_1.csv");
    game.load.tilemap("level_2", "level_2.csv");
    game.load.tilemap("cutscene_transition", "cutscene_transition.csv");
    game.load.tilemap("level_3", "level_3.csv");

    // Load all sounds
    game.load.path = "./assets/sounds/";
    game.load.audio("jump", "jump.wav");
    game.load.audio("death", "death.wav");
    game.load.audio("hit", "hit.wav");
    game.load.audio("explosion", "explosion.wav");

    // Load music
    game.load.path = "./assets/music/";
    game.load.audio("theme", "dj-max-e-05-new-day-fairy-fields.mp3");
  },

  create: function() {
    var levels = [{
      map: "level_1",
      brightness: 0,
      onCreate: lvlFunctions.makeLight
    }, {
      map: "level_2",
      brightness: 0,
      onCreate: lvlFunctions.makeLight
    }, {
      cutscene: true,
      state: cutscenes.transition
    }, {
      map: "level_3",
      update: lvlFunctions.collapseBricks
    }];

    game.level.add(levels, true);

    theme = game.add.audio("theme", 0.15, true);
    theme.play();
  },

  update: function() {}
}

// Global functions
function lastCheck() {
  if (typeof player.gotoLastCheck != "undefined") player.gotoLastCheck();
}

function restart() {
  if (typeof game.level.restart != "undefined") game.level.restart();
}
