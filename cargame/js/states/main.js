States.Main = function() {}
States.Main.prototype = {
  init: function() {
    game.physics.startSystem(Phaser.Physics.P2JS);
  },

  create: function() {

    // Place car, connect to server
    var pos = {
      x: game.rnd.integerInRange(25, game.width - 25),
      y: game.rnd.integerInRange(25, game.height - 25)
    }
    car = new Vehicles.Taxi(pos.x, pos.y, game);
    game.client.connect("localhost:80", {name: game.player.name, x: pos.x, y: pos.y});

    // Configure Client
    game.client.onPlayers = function(data) {
      data.forEach(function (item) {

        if (item != null) {
          var newplayer = new Objects.RCCar(item.x, item.y, {
            spritesheet: "taxi_rotated",
            layers: 8,
            name: item.name,
            client: client
          }, game);

          game.client.players[item.id] = newplayer;
        }

      });
    }

    game.client.onJoin = function(data) {
      var newplayer = new Objects.RCCar(data.x, data.y, {
        spritesheet: "taxi_rotated",
        layers: 8,
        name: data.name,
        client: client
      }, game);

      game.client.players[data.id] = newplayer;
    }

    game.client.onUpdate = function(data) {
      if (game.client.players.length != 0) {
        game.client.players[data.id].body.x = data.x;
        game.client.players[data.id].body.y = data.y;
        game.client.players[data.id].body.angle = data.a;
      }
    }

    game.client.onLeave = function(id) {
      game.client.players[id].completeDestroy();
      game.client.players[id] = null;
    }

    this.initCars();
  },

  update: function () {
    carBodies.sort("frame", Phaser.Group.SORT_ASCENDING);
  },

  initCars: function() {
    carBodies = game.add.group();

    game.world.forEach(function(item) {
      if (item.name == "car") {
        carBodies.addMultiple(item.layers);
        item.layers.destroy();
        delete item.layers;
      }
    });
  }
}
