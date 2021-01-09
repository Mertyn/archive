var Client = function(address, game) {
  var client = {};
  client.players =[];
  client.connected = false;

  client.socket = io.connect(address);

  // Connect/Disconnect messages
  client.socket.on("connect", function () {
    console.info("Connected to server");
    client.connected = true;
  });

  client.socket.on("disconnect", function () {
    client.socket.close();
    console.info("Server closed");
    client.connected = false;
    if (game.state.current == "Main") game.state.start("Closed");
  });

  // Register new Player
  client.registerPlayer = function(object) {
    this.socket.emit("newplayer", object);
  }

  // Create player on new registration on server
  client.socket.on("newplayer", function(data) {
    var newplayer = new Objects.RCCar(data.x, data.y, {
      spritesheet: "taxi_rotated",
      layers: 8,
      name: data.name,
      client: client
    }, game);

    client.players[data.id] = newplayer;
  });

  client.socket.on("allplayers", function(data) {
    data.forEach(function (item) {

      if (item != null) {
        var newplayer = new Objects.RCCar(item.x, item.y, {
          spritesheet: "taxi_rotated",
          layers: 8,
          name: item.name,
          client: client
        }, game);

        client.players[item.id] = newplayer;
      }

    });
  });

  // Listen for postion changes
  client.socket.on("move", function (data) {
    if (client.players.length != 0) {
      client.players[data.id].body.x = data.x;
      client.players[data.id].body.y = data.y;
      client.players[data.id].body.angle = data.a;
    }
  });

  // Listen for disconnected players
  client.socket.on("remove", function (id) {
    client.players[id].completeDestroy();
    client.players[id] = null;
  });

  return client;
}
