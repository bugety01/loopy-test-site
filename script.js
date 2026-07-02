const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');

if (prefersReducedMotion) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 36, 220)}ms`;
    observer.observe(item);
  });
}

const header = document.querySelector('.site-header');
let ticking = false;

function updateHeader() {
  const y = window.scrollY;
  header.style.background = y > 40 ? 'rgba(245,245,247,.88)' : 'rgba(245,245,247,.72)';
  header.style.boxShadow = y > 40 ? '0 18px 50px rgba(0,0,0,.12)' : '0 12px 40px rgba(0,0,0,.08)';
  ticking = false;
}

if (header) {
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });
}

const stage = document.querySelector('.orbit-stage');
if (stage && !prefersReducedMotion) {
  stage.addEventListener('pointermove', (event) => {
    const rect = stage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    stage.querySelectorAll('.device').forEach((device, index) => {
      const depth = (index + 1) * 5;
      device.style.translate = `${x * depth}px ${y * depth}px`;
    });
  }, { passive: true });

  stage.addEventListener('pointerleave', () => {
    stage.querySelectorAll('.device').forEach((device) => {
      device.style.translate = '0 0';
    });
  });
}

const play = document.querySelector('.play-button');
if (play) {
  play.addEventListener('click', () => {
    play.textContent = play.textContent.trim() === '▶' ? 'Ⅱ' : '▶';
  });
}
