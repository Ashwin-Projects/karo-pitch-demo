'use strict';
const header = document.querySelector('header');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current <= 60) {
    header.classList.remove('header-hidden');
    return;
  }
  if (current > lastScroll) {
    header.classList.add('header-hidden');    
  } else {
    header.classList.remove('header-hidden'); 
  }
  lastScroll = current;
});
function animateCountUp(el) {
  const raw = el.getAttribute('data-target');
  if (!raw) return;
  const target = +raw;
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 1800; 
  const steps = 60;
  const increment = target / steps;
  let current = 0;
  let step = 0;
  const timer = setInterval(() => {
    step++;
    current += increment;
    if (step >= steps) {
      el.textContent = target.toLocaleString('en-IN') + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current).toLocaleString('en-IN') + suffix;
    }
  }, duration / steps);
}
document.querySelectorAll('.stat-num').forEach(el => {
  const text = el.textContent.trim();
  const match = text.match(/^([\d,]+)(\+?)$/);
  if (match) {
    const num = parseInt(match[1].replace(/,/g, ''));
    const suffix = match[2] || '';
    el.setAttribute('data-target', num);
    el.setAttribute('data-suffix', suffix);
    el.textContent = '0' + suffix;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        animateCountUp(el);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(el);
  }
});
const toggleBtn = document.createElement('button');
toggleBtn.id = 'themeToggle';
toggleBtn.setAttribute('aria-label', 'Toggle dark mode');
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
toggleBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
document.querySelector('header').appendChild(toggleBtn);
toggleBtn.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  toggleBtn.textContent = next === 'dark' ? '☀️' : '🌙';
});
const animateOnScroll = (selector, delay = 80) => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = `${i * delay}ms`;

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        el.classList.add('fade-up-visible');
        observer.disconnect();
      }
    }, { threshold: 0.15 });
    observer.observe(el);
  });
};
animateOnScroll('.startup-card', 100);
animateOnScroll('.inv-card', 100);
animateOnScroll('.step', 120);
animateOnScroll('.cat-pill', 60);
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
document.querySelectorAll('.interactive').forEach(el => {
  el.addEventListener('mouseover', () => el.classList.add('hover'));
  el.addEventListener('mouseout', () => el.classList.remove('hover'));
});