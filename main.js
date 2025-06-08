const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas(); // set initial size
window.addEventListener("resize", resizeCanvas); // update on resize

scale = 20
// Your function: maps (x, y) to a value
function f(x, y) {
  return  2 * Math.sqrt(Math.abs(y - 0.01 * x * x) * scale) + 4 * Math.abs(x + 10);
}

function drawBackground() {
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const mappedX = -15 + (x / canvas.width) * 10;
      const mappedY = -2 + (y / canvas.height) * 6;

      // const value = f(mappedX, mappedY);
      const value = 200; //90 is nice
      const normalized = Math.log(value + 0.8) / Math.log(21); // maps 0–20 → 0–1 smoothly


      const hue = 70 - normalized * 120;
      const saturation = 80;
      const lightness = 60 - normalized * 30;

      ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

//drawBackground();




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