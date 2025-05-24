// Floating, animated, and dynamic portfolio JS
// Typing animation for hero section
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
