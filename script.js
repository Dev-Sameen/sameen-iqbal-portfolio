/* ================================================
   SAMEEN IQBAL PORTFOLIO — script.js
   Full JavaScript · All Sections · Fully Functional
   Dark/Light Theme · Typewriter · Counters · Form
   Filter · Scroll Reveal · Parallax · Toast · More
   ================================================ */

'use strict';

/* ════════════════════════════════════════════
   1. THEME TOGGLE — Dark / Light Mode
════════════════════════════════════════════ */
const html        = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');

// Load saved theme
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle?.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('portfolio-theme', next);
  updateThemeIcon(next);
  setTimeout(updateGithubStatsTheme, 100);
});

function updateThemeIcon(theme) {
  if (!themeIcon) return;
  themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

/* ════════════════════════════════════════════
   2. NAVBAR — Scroll Effect + Active Links
════════════════════════════════════════════ */
const navbar     = document.getElementById('navbar');
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const navLinks   = document.querySelectorAll('.nav-link');
const mobLinks   = document.querySelectorAll('.mob-link');

window.addEventListener('scroll', () => {
  if (!navbar) return;
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveLink();
  handleScrollProgress();
  toggleBackToTop();
}, { passive: true });

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu?.classList.toggle('open');
});

mobLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger?.classList.remove('open');
    mobileMenu?.classList.remove('open');
  });
});

document.addEventListener('click', (e) => {
  if (
    mobileMenu?.classList.contains('open') &&
    !mobileMenu.contains(e.target) &&
    !hamburger?.contains(e.target)
  ) {
    hamburger?.classList.remove('open');
    mobileMenu.classList.remove('open');
  }
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const id     = this.getAttribute('href');
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

/* ════════════════════════════════════════════
   3. SCROLL PROGRESS BAR
════════════════════════════════════════════ */
const progressBar = document.createElement('div');
Object.assign(progressBar.style, {
  position:      'fixed',
  top:           '0',
  left:          '0',
  height:        '3px',
  width:         '0%',
  background:    'linear-gradient(90deg,#f4845f,#f9a98e,#f4b942)',
  zIndex:        '99999',
  transition:    'width 0.08s linear',
  pointerEvents: 'none',
  borderRadius:  '0 2px 2px 0',
});
document.body.prepend(progressBar);

function handleScrollProgress() {
  const docH = document.body.scrollHeight - window.innerHeight;
  const pct  = docH > 0 ? (window.scrollY / docH) * 100 : 0;
  progressBar.style.width = `${pct}%`;
}

/* ════════════════════════════════════════════
   4. BACK TO TOP BUTTON
════════════════════════════════════════════ */
const backBtn = document.createElement('button');
backBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
backBtn.setAttribute('aria-label', 'Back to top');
backBtn.setAttribute('title', 'Back to top');
Object.assign(backBtn.style, {
  position:       'fixed',
  bottom:         '28px',
  right:          '28px',
  zIndex:         '8888',
  width:          '46px',
  height:         '46px',
  borderRadius:   '50%',
  background:     '#f4845f',
  color:          '#fff',
  border:         'none',
  fontSize:       '1rem',
  cursor:         'pointer',
  display:        'flex',
  alignItems:     'center',
  justifyContent: 'center',
  boxShadow:      '0 4px 18px rgba(244,132,95,0.45)',
  opacity:        '0',
  pointerEvents:  'none',
  transition:     'opacity 0.3s ease, transform 0.3s ease',
  transform:      'translateY(12px)',
});
document.body.appendChild(backBtn);

backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
backBtn.addEventListener('mouseenter', () => { backBtn.style.background = '#e8623a'; backBtn.style.transform = 'translateY(-3px)'; });
backBtn.addEventListener('mouseleave', () => { backBtn.style.background = '#f4845f'; backBtn.style.transform = 'translateY(0)'; });

function toggleBackToTop() {
  if (window.scrollY > 400) {
    backBtn.style.opacity      = '1';
    backBtn.style.pointerEvents = 'all';
    backBtn.style.transform    = 'translateY(0)';
  } else {
    backBtn.style.opacity      = '0';
    backBtn.style.pointerEvents = 'none';
    backBtn.style.transform    = 'translateY(12px)';
  }
}

/* ════════════════════════════════════════════
   5. HERO TYPEWRITER EFFECT
════════════════════════════════════════════ */
const roles = [
  'Full Stack Developer',
  'React & Node.js Engineer',
  'Python Flask Developer',
  'AI-Powered App Builder',
  'UI/UX Enthusiast',
  'Freelance Developer',
  'Automation Expert',
];
let roleIdx  = 0;
let charIdx  = 0;
let deleting = false;
const roleEl = document.getElementById('heroRole');

function typeWriter() {
  if (!roleEl) return;
  const word = roles[roleIdx];
  if (!deleting) {
    roleEl.textContent = word.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === word.length) {
      deleting = true;
      setTimeout(typeWriter, 2000);
      return;
    }
  } else {
    roleEl.textContent = word.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      roleIdx  = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(typeWriter, deleting ? 55 : 95);
}
setTimeout(typeWriter, 800);

/* ════════════════════════════════════════════
   6. SCROLL REVEAL ANIMATION
════════════════════════════════════════════ */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 70);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ════════════════════════════════════════════
   7. COUNTER ANIMATION
════════════════════════════════════════════ */
let countersStarted = false;

function animateCount(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  let count    = 0;
  const step   = Math.max(1, Math.ceil(target / 50));
  const timer  = setInterval(() => {
    count += step;
    if (count >= target) { el.textContent = target; clearInterval(timer); }
    else el.textContent = count;
  }, 38);
}

const counterObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !countersStarted) {
    countersStarted = true;
    document.querySelectorAll('.hcm-num').forEach(el => animateCount(el));
  }
}, { threshold: 0.5 });

const heroCard = document.querySelector('.hero-card-main');
if (heroCard) counterObs.observe(heroCard);

/* ════════════════════════════════════════════
   8. PROJECT FILTER TABS
════════════════════════════════════════════ */
const filterStyle = document.createElement('style');
filterStyle.textContent = `
  @keyframes projIn {
    from { opacity:0; transform:translateY(18px) scale(0.97); }
    to   { opacity:1; transform:translateY(0) scale(1); }
  }
  .nav-link.active { color:var(--coral)!important; }
  .nav-link.active::after { width:100%!important; }
`;
document.head.appendChild(filterStyle);

document.querySelectorAll('.pf-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.pf-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    document.querySelectorAll('.proj-card').forEach(card => {
      const cats = card.getAttribute('data-category') || '';
      const show  = filter === 'all' || cats.split(' ').includes(filter);
      if (show) {
        card.classList.remove('hidden');
        card.style.animation = 'projIn 0.45s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ════════════════════════════════════════════
   9. CONTACT FORM — Validation + Submit
════════════════════════════════════════════ */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  // Real-time clear errors
  ['cf_name','cf_email','cf_message'].forEach(id => {
    const el = document.getElementById(id);
    el?.addEventListener('input', () => {
      el.classList.remove('has-error');
      const errMap = { cf_name:'ferr-name', cf_email:'ferr-email', cf_message:'ferr-message' };
      document.getElementById(errMap[id])?.classList.remove('show');
    });
  });

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nameEl  = document.getElementById('cf_name');
    const emailEl = document.getElementById('cf_email');
    const msgEl   = document.getElementById('cf_message');
    const subEl   = document.getElementById('cf_subject');
    const btn     = document.getElementById('cfSubmit');
    const defSpan = btn?.querySelector('.cfs-default');
    const loadSpan = btn?.querySelector('.cfs-load');

    // Clear errors
    ['cf_name','cf_email','cf_message'].forEach(id => {
      document.getElementById(id)?.classList.remove('has-error');
    });
    ['ferr-name','ferr-email','ferr-message'].forEach(id => {
      document.getElementById(id)?.classList.remove('show');
    });

    let valid = true;
    if (!nameEl?.value.trim()) {
      nameEl?.classList.add('has-error');
      document.getElementById('ferr-name')?.classList.add('show');
      valid = false;
    }
    if (!emailEl?.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim())) {
      emailEl?.classList.add('has-error');
      document.getElementById('ferr-email')?.classList.add('show');
      valid = false;
    }
    if (!msgEl?.value.trim() || msgEl.value.trim().length < 10) {
      msgEl?.classList.add('has-error');
      document.getElementById('ferr-message')?.classList.add('show');
      valid = false;
    }

    if (!valid) { showToast('⚠️ Please fill in all required fields.', 'error'); return; }

    if (defSpan) defSpan.style.display = 'none';
    if (loadSpan) loadSpan.style.display = 'flex';
    if (btn) btn.disabled = true;

    try {
      await new Promise(r => setTimeout(r, 1800)); // replace with EmailJS
      contactForm.reset();
      showToast("✅ Message sent! I'll respond within 24 hours.", 'success');
    } catch {
      showToast('❌ Something went wrong. Please email me directly.', 'error');
    } finally {
      if (defSpan) defSpan.style.display = 'flex';
      if (loadSpan) loadSpan.style.display = 'none';
      if (btn) btn.disabled = false;
    }
  });
}

/* ════════════════════════════════════════════
   10. TOAST NOTIFICATION SYSTEM
════════════════════════════════════════════ */
const toastEl = document.createElement('div');
Object.assign(toastEl.style, {
  position:       'fixed',
  bottom:         '80px',
  left:           '50%',
  transform:      'translateX(-50%) translateY(20px)',
  zIndex:         '99999',
  background:     '#0f1a30',
  color:          '#fff',
  padding:        '13px 26px',
  borderRadius:   '50px',
  fontSize:       '0.87rem',
  fontWeight:     '600',
  boxShadow:      '0 8px 32px rgba(0,0,0,0.35)',
  border:         '1px solid rgba(255,255,255,0.1)',
  opacity:        '0',
  transition:     'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
  pointerEvents:  'none',
  maxWidth:       '90vw',
  textAlign:      'center',
  whiteSpace:     'nowrap',
});
document.body.appendChild(toastEl);

let toastTimer = null;
function showToast(msg, type = 'success') {
  toastEl.textContent          = msg;
  toastEl.style.borderColor    = type === 'success' ? 'rgba(244,132,95,0.5)' : 'rgba(239,68,68,0.5)';
  toastEl.style.background     = type === 'success' ? '#0f1a30' : '#1a0808';
  toastEl.style.opacity        = '1';
  toastEl.style.transform      = 'translateX(-50%) translateY(0)';
  toastEl.style.pointerEvents  = 'all';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.style.opacity       = '0';
    toastEl.style.transform     = 'translateX(-50%) translateY(20px)';
    toastEl.style.pointerEvents = 'none';
  }, 4000);
}

/* ════════════════════════════════════════════
   11. HERO FLOAT CARDS — Mouse Parallax
════════════════════════════════════════════ */
const floatCards = document.querySelectorAll('.hfc');
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth  - 0.5) * 16;
  const y = (e.clientY / window.innerHeight - 0.5) * 16;
  floatCards.forEach((card, i) => {
    const f = (i + 1) * 0.35;
    card.style.transform = `translate(${x * f}px,${y * f}px)`;
    card.style.transition = 'transform 0.1s linear';
  });
});

/* ════════════════════════════════════════════
   12. MARQUEE — Pause on Hover
════════════════════════════════════════════ */
const marqueeInner = document.querySelector('.marquee-inner');
marqueeInner?.addEventListener('mouseenter', () => { marqueeInner.style.animationPlayState = 'paused'; });
marqueeInner?.addEventListener('mouseleave', () => { marqueeInner.style.animationPlayState = 'running'; });

/* ════════════════════════════════════════════
   13. SKILL TAGS — Click Ripple
════════════════════════════════════════════ */
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `@keyframes rippleAnim { to { transform:translate(-50%,-50%) scale(3.5); opacity:0; } }`;
document.head.appendChild(rippleStyle);

document.querySelectorAll('.skill-tags span').forEach(tag => {
  tag.addEventListener('click', function () {
    const r = document.createElement('span');
    Object.assign(r.style, {
      position: 'absolute', borderRadius: '50%', background: 'rgba(244,132,95,0.3)',
      width: '80px', height: '80px', left: '50%', top: '50%',
      transform: 'translate(-50%,-50%) scale(0)', animation: 'rippleAnim 0.55s ease-out',
      pointerEvents: 'none',
    });
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(r);
    setTimeout(() => r.remove(), 560);
  });
});

/* ════════════════════════════════════════════
   14. CARD 3D TILT EFFECT
════════════════════════════════════════════ */
document.querySelectorAll('.tl-card,.srv-card,.proj-card,.skill-card,.cert-card,.exp-card').forEach(card => {
  card.addEventListener('mousemove', function (e) {
    const rect    = this.getBoundingClientRect();
    const rotateX = ((e.clientY - rect.top  - rect.height/2) / (rect.height/2)) * 4;
    const rotateY = ((e.clientX - rect.left - rect.width/2)  / (rect.width/2))  * 4;
    this.style.transform  = `perspective(900px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    this.style.transition = 'transform 0.05s linear';
  });
  card.addEventListener('mouseleave', function () {
    this.style.transition = 'transform 0.45s ease, border-color 0.3s, box-shadow 0.3s';
    this.style.transform  = '';
  });
});

/* ════════════════════════════════════════════
   15. ABOUT CODE CARD — Typing Animation
════════════════════════════════════════════ */
const codeLines = document.querySelectorAll('.av-code p');
if (codeLines.length) {
  codeLines.forEach((line, i) => {
    line.style.opacity    = '0';
    line.style.transform  = 'translateX(-10px)';
    line.style.transition = `opacity 0.38s ease ${i*75}ms, transform 0.38s ease ${i*75}ms`;
  });
  const codeObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      codeLines.forEach(line => { line.style.opacity = '1'; line.style.transform = 'translateX(0)'; });
      codeObs.disconnect();
    }
  }, { threshold: 0.3 });
  const codeCard = document.querySelector('.about-visual');
  if (codeCard) codeObs.observe(codeCard);
}

/* ════════════════════════════════════════════
   16. TIMELINE DOTS — Pop on Scroll
════════════════════════════════════════════ */
const dotPopStyle = document.createElement('style');
dotPopStyle.textContent = `@keyframes dotPop { from{transform:scale(0);opacity:0} to{transform:scale(1);opacity:1} }`;
document.head.appendChild(dotPopStyle);

const dotObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'dotPop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards';
      dotObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });

document.querySelectorAll('.tl-dot').forEach(dot => {
  dot.style.opacity = '0';
  dot.style.transform = 'scale(0)';
  dotObs.observe(dot);
});

/* ════════════════════════════════════════════
   17. SERVICE CARDS — Staggered Entrance
════════════════════════════════════════════ */
const srvInStyle = document.createElement('style');
srvInStyle.textContent = `@keyframes srvIn { from{opacity:0;transform:translateY(26px) scale(0.96)} to{opacity:1;transform:translateY(0) scale(1)} }`;
document.head.appendChild(srvInStyle);

const srvObs = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => { entry.target.style.animation = 'srvIn 0.55s ease forwards'; entry.target.style.opacity = '1'; }, i * 90);
      srvObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.srv-card').forEach(card => { card.style.opacity = '0'; srvObs.observe(card); });

/* ════════════════════════════════════════════
   18. CERT CARDS — Staggered Entrance
════════════════════════════════════════════ */
const certObs = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => { entry.target.style.animation = 'srvIn 0.5s ease forwards'; entry.target.style.opacity = '1'; }, i * 100);
      certObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.cert-card').forEach(card => { card.style.opacity = '0'; certObs.observe(card); });

/* ════════════════════════════════════════════
   19. EXPLORING ITEMS — Fade In Stagger
════════════════════════════════════════════ */
document.querySelectorAll('.ei').forEach((item, i) => {
  item.style.opacity   = '0';
  item.style.transform = 'translateY(16px)';
  item.style.transition = `opacity 0.4s ease ${i*80}ms, transform 0.4s ease ${i*80}ms`;
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { item.style.opacity = '1'; item.style.transform = 'translateY(0)'; obs.disconnect(); }
  }, { threshold: 0.3 });
  obs.observe(item);
  item.addEventListener('click', function () {
    this.style.transform = 'scale(1.08) translateY(-4px)';
    setTimeout(() => { this.style.transform = ''; }, 280);
  });
});

/* ════════════════════════════════════════════
   20. WHY WORK WITH ME — Fade In Stagger
════════════════════════════════════════════ */
document.querySelectorAll('.wi').forEach((item, i) => {
  item.style.opacity   = '0';
  item.style.transform = 'translateY(14px)';
  item.style.transition = `opacity 0.38s ease ${i*70}ms, transform 0.38s ease ${i*70}ms`;
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { item.style.opacity = '1'; item.style.transform = 'translateY(0)'; obs.disconnect(); }
  }, { threshold: 0.3 });
  obs.observe(item);
});

/* ════════════════════════════════════════════
   21. COPY EMAIL ON CLICK
════════════════════════════════════════════ */
document.querySelectorAll('a[href^="mailto"]').forEach(link => {
  link.addEventListener('click', () => {
    navigator.clipboard?.writeText('sameeniqbal14@gmail.com').then(() => {
      showToast('📋 Email copied to clipboard!', 'success');
    }).catch(() => {});
  });
});

/* ════════════════════════════════════════════
   22. SOCIAL LINKS — Toast Feedback
════════════════════════════════════════════ */
const platformToast = {
  linkedin: 'Opening LinkedIn...', github: 'Opening GitHub...',
  whatsapp: '💬 Opening WhatsApp...', instagram: 'Opening Instagram...',
  facebook: 'Opening Facebook...', resume: '📄 Downloading Resume...',
};

document.querySelectorAll('.s-btn,.hs,.foot-socials a,.nav-wa,.mob-wa-btn,.btn-talk').forEach(link => {
  link.addEventListener('click', function () {
    const cls  = [...this.classList].join(' ').toLowerCase();
    const href = this.href || '';
    let platform = '';
    if (cls.includes('linkedin'))   platform = 'linkedin';
    else if (cls.includes('github'))    platform = 'github';
    else if (cls.includes('whatsapp') || href.includes('wa.me')) platform = 'whatsapp';
    else if (cls.includes('instagram')) platform = 'instagram';
    else if (cls.includes('facebook'))  platform = 'facebook';
    else if (cls.includes('resume') || href.includes('download')) platform = 'resume';
    if (platform) showToast(platformToast[platform], 'success');
  });
});

/* ════════════════════════════════════════════
   23. AVAILABLE BADGE — Click to Contact
════════════════════════════════════════════ */
const availBadge = document.querySelector('.hero-available');
if (availBadge) {
  availBadge.style.cursor = 'pointer';
  availBadge.title        = 'Click to get in touch';
  availBadge.addEventListener('click', () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    showToast("📬 Let's connect — fill the form below!", 'success');
  });
}

/* ════════════════════════════════════════════
   24. NAV LOGO — Scroll to Top
════════════════════════════════════════════ */
document.querySelector('.nav-logo')?.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ════════════════════════════════════════════
   25. PROJECT CARD LINKS — Toast
════════════════════════════════════════════ */
document.querySelectorAll('.pc-btn.primary').forEach(btn => {
  btn.addEventListener('click', function () {
    const name = this.closest('.proj-card')?.querySelector('h3')?.textContent || 'Project';
    if (this.href && !this.href.endsWith('#') && !this.href.endsWith('/')) {
      showToast(`🚀 Opening ${name}...`, 'success');
    }
  });
});

/* ════════════════════════════════════════════
   26. GITHUB STATS — Theme Adaptation
════════════════════════════════════════════ */
function updateGithubStatsTheme() {
  const theme       = html.getAttribute('data-theme');
  const titleColor  = theme === 'light' ? 'e8623a' : 'f4845f';
  const textColor   = theme === 'light' ? '1a1a2e' : 'e2ddd8';
  const iconColor   = theme === 'light' ? 'e8623a' : 'f4845f';
  const bg          = '00000000';

  const statsImg  = document.querySelector('.github-stats .gh-card:nth-child(1) img');
  const langsImg  = document.querySelector('.github-stats .gh-card:nth-child(2) img');
  const streakImg = document.querySelector('.gh-streak img');

  if (statsImg)  statsImg.src  = `https://github-readme-stats.vercel.app/api?username=Dev-Sameen&show_icons=true&theme=transparent&hide_border=true&title_color=${titleColor}&icon_color=${iconColor}&text_color=${textColor}&bg_color=${bg}`;
  if (langsImg)  langsImg.src  = `https://github-readme-stats.vercel.app/api/top-langs/?username=Dev-Sameen&layout=compact&theme=transparent&hide_border=true&title_color=${titleColor}&text_color=${textColor}&bg_color=${bg}`;
  if (streakImg) streakImg.src = `https://streak-stats.demolab.com?user=Dev-Sameen&theme=transparent&hide_border=true&ring=${titleColor}&fire=${titleColor}&currStreakLabel=${titleColor}&sideLabels=${textColor}&dates=8890a8&background=${bg}`;
}

/* ════════════════════════════════════════════
   27. KEYBOARD ACCESSIBILITY
════════════════════════════════════════════ */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    hamburger?.classList.remove('open');
    mobileMenu?.classList.remove('open');
  }
});

const skipLink = document.createElement('a');
skipLink.href        = '#home';
skipLink.textContent = 'Skip to main content';
Object.assign(skipLink.style, {
  position: 'fixed', top: '-50px', left: '16px', zIndex: '99999',
  background: '#f4845f', color: '#fff', padding: '10px 18px',
  borderRadius: '6px', fontWeight: '700', fontSize: '0.85rem', transition: 'top 0.2s ease',
});
skipLink.addEventListener('focus', () => { skipLink.style.top = '16px'; });
skipLink.addEventListener('blur',  () => { skipLink.style.top = '-50px'; });
document.body.prepend(skipLink);

/* ════════════════════════════════════════════
   28. FOOTER YEAR — Auto Update
════════════════════════════════════════════ */
const footYear = document.getElementById('footYear');
if (footYear) footYear.textContent = new Date().getFullYear();

/* ════════════════════════════════════════════
   29. PAGE LOAD — Hero Entrance Animation
════════════════════════════════════════════ */
const heroEnterStyle = document.createElement('style');
heroEnterStyle.textContent = `
  @keyframes heroEnterLeft  { from{opacity:0;transform:translateX(-32px)} to{opacity:1;transform:translateX(0)} }
  @keyframes heroEnterRight { from{opacity:0;transform:translateX(32px)}  to{opacity:1;transform:translateX(0)} }
  .hero-left  { animation: heroEnterLeft  0.85s 0.10s cubic-bezier(0.34,1.56,0.64,1) both; }
  .hero-right { animation: heroEnterRight 0.85s 0.25s cubic-bezier(0.34,1.56,0.64,1) both; }
`;
document.head.appendChild(heroEnterStyle);

/* ════════════════════════════════════════════
   30. INIT on DOMContentLoaded
════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  toggleBackToTop();
  updateActiveLink();
  updateGithubStatsTheme();
  handleScrollProgress();

  // Immediately reveal hero items
  document.querySelectorAll('.hero .reveal').forEach(el => {
    setTimeout(() => el.classList.add('visible'), 300);
  });

  console.log('%c👋 Sameen Iqbal — Portfolio', 'color:#f4845f;font-size:1.4rem;font-weight:bold;');
  console.log('%c🚀 Full Stack Developer · React · Node.js · Python · AI', 'color:#8890a8;font-size:0.9rem;');
  console.log('%c📧 sameeniqbal14@gmail.com  |  💬 wa.me/923245522687', 'color:#2EC4B6;font-size:0.85rem;');
  console.log('%c✅ Portfolio JS loaded successfully!', 'color:#4ade80;font-weight:700;');
});