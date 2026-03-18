const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let window_width = 600;
let window_height = 400;

canvas.width = window_width;
canvas.height = window_height;

let circles = [];

// 🔥 Física mejorada
let gravedad = 0.4;
let rebote = 0.92; // 🔥 MÁS rebote
let friccion = 0.999;

class Circle {
  constructor(x, y, radius, dx, dy, tipo) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;

    this.dx = dx;
    this.dy = dy;

    this.tipo = tipo;

    this.hue = Math.random() * 360;
  }

  draw(ctx) {
    ctx.beginPath();

    let gradient = ctx.createRadialGradient(
      this.posX, this.posY, this.radius * 0.2,
      this.posX, this.posY, this.radius
    );

    gradient.addColorStop(0, `hsla(${this.hue}, 100%, 80%, 0.9)`);
    gradient.addColorStop(1, `hsla(${this.hue}, 100%, 50%, 0.3)`);

    ctx.fillStyle = gradient;
    ctx.strokeStyle = `hsla(${this.hue}, 100%, 70%, 0.8)`;

    ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.closePath();
  }

  update(ctx) {
    this.draw(ctx);

    // 🪐 ASTEROIDES (sin gravedad)
    if (this.tipo !== "asteroides") {
      this.dy += gravedad;
    }

    // suelo
    if (this.posY + this.radius >= window_height) {
      this.posY = window_height - this.radius;
      this.dy *= -rebote;

      // 🔥 rebotan mucho más
      if (this.tipo === "superrebote") {
        this.dy *= 1.1;
      }
    }

    // techo
    if (this.posY - this.radius <= 0) {
      this.posY = this.radius;
      this.dy *= -rebote;
    }

    // paredes
    if (this.posX + this.radius >= window_width || this.posX - this.radius <= 0) {
      this.dx *= -rebote;

      // 🔥 rebote extra lateral
      if (this.tipo === "superrebote") {
        this.dx *= 1.05;
      }
    }

    // ASTEROIDES: movimiento libre
    if (this.tipo === "asteroides") {
      this.dx *= 0.999;
      this.dy *= 0.999;
    }

    this.posX += this.dx;
    this.posY += this.dy;
  }
}

// 🎯 CREAR EFECTOS
function crearCirculos(cantidad) {
  let efecto = document.getElementById("efecto").value;
  circles = [];

  for (let i = 0; i < cantidad; i++) {
    let radius = Math.random() * 20 + 10;

    let x, y, dx, dy;

    // 💥 EXPLOSIÓN
    if (efecto === "explosion") {
      x = window_width / 2;
      y = window_height / 2;

      let angle = Math.random() * Math.PI * 2;
      let speed = Math.random() * 12 + 6;

      dx = Math.cos(angle) * speed;
      dy = Math.sin(angle) * speed;
    }

    // 🌧️ LLUVIA
    if (efecto === "lluvia") {
      x = Math.random() * window_width;
      y = -radius;

      dx = (Math.random() - 0.5) * 3;
      dy = Math.random() * 8 + 10;
    }

    // 🪐 ASTEROIDES
    if (efecto === "asteroides") {
      x = Math.random() * window_width;
      y = Math.random() * window_height;

      dx = (Math.random() - 0.5) * 6;
      dy = (Math.random() - 0.5) * 6;
    }

    // 🏀 SUPER REBOTE EXTREMO
    if (efecto === "superrebote") {
      x = Math.random() * window_width;
      y = Math.random() * window_height / 2;

      dx = (Math.random() - 0.5) * 12;
      dy = Math.random() * 6;
    }

    circles.push(new Circle(x, y, radius, dx, dy, efecto));
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
crearCirculos(10);
animate();