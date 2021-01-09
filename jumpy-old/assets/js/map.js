var
pointer = {
  x: 14,
  y: 5,
  reset: function() { pointer.x = 15; }
},

gap = {
  length: {
    min: 3,
    max: 4,
    next: null
  }
},

platform = {
  length: {
    min: 4,
    max: 6,
  },

  spike: {
    min: 5,
    present: null,
    next: null
  }
},

count = null,

record = [],
trigger = null,
teleportPos = null;

var createMap = function() {
  // Add map to game
  map = game.add.tilemap("map", 16, 16);
  map.addTilesetImage("tileset");
  map.setCollisionBetween(0, 7);
  // map.setCollisionBetween(5, 7);
  layer = map.createLayer(0);
  layer.resizeWorld();

  map.build = function(bool) {

    if (bool) {
      pointer.reset();
      count = 6;
    }
    else {
      count = 3;
    }

    for (var z = 0; z < count; z++) {
      // Generate/build gap
      pointer.x++;
      gap.length.next = game.rnd.integerInRange(gap.length.min, gap.length.max);

      for (var i = pointer.x; i < pointer.x + gap.length.next; i++) {
        map.putTile(-1, i, pointer.y, layer);
        map.putTile(-1, i, pointer.y - 1, layer);
      }
      pointer.x = i;

      // Record length
      if ( (bool && (z == 3 || z == 4 || z == 5)) || !bool) {
        record.push(gap.length.next);
      }

      // Generate/build platform
      platform.length.next = game.rnd.integerInRange(platform.length.min, platform.length.max);

      // Platform length greater than 2
      if (platform.length.next > 2) {
        // Place start
        map.putTile(0, pointer.x, pointer.y, layer);
        map.putTile(-1, i, pointer.y - 1, layer);
        pointer.x++;

        // Place mid-section
        for (var i = pointer.x; i < pointer.x + (platform.length.next - 2); i++) {
          map.putTile(1, i, pointer.y, layer);
          map.putTile(-1, i, pointer.y - 1, layer);
        }
        pointer.x = i;

        // Place end
        map.putTile(2, pointer.x, pointer.y, layer);
        map.putTile(-1, i, pointer.y - 1, layer);
      }

      // Platform length 2
      else if (platform.length.next == 2) {
        // Place start and end
        map.putTile(0, pointer.x, pointer.y, layer);
        map.putTile(-1, i, pointer.y - 1, layer);
        pointer.x++;
        map.putTile(2, pointer.x, pointer.y, layer);
        map.putTile(-1, i, pointer.y - 1, layer);
      }

      // Platform length 1
      else {
        // Place singular platform tile
        map.putTile(3, pointer.x, pointer.y, layer);
        map.putTile(-1, i, pointer.y - 1, layer);
      }


      // Record length
      if ( (bool && (z == 3 || z == 4 || z == 5)) || !bool) {
        record.push(platform.length.next);
      }

      if ( (bool && z == 4) || (!bool && z == 1) ) {
        trigger = pointer.x * 16;
      }

    }
  }

  map.paste = function() {
    pointer.reset();

    for (var z = 0; z < 3; z++) {
      // Generate/build gap
      pointer.x++;

      for (var i = pointer.x; i < pointer.x + record[0]; i++) {
        map.putTile(-1, i, pointer.y, layer);
        map.putTile(-1, i, pointer.y - 1, layer);
      }
      pointer.x = i;
      record.shift();

      // Paste platform
      // Platform length greater than 2
      if (record[0] > 2) {
        // Place start
        map.putTile(0, pointer.x, pointer.y, layer);
        map.putTile(-1, i, pointer.y - 1, layer);
        pointer.x++;

        // Place mid-section
        for (var i = pointer.x; i < pointer.x + (record[0] - 2); i++) {
          map.putTile(1, i, pointer.y, layer);
          map.putTile(-1, i, pointer.y - 1, layer);
        }
        pointer.x = i;

        // Place end
        map.putTile(-1, i, pointer.y - 1, layer);
        map.putTile(2, pointer.x, pointer.y, layer);
      }

      // Platform length 2
      else if (record[0] == 2) {
        // Place start and end
        map.putTile(0, pointer.x, pointer.y, layer);
        map.putTile(-1, i, pointer.y - 1, layer);
        pointer.x++;
        map.putTile(2, pointer.x, pointer.y, layer);
        map.putTile(-1, i, pointer.y - 1, layer);
      }

      // Platform length 1
      else {
        // Place singular platform tile
        map.putTile(3, pointer.x, pointer.y, layer);
        map.putTile(-1, i, pointer.y - 1, layer);
      }
      record.shift();


      if (z == 1) {
        teleportPos = pointer.x * 16;
      }

      player.x = teleportPos;
      // player.speed += player.speed * 0.05;
    }
  }
}
