/*
This file defines the createnpc function, which creates and returns a npc sprite
@author DasMaennel
*/

var NPC = function(x, y, game) {
  // Add npc and set up his properties
  var npc = game.add.sprite(x, y, "player");
  npc.anchor.setTo(0.5);
  npc.frame = 1;

  // npc constants
  npc.const = {
    accel: 250,
    maxSpeed: 100,
    accelVert: -200
  };
  npc.direction = 0;

  // Physics setup
  game.physics.arcade.enable(npc);
  npc.body.setSize(8, 14, 4, 2);
  npc.body.collideWorldBounds = true;
  npc.body.maxVelocity.x = npc.const.maxSpeed;
  npc.body.maxVelocity.y = 200;
  npc.body.drag.set(150);
  npc.body.gravity.y = 350;

  // Define animations
  npc.walkRight = npc.animations.add("walkRight", [2, 3, 4, 1, 5, 6, 7, 1], 20, true);
  npc.walkLeft = npc.animations.add("walkLeft", [2+8, 3+8, 4+8, 1+8, 5+8, 6+8, 7+8, 1+8], 20, true);
  // npc.death = npc.animations.add("death", [8, 9, 10, 11, 12], 20, false);  // 15, 16 for blood


  // Input stuff
  npc.input = {
    left: false,
    right: false,
    up: false
  };

  npc.timer = game.time.create(false);
  npc.timer.loop(2000, function() {
    var input = npc.input;
    var num = game.rnd.integerInRange(1, 3);

    if (num == 1) input.left = true;
    else input.left = false;

    if (num == 2) input.right = true;
    else input.right = false;

    if (num == 3) input.up = true;
    else input.up = false;
  }, this);
  npc.timer.start();


  npc.update = function() {
    game.physics.arcade.collide(npc, layer);

    // Set air frame or ground frame
    if (!npc.body.onFloor()) {
      // If right frame 0, if left frame 1
      if (npc.direction == 0) npc.frame = 0;
      else if (npc.direction == 1) npc.frame = 8;
    }

    else if (npc.body.velocity.x == 0 && npc.body.onFloor()) {
      if (npc.direction == 0) npc.frame = 1;
      else if (npc.direction == 1) npc.frame = 9;
    }

    // Controls
    // Right pressed
    if (npc.input.right) {
      // Reset npc velocity
      if (npc.body.velocity.x < 0) npc.body.velocity.x = 0;

      // Accelerate npc
      game.physics.arcade.accelerationFromRotation(npc.rotation, npc.const.accel, npc.body.acceleration);

      // Set direction
      npc.direction = 0;

      // Reset and play walk animtions
      if (npc.animations.currentAnim.name == "walkLeft") npc.animations.currentAnim.stop();
      npc.walkRight.speed = 20;
      if (!npc.walkRight.isPlaying && npc.body.onFloor()) npc.walkRight.play();
    }

    // Left pressed
    else if (npc.input.left) {
      // Reset npc velocity
      if (npc.body.velocity.x > 0) npc.body.velocity.x = 0;

      // Accelerate npc
      game.physics.arcade.accelerationFromRotation(npc.rotation, -npc.const.accel, npc.body.acceleration);

      // Set direction
      npc.direction = 1;

      if (npc.animations.currentAnim.name == "walkRight") npc.animations.currentAnim.stop();
      npc.walkLeft.speed = 20;
      if (!npc.walkLeft.isPlaying && npc.body.onFloor()) npc.walkLeft.play();
    }

    // Nothing pressed
    else {
      // Reset acceleration
      game.physics.arcade.accelerationFromRotation(npc.rotation, 0, npc.body.acceleration);

      // As long as the npc is moving update walkCycle.speed
      if (npc.body.velocity.x < 0 || npc.body.velocity.x > 0) {
        // npc.animations.currentAnim.speed = npc.body.velocity.x / 5;
      }

      // npc has stopped
      else if ((npc.walkLeft.isPlaying || npc.walkRight.isPlaying) && npc.body.velocity.x == 0) {
        npc.animations.currentAnim.stop();
        npc.animations.currentAnim.speed = 20;
        // npc.frame = 1;
      }
    }

    // Up pressed
    if (npc.input.up && npc.body.onFloor()) {
      npc.body.velocity.y = npc.const.accelVert;
    }

  } // End of npc.update

  return npc;
}
