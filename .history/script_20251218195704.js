// Floating, animated, and dynamic portfolio JS
// Typing animation for hero section
// ====== Smooth Scroll for Navigation ======
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    }
  });
});

// ====== Experience & Projects Data (Populate from Resume) ======
// TODO: Replace with actual resume data

const experiences = [
  {
    title: 'AI Engineering Intern',
    org: 'ResearchBuddy AI',
    logo: 'images/RBAI_LOGO.webp',
    date: 'June 2025 – Present',
    desc: 'Worked on LLM evaluation, deployment, and AI research projects. Contributed to production-grade AI systems and research publications.'
  },
  // Add more experiences from your resume here, using logo if available
];

const resumeProjects = [
  // Example:
  // {
  //   title: 'Resume Project Title',
  //   desc: 'Short technical description.',
  //   tech: 'Python, TensorFlow',
  //   github: 'https://github.com/example',
  //   demo: 'https://demo.example.com'
  // }
];

const extraProjects = [
  // Add your previous (non-resume) projects here
];


function renderExperience() {
  const expList = document.getElementById('experience-list');
  expList.innerHTML = '';
  experiences.forEach(exp => {
    expList.innerHTML += `
      <div class="experience-card dynamic-exp-card">
        ${exp.logo ? `<div class="exp-logo"><img src="${exp.logo}" alt="${exp.org} Logo" /></div>` : ''}
        <div class="exp-details">
          <div class="exp-title">${exp.title}</div>
          <div class="exp-org">${exp.org}</div>
          <div class="exp-date">${exp.date}</div>
          <div class="exp-desc">${exp.desc}</div>
        </div>
      </div>
    `;
  });
}

function renderProjects() {
  const projList = document.getElementById('projects-list');
  projList.innerHTML = '';
  [...resumeProjects, ...extraProjects].forEach(proj => {
    projList.innerHTML += `
      <div class="project-card">
        <div class="project-title">${proj.title}</div>
        <div class="project-desc">${proj.desc}</div>
        <div class="project-tech">${proj.tech}</div>
        <div class="project-links">
          ${proj.github ? `<a href="${proj.github}" target="_blank" title="GitHub"><span class="icon icon-github"></span></a>` : ''}
          ${proj.demo ? `<a href="${proj.demo}" target="_blank" title="Demo"><span class="icon icon-linkedin"></span></a>` : ''}
        </div>
      </div>
    `;
  });
}

// ====== Animations on Scroll ======
function animateOnScroll() {
  const elements = document.querySelectorAll('.fade-in, .fade-in-up, .project-card, .research-item, .experience-card');
  const triggerBottom = window.innerHeight * 0.95;
  elements.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      el.classList.add('show');
    }
  });
}
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('DOMContentLoaded', () => {
  renderExperience();
  renderProjects();
  animateOnScroll();
});

// ====== Contact Form (No backend, just UI) ======
document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Thank you for your message! (Form is UI only, no backend)');
  this.reset();
});
const textAnim = document.querySelector('.text-animation');
const phrases = [
  'ETE, CUET | ML & Deep Learning | Artificial Intelligence | Kaggle Expert',
  'Web Developer',
  'AI Enthusiast',
  'Kaggle Expert',
  'Open Source Contributor'
];
let phraseIndex = 0, charIndex = 0, isDeleting = false;
function typeEffect() {
  const currentPhrase = phrases[phraseIndex];
  if (isDeleting) {
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  } else {
    charIndex++;
    if (charIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1200);
      textAnim.querySelector('span').textContent = currentPhrase;
      return;
    }
  }
  textAnim.querySelector('span').textContent = currentPhrase.substring(0, charIndex);
  setTimeout(typeEffect, isDeleting ? 40 : 80);
}
if (textAnim && textAnim.querySelector('span')) typeEffect();

// Mobile menu toggle
const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');
menuIcon.onclick = () => {
  navbar.classList.toggle('active');
};
window.onscroll = () => {
  navbar.classList.remove('active');
  // Sticky header
  const header = document.querySelector('.header');
  header.classList.toggle('sticky', window.scrollY > 80);
  // Scroll reveal
  document.querySelectorAll('section, .project-card, .skill-box').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('active');
    }
  });
};
// Initial reveal
window.dispatchEvent(new Event('scroll'));

// Floating effect for all .floating elements
function animateFloating() {
  document.querySelectorAll('.floating').forEach(el => {
    el.style.transform = `translateY(${Math.sin(Date.now()/600 + el.offsetTop) * 8}px)`;
  });
  requestAnimationFrame(animateFloating);
}
animateFloating();

// Contact form animation (demo only)
document.querySelector('.contact-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('.btn');
  btn.textContent = 'Sending...';
  setTimeout(() => {
    btn.textContent = 'Message Sent!';
    setTimeout(() => btn.textContent = 'Send Message', 2000);
  }, 1200);
});

// Select all sections and nav links
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});
