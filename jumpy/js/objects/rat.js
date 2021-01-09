/*
 * This file defines the Rat function, which creates and returns a rat sprite. Use: new Rat(x, y)
 */

var Rat = function(x, y, game) {

  // Add rat sprite, top collider and tail
  var rat = game.add.sprite(x, y, "rat");
  rat.topCollider = game.add.sprite(0, 0, null);                // Sprite just for detecting top collision with player
  rat.tail = game.add.sprite(0, 0, "rat"); rat.tail.frame = 2;  // Tail sprite
  rat.anchor.setTo(0.5, 0);
  rat.scale.set(1, 1);

  // Physics setup
  game.physics.arcade.enable([rat, rat.topCollider]);
  rat.body.setSize(16, 5, 0, 0.99);
  rat.body.collideWorldBounds = true;
  rat.body.gravity.setTo(0, 350);
  rat.topCollider.body.setSize(12, 1, 0, 0);

  // Custom variables
  rat.speed = 30;
  rat.body.collidePlayer = true;
  rat.body.collideMap = true;
  rat.enableWalk = false;
  var vel = -rat.speed;         // Velocity/speed buffer for rat

  rat.topCollider.update = function() {
    // Update collider and tail positions
    if (rat.scale.x == -1) rat.topCollider.x = rat.x - 5;
    else rat.topCollider.x = rat.x - 7;
    rat.topCollider.y = rat.y;

    if (rat.scale.x == -1) rat.tail.x = rat.x - 15;
    else rat.tail.x = rat.x + 6;
    rat.tail.y = rat.y;

    // Top collision handling
    if (!player.dead && rat.body.collidePlayer) game.physics.arcade.collide(player, rat.topCollider, topCollision);
  }

  rat.walkCycle = rat.animations.add("walkCycle", [0, 1], 4, true);
  rat.walkCycle.play();
  rat.death = game.add.audio("death");
  rat.death.volume = 0.25;

  rat.update = function() {
    if (rat.x - player.x <= 150) rat.enableWalk = true;

    // Walking behaviour
    if (rat.body.collideMap) game.physics.arcade.collide(rat, layer, function(sprite, tile) {
      if (map.layers[0].data[tile.y][tile.x -1].index == -1 || map.layers[0].data[tile.y][tile.x +1].index == -1) {
        if (rat.scale.x == 1) {
          rat.scale.setTo(-1, 1);
          vel = rat.speed;
        }
        else if (rat.scale.x == -1) {
          rat.scale.setTo(1, 1);
          vel = -rat.speed;
        }
      }
    });

    // Player reset on collision
    if (!player.dead && rat.body.collidePlayer) game.physics.arcade.collide(rat, player, player.fallOver);

    if (rat.enableWalk) rat.body.velocity.x = vel;

    if (rat.body.blocked.left) {
      rat.scale.setTo(-1, 1);
      vel = rat.speed;
    }
    else if (rat.body.blocked.right) {
      rat.scale.setTo(1, 1);
      vel = -rat.speed;
    }
    // End of walking behaviour
  }

  // Collision callbacks
  // Kill rat
  function topCollision() {
    game.stats.addScore(100);

    player.body.velocity.y = -player.const.bounce;
    rat.tail.destroy();
    rat.body.collidePlayer = false;
    rat.scale.y = -1;
    rat.speed = 0;
    vel = 0;
    rat.death.play();
    rat.body.velocity.setTo(0, -100);
    rat.body.collideMap = false;
    rat.body.collideWorldBounds = false;
    rat.topCollider.destroy();
    game.time.events.add(2000, function() {
      rat.destroy();
    });
  }

  return rat;
}
