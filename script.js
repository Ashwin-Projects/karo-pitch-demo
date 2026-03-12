'use strict';

// Scroll Animation
const scrollElements = document.querySelectorAll('.scroll-animation');

const checkScroll = () => {
    const triggerBottom = window.innerHeight * 0.8;
    scrollElements.forEach((element) => {
        const boxTop = element.getBoundingClientRect().top;
        if (boxTop < triggerBottom) {
            element.classList.add('show');
        } else {
            element.classList.remove('show');
        }
    });
};

window.addEventListener('scroll', checkScroll);

// Animated Number Counters
const counters = document.querySelectorAll('.counter');

const animateCounter = (element) => {
    const updateCount = () => {
        const target = +element.getAttribute('data-target');
        const count = +element.innerText;

        const increment = target / 200;

        if (count < target) {
            element.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 1);
        } else {
            element.innerText = target;
        }
    };
    updateCount();
};

counters.forEach(counter => {
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            animateCounter(counter);
            observer.disconnect();
        }
    });
    observer.observe(counter);
});

// Smooth Page Transitions
document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Enhanced Interactivity
const interactiveElements = document.querySelectorAll('.interactive');
interactiveElements.forEach(element => {
    element.addEventListener('mouseover', () => {
        element.classList.add('hover');
    });
    element.addEventListener('mouseout', () => {
        element.classList.remove('hover');
    });
});
