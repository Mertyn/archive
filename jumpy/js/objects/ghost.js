var Ghost = function(conn, game) {
  var ghost = game.add.sprite(-100, 0, "player");
  ghost.anchor.setTo(0.5);
  ghost.frame = 1;
  ghost.alpha = 0.5;

  conn.on("data", function(data) {
    ghost.x = data.x;
    ghost.y = data.y;

    if (data.d == 0) ghost.frame = 1;
    else if (data.d == 1) ghost.frame = 9;
  });

  return ghost;
}
