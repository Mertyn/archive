const io = require('socket.io').listen(8080);
const _ = require('lodash');
const server = {};

server.io = io;
server.lastPlayerID = 0;
server.players = [];

io.on("connection", function (socket) {
  console.log("New connection with ID:", socket.id);

  socket.on("newplayer", function (data) {
    console.log("Player", data.name, "has joined the game");

    socket.player = data;
    socket.player.id = server.lastPlayerID++;

    socket.emit("allplayers", server.players);
    socket.broadcast.emit("newplayer", socket.player);
    server.players[socket.player.id] = socket.player;

    listPlayers();
  });

  socket.on("position", function (data) {
    // Update properties
    _.assign(socket.player, data);

    // Send position
    socket.broadcast.emit("move", socket.player);
  });

  socket.on("disconnect", function () {
    console.log("ID", socket.id, "disconnected");

    if (typeof socket.player.id != "undefined") io.emit("remove", socket.player.id);
    server.players[socket.player.id] = null;

    if (typeof socket.player.name != "undefined") console.log(socket.player.name, "left the game :(");
    listPlayers();
  });

});

function listPlayers() {
  console.log("\nPlayers:");
  server.players.forEach(function(item) {
    if (item != null) console.log(" ", item.name);
  });
}

function propertyName() {

}

function cleanUp() {

}
