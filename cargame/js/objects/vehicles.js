var Vehicles = {};

Vehicles.Taxi = function (x, y, game) {
  var taxi = new Objects.Car(x, y, {
    spritesheet: "taxi_rotated",
    layers: 8,
    client: game.client
  }, game);

  return taxi
}

Vehicles.Vette = function (x, y, game) {
  var vette = new Objects.Car(x, y, {
    spritesheet: "vette",
    layers: 6,
    body: [10, 20, 0, 0]
  }, game);

  return vette
}

Vehicles.Police = function (x, y, followObject, game) {
  var input = { left: false, right: false };

  var update = function () {
    var angle = Math.atan2(followObject.y - this.y, followObject.x - this.x);
    angle = game.math.radToDeg(angle) + 90;
    // game.debug.text(Math.floor(angle +90), 25, 25);

    this.body.angle = angle;
    this.body.moveForward(this.setup.topSpeed -20);

    this.body.force.x *= this.setup.friction;
    this.body.force.y *= this.setup.friction;
  }

  var car = new Objects.Car(x, y, {
    spritesheet: "taxi_rotated",
    layers: 8,
    angle: 180,
    mass: 20,
    update: update
  }, game);

  return car
}
