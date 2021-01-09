Objects.Car = function(x, y, spritesheet, layers) {
  var car = game.add.sprite(x, y, null);
  car.anchor.setTo(0.5);
  car.name = "car";

  // Variables
  car.bodyLayers = [];
  car.layers = game.add.group();
  var input = {
    gas: false,
    brake: false,
    left: false,
    right: false
  };
  car.setup = {
    // Drive
    acceleration: 5,
    topSpeed: 100,
    reverseMultiplier: 0.4,

    drag: 0.5,
    friction: 1,

    // Steering
    turnSpeed: 0.1,
    maxTurn: 0.7,
    returnSpeed: 0.1,

    onIce: false
  };
  car.turnSpeed = 0;
  car.thrust = 0;

  // Physics setup
  game.physics.p2.enable(car);
  car.body.setRectangle(7, 16, 0, 0);
  car.body.damping = car.setup.drag;
  car.body.angularDamping = 1;

  // Create body layers
  for (var i = 0; i < layers; i++) {
    var sprite = game.add.sprite(x, y-i, spritesheet);
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
    // car.layers.carY = this.y;
    getInput();

    this.speed = Math.sqrt(this.body.velocity.x * this.body.velocity.x + this.body.velocity.y * this.body.velocity.y) * 0.25;

    if (input.gas && this.thrust < this.setup.topSpeed) {
      this.thrust += this.setup.acceleration;
    }
    else if (input.brake && this.thrust > -this.setup.topSpeed * this.setup.reverseMultiplier) {
      this.thrust -= this.setup.acceleration;
    }
    else {
      if (this.thrust > 0) {
        this.thrust *= this.setup.drag * 1.8;
      }
      else if (this.thrust < 0) {
        this.thrust += 2;
      }
    };

    if (input.left && this.turnSpeed > -this.setup.maxTurn) {
      this.turnSpeed -= this.setup.turnSpeed;
    }
    else if (input.right && this.turnSpeed < this.setup.maxTurn) {
      this.turnSpeed += this.setup.turnSpeed;
    }
    else {
      this.turnSpeed = 0;
    }

    if (car.setup.onIce) this.body.reverse(this.thrust);
    else this.body.moveBackward(this.thrust);

    var turnPercent = this.body.speed / 2;
    if (this.speed > 2) {
      turnPercent = 1;
    }

    // this.body.velocity

    this.body.angularForce = this.turnSpeed * this.speed;

    this.body.force.x *= this.setup.friction;
    this.body.force.y *= this.setup.friction;
  }

  function getInput() {
    if (cursors.up.isDown) input.gas = true;
    else input.gas = false;

    if (cursors.down.isDown) input.brake = true;
    else input.brake = false;

    if (cursors.left.isDown) input.left = true;
    else input.left = false;

    if (cursors.right.isDown) input.right = true;
    else input.right = false;
  }

  car.setAnchor = function (x, y) {
    car.anchor.setTo(x, y);
    car.layers.forEach(function (item) {
      item.anchor.setTo(x, y);
    })
  }

  car.fallDown = function () {
    this.inputEnabled = false;
    game.add.tween(car.scale).to({x: 0, y: 0}, 1000, Phaser.Easing.Quadratic.In, true);
    game.add.tween(car.body).to({angle: 900}, 1000, "Linear", true);
  }

  car.respawn = function (x, y) {
  }

  car.driftMode = function () {
    car.setup.onIce = true;
    car.body.damping = 0.9;
    car.setup.acceleration = 500;
  }

  return car
}
