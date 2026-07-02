const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 45, 260)}ms`;
  observer.observe(item);
});

const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  header.style.background = y > 40 ? 'rgba(245,245,247,.86)' : 'rgba(245,245,247,.72)';
  header.style.boxShadow = y > 40 ? '0 18px 50px rgba(0,0,0,.12)' : '0 12px 40px rgba(0,0,0,.08)';
});

const stage = document.querySelector('.orbit-stage');
if (stage) {
  stage.addEventListener('pointermove', (event) => {
    const rect = stage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    stage.style.setProperty('--mx', x.toFixed(3));
    stage.style.setProperty('--my', y.toFixed(3));
    stage.querySelectorAll('.device').forEach((device, index) => {
      const depth = (index + 1) * 10;
      device.style.translate = `${x * depth}px ${y * depth}px`;
    });
  });

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
