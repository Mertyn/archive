window.onclose = function () {
  killAll();
};

// Functions
function rndInt(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

var balls = [];

function spawn() {
  // Randomizations
  var pos = { x: rndInt(0, screen.width - 152), y: rndInt(0, screen.height - 160) };
  var angle = rndInt(0, 359);
  var speed = rndInt(5, 15);
  var vel = {
    x: Math.cos(angle) * speed,
    y: Math.sin(angle) * speed
  }
  var color = randomColor({ luminosity: 'dark' });

  // Init ball
  var ball = window.open("about:blank", Math.floor(Math.random()*1000), `width=150,height=100,left=${pos.x},top=${pos.y}`);
  ball.whereICameFrom = window;
  ball.onload = function () {
    this.document.body.style.background = color;
    this.document.title = "A ball";
  }

  ball.pos = pos;
  ball.vel = vel;

  ball.update = function() {
    this.moveTo(this.pos.x, this.pos.y);
    this.resizeTo(200, 200);

    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    if (this.pos.x >= screen.width - (this.innerWidth + 2) || this.pos.x <= 0) {
      this.vel.x = -this.vel.x;
    }
    if (this.pos.y >= screen.height - (this.innerHeight + 60) || this.pos.y <= 0) {
      this.vel.y = -this.vel.y;
    }
  }

  ball.updateID = ball.setInterval(ball.update, 1000/60);

  ball.addEventListener("keydown", function (e) {
    if (e.keyCode == 81) {
      if (e.shiftKey) this.whereICameFrom.killAll();
      else this.close();
    }
    if (e.keyCode == 78) this.whereICameFrom.spawn();
  });

  balls.push(ball);
}

function killOne() {
  balls[0].close();
}

function killAll() {
  for (var i = 0; i < balls.length; i++) {
    balls[i].close();
  }
}

addEventListener("keydown", function (e) {
  if (e.keyCode == 81) {
    if (e.shiftKey) killAll();
    else killOne();
  }
  if (e.keyCode == 78) spawn();
});
