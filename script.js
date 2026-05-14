// ===== CURSOR GLOW FOLLOWER =====
const glow = document.getElementById('cursor-glow');
let mx = 0, my = 0, gx = 0, gy = 0;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

function animateCursor() {
  gx += (mx - gx) * 0.08;
  gy += (my - gy) * 0.08;
  glow.style.left = gx + 'px';
  glow.style.top = gy + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// ===== HERO PARTICLES =====
const particleContainer = document.getElementById('hero-particles');
if (particleContainer) {
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (4 + Math.random() * 8) + 's';
    p.style.animationDelay = Math.random() * 6 + 's';
    p.style.width = p.style.height = (2 + Math.random() * 3) + 'px';
    particleContainer.appendChild(p);
  }
}

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  // Scroll progress
  const h = document.documentElement;
  const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  document.getElementById('scroll-progress').style.width = pct + '%';

  // Active nav link
  document.querySelectorAll('section[id]').forEach(sec => {
    const top = sec.offsetTop - 200;
    const link = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
    if (link) link.classList.toggle('active', scrollY >= top && scrollY < top + sec.offsetHeight);
  });
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ===== SCROLL REVEAL =====
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ===== COUNTER ANIMATION =====
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseFloat(el.dataset.count);
    const decimal = el.dataset.decimal === 'true';
    const start = performance.now();
    const dur = 1400;

    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const val = ease * target;
      el.textContent = decimal ? val.toFixed(2) : Math.floor(val) + (target > 1 && !decimal ? '+' : '');
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    counterObs.unobserve(el);
  });
}, { threshold: 0.5 });

// Support both old .bento-big and new .stat-number counters
document.querySelectorAll('.bento-big, .stat-number').forEach(el => {
  if (el.dataset.count) counterObs.observe(el);
});

// ===== MAGNETIC BUTTONS =====
document.querySelectorAll('.btn-fill, .nav-cta').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ===== TILT EFFECT ON PROJECT CARDS =====
document.querySelectorAll('.project-showcase, .project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${x * 3}deg) rotateX(${-y * 3}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== CONTACT FORM =====
document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  const orig = btn.innerHTML;
  btn.innerHTML = '✓ Sent!';
  btn.style.background = '#059669';
  setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; e.target.reset(); }, 2500);
});
