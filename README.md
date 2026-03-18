# 🎨 Canvas Animation App

Aplicación web interactiva desarrollada con **HTML5 Canvas, JavaScript y Bootstrap**, que permite generar múltiples círculos animados con distintos efectos físicos y visuales.

## 🚀 Características

- 🎛️ Control dinámico de:
  - Cantidad de círculos
  - Tamaño del canvas
  - Tipo de animación

- 🎨 Interfaz moderna:
  - Diseño con **Bootstrap 5**
  - Estilo **Glassmorphism**
  - Fondo personalizado con imagen

- ⚡ Animaciones avanzadas:
  - 💥 Explosión desde el centro
  - 🌧️ Lluvia con gravedad
  - 🪐 Movimiento tipo asteroides (sin gravedad)
  - 🏀 Súper rebote extremo

- 🎯 Física simulada:
  - Gravedad
  - Rebote (elasticidad)
  - Fricción
  - Colisiones con bordes

---

## 🛠️ Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript (POO)
- Canvas API
- Bootstrap 5

---

## 📂 Estructura del proyecto
📁 proyecto/
│
├── index.html
├── README.md
│
└── 📁 assets/
├── 📁 css/
│ └── styles.css
│
├── 📁 js/
│ └── main.js
│
└── 📁 img/
├── imag.jpg
└── pelotas.png


---

## ⚙️ Cómo usar

1. Clona o descarga el proyecto
2. Abre el archivo `index.html` en tu navegador
3. Usa los controles para:
   - Seleccionar el efecto
   - Elegir la cantidad de círculos
   - Ajustar el tamaño del canvas
4. Haz clic en **"Aplicar"**

---

## 🎮 Descripción de efectos

| Efecto         | Descripción |
|---------------|------------|
| 💥 Explosión   | Los círculos salen disparados desde el centro |
| 🌧️ Lluvia      | Caen desde arriba con gravedad y rebotan |
| 🪐 Asteroides  | Movimiento libre sin gravedad (tipo espacio) |
| 🏀 Súper rebote | Rebotes intensos con alta energía |

---

## 🎨 Personalización

Puedes modificar fácilmente:

- Imagen de fondo:
```css
background: url("./assets/img/imag.jpg")

Colores de los círculos (en main.js):
this.hue = Math.random() * 360;

👨‍💻 Autor

Jesus Roberto Hernandez Benitez

💡 Posibles mejoras futuras

Colisiones entre círculos

Interacción con el mouse

Sonidos de rebote

Modo pantalla completa

Efectos de partículas avanzados