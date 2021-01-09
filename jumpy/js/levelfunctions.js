var lvlFunctions = {};

lvlFunctions.makeLight = function() {
  // Add a light following the player
  light = game.add.sprite(0, 0, "light");
  light.anchor.setTo(0.5);
  light.rndFrame = 0;
  game.time.events.loop(100, function() {
    light.rndFrame = game.rnd.integerInRange(0, 1);
  }, this);

  light.update = function() {
    light.position.setTo(player.x, player.y);

    if (player.dead && light.alpha == 1) game.add.tween(light).to({ alpha: 0 }, 200, "Linear", true);
    else if (!player.dead && light.alpha != 1) game.add.tween(light).to({ alpha: 1 }, 200, "Linear", true);

    light.frame = light.rndFrame;
  };

  // Drunk mode
  // light.update = function() {
  //   game.add.tween(player).to( { x: player.x, y: player.y }, 200, "Linear", true);
  // };
};

lvlFunctions.collapseBricks = function() {
  if (map.explosion == undefined) {
    map.explosion = game.add.sound("explosion");
    map.explosion.volume = 0.5;
  }

  game.physics.arcade.overlap(player, layer, function(sprite, tile) {
    // console.log(tile.index)
    if (tile.index == 16) {
      // Create and set up emitter for breaking block
      tile.emitter = game.add.emitter(tile.worldX, tile.worldY);
      tile.emitter.makeParticles("particle", [0, 1, 2], 10, true, true);
      tile.emitter.minParticleScale = 5;
      tile.emitter.maxParticleScale = 6;
      tile.emitter.gravity = 250;
      tile.emitter.forEach(function(child) { child.body.collideWorldBounds = false; }); // Turn off worldbound collision on every particle
      tile.soundPlayed = false;

      game.time.events.add(500, function() {
        tile.emitter.start(true, null, null, 10);
        map.putTile(-1, tile.x, tile.y);
        if (!map.explosion.isPlaying && !tile.soundPlayed) {
          tile.soundPlayed = true;
          map.explosion.play();
        }
      });

      game.time.events.add(5000, function() {
        map.putTile(16, tile.x, tile.y);
        delete tile.emitter;
      });
    }
  });

  if (player.x >= map.end) game.level.start(0);
};
