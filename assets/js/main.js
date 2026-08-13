/* ==========================================
   HEADER SCROLL & EFFET PETALES
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  initPetalsCanvas();
});

function initPetalsCanvas() {
  const canvas = document.getElementById('petals-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const petals = Array.from({ length: 20 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height - height,
    size: Math.random() * 7 + 5,
    speedY: Math.random() * 1 + 0.5,
    opacity: Math.random() * 0.4 + 0.2
  }));

  function draw() {
    ctx.clearRect(0, 0, width, height);
    petals.forEach(p => {
      ctx.fillStyle = `rgba(200, 16, 46, ${p.opacity})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      p.y += p.speedY;
      if (p.y > height) p.y = -10;
    });
    requestAnimationFrame(draw);
  }
  draw();
}

