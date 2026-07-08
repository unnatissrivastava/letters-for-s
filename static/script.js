// ---- floating hearts (quiet, thin outline) ----
const floaterContainer = document.getElementById('floaters');
for (let i = 0; i < 10; i++) {
  const el = document.createElement('div');
  el.className = 'floater';
  el.innerHTML = '♡';
  el.style.left = (i * (100/10) + Math.random()*6) + 'vw';
  el.style.fontSize = (14 + Math.random()*14) + 'px';
  el.style.animationDuration = (16 + Math.random()*10) + 's';
  el.style.animationDelay = (Math.random()*14) + 's';
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

// ---- modal ----
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