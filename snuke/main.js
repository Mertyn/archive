var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

function Vec2(x, y) {
  return {x: x, y: y};
}

function rndInRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function segment(x, y) {
  var seg = new Vec2(x, y);
  seg.color = "hsl(" + rndInRange(0, 360) + ", 100%, 64%)";
  return seg;
}

var length = 3;
var speed = 10;
var pos = new Vec2(rndInRange(2, c.width), rndInRange(0, c.height));
var vel = new Vec2(1, 0);
var segments = [];

var fruit = new Vec2(rndInRange(0, c.width), rndInRange(0, c.height));

for (var i = 0; i < length; i++) {
  segments.unshift(new segment(pos.x -i, pos.y));
}

var input = {
  up: false,
  down: false,
  left: false,
  right: false
};

function reset() {
  pos = new Vec2(rndInRange(2, c.width), rndInRange(0, c.height));
  vel = new Vec2(1, 0);
  var segments = [];

  for (var i = 0; i < length; i++) {
    segments.unshift(new Vec2(pos.x - i, pos.y));
  }
}

function update() {
  if (input.up && vel.y != 1) vel = new Vec2(0, -1);
  if (input.down && vel.y != -1) vel = new Vec2(0, 1);
  if (input.left && vel.x != 1) vel = new Vec2(-1, 0);
  if (input.right && vel.x != -1) vel = new Vec2(1, 0);

  pos.x += vel.x;
  pos.y += vel.y;

  segments.shift();
  segments.push(new segment(pos.x, pos.y));

  if (pos.x < 0) pos.x = c.width;
  else if (pos.x > c.width) pos.x = -1;
  else if (pos.y < 0) pos.y = c.height;
  else if (pos.y > c.height) pos.y = -1;

  if (pos.x == fruit.x && pos.y == fruit.y) {
    fruit = new Vec2(rndInRange(0, c.width), rndInRange(0, c.height));
    segments.push(new Vec2(pos.x, pos.y));
  }

  for (var i = 0; i < segments.length; i++) {
    if (pos.x == segments[i].x && pos.y == segments[i].y) {
      // reset()
    }
  }
}

function render() {
  ctx.fillStyle = "#ff4a4a";
  ctx.fillRect(fruit.x, fruit.y, 1, 1);
  ctx.fillStyle = "#b31d1d";
  ctx.fillRect(fruit.x, fruit.y +1, 1, 1);

  for (var i = 0; i < segments.length; i++) {
    ctx.fillStyle = segments[i].color;
    ctx.fillStyle = "#4d4d4d";
    ctx.fillRect(segments[i].x, segments[i].y +1, 1, 1);
  }

  for (var i = 0; i < segments.length; i++) {
    ctx.fillStyle = segments[i].color;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(segments[i].x, segments[i].y, 1, 1);
  }
}

addEventListener("keydown", function (e) {
  switch (e.keyCode) {
    case 37:
      input.left = true;
      break;
    case 39:
      input.right = true;
      break;
    case 38:
      input.up = true;
      break;
    case 40:
      input.down = true;
      break;
  }
});

addEventListener("keyup", function (e) {
  switch (e.keyCode) {
    case 37:
      input.left = false;
      break;
    case 39:
      input.right = false;
      break;
    case 38:
      input.up = false;
      break;
    case 40:
      input.down = false;
      break;
  }
});

var updateID = setInterval(function() {
  ctx.clearRect(0, 0, c.width, c.height);
  update();
  render();
}, 1000/speed);
