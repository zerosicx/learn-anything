const CHAPTERS = [
  { num: 0,  title: 'Overview',                file: 'index.html' },
  { num: 1,  title: 'Arrays & Hashing',        file: '01-arrays-and-hashing.html' },
  { num: 2,  title: 'Two Pointers',            file: '02-two-pointers.html' },
  { num: 3,  title: 'Stacks',                  file: '03-stacks.html' },
  { num: 4,  title: 'Binary Search',           file: '04-binary-search.html' },
  { num: 5,  title: 'Sliding Window',          file: '05-sliding-window.html' },
  { num: 6,  title: 'Linked Lists',            file: '06-linked-lists.html' },
  { num: 7,  title: 'Trees',                   file: '07-trees.html' },
  { num: 8,  title: 'Tries',                   file: '08-tries.html' },
  { num: 9,  title: 'Heap / Priority Queue',   file: '09-heap.html' },
  { num: 10, title: 'Backtracking',            file: '10-backtracking.html' },
  { num: 11, title: 'Graphs',                  file: '11-graphs.html' },
  { num: 12, title: 'Dynamic Programming',     file: '12-dynamic-programming.html' },
  { num: 13, title: 'Greedy',                  file: '13-greedy.html' },
  { num: 14, title: 'Intervals',               file: '14-intervals.html' },
  { num: 15, title: 'Math & Geometry',         file: '15-math-and-geometry.html' },
  { num: 16, title: 'Bit Manipulation',        file: '16-bit-manipulation.html' },
];

function getCurrentChapterIndex() {
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  return CHAPTERS.findIndex(ch => ch.file === currentFile);
}

function navigateTo(file) {
  window.location.href = file;
}

function initNavigation() {
  const currentIdx = getCurrentChapterIndex();
  if (currentIdx === -1) return;

  const nav = document.createElement('nav');
  nav.className = 'chapter-nav';

  const homeLink = document.createElement('a');
  homeLink.href = 'index.html';
  homeLink.className = 'home-link';
  homeLink.textContent = 'DSA Guide';
  nav.appendChild(homeLink);

  const controls = document.createElement('div');
  controls.className = 'nav-controls';

  const prevBtn = document.createElement('button');
  prevBtn.className = 'nav-btn';
  prevBtn.innerHTML = '&#8592;';
  prevBtn.title = 'Previous chapter';
  prevBtn.disabled = currentIdx <= 0;
  prevBtn.addEventListener('click', () => {
    if (currentIdx > 0) navigateTo(CHAPTERS[currentIdx - 1].file);
  });

  const select = document.createElement('select');
  select.className = 'chapter-select';
  CHAPTERS.forEach((ch, i) => {
    const opt = document.createElement('option');
    opt.value = ch.file;
    opt.textContent = ch.num === 0 ? ch.title : `${ch.num}. ${ch.title}`;
    opt.selected = i === currentIdx;
    select.appendChild(opt);
  });
  select.addEventListener('change', (e) => navigateTo(e.target.value));

  const nextBtn = document.createElement('button');
  nextBtn.className = 'nav-btn';
  nextBtn.innerHTML = '&#8594;';
  nextBtn.title = 'Next chapter';
  nextBtn.disabled = currentIdx >= CHAPTERS.length - 1;
  nextBtn.addEventListener('click', () => {
    if (currentIdx < CHAPTERS.length - 1) navigateTo(CHAPTERS[currentIdx + 1].file);
  });

  controls.appendChild(prevBtn);
  controls.appendChild(select);
  controls.appendChild(nextBtn);
  nav.appendChild(controls);

  document.body.insertBefore(nav, document.body.firstChild);
}

function initBottomNav() {
  const currentIdx = getCurrentChapterIndex();
  if (currentIdx === -1) return;

  const container = document.createElement('div');
  container.className = 'bottom-nav';

  if (currentIdx > 0) {
    const prev = CHAPTERS[currentIdx - 1];
    const a = document.createElement('a');
    a.href = prev.file;
    a.className = 'prev';
    a.innerHTML = `<span class="label">&larr; Previous</span><span class="chapter-title">${prev.num === 0 ? prev.title : `${prev.num}. ${prev.title}`}</span>`;
    container.appendChild(a);
  }

  if (currentIdx < CHAPTERS.length - 1) {
    const next = CHAPTERS[currentIdx + 1];
    const a = document.createElement('a');
    a.href = next.file;
    a.className = 'next';
    a.innerHTML = `<span class="label">Next &rarr;</span><span class="chapter-title">${next.num === 0 ? next.title : `${next.num}. ${next.title}`}</span>`;
    container.appendChild(a);
  }

  const main = document.querySelector('main');
  if (main) main.appendChild(container);
}

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initBottomNav();
});
