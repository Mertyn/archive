/**
 * This function loads the given map with given tileset in the given game
 */

var Map = function(mapkey, tileset, game) {
  // Add tilemap and image
  var map = game.add.tilemap(mapkey, 16, 16);
  map.addTilesetImage(tileset);

  // Add layer
  layer = map.createLayer(0);
  layer.resizeWorld();
  // Set collisions
  map.setCollisionBetween(13, 99);

  map.checkpoints = [];
  map.spawn = {x: 0, y: 0};

  map.forEach(function(tile) {
    // Find start tile and set map.spawn
    if (tile.index == 0) {
      map.spawn = {
        x: tile.worldX + 8,
        y: tile.worldY + 8
      };

      map.checkpoints.unshift(map.spawn);

      map.replace(0, -1);
    }

    // Set checkpoints
    if (tile.index == 1) {
      map.checkpoints.push({
        x: tile.worldX + 8,
        y: tile.worldY + 8
      });
    }

    // Set map end
    if (tile.index == 2) map.end = tile.x * 16;

    // Spawn rat
    if (tile.index == 3) {
      var rat = new Rat(tile.worldX + 8, tile.worldY + 10, game.game);
      enemies.add(rat);
    }

    // Spawn squirrel
    if (tile.index == 4) {
      var squirrel = new Squirrel(tile.worldX + 8, tile.worldY + 10, game.game);
      enemies.add(squirrel);
    }
  });

  // Remove all unneeded tiles
  map.replace(1, -1);
  map.replace(3, -1);
  map.replace(4, -1);

  // map.checkpoints.shift();

  return map;
}
