var Squirrel = function(x, y, game) {
  var weapon = game.add.weapon(100, "acorn");

  // Add rat and top collider sprites
  var squirrel = game.add.sprite(x, y, "squirrel");
  squirrel.topCollider = game.add.sprite(0, 0, null);
  squirrel.anchor.setTo(0.5);

  // Set up weapon for shooting acorns
  squirrel.weapon = weapon;
  squirrel.weapon.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
  squirrel.weapon.bulletSpeed = -200;
  squirrel.weapon.fireRate = 0.005;
  squirrel.weapon.fireAngle = 0;
  squirrel.weapon.trackSprite(squirrel, 0, 0);

  // Physics setup
  game.physics.arcade.enable([squirrel, squirrel.topCollider]);
  squirrel.body.setSize(14, 10, 0, 6);
  squirrel.body.collideWorldBounds = true;
  squirrel.body.gravity.setTo(0, 0);
  squirrel.topCollider.body.setSize(10, 2);

  // Custom variables
  squirrel.body.collidePlayer = true;
  squirrel.body.collideMap = true;
  squirrel.shootPlayer = true;
  squirrel.mode = 0;    // 0 = wander; 1 = attack
  squirrel.scanRange = 85;
  squirrel.rndVelocity = 0;
  squirrel.shotTimer = 0;
  squirrel.dead = false;

  game.time.events.loop(Phaser.Timer.SECOND, function() {
    squirrel.rndVelocity = game.rnd.integerInRange(-10, 10);
  }, this);

  squirrel.topCollider.update = function() {
    // Collider and collision updates
    squirrel.topCollider.x = squirrel.x -6;
    squirrel.topCollider.y = squirrel.y -4;
    game.physics.arcade.collide(squirrel.topCollider, player, topCollision);
  }

  // Add animation
  squirrel.shoot = squirrel.animations.add("shoot", [0, 1, 2, 1, 0], 4, false);
  squirrel.shoot.onComplete.add(function() {
    if (squirrel.shootPlayer && !player.dead && !squirrel.dead) squirrel.weapon.fire();
  });

  // Add sound
  squirrel.death = game.add.audio("death");
  squirrel.death.volume = 0.25;

  squirrel.update = function() {
    // Map collision
    if (squirrel.body.collideMap) game.physics.arcade.collide(squirrel, layer);
    // Player reset on collision
    if (!player.dead && squirrel.body.collidePlayer) game.physics.arcade.collide(squirrel, player, player.fallOver);

    // Shot direction
    if (squirrel.scale.x == 1) squirrel.weapon.bulletSpeed = -200;
    else if (squirrel.scale.x == -1) squirrel.weapon.bulletSpeed = 200;

    // Random wander movement
    if (squirrel.mode == 0) {
      if (squirrel.shoot.isPlaying) {
        squirrel.shoot.stop();
        squirrel.frame = 0;
      }

      if (squirrel.body.touching.down) squirrel.body.velocity.setTo(squirrel.rndVelocity, 0);

      if (squirrel.body.velocity.x > 0) squirrel.scale.x = -1;
      else if (squirrel.body.velocity.x <= 0) squirrel.scale.x = 1;

      // If player gets too near, switch to attack mode
      if (Phaser.Math.difference(player.x, squirrel.x) <= squirrel.scanRange) {
        squirrel.body.gravity.setTo(0, 500);
        squirrel.mode = 1;
        squirrel.body.velocity.x = 0;

        // Face player
        if (squirrel.x > player.x) squirrel.scale.setTo(1);
        else squirrel.scale.x = -1;
      }
    }

    // Shoot player
    else if (squirrel.mode == 1 && !player.dead) {
      if (!squirrel.shoot.isPlaying) squirrel.shoot.play();

      // Face player
      if (squirrel.x > player.x) squirrel.scale.x = 1;
      else squirrel.scale.x = -1;

      // If player is too far switch back to wander mode
      if (Phaser.Math.difference(player.x, squirrel.x) > squirrel.scanRange) {
        squirrel.mode = 0;
        if (squirrel.scale.x == 1) squirrel.rndVelocity = game.rnd.integerInRange(0, -10);
        else if (squirrel.scale.x == -1) squirrel.rndVelocity = game.rnd.integerInRange(0, 10);
      }
    }

    else if (squirrel.mode == 1 && player.dead) {
      if (squirrel.shoot.isPlaying) {
        squirrel.shoot.stop();
        squirrel.frame = 0;
      }

      squirrel.mode = 0;
    }

    // Kill bullet on map collision
    game.physics.arcade.collide(squirrel.weapon.bullets, layer, function(bullet) {
      bullet.kill();
    });

    // Kill player on bullet collision
    game.physics.arcade.collide(squirrel.weapon.bullets, player, function(sprite, bullet) {
      // squirrel.shoot.stop();
      bullet.kill();
      player.fallOver({});
    })

  }

  // Kill squirrel
  function topCollision() {
    game.stats.addScore(200);

    squirrel.weapon.bullets.callAll("kill");
    player.body.velocity.y = -player.const.bounce;
    squirrel.body.collidePlayer = false;
    squirrel.scale.y = -1;
    squirrel.death.play();
    squirrel.body.velocity.setTo(0, -100);
    squirrel.body.collideMap = false;
    squirrel.body.collideWorldBounds = false;
    squirrel.topCollider.destroy();
    game.time.events.add(2000, function() {
      squirrel.destroy();
    });
  }

  return squirrel;
}
