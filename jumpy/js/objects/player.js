/**
 * This file defines the player frefab
 */

var Player = function(x, y, game) {
  // Add player and set up his properties
  var player = game.add.sprite(x, y, "player");
  player.anchor.setTo(0.5);
  player.frame = 1;

  // Player constants and variables
  player.const = {
    accel: 200,
    maxSpeed: 90,
    accelVert: 90,
    maxHeight: 25,
    bounce: 150,
    idleDelay: 300,
  };
  player.inputEnabled = true;
  player.direction = 0;   // 0 = right; 1 = left
  player.animationPlaying = false;
  player.justJumped = false;
  player.jumpStart = null;
  player.currentCheckpoint = game.spawn;
  player.dead = false;
  player.idleCounter = 0;

  // Physics setup
  game.physics.arcade.enable(player);
  player.body.setSize(10, 14, 3, 1.99);
  player.body.collideWorldBounds = true;
  player.body.maxVelocity.setTo(player.const.maxSpeed, 200);
  player.body.drag.set(150);
  player.body.gravity.set(0, 350);

  // Create and set up emitter for death on spikes
  player.emitter = game.add.emitter();
  player.emitter.makeParticles("particle", [0, 1, 2], 10, true, true);
  player.emitter.minParticleScale = 3;
  player.emitter.maxParticleScale = 5;
  player.emitter.minRotation = 0; player.emitter.maxRotation = 360;
  player.emitter.gravity = 200;
  player.emitter.forEach(function(child) { child.body.collideWorldBounds = false; }); // Turn off worldbound collision on every particle

  // Define animations
  player.walkRight = player.animations.add("walkRight", [2, 3, 4, 1, 5, 6, 7, 1], 20, true);
  player.walkLeft = player.animations.add("walkLeft", [2+8, 3+8, 4+8, 1+8, 5+8, 6+8, 7+8, 1+8], 20, true);
  player.facePlantRight = player.animations.add("facePlantRight", [8+8, 9+8, 10+8, 11+8, 12+8], 20, false);
  player.facePlantLeft = player.animations.add("facePlantLeft", [8+16, 9+16, 10+16, 11+16, 12+16], 20, false);
  player.idleRight = player.animations.add("idleRight", [21, 21, 21, 22, 21, 21, 22, 21, 21, 21, 21, 22, 21, 22, 21, 21, 21, 22, 21, 21, 22, 21], 2, true);
  player.idleLeft = player.animations.add("idleLeft", [29, 29, 29, 30, 29, 29, 30, 29, 29, 29, 29, 30, 29, 30, 29, 29, 29, 30, 29, 29, 30, 29], 2, true);

  // Define sounds
  player.jump = game.add.audio("jump");
  player.jump.volume = 0.25;
  player.hit = game.add.audio("hit");
  player.hit.volume = 0.5;

  // Input variables
  var input = {
    left: false,
    right: false,
    up: false
  };

  // Check inputs and set correct flag
  player.getInput = function() {
    if (
      wasd.left.isDown ||
      cursors.left.isDown ||
      (game.input.pointer1.isDown && game.input.pointer1.x < 30) ||
      (game.input.pointer2.isDown && game.input.pointer2.x < 30)
    ) input.left = true;
    else input.left = false;

    if (
      wasd.right.isDown ||
      cursors.right.isDown ||
      (game.input.pointer1.isDown && game.input.pointer1.x > 30 && game.input.pointer1.x < 60) ||
      (game.input.pointer2.isDown && game.input.pointer2.x > 30 && game.input.pointer2.x < 60)
    ) input.right = true;
    else input.right = false;

    if (
      wasd.up.isDown ||
      cursors.up.isDown ||
      space.isDown ||
      (game.input.pointer1.isDown && game.input.pointer1.x > 60) ||
      (game.input.pointer2.isDown && game.input.pointer2.x > 60)
    ) input.up = true;
    else input.up = false;
  };

  player.update = function() {
    // Tilemap collision stuffs
    game.physics.arcade.collide(player, layer, function(sprite, tile) {
      // Spike collision (explosion)
      if ( (tile.index == 13 || tile.index == 14) && !player.dead) {
        game.game.stats._deaths++;

        player.dead = true;
        player.inputEnabled = false;
        player.body.velocity.setTo(0);
        player.alpha = 0;

        // Position and fire emitter
        player.emitter.x = player.x; player.emitter.y = player.y;
        player.emitter.start(true, null, null, 10);

        // Play sound and shake camera
        player.hit.play();
        game.camera.shake(0.05, 100);

        game.time.events.add(1000, function() {
          player.emitter.forEachAlive(function(particle) { tween1 = game.add.tween(particle).to({ alpha: 0 }, 500, Phaser.Easing.Linear.Out, true); });
          tween1.onComplete.add(function() {
            player.emitter.forEachAlive(function(particle) { particle.kill(); });
          });
          player.gotoLastCheck();
        });
      }
    });

    player.getInput();

    // Set air frame or ground frame
    if (!player.animationPlaying) {
      if (!player.body.onFloor()) {
        // If facing right frame 0, if facing left frame 8
        if (player.direction == 0) player.frame = 0;
        else if (player.direction == 1) player.frame = 8;
      }

      else if (player.body.velocity.x == 0 && player.body.onFloor()) {
        if (player.direction == 0) player.frame = 1;
        else if (player.direction == 1) player.frame = 9;
      }
    }

    // TODO: make werk
    // Setting checkpoint if at one
    for (var i = 0; i < map.checkpoints.length; i++) {
      if (player.x >= map.checkpoints[i].x -16 && player.x <= map.checkpoints[i].x) {
        player.currentCheckpoint = map.checkpoints[i];
        map.checkpoints = map.checkpoints.filter(function( obj ) {
          return obj.x != map.checkpoints[i].x;
        });
      }
    }

    // End the level
    if (player.x >= map.end) {
      game.camera.unfollow();
      player.body.collideWorldBounds = false;
      input.right = true;

      if (player.x > game.world.bounds.width + 50) {
        game.time.events.add(1000, function() {
          game.game.level.startNext();
        });
      }
    }

    if (player.inputEnabled) player.updateInput();
    else game.physics.arcade.accelerationFromRotation(player.rotation, 0, player.body.acceleration);
  }

  player.updateInput = function() {
    // Controls
    // Right pressed
    if (input.right) {
      // Reset player velocity
      if (player.body.velocity.x < 0) player.body.velocity.x = 0;

      // Accelerate player
      game.physics.arcade.accelerationFromRotation(player.rotation, player.const.accel, player.body.acceleration);

      // Set direction
      player.direction = 0;

      // Reset and play walk animtions
      if (player.animations.currentAnim.name == "walkLeft") player.animations.currentAnim.stop();
      player.walkRight.speed = 20;
      if (!player.walkRight.isPlaying && player.body.onFloor()) player.walkRight.play();
    }

    // Left pressed
    else if (input.left) {
      // Reset player velocity
      if (player.body.velocity.x > 0) player.body.velocity.x = 0;

      // Accelerate player
      game.physics.arcade.accelerationFromRotation(player.rotation, -player.const.accel, player.body.acceleration);

      // Set direction
      player.direction = 1;

      // Reset and play walk animtions
      if (player.animations.currentAnim.name == "walkRight") player.animations.currentAnim.stop();
      player.walkLeft.speed = 20;
      if (!player.walkLeft.isPlaying && player.body.onFloor()) player.walkLeft.play();
    }

    // Nothing pressed
    else {
      // Reset acceleration
      game.physics.arcade.accelerationFromRotation(player.rotation, 0, player.body.acceleration);

      // As long as the player is moving update walkCycle.speed
      if (player.body.velocity.x < 0 || player.body.velocity.x > 0) {
        player.animations.currentAnim.speed = player.body.velocity.x / 5;
      }

      // Player has stopped
      else if ((player.walkLeft.isPlaying || player.walkRight.isPlaying) && player.body.velocity.x == 0) {
        player.animations.currentAnim.stop();
        player.animations.currentAnim.speed = 20;
      }
    }

    // Up pressed
    if (input.up && player.body.onFloor()) {
      player.body.velocity.y = -player.const.accelVert;
      player.justJumped = true;
      player.jumpStart = player.y;
      player.jump.play();
    }
    else if (input.up && player.justJumped && player.y > (player.jumpStart - player.const.maxHeight)) {
      if (player.body.blocked.up) player.justJumped = false;
      player.body.velocity.y = -player.const.accelVert;
    }
    else {
      player.justJumped = false;
    }

    // Nothing pressed at all
    if (!input.left && !input.right && !input.up) {
      player.idleCounter++

      // If the idle counter is over the set number play idle animation for direction
      if (player.idleCounter >= player.const.idleDelay) {
        player.animationPlaying = true;

        if (player.direction == 0 && !player.idleRight.isPlaying) player.idleRight.play();
        else if (player.direction == 1 && !player.idleLeft.isPlaying) player.idleLeft.play();
      }
    }
    // If something gets pressed reset idleCounter
    else {
      player.idleCounter = 0;
      player.animationPlaying = false;
    }

  }; // End of player.update

  // Player death
  player.fallOver = function(enemy) {
    player.dead = true;
    enemy.collidePlayer = false;
    player.body.velocity.setTo(0, 999);
    player.inputEnabled = false;
    player.animationPlaying = true;
    player.hit.play();

    game.game.stats._deaths++;

    if (player.animations.currentAnim.isPlaying) player.animations.currentAnim.stop();
    if (player.direction == 0) {
      player.facePlantRight.speed = 20;
      player.facePlantRight.play();
    }
    else if (player.direction == 1) {
      player.facePlantLeft.speed = 20;
      player.facePlantLeft.play();
    }

    game.time.events.add(1000, function() {
      player.gotoLastCheck();
      game.time.events.add(1000, function() {
        player.dead = false;
        enemy.collidePlayer = true;
      })
    });
  }

  player.gotoLastCheck = function() {
    if (player.x < map.end) lastCheck();
  };

  function lastCheck() {
    // Disable camera follow
    player.inputEnabled = false;
    game.camera.follow(null);

    // Fade player (potentially light) out
    var tween = game.add.tween(player).to( { alpha: 0 }, 200, "Linear", true);
    tween.onComplete.add(function() {
      player.x = player.currentCheckpoint.x; player.y = player.currentCheckpoint.y;
      player.direction = 0

      // Move camera to last checkpoint
      var tween2 = game.add.tween(game.camera).to({
        x: player.currentCheckpoint.x - game.camera.view.halfWidth,
        y: player.currentCheckpoint.y - game.camera.view.halfHeight
      }, 200, "Linear", true);

      tween2.onComplete.add(function() {
        // Fade in player and enable camera follow
        player.frame = 1;
        game.add.tween(player).to( { alpha: 1 }, 200, "Linear", true);
        player.dead = false;
        game.camera.follow(player);
        game.time.events.add(500, function() {
          player.inputEnabled = true;
          player.animationPlaying = false;
        });
      });

    });
  };

  return player;
}
