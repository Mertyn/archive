var GameState = {
  preload: function() {
    // Sprites
    game.load.spritesheet("Redship", "assets/img/Game/RedShip.png", 64, 64);
    game.load.image("Redbullet", "assets/img/Game/RedBullet.png");

    game.load.spritesheet("Blueship", "assets/img/Game/BlueShip.png", 64, 64);
    game.load.image("Bluebullet", "assets/img/Game/BlueBullet.png");

    game.load.spritesheet("ExplosionAnimation", "assets/img/Game/ExplosionAnimation.png", 64, 64);

    // Button sprites
    game.load.spritesheet("FullBtn", "assets/img/GUI/FullscreenBtn.png", 26, 28);
    game.load.spritesheet("ReplayBtn", "assets/img/GUI/PlayAgainButton.png", 244, 44);

    // Tilemap and tileset
    game.load.tilemap("map", "assets/map/map.csv");
    game.load.image("tileset", "assets/img/Game/Tileset.png");

    // Sounds
    game.load.audio("shot", ["assets/sound/Shoot.mp3", "assets/sound/Shoot.ogg"]);
    game.load.audio("hurt", ["assets/sound/Hurt.mp3", "assets/sound/Hurt.ogg"]);
    game.load.audio("explosion", ["assets/sound/Explosion.mp3", "assets/sound/Explosion.ogg"]);
    game.load.audio("hit", ["assets/sound/Hit.mp3", "assets/sound/Hit.ogg"]);
    game.load.audio("blip", ["assets/sound/Blip2.mp3", "assets/sound/Blip2.ogg"]);

  },

  create: function() {
    // Set Up scale Manager
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

    font.load().then(function() {

      // Create all text
      // Health text
      p1HealthText = game.add.text(0, 0, "", {font: "30px visitor", fill: "#fff"});
      p1HealthText.anchor.setTo(0.5);

      p2HealthText = game.add.text(0, 0, "", {font: "30px visitor", fill: "#fff"});
      p2HealthText.anchor.setTo(0.5);

      // Score text
      scoreText = game.add.text(game.world.centerX, 20, redship.score + ":" + blueship.score, {font: "30px visitor", fill: "#fff"});
      scoreText.anchor.setTo(0.5);

      // Annoucement text
      annText = game.add.text(game.world.centerX, game.world.centerY, "READY", {font: "50px visitor", fill: "#fff"});
      annText.anchor.setTo(0.5);
      game.time.events.add(2000, function () {
        annText.text = "GO!";
        blip.play();
        redshipFreeze = blueshipFreeze = false;
      },
      this);

      game.time.events.add(4000, function () {
        game.add.tween(annText).to( { alpha: 0 }, 350, Phaser.Easing.Linear.None, true);
      },
      this);

      // Winning text
      winText = game.add.text(game.world.centerX, game.world.centerY, "", {font: "50px visitor"});
      winText.anchor.setTo(0.5);

    });

    // Add map to game
    map = game.add.tilemap("map", 32, 32);
    map.addTilesetImage("tileset");
    layer = map.createLayer(0);
    layer.resizeWorld();
    map.setCollisionBetween(21, 53);

    // Add Redship + set paramaters
    redship = game.add.sprite(100, game.world.centerY - 16, "Redship");
    redship.anchor.setTo(0.5);
    redship.frame = 0;
    redshipFreeze = true;

    // Add Blueship + set paramaters
    blueship = game.add.sprite(game.world.width - 100, game.world.centerY - 16, "Blueship");
    blueship.anchor.setTo(0.5);
    blueship.angle = -180
    blueship.frame = 0;
    blueshipFreeze = true;

    // Blue explosion animation and scoring trigger
    explosionEmitter = game.add.sprite(-32, 0, "ExplosionAnimation");
    explosionEmitter.anchor.setTo(0.5);
    explosionAnimation = explosionEmitter.animations.add("explotion", [0, 1, 2, 3, 4, 5, 6, 7], 30, false);
    explosionAnimation.onComplete.add(score, this);

    // Set up physics for Ships
    game.physics.arcade.enable([blueship, redship]);

    redship.body.drag.set(100);
    blueship.body.drag.set(100);

    redship.body.maxVelocity.set(200);
    blueship.body.maxVelocity.set(200);

    redship.body.collideWorldBounds = blueship.body.collideWorldBounds = true;

    blueship.body.setSize(60, 60, 2, 2);
    redship.body.setSize(60, 60, 2, 2);

    // Add redship weapon
    weapon1 = game.add.weapon(130, "Redbullet");
    weapon1.onFire.add(function () {
      shot.play();
    },
    this);

    // Add Blueship weapon
    weapon2 = game.add.weapon(30, "Bluebullet");
    weapon2.onFire.add(function () {
      shot.play();
    },
    this);

    // Tell the Weapon to track the Ship Sprites
    weapon1.trackSprite(redship, 15, 0, true);
    weapon2.trackSprite(blueship, 15, 0, true);

    // The bullet will be automatically killed when it leaves the world bounds
    weapon1.bulletKillType = weapon2.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon1.bulletSpeed = weapon2.bulletSpeed = 600;

    // Set firerate
    weapon1.fireRate = weapon2.fireRate = 300;

    // Add sound effects
    shot = game.add.audio("shot");
    shot.volume = 0.2;

    hurt = game.add.audio("hurt");
    hurt.volume = 0.3;

    explosion = game.add.audio("explosion");
    explosion.volume = 0.3;

    hit = game.add.audio("hit");
    hit.volume = 0.1;

    blip = game.add.audio("blip");
    blip.volume = 0.05;

    // Set up HUD
    // Score
    redship.score = 0;
    blueship.score = 0;

    // Create health
    redship.health = 100;

    blueship.health = 100;

    // Set up button
    button = game.add.button(game.world.width - 16, 15, "FullBtn", goFull, this, 1, 0, 2);
    button.anchor.setTo(0.5);

    // Set up wasd, cursors and fire buttons
    p1Up = this.input.keyboard.addKey(Phaser.KeyCode.W);
    p1Down = this.input.keyboard.addKey(Phaser.KeyCode.S);
    p1Left = this.input.keyboard.addKey(Phaser.KeyCode.A);
    p1Right = this.input.keyboard.addKey(Phaser.KeyCode.D);

    fireButton1 = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    cursors = this.input.keyboard.createCursorKeys();
    fireButton2 = this.input.keyboard.addKey(Phaser.KeyCode.ENTER);

  },

  update: function() {

    // Player 1 / left / Red Logic
    // Controls
    // Movement
    if (!redshipFreeze) {
      if (p1Up.isDown) {
        game.physics.arcade.accelerationFromRotation(redship.rotation, 200, redship.body.acceleration);
        redship.frame = 1;
      }
      else if (p1Down.isDown) {
        game.physics.arcade.accelerationFromRotation(redship.rotation, -80, redship.body.acceleration);
      }
      else {
        redship.body.acceleration.set(0);
        redship.frame = 0;
      }

      if (p1Left.isDown) {
        redship.body.angularVelocity = -200;
      }
      else if (p1Right.isDown) {
        redship.body.angularVelocity = 200;
      }
      else {
        redship.body.angularVelocity = 0;
      }

      // Firing the weapon
      if (fireButton1.isDown) {
        weapon1.fire();
      }
    }

    // Health display
    p1HealthText.x = redship.x;
    p1HealthText.y = redship.y + 50;
    p1HealthText.text = redship.health;

    // Player 2 / right / blue Logic
    // Controls
    // Movement
    if (!blueshipFreeze) {
      if (cursors.up.isDown) {
        game.physics.arcade.accelerationFromRotation(blueship.rotation, 200, blueship.body.acceleration);
        blueship.frame = 1;
      }
      else if (cursors.down.isDown) {
        game.physics.arcade.accelerationFromRotation(blueship.rotation, -80, blueship.body.acceleration);
      }
      else {
        blueship.body.acceleration.set(0);
        blueship.frame = 0;
      }

      if (cursors.left.isDown) {
        blueship.body.angularVelocity = -200;
      }
      else if (cursors.right.isDown) {
        blueship.body.angularVelocity = 200;
      }
      else {
        blueship.body.angularVelocity = 0;
      }

      // Firing weapon
      if (fireButton2.isDown) {
        weapon2.fire();
      }
    }


    // Health display
    p2HealthText.x = blueship.x;
    p2HealthText.y = blueship.y + 50;
    p2HealthText.text = blueship.health;

    // Collision stuff
    // Hit detection
    game.physics.arcade.overlap(weapon1.bullets, blueship, function(enemy, bullet) {

    bullet.kill();
    enemy.damage(20);
    hurt.play();

      if (enemy.health <= 0) {
        // Increase score and Set Annoucement Text
        redship.score += 1;

        annText.text = "Red scored!";
        annText.style.fill = "#c81818";
        annText.alpha = 1;

        game.time.events.add(2000, function () {
          game.add.tween(annText).to( { alpha: 0 }, 350, Phaser.Easing.Linear.None, true);
        },
        this);

        // Make healthText invisible, position the explosionEmmitter at the ship and play animation
        p2HealthText.alpha = 0;
        explosionEmitter.x = blueship.x;
        explosionEmitter.y = blueship.y;
        explosionAnimation.play();
        explosion.play();
      }
    });

    game.physics.arcade.overlap(weapon2.bullets, redship, function(enemy, bullet) {

      bullet.kill();
      enemy.damage(20);
      hurt.play();

      if (enemy.health <= 0) {
        blueship.score += 1;

        annText.text = "Blue scored!";
        annText.style.fill = "#1869c8";
        annText.alpha = 1;

        game.time.events.add(2000, function () {
          game.add.tween(annText).to( { alpha: 0 }, 350, Phaser.Easing.Linear.None, true);
        },
        this);

        // Make healthText invisible, position the explosionEmmitter at the ship and play animation
        p1HealthText.alpha = 0;
        explosionEmitter.x = redship.x;
        explosionEmitter.y = redship.y;
        explosionAnimation.play();
        explosion.play();
      }
    });

    game.physics.arcade.overlap(weapon1.bullets, weapon2.bullets, function(bullet1, bullet2) {
      bullet1.kill();
      bullet2.kill();
      hit.play();
    });

    game.physics.arcade.collide(weapon1.bullets, layer, function(bullet) {
      bullet.kill();
      hit.play();
    });

    game.physics.arcade.collide(weapon2.bullets, layer, function(bullet) {
      bullet.kill();
      hit.play();
    });

    // Collisions
    game.physics.arcade.collide(redship, layer);
    game.physics.arcade.collide(blueship, layer);
    game.physics.arcade.collide(redship, blueship);
  },

  render: function() {
    // game.debug.body(redship);
    // game.debug.body(blueship);
  }
}

function score() {
  blip.play();
  // Reset the ships
  redship.reset(100, game.world.centerY - 16, 100);
  redship.angle = 0;

  blueship.reset(game.world.width - 100, game.world.centerY - 16, 100);
  blueship.angle = 180;

  // Reset frames of the ship sprites
  redship.frame = blueship.frame = 0;

  // Kill all bullets
  weapon1.bullets.callAll("kill");
  weapon2.bullets.callAll("kill");

  // Scoretext and Healthtext
  scoreText.text = redship.score + ":" + blueship.score;
  p1HealthText.alpha = p2HealthText.alpha = 1;

  if (redship.score >= 5) {
    blip.play();

    redshipFreeze = blueshipFreeze = true;

    annText.text = "";
    winText.text = "Red Wins!";
    winText.style.fill = "#c81818";

    playButton = game.add.button(game.world.centerX, game.world.centerY + 64, "ReplayBtn", function() {
      game.state.start("GameState");
    },
    this, 1, 0, 2);
    playButton.anchor.setTo(0.5);
  }

  else if (blueship.score >= 5) {
    blip.play();

    redshipFreeze = blueshipFreeze = true;

    annText.text = "";
    winText.text = "Blue wins!";
    winText.style.fill = "#1869c8";

    playButton = game.add.button(game.world.centerX, game.world.centerY + 64, "ReplayBtn", function() {
      game.state.start("GameState");
    },
    this, 1, 0, 2);
    playButton.anchor.setTo(0.5);
  }

}

function goFull() {
  if (game.scale.isFullScreen) {
    game.scale.stopFullScreen();
  }
  else {
    game.scale.startFullScreen(false);
  }
}

game.state.add("GameState", GameState);
// game.state.start("GameState");
