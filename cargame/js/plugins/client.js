Phaser.Plugin.Client = function(game, parent) {
  var client = {};
  client.players = [];
  client.socket = null;

  client.onPlayers = function(){};
  client.onJoin = function(){};
  client.onUpdate = function(){};
  client.onEvent = function(){};
  client.onLeave = function(){};

  client.connect = function(address, data) {
    socket = io.connect(address);

    socket.on("connect", function() {
      socket.emit("join", data);
    });

    socket.on("players", client.onPlayers);
    socket.on("join", client.onJoin);
    socket.on("update", client.onUpdate);
    socket.on("event", client.onEvent);
    socket.on("leave", client.onLeave);

    client.socket = socket;
  }

  client.update = function(data) {
    client.socket.emit("update", data);
  }

  game.client = client;
  var plugin = new Phaser.Plugin(game, parent);
  plugin.destroy = function() { delete game.client; };
  return plugin;
}
