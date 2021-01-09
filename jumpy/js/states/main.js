/**
 * This file defines the main gamestate
 */

var Main = function() {}

Main.prototype = {
  init: function(params) {
    // Set parameters and set default values
    if (params.brightness == undefined) params.brightness = 3;

    this.params = params;
  },

  preload: function() {},

  create: function() {
    // If level has onCreate fire it
    if (typeof this.params.onCreate != "undefined") this.params.onCreate();

    // Frame counter stuff
    game.time.advancedTiming = true;
    frameCounter = false;

    // Core setup
    enemies = game.add.group();
    map = new Map(this.params.map, "tileset", this);
    game.setBrightness(this.params.brightness);
    player = new Player(map.spawn.x, map.spawn.y, this);
    game.camera.follow(player);

    // squirrel = new Squirrel(player.x +64, player.y, game);

    // Keys setup
    cursors =  game.input.keyboard.createCursorKeys();
    space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    wasd = {
      up: game.input.keyboard.addKey(Phaser.Keyboard.W),
      left: game.input.keyboard.addKey(Phaser.Keyboard.A),
      right: game.input.keyboard.addKey(Phaser.Keyboard.D)
    };
    pad = game.input.gamepad.pad1;

    // Fullscreen key
    game.input.keyboard.addKey(Phaser.Keyboard.F).onDown.add(game.goFull);

    // Framecounter key
    game.input.keyboard.addKey(Phaser.Keyboard.T).onDown.add(function() {
      if (frameCounter) frameCounter = false;
      else frameCounter = true;
    });

    // Reset key (R = last check; Shift+R = restart state)
    game.input.keyboard.addKey(Phaser.Keyboard.R).onDown.add(function(e) {
      if (e.shiftKey) game.level.restart();
      else player.gotoLastCheck();
    });
  },

  update: function() {
    // If map update function exists launch it
    if (typeof this.params.update != "undefined") this.params.update();
  },

  render: function() {
    if (frameCounter) {
      var color = "#ffffff";
      if (game.time.fps >= 30) color = "#00ff00"
      else if (game.time.fps < 30 && game.time.fps >= 25) color = "#ffff00";
      else if (game.time.fps < 25) color = "#ff0000";
      game.debug.text(game.time.fps, 5, 15, color);
    }

    // game.debug.text(game.stats._score, 5, 15);
    // game.debug.text(game.stats.score, 5, 15*2);

    // game.debug.body(player);
    // game.debug.body(squirrel, "#FF00005F");
    // game.debug.body(squirrel.topCollider, "#0000FF5F");
  }
};
