const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

let stars = [];
let shootingStar = null;
const STAR_COUNT = 300;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Create star objects
function initStars() {
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.2 + 0.2,
      pulse: Math.random() * 0.08 + 0.05, // twinkle speed
      phase: Math.random() * Math.PI * 2,
    });
  }
}
initStars();

function drawStars(time) {
  for (const s of stars) {
    // twinkle
    const alpha = 0.4 + Math.sin(time * s.pulse + s.phase) * 0.6;

    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function spawnShootingStar() {
  const s = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height * 0.4, // upper half of screen looks best
    vx: 12 + Math.random() * 8, // speed
    vy: 6 + Math.random() * 4,
    life: 45, // frames
    maxLife: 45,
  };
  shootingStar = s;
}

function drawShootingStar() {
  if (!shootingStar) return;

  const s = shootingStar;
  const progress = s.life / s.maxLife;

  // trail effect
  const trailLength = (1 - progress) * 80;

  ctx.beginPath();
  ctx.strokeStyle = `rgba(255, 255, 255, ${progress})`;
  ctx.lineWidth = 2;
  ctx.moveTo(s.x, s.y);
  ctx.lineTo(s.x - s.vx * trailLength * 0.1, s.y - s.vy * trailLength * 0.1);
  ctx.stroke();

  s.x += s.vx;
  s.y += s.vy;
  s.life--;

  if (s.life <= 0) shootingStar = null;
}

function animate(time) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawStars(time * 0.001);
  drawShootingStar();

  // Random chance to spawn a shooting star (every ~6–14s)
  if (!shootingStar && Math.random() < 0.002) {
    spawnShootingStar();
  }

  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);


document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault(); // stop the normal form submission

  const form = e.target;
  const data = new FormData(form);

  const response = await fetch("https://formspree.io/f/xanjqgel", {
    method: "POST",
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  });

  const status = document.getElementById("form-status");

  if (response.ok) {
    status.textContent = "Thanks for your message!";
    form.reset();
  } else {
    status.textContent = "Oops! There was a problem submitting your form.";
  }
});