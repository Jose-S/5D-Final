// Global Variable

var canvas;
var ctx;
var cBg;
var ctxBg;
var sprite;
var speed = 10;
var keyPressed = [];

// The crayon object
var crayon = {
  clipX: 0,
  clipY: 0,
  sizeX: 264,
  sizeY: 439,
  posX: 10,
  posY: 10,
  clipSizeX: Math.round(264 / 2.5),
  clipSizeY: Math.round(439 / 2.5)
};

function init() {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  cBg = document.querySelector("#canvasBackground");
  ctxBg = cBg.getContext("2d");
  sprite = document.querySelector("#crayon");
  window.setInterval(move, 50);
  requestAnimationFrame(draw);
  window.onkeydown = keyDown;
  window.onkeyup = keyUp;
}

function draw() {
  // Draw Circle

  if (isMoving()) {
    ctxBg.beginPath();
    ctxBg.arc(
      crayon.clipSizeX / 2 + crayon.posX,
      crayon.posY,
      12,
      0,
      2 * Math.PI
    );
    ctxBg.fillStyle = "#FF9900";
    ctxBg.fill();
  }

  // Only clear previous crayon
  ctx.clearRect(crayon.posX, crayon.posY, crayon.clipSizeX, crayon.clipSizeY);
  ctx.drawImage(
    sprite,
    crayon.clipX * crayon.sizeX,
    crayon.clipY * crayon.sizeY,
    crayon.sizeX,
    crayon.sizeY,
    crayon.posX,
    crayon.posY,
    crayon.clipSizeX,
    crayon.clipSizeY
  );
  requestAnimationFrame(draw);
}

function move() {
  offsetOutOfBoundPos();
  var rightKey = keyPressed["Right"] || keyPressed["ArrowRight"];
  var leftKey = keyPressed["Left"] || keyPressed["ArrowLeft"];
  var upKey = keyPressed["Up"] || keyPressed["ArrowUp"];
  var downKey = keyPressed["Down"] || keyPressed["ArrowDown"];

  console.log(crayon.posX, crayon.posY);
  if (rightKey && upKey) {
    crayon.clipY = 0;
    crayon.posX += this.speed;
    crayon.posY -= this.speed - 2;
  } else if (rightKey && downKey) {
    crayon.clipY = 0;
    crayon.posX += this.speed;
    crayon.posY += this.speed - 3;
  } else if (leftKey && upKey) {
    crayon.clipY = 1;
    crayon.posX -= this.speed;
    crayon.posY -= this.speed - 2;
  } else if (leftKey && downKey) {
    crayon.clipY = 1;
    crayon.posX -= this.speed;
    crayon.posY += this.speed - 3;
  } else if (rightKey) {
    crayon.clipY = 0;
    crayon.posX += this.speed;
  } else if (leftKey) {
    crayon.clipY = 1;
    crayon.posX -= this.speed;
  } else if (upKey) {
    crayon.posY -= this.speed - 2; // Fix overlap bug
  } else if (downKey) {
    crayon.posY += this.speed - 3; // Fix overlap bug
  }
}

function isMoving() {
  var rightKey = keyPressed["Right"] || keyPressed["ArrowRight"];
  var leftKey = keyPressed["Left"] || keyPressed["ArrowLeft"];
  var upKey = keyPressed["Up"] || keyPressed["ArrowUp"];
  var downKey = keyPressed["Down"] || keyPressed["ArrowDown"];
  return rightKey || leftKey || upKey || downKey;
}
function offsetOutOfBoundPos() {
  // Draw at opposite end of canvas
  // if crayon out of bound
  if (crayon.posY < -crayon.clipSizeY) {
    crayon.posY = canvas.height;
  }
  if (crayon.posY > canvas.height) {
    crayon.posY = -crayon.clipSizeY;
  }
  if (crayon.posX < -crayon.clipSizeX) {
    crayon.posX = canvas.width;
  }
  if (crayon.posX > canvas.width) {
    crayon.posX = -crayon.clipSizeX;
  }
}
function keyDown(e) {
  // Always move legs
  crayon.clipX++;
  // Loop back to start
  crayon.clipX = crayon.clipX % 20;
  keyPressed[e.key] = true;
}
function keyUp(e) {
  keyPressed[e.key] = false;
  i = 0;
}

window.onload = init;
