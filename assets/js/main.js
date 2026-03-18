const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let window_width = 600;
let window_height = 400;

canvas.width = window_width;
canvas.height = window_height;

let circles = [];

// Clase con efecto glass + color
class Circle {
  constructor(x, y, radius, speed) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;

    this.dx = (Math.random() > 0.5 ? 1 : -1) * speed;
    this.dy = (Math.random() > 0.5 ? 1 : -1) * speed;

    this.hue = Math.random() * 360; // 🎨 color dinámico
  }

  draw(ctx) {
    ctx.beginPath();

    let gradient = ctx.createRadialGradient(
      this.posX, this.posY, this.radius * 0.2,
      this.posX, this.posY, this.radius
    );

    gradient.addColorStop(0, `hsla(${this.hue}, 100%, 80%, 0.8)`);
    gradient.addColorStop(1, `hsla(${this.hue}, 100%, 50%, 0.2)`);

    ctx.fillStyle = gradient;
    ctx.strokeStyle = `hsla(${this.hue}, 100%, 70%, 0.6)`;
    ctx.lineWidth = 2;

    ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.closePath();
  }

  update(ctx) {
    this.draw(ctx);

    if (this.posX + this.radius >= window_width) {
      this.posX = window_width - this.radius;
      this.dx *= -1;
    }

    if (this.posX - this.radius <= 0) {
      this.posX = this.radius;
      this.dx *= -1;
    }

    if (this.posY + this.radius >= window_height) {
      this.posY = window_height - this.radius;
      this.dy *= -1;
    }

    if (this.posY - this.radius <= 0) {
      this.posY = this.radius;
      this.dy *= -1;
    }

    this.posX += this.dx;
    this.posY += this.dy;
  }
}

// Posición segura
function getSafePosition(radius, max) {
  return Math.random() * (max - 2 * radius) + radius;
}

// Crear círculos
function crearCirculos(cantidad) {
  circles = [];

  for (let i = 0; i < cantidad; i++) {
    let radius = Math.random() * 30 + 20;
    let speed = Math.random() * 2 + 1;

    let x = getSafePosition(radius, window_width);
    let y = getSafePosition(radius, window_height);

    circles.push(new Circle(x, y, radius, speed));
  }
}

// Aplicar cambios
function aplicarCambios() {
  let cantidad = document.getElementById("cantidad").value;
  let ancho = document.getElementById("anchoCanvas").value;
  let alto = document.getElementById("altoCanvas").value;

  window_width = parseInt(ancho);
  window_height = parseInt(alto);

  canvas.width = window_width;
  canvas.height = window_height;

  crearCirculos(cantidad);
}

// Animación
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, window_width, window_height);

  circles.forEach(c => c.update(ctx));
}

// Inicial
crearCirculos(5);
animate();