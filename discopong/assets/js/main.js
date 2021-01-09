var
c = document.getElementById("canvas"),
ctx = c.getContext("2d"),

Update = window.setInterval(update, 1000/60),
paused = false,
aiMode = true,
color = null,

// Variables for mobile
gyroPresent = false,
gyroZero = null,

deltaResX = canvas.width / 1280,
deltaResY = canvas.height / 720,

// Ball properies
ballX = canvas.width / 2,
ballY = canvas.height / 2,

veloX = null,
veloY = null,

ballRadius = 20 * deltaResY,

scoreSize = 70 * deltaResY,

// Global paddle properties
paddleHeight = 150 * deltaResY,
paddleWidth = 10 * deltaResX,
paddleSpeed = 10 * deltaResY,

// Player 1 paddle properies
p1Score = 0,

p1PaddleY = ( canvas.height - paddleHeight ) / 2,
p1Up = false,
p1Down = false,

// Player 2 paddle properies
p2Score = 0,

p2PaddleY = ( canvas.height - paddleHeight ) / 2,
p2Up = false,
p2Down = false;

color = randomColor();
ctx.fillStyle = color;

//update();

function setup() {

  document.addEventListener("devicemotion", function(e){
    if (e.rotationRate.alpha || e.rotationRate.beta || e.rotationRate.gamma)
        gyroPresent = true;
        gyroZero = e.gamma;
        document.addEventListener("deviceorientation", handleOrientation, true);
    });

  if (gyroPresent) {
    c.width = screen.height;
    c.height = screen.width;
    screen.lockOrientation("landscape-primary");
    c.webkitRequestFullscreen();
  }
  else {
    drawMenuDesktop();
    c.width = screen.width;
    c.height = screen.height;
  }
}

switch (Math.floor(Math.random()*4)) {
  case 0:
    veloX = 9;
    veloY = -11;
    break;

  case 1:
    veloX = 9;
    veloY = 11;
    break;

  case 2:
    veloX = -9;
    veloY = 11;
    break;

  case 3:
    veloX = -9;
    veloY = -11;
    break;
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawP1Paddle();
  drawP2Paddle();
  drawScore();

  // Ball physics
  if (ballY + veloY > canvas.height - ballRadius || ballY + veloY < ballRadius) {
    veloY = -veloY;
    color = randomColor();
    ctx.fillStyle = color;
    c.style.borderColor = color;
  }

  if (ballY > p1PaddleY && ballY < p1PaddleY + paddleHeight && ballX - ballRadius < paddleWidth) {
    veloX = -veloX;
    color = randomColor({ luminosity: "bright" });
    ctx.fillStyle = color;
    c.style.borderColor = color;
  }

  if (ballY > p2PaddleY && ballY < p2PaddleY + paddleHeight && ballX + ballRadius > canvas.width - paddleWidth) {
    veloX = -veloX;
    color = randomColor({ luminosity: "bright" });
    ctx.fillStyle = color;
    c.style.borderColor = color;
  }

  if (
    ballY + ballRadius > p1PaddleY && ballX < 0 && ballX < paddleWidth
  ) {
    veloY = -veloY;
    color = randomColor({ luminosity: "bright" });
    ctx.fillStyle = color;
    c.style.borderColor = color;
  }

  // Controls
  // Player 1 controls

  // Player-mode
  if (!aiMode) {

    if (p1Up && p1PaddleY > 5) {
      p1PaddleY -= paddleSpeed;
    }
    else if (p1Down && p1PaddleY < canvas.height - paddleHeight - 5) {
      p1PaddleY += paddleSpeed;
    }

  }

  // Ai-mode
  else if (aiMode) {

    if (ballY < p1PaddleY - ballRadius - 2 && p1PaddleY > 5 && ballX < canvas.width / 3) {
      p1PaddleY -= paddleSpeed;
    }
    else if (ballY > p1PaddleY + paddleHeight + ballRadius + 2 && p1PaddleY < canvas.height - paddleHeight - 5 && ballX < canvas.width / 3) {
      p1PaddleY += paddleSpeed;
    }

  }

  // Player 2 controls
  if (p2Up && p2PaddleY > 5) {
    p2PaddleY -= paddleSpeed;
  }
  else if (p2Down && p2PaddleY < canvas.height - paddleHeight - 5) {
    p2PaddleY += paddleSpeed;
  }

  // Scoring system
  // Player 1 Score
  if (ballX + veloX > canvas.width + ballRadius) {

    p1Score += 1;

    ballX = canvas.width / 2;
    ballY = canvas.height / 2;

    switch (Math.floor(Math.random()*4)) {
      case 0:
        veloX = 9;
        veloY = 11;
        break;

      case 1:
        veloX = 11;
        veloY = -9;
        break;

      case 2:
        veloX = 9;
        veloY = -11;
        break;

      case 3:
        veloX = 11;
        veloY = 9;
        break;
    }

  }

  //Player 2 Score
  if (ballX + veloX < 0 - ballRadius) {

    p2Score += 1;

    ballX = canvas.width / 2;
    ballY = canvas.height / 2;

    veloX = 5;
    veloY = 5;

  }

}

function keyDownHandler(e) {

  // Player 1 handler
  if (e.keyCode == 87) {
    p1Up = true;
  }
  else if (e.keyCode == 83) {
    p1Down = true;
  }

  // Player 2 handler
  if (e.keyCode == 38) {
    p2Up = true;
  }
  else if (e.keyCode == 40) {
    p2Down = true;
  }

  if (e.keyCode == 70) {
    //c.requestFullscreen();
    c.webkitRequestFullscreen();
  }

  if (e.keyCode == 82) {
    reset();
  }

  if (e.keyCode == 113) {
    aiMode = !aiMode;
  }

}

function keyUpHandler(e) {

  // Player 1 handler
  if (e.keyCode == 87) {
    p1Up = false;
  }
  else if (e.keyCode == 83) {
    p1Down = false;
  }

  // Player 2 handler
  if (e.keyCode == 38) {
    p2Up = false;
  }
  else if (e.keyCode == 40) {
    p2Down = false;
  }

}

function handleOrientation(e) {
  var gamma = e.gamma;

  if (gamma > gyroZero) {
    p2Up = true;
    p2Down = false;
  }
  else if (gamma < gyroZero) {
    p2Up = false;
    p2Down = true;
  }
  else {
    p2Up = false;
    p2Down = false;
  }
}

// Drawing functions

function drawBall() {

  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();

  ballX += veloX;
  ballY += veloY;

}

function drawP1Paddle() {

  ctx.beginPath();
  ctx.rect(paddleWidth, p1PaddleY, paddleWidth, paddleHeight);
  ctx.fill();
  ctx.closePath();

}

function drawP2Paddle() {

  ctx.beginPath();
  ctx.rect(canvas.width - paddleWidth * 2, p2PaddleY, paddleWidth, paddleHeight);
  ctx.fill();
  ctx.closePath();

}

// Draw score, lines on top and bottom, draw dashed line in the middle
function drawScore() {

  ctx.beginPath();

  ctx.font = scoreSize + "px 'Roboto'";
  ctx.fillText(p1Score, canvas.width / 4, 100);
  ctx.fillText(p2Score, canvas.width - (canvas.width / 4), 100);

  ctx.setLineDash([25 * deltaResY, 20 * deltaResY]);
  ctx.strokeStyle = color;
  ctx.lineWidth = 10 * deltaResX;

  ctx.moveTo(canvas.width/2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();

  ctx.closePath();

  ctx.beginPath();

  ctx.setLineDash([0, 0]);
  ctx.moveTo(0, 0 );
  ctx.lineTo(canvas.width, 0);
  ctx.stroke();

  ctx.moveTo(0, canvas.height);
  ctx.lineTo(canvas.width, canvas.height);
  ctx.stroke();

  ctx.closePath();
}

// Other functions
function reset() {
  // Ball properies
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;

  veloX = 5;
  veloY = 5;

  // Player 1 paddle properies
  p1Score = 0;

  p1PaddleY = ( canvas.height - paddleHeight ) / 2;
  p1Up = false;
  p1Down = false;

  // Player 2 paddle properies
  p2Score = 0;

  p2PaddleY = ( canvas.height - paddleHeight ) / 2;
  p2Up = false;
  p2Down = false;

}

function drawMenuDesktop() {
  ctx.beginPath();
  ctx.font("100px Roboto");
  ctx.fillText("Laser Pong", 10, 10);
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
