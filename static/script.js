// ---- cinematic rotating particle heart ----
(function () {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];
  const COUNT = 900;
  let mouse = { x: null, y: null };
  let angle = 0;

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function heartPoint(t, scale) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    return { x: x * scale, y: y * scale };
  }

  for (let i = 0; i < COUNT; i++) {
    const t = Math.random() * Math.PI * 2;
    const depth = Math.random();
    const jitter = 0.85 + Math.random() * 0.3;
    const p = heartPoint(t, 9 * jitter);
    particles.push({
      baseX: p.x, baseY: p.y, depth,
      x: w / 2, y: h / 2,
      r: Math.random() * 1.5 + 0.4,
      speed: 0.05 + Math.random() * 0.04
    });
  }

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  canvas.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

  function animate() {
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2, cy = h / 2 - 30;
    angle += 0.006;

    particles.forEach(p => {
      const rot = angle + p.depth * Math.PI * 2;
      const wobble = Math.cos(rot);
      const rotatedX = p.baseX * wobble;
      const rotatedZ = Math.sin(rot);

      let targetX = cx + rotatedX * 6;
      let targetY = cy + p.baseY * 6;

      if (mouse.x !== null) {
        const dx = targetX - mouse.x, dy = targetY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const push = (120 - dist) / 120;
          targetX += (dx / dist) * push * 40;
          targetY += (dy / dist) * push * 40;
        }
      }

      p.x += (targetX - p.x) * p.speed;
      p.y += (targetY - p.y) * p.speed;

      const size = p.r * (0.6 + (rotatedZ + 1) / 2 * 0.8);
      const alpha = 0.3 + (rotatedZ + 1) / 2 * 0.45;

      ctx.beginPath();
      ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(196, 168, 116, ${alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }
  animate();
})();

// ---- floating hearts, evenly spread ----
const floaterContainer = document.getElementById('floaters');
for (let i = 0; i < 10; i++) {
  const el = document.createElement('div');
  el.className = 'floater';
  el.innerHTML = '♡';
  el.style.left = (i * (100 / 10) + Math.random() * 6) + 'vw';
  el.style.fontSize = (14 + Math.random() * 14) + 'px';
  el.style.animationDuration = (16 + Math.random() * 10) + 's';
  el.style.animationDelay = (Math.random() * 14) + 's';
  floaterContainer.appendChild(el);
}

// ---- landing -> gallery ----
document.getElementById('enterBtn').addEventListener('click', () => {
  document.getElementById('landing').classList.add('hidden');
  document.getElementById('gallery').classList.remove('hidden');
  renderGrid(LETTERS);
});

// ---- grid ----
const grid = document.getElementById('grid');
function renderGrid(data) {
  grid.innerHTML = '';
  data.forEach((letter, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.animationDelay = (i * 0.03) + 's';
    card.innerHTML = `
      <div class="card-mark"></div>
      <h3>${letter.title}</h3>
      <p>${letter.teaser}</p>
      <div class="card-open">Open →</div>
    `;
    card.addEventListener('click', () => openLetter(letter));
    grid.appendChild(card);
  });
}

document.getElementById('searchBox').addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase();
  renderGrid(LETTERS.filter(l => l.title.toLowerCase().includes(q)));
});

// ---- modal: ribbon unties, then letter fades in ----
const modal = document.getElementById('modal');
const parcelVisual = document.getElementById('parcelVisual');
const letterPaper = document.getElementById('letterPaper');

function openLetter(letter) {
  letterPaper.textContent = letter.body;
  letterPaper.classList.remove('show');
  parcelVisual.classList.remove('untying', 'gone');
  modal.classList.remove('hidden');
  void parcelVisual.offsetWidth;
  setTimeout(() => parcelVisual.classList.add('untying'), 400);
  setTimeout(() => { parcelVisual.classList.add('gone'); letterPaper.classList.add('show'); }, 950);
}

document.getElementById('closeModal').addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.add('hidden'); });

// ---- finale page ----
document.getElementById('finaleBtn').addEventListener('click', () => {
  document.getElementById('finale').classList.remove('hidden');
});
document.getElementById('closeFinale').addEventListener('click', () => {
  document.getElementById('finale').classList.add('hidden');
});