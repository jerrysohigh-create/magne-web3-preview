// MAGNE Agent Landing — Terminal Animation

(function() {
  'use strict';

  // Typing effect for terminal demo
  function typeWriter(element, text, speed = 30) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
      if (i < text.length) {
        element.innerHTML = text.substring(0, i + 1);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }

  // Intersection Observer for scroll animations
  function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
      section.classList.add('fade-in');
      observer.observe(section);
    });
  }

  // Smooth scroll for anchor links
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // Add CSS for animations
  const style = document.createElement('style');
  style.textContent = `
    .fade-in {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .fade-in.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
  } else {
    initScrollAnimations();
  }
  
  initSmoothScroll();

  // Terminal cursor blink
  const terminalCode = document.querySelector('.terminal code');
  if (terminalCode) {
    setInterval(() => {
      terminalCode.classList.toggle('cursor-blink');
    }, 530);
  }

  // Network status pulse (simulate live data feel)
  const statusItems = document.querySelectorAll('.status-terminal code span');
  statusItems.forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = '1';
    }, index * 100);
  });

})();
