var
c = document.getElementById("canvas"),
ctx = c.getContext("2d"),

circles = document.getElementById("circles"),
squares = document.getElementById("squares");

c.width = screen.availWidth;
c.height = screen.availHeight;

generate();

function generate() {
  ctx.clearRect(0, 0, c.width, c.height);
  c.style.backgroundColor = randomColor({luminosity: 'dark'});

  if (circles.checked) {
    ranCircles();
  }

  if (squares.checked) {
    ranSquares();
  }
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function ranCircles() {
  // Draw Random circles
  for (var i = 0; i < random(10, 51); i++) {
    ctx.beginPath();
    ctx.fillStyle = randomColor({luminosity: 'light'});
    ctx.arc(random(0, c.width), random(0, c.height), random(10, c.width / 15), 0, 2*Math.PI);
    ctx.fill();
    ctx.closePath();
  }
}

function ranSquares() {
  for  (var i = 0; i < random(10,51); i++) {
    var
    squareWidth = random(20, c.width / 10),
    squareRotation = random(0, c.width / 10);

    ctx.beginPath();
    ctx.fillStyle = randomColor({luminosity: 'light'});
    ctx.rotate(squareRotation * Math.PI / 180)
    ctx.fillRect(random(0, c.width), random(0, c.height), squareWidth, squareWidth);
    ctx.rotate(-squareRotation * Math.PI / 180);
    ctx.closePath();
  }
}

function keyDownHandler(e) {
  if (e.keyCode == 82) {generate();}
}

document.addEventListener("keydown", keyDownHandler, false);
