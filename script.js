/* ============================================
   POLICE BIRTHDAY - JavaScript
   ============================================ */

// =====================
// NAVEGACIÓN
// =====================

function goToPage2() {
  const btn = document.getElementById('proceedBtn');
  if (btn) {
    btn.innerHTML = '<span class="btn-icon">🚨</span><span class="btn-text">CARGANDO...</span>';
    btn.disabled = true;
    btn.style.opacity = '0.7';
  }

  // Flash de sirena al transicionar
  document.body.style.transition = 'background 0.3s';
  let flashes = 0;
  const flashInterval = setInterval(() => {
    document.body.style.background = flashes % 2 === 0
      ? 'radial-gradient(ellipse, #0033cc 0%, #000008 100%)'
      : 'radial-gradient(ellipse, #cc0000 0%, #000008 100%)';
    flashes++;
    if (flashes >= 6) {
      clearInterval(flashInterval);
      window.location.href = 'page2.html';
    }
  }, 150);
}

function goBack() {
  window.location.href = 'index.html';
}

// =====================
// FECHA ACTUAL
// =====================

function setCurrentDate() {
  const el = document.getElementById('currentDate');
  if (!el) return;
  const now = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  el.textContent = now.toLocaleDateString('es-MX', options);
}

// =====================
// NÚMERO DE REPORTE ANIMADO
// =====================

function animateReportNumber() {
  const el = document.getElementById('reportNum');
  if (!el) return;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const target = 'BDY-' + new Date().getFullYear();
  let iterations = 0;
  const maxIter = 20;

  const interval = setInterval(() => {
    el.textContent = target.split('').map((char, i) => {
      if (i < iterations / 4) return char;
      if (char === '-') return '-';
      return chars[Math.floor(Math.random() * chars.length)];
    }).join('');
    iterations++;
    if (iterations > maxIter) {
      clearInterval(interval);
      el.textContent = target;
    }
  }, 60);
}

// =====================
// ESTRELLAS DE FONDO
// =====================

function createStars(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const count = 80;
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.classList.add('star-dot');
    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 4;
    const colors = ['#ffffff', '#f0c040', '#4488ff', '#ff8844'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    star.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}%;
      top: ${y}%;
      background: ${color};
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;
    container.appendChild(star);
  }
}

// =====================
// LÍNEAS DE VELOCIDAD (MOTO)
// =====================

function createSpeedLines() {
  const container = document.getElementById('speedLines');
  if (!container) return;

  for (let i = 0; i < 8; i++) {
    const line = document.createElement('div');
    line.classList.add('speed-line');
    const width = Math.random() * 50 + 30;
    const duration = Math.random() * 0.4 + 0.3;
    const delay = Math.random() * 0.5;

    line.style.cssText = `
      width: ${width}px;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;
    container.appendChild(line);
  }
}

// =====================
// CONFETTI (PÁGINA 2)
// =====================

function createConfetti() {
  const container = document.getElementById('confettiContainer');
  if (!container) return;

  const colors = [
    '#f0c040', '#4488ff', '#ff4444', '#44ff88',
    '#ff88ff', '#ffffff', '#ffaa00', '#00ccff'
  ];
  const shapes = ['■', '●', '▲', '◆', '★'];

  function spawnPiece() {
    const piece = document.createElement('div');
    piece.classList.add('confetti-piece');

    const color = colors[Math.floor(Math.random() * colors.length)];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const size = Math.random() * 12 + 6;
    const leftPos = Math.random() * 100;
    const duration = Math.random() * 3 + 2.5;
    const delay = Math.random() * 2;

    piece.textContent = shape;
    piece.style.cssText = `
      left: ${leftPos}%;
      color: ${color};
      font-size: ${size}px;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;

    container.appendChild(piece);

    // Limpiar después de la animación
    setTimeout(() => {
      if (piece.parentNode) piece.remove();
    }, (duration + delay + 0.5) * 1000);
  }

  // Lanzar confetti inicial
  for (let i = 0; i < 40; i++) {
    setTimeout(spawnPiece, i * 80);
  }

  // Confetti continuo (menos frecuente)
  setInterval(() => {
    for (let i = 0; i < 5; i++) {
      setTimeout(spawnPiece, i * 200);
    }
  }, 4000);
}

// =====================
// EFECTO HOVER EN HUELLAS
// =====================

function initFingerprintHover() {
  const fps = document.querySelectorAll('.fp');
  fps.forEach((fp) => {
    fp.addEventListener('mouseenter', () => {
      fp.style.color = 'var(--police-navy)';
      fp.style.transform = 'scale(1.5) rotate(15deg)';
    });
    fp.addEventListener('mouseleave', () => {
      fp.style.color = '';
      fp.style.transform = '';
    });
    fp.addEventListener('click', () => {
      fp.style.background = 'rgba(26,58,110,0.2)';
      fp.style.borderRadius = '50%';
      setTimeout(() => { fp.style.background = ''; }, 500);
    });
  });
}

// =====================
// ANIMACIÓN DE ENTRADA ESCALONADA (PÁGINA 2)
// =====================

function staggerPageTwo() {
  const elements = [
    { id: 'sceneTitle', delay: 0 },
    { id: 'motoScene', delay: 400 },
    { id: 'messageCard', delay: 1500 },
  ];

  elements.forEach(({ id, delay }) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    setTimeout(() => {
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, delay);
  });
}

// =====================
// EFECTO DE LUZ DE SIRENA EN AMBIENTE
// =====================

function initSirenAmbient() {
  let toggle = false;
  setInterval(() => {
    const overlay = document.body;
    if (toggle) {
      overlay.style.transition = 'background 0.2s';
    }
    toggle = !toggle;
  }, 400);
}

// =====================
// SONIDO VISUAL (ONDAS) AL HACER CLIC EN EL BOTÓN
// =====================

function createRipple(event) {
  const btn = event.currentTarget;
  const ripple = document.createElement('span');
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
    background: rgba(240,192,64,0.4);
    border-radius: 50%;
    transform: scale(0);
    animation: rippleOut 0.6s ease forwards;
    pointer-events: none;
  `;

  // Agregar keyframe dinámico si no existe
  if (!document.getElementById('rippleStyle')) {
    const style = document.createElement('style');
    style.id = 'rippleStyle';
    style.textContent = `
      @keyframes rippleOut {
        to { transform: scale(2); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 700);
}

function initRippleButtons() {
  const btns = document.querySelectorAll('.proceed-btn, .back-btn');
  btns.forEach(btn => btn.addEventListener('click', createRipple));
}

// =====================
// INICIALIZACIÓN GLOBAL
// =====================

document.addEventListener('DOMContentLoaded', () => {
  const isPage2 = document.body.classList.contains('page-2');

  // Comunes a ambas páginas
  createStars(isPage2 ? 'starsBg2' : 'starsBg');
  initRippleButtons();

  if (!isPage2) {
    // Página 1
    setCurrentDate();
    animateReportNumber();
    initFingerprintHover();
  } else {
    // Página 2
    staggerPageTwo();
    createConfetti();
    createSpeedLines();
    initSirenAmbient();

    // Mensaje de bienvenida en consola
    console.log('%c🚔 ¡ALERTA DE CUMPLEAÑOS ACTIVADA! 🚔', 'color:#f0c040;font-size:20px;font-weight:bold;');
  }
});