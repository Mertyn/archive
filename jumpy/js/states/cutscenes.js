/**
 * This file defines the gamestates for cutscenes
 */

var cutscenes = {}

cutscenes.transition = function() {}
cutscenes.transition.prototype = {
  preload: function() {
  },

  create: function() {
    // Set up scale and errythin'
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.renderer.renderSession.roundPixels = true;

    game.setBrightness(0);

    // Create and set up light
    light = game.add.sprite(0, 0, "light");
    light.anchor.setTo(0.5);
    light.animations.add("flicker", [0, 1, 0, 1, 1, 0, 1, 0, 0, 1], 5, true).play();

    // Create Map
    // Add tilemap and image
    var map = game.add.tilemap("cutscene_transition", 16, 16);
    map.addTilesetImage("tileset");
    // Add layer
    layer = map.createLayer(0);
    layer.resizeWorld();
    // Set collisions
    map.setCollisionBetween(4, 15);

    // Create and set up player (puppet for cutscene)
    puppet = game.add.sprite(-10, 72, "player_ladder");
    puppet.anchor.setTo(0.5);
    // Define animations
    puppet.walkRight = puppet.animations.add("walkRight", [1, 2, 3, 0, 4, 5, 6, 0], 18, true);
    puppet.climb = puppet.animations.add("climb", [7, 8, 9, 8], 10, true);
    // Enable physics
    game.physics.arcade.enable(puppet);

    game.camera.y = 12;
  },

  update: function() {
    light.position.setTo(puppet.x, puppet.y);

    if (puppet.x >= 104) {
      puppet.body.velocity.x = 0;
      if (!puppet.climb.isPlaying) puppet.climb.play();
      puppet.body.velocity.y = -25;
    }

    else {
      if (!puppet.walkRight.isPlaying) puppet.walkRight.play();
      puppet.body.velocity.x = 50;
    }

    if (puppet.x >= 104 && puppet.y <= -50) {
      game.level.startNext();
    }
  }
}
