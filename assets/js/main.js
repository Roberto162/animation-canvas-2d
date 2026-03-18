const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Dimensiones
const window_height = window.innerHeight / 2;
const window_width = window.innerWidth / 2;

canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = "#ff8";

class Circle {
  constructor(x, y, radius, color, text, speed) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;
    this.text = text;

    this.speed = speed;

    this.dx = 1 * this.speed;
    this.dy = 1 * this.speed;
  }

  draw(context) {
    context.beginPath();

    context.strokeStyle = this.color;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "20px Arial";
    context.fillText(this.text, this.posX, this.posY);

    context.lineWidth = 2;
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
    context.stroke();
    context.closePath();
  }

  update(context) {
    this.draw(context);

    // 👉 BORDE DERECHO
    if (this.posX + this.radius >= window_width) {
      this.posX = window_width - this.radius; // CORRIGE posición
      this.dx = -this.dx;
    }

    // 👉 BORDE IZQUIERDO
    if (this.posX - this.radius <= 0) {
      this.posX = this.radius; // CORRIGE posición
      this.dx = -this.dx;
    }

    // 👉 BORDE SUPERIOR
    if (this.posY - this.radius <= 0) {
      this.posY = this.radius; // CORRIGE posición
      this.dy = -this.dy;
    }

    // 👉 BORDE INFERIOR
    if (this.posY + this.radius >= window_height) {
      this.posY = window_height - this.radius; // CORRIGE posición
      this.dy = -this.dy;
    }

    // Movimiento
    this.posX += this.dx;
    this.posY += this.dy;
  }
}

// Posiciones iniciales SEGURAS (no nacen fuera)
function getSafePosition(radius, max) {
  return Math.random() * (max - 2 * radius) + radius;
}

let randomRadius = Math.floor(Math.random() * 50 + 30);

let miCirculo = new Circle(
  getSafePosition(randomRadius, window_width),
  getSafePosition(randomRadius, window_height),
  randomRadius,
  "blue",
  "Tec1",
  5
);

let miCirculo2 = new Circle(
  getSafePosition(randomRadius, window_width),
  getSafePosition(randomRadius, window_height),
  randomRadius,
  "red",
  "Tec2",
  2
);

let updateCircle = function () {
  requestAnimationFrame(updateCircle);
  ctx.clearRect(0, 0, window_width, window_height);

  miCirculo.update(ctx);
  miCirculo2.update(ctx);
};

updateCircle();