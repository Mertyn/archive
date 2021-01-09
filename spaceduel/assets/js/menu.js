var
game = new Phaser.Game(1280, 720, Phaser.AUTO),
font = new FontFaceObserver("visitor");

var MenuState = {
  preload: function() {
    // Load logo and button sprites
    game.load.image("logo", "assets/img/GUI/Logo.png");
    game.load.spritesheet("playButton", "assets/img/GUI/PlayButton.png", 244, 44);
    game.load.spritesheet("fullButton", "assets/img/GUI/FullButton.png", 244, 44);

    // Load ship sprites
    game.load.spritesheet("Blueship", "assets/img/Game/BlueShip.png", 64, 64);
    game.load.spritesheet("Redship", "assets/img/Game/RedShip.png", 64, 64);
    game.load.spritesheet("")

    // // Load tutorial sprites
    game.load.image("tut1", "assets/img/GUI/Tut1.png");
    game.load.image("tut2", "assets/img/GUI/Tut2.png");

    font.load().then(function() {
      selectText = game.add.text(game.world.centerX, 70, "", {font: "50px visitor", fill: "#c81818"});
      selectText.anchor.setTo(0.5);

      propertyText = game.add.text(game.world.centerX, game.world.height - 200, "", {font: "50px visitor", fill:"#fff"});
      propertyText.anchor.setTo(0.5);
    });
  },

  create: function() {
    // Set Up scale Manager
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;


    // Create logo and buttons
    logo = game.add.sprite(game.world.centerX, game.world.centerY - 144, "logo");
    logo.anchor.setTo(0.5);

    playButton = game.add.button(game.world.centerX, game.world.centerY, "playButton", function() {
      game.state.start("GameState");
    },
    this, 1, 0, 2);

    playButton.anchor.setTo(0.5);

    fullButton = game.add.button(game.world.centerX, game.world.centerY + 64, "fullButton", goFull,this, 1, 0 ,2);

    fullButton.anchor.setTo(0.5);

    // Create tutorials
    tut1 = game.add.sprite(224, game.world.centerY + 100, "tut1");
    tut1.anchor.setTo(0.5);

    tut2 = game.add.sprite(game.world.width - 224, game.world.centerY + 100, "tut2");
    tut2.anchor.setTo(0.5);

    Redship = game.add.sprite(224, game.world.centerY - 32, "Redship");
    Redship.anchor.setTo(0.5);
    Redship.angle = -90;

    Blueship = game.add.sprite(game.world.width - 224, game.world.centerY - 32, "Blueship");
    Blueship.anchor.setTo(0.5);
    Blueship.angle = -90;

  },

  update: function() {
    // Nothing  ლ(ಠ益ಠლ)
  }
}

game.state.add("MenuState", MenuState);
game.state.start("MenuState");
