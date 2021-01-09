Objects.RCCar = function(x = 0, y = 0, params, game = console.error("No game object specified")) {
  // Set default parameters
  params.spritesheet = params.spritesheet || console.error("No sprietsheet specified");
  params.layers = params.layers || console.error("No layer count specified");
  params.body = params.body || [7, 16, 0, 0];
  params.angle = params.angle || 90;
  params.name = params.name || "unknown";

  // Create car sprite in game
  var car = game.add.sprite(x, y, null);
  car.anchor.setTo(0.5);
  car.name = "car";               // Identifier for type "car"

  // Create nametag
  var FONT = {
    image: "smol",
    charWidth: 6,
    charHeight: 7,
    chars: Phaser.RetroFont.TEXT_SET6
  };

  car.playerName = game.add.retroText(0, 0, FONT, params.name, game);
  car.playerName.anchor.setTo(0.5);

  // Variables
  car.bodyLayers = [];
  car.layers = game.add.group();
  car.setup = params.setup;
  car.turnSpeed = 0;
  car.thrust = 0;

  // Physics setup
  game.physics.p2.enable(car);
  car.body.setRectangle(params.body[0], params.body[1], params.body[2], params.body[3]);
  car.body.damping = 1;
  car.body.angle = params.angle;

  // Create body layers
  for (var i = 0; i < params.layers; i++) {
    var sprite = game.add.sprite(x, y-i, params.spritesheet);
    sprite.anchor.setTo(0.5);
    sprite.frame = i;
    car.layers.addChild(sprite);
    car.bodyLayers.push(sprite);
  }

  // Make body layers follow car movement
  car.layers.forEach(function(item, thing) {
    var offset = car.layers.getChildIndex(item);

    item.update = function () {
      item.position.setTo(car.x, car.y - (offset));
      item.angle = car.angle;
      item.scale.setTo(car.scale.x, car.scale.y);
    }
  });

  // Update Car
  car.update = function () {
    car.playerName.x = car.x;
    car.playerName.y = car.y - 20;
  }

  car.completeDestroy = function () {
    car.bodyLayers.forEach(function (item) {
      var tween = game.add.tween(item).to({alpha: 0}, 500, Phaser.Easing.Quadratic.Out, true);
      tween.onComplete.add(function() { item.destroy(); });
    });

    var tween = game.add.tween(car.playerName).to({alpha: 0}, 500, Phaser.Easing.Quadratic.Out, true);
    tween.onComplete.add(function() { car.playerName.destroy(); });

    delete car;
  }

  car.setAnchor = function (x, y) {
    car.anchor.setTo(x, y);
    car.layers.forEach(function (item) {
      item.anchor.setTo(x, y);
    })
  }

  car.driftMode = function () {
    car.setup.onIce = true;
    car.body.damping = 0.9;
    car.setup.acceleration = 500;
  }

  carBodies.addMultiple(car.layers);
  car.layers.destroy();
  delete car.layers;

  return car
}
