var createPlayer = function() {
  // Add player and set up his properties
  player = game.add.sprite(176, 72, "player");
  player.anchor.setTo(0.5);
  player.frame = 1;

  // Custom variables
  player.onPlatform = false;
  player.justJumped = false;
  player.speed = 85;
  player.score = Math.floor( (player.x - 176) / 10);

  // States
  player.states = {
    START: 0,
    WALKING: 1,
    DEAD: 2
  };
  player.state = player.states.START;

  // Kill function
  player.killl = function() {
    player.frame = 0;
    death.play();
    player.state = player.states.DEAD;
  }

  game.physics.arcade.enable(player);
  player.body.setSize(10, 14, 3, 2);
  player.body.collideWorldBounds = true;
  player.body.gravity.y = 300;

  // Animations
  walkCycle = player.animations.add("walkcycle", [1, 2, 3, 4, 1, 5, 6, 7], 20, true);
  walkCycle.play();
  death = player.animations.add("death", [8, 9, 10, 11, 12], 20, false);
  // 15, 16 for blood

  // Create and set up emitter for death on spikes
  player.emitter = game.add.emitter();
  player.emitter.makeParticles("particle", [0, 1, 2], 10, true, true);
  player.emitter.minParticleScale = 1;
  player.emitter.maxParticleScale = 4;
  player.emitter.minRotation = 0; player.emitter.maxRotation = 0;
  player.emitter.gravity = 250;

  player.update = function() {
    // Collision
    player.onPlatform = false;
    game.physics.arcade.collide(player, layer, function(sprite, tile) {

      if (sprite.body.blocked.down) {
        player.onPlatform = true;
      }

      if (tile.index == 4) {
        player.kill();
        player.state = player.states.DEAD;
        player.emitter.x = player.x; player.emitter.y = player.y;
        player.emitter.start(true, null, null, 10);
        game.camera.shake(0.0000001, 250);
      }

    });

    game.physics.arcade.collide(layer, player.emitter);

    // Pasting and generating new
    if (player.x >= trigger && player.x <= trigger + 16) {
      map.paste();
      map.build(false);
    }

    // START state
    if (player.state == player.states.START) {
      player.body.velocity.x = 0;

      if (player.onPlatform) {
        player.frame = 1;
      }
      else {
        player.frame = 0;
      }

      // Jump/starting
      if ((spaceBar.isDown || mouse.isDown || finger.isDown) && player.onPlatform) {
        player.body.velocity.y = -150;
        player.frame = 0;

        game.time.events.add(0.1, function() {
          player.justJumped = true;
        }, this);

        game.add.tween(game.camera).to( { x: player.x - 128 }, 1000, Phaser.Easing.Cubic.Out, true);
      }

      if (player.onPlatform && player.justJumped) {
        player.state = player.states.WALKING;
        game.camera.follow(player);

        player.justJumped = false;
        walkCycle.play();
      }

    }

    // WALKING state
    else if (player.state == player.states.WALKING) {

      player.body.velocity.x = player.speed;
      // player.speed += player.speed * 0.001;

      // Jumping
      if ((spaceBar.isDown || mouse.isDown || finger.isDown) && player.onPlatform) {
        player.body.velocity.y = -90;
        player.justJumped = true;

        walkCycle.stop();
        player.frame = 0;
      }
      else if ((spaceBar.isDown || mouse.isDown || finger.isDown) && player.justJumped && player.y > 50) {
        player.body.velocity.y = -90;
      }
      else {
        player.justJumped = false;
      }

      if (player.onPlatform && !player.justJumped && !walkCycle.isPlaying) {
        walkCycle.play();
      }

      if (player.y >= 78) {
        walkCycle.stop();
        player.frame = 0;
      }

      // Death
      if (player.y >= 136) {
        player.frame = 0;
        death.play();
        player.state = player.states.DEAD;
      }

    }

    // DEAD state
    else if (player.state == player.states.DEAD) {
      player.body.velocity.x = 0;
      game.camera.follow(null);

      // On pressing jump
      if (spaceBar.isDown || mouse.isDown || finger.isDown) {
        // Reset Player
        player.frame = 1;
        player.revive();
        player.x = 176; player.y = -16;

        // Particles disappearing
        player.emitter.forEachAlive(function(particle) { tween1 = game.add.tween(particle).to({ alpha: 0 }, 500, Phaser.Easing.Linear.Out, true); });
        tween1.onComplete.add(function() {
          player.emitter.forEachAlive(function(particle) { particle.kill(); });
        });

        // Camera movement
        tween2 = game.add.tween(game.camera).to({ x: player.x - 128 }, 1000, Phaser.Easing.Cubic.Out, true);
        tween2.onComplete.add(function() {
          record = [];
          map.build(true);
        });
        player.state = player.states.START;

      }
    }
  }
}
