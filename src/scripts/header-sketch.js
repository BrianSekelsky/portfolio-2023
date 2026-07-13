// Lightweight header sketch using the native Canvas 2D API (no p5 dependency).
// At rest the canvas paints nothing, so the white header shows through and the
// page loads instantly. The animation loop only runs while there is something
// to animate (active particles or the mouse inside the header).

let sketchInstance = null;

// Color configuration — white header background with black-outlined shapes
const bgRgb = [255, 255, 255];
const strokeRgb = [0, 0, 0];

function rand(min, max) {
  if (max === undefined) {
    max = min;
    min = 0;
  }
  return Math.random() * (max - min) + min;
}

export function startSketch() {
  const header = document.getElementById('header');
  if (!header) return;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  Object.assign(canvas.style, {
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: '0',
    display: 'block',
    margin: '0',
    padding: '0',
  });
  header.appendChild(canvas);

  // Physics / spawn constants
  const gravity = 0.3;
  const damping = 0.99;
  const bounceFactor = 0.6;
  const bubbleSize = 12;
  const maxBubbles = 200;
  const spawnRate = 3; // bubbles per frame while mouse moves
  const gravity1 = 0.2; // modes 1–4

  // State
  let mode = 0; // 0 = bouncing circles, 1–4 = old shape variants
  let shape = 0; // 0=ellipse, 1=rect, 2=line, 3=triangle
  let shapeSize = rand(20, 100);
  let bubbles = [];

  let canvasWidth = 0;
  let canvasHeight = 0;
  let mouseX = -1;
  let mouseY = -1;
  let prevMouseX = 0;
  let prevMouseY = 0;
  let isMouseInsideHeader = false;
  let rafId = null;

  function resize() {
    canvasWidth = header.clientWidth;
    canvasHeight = header.clientHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    canvas.style.width = canvasWidth + 'px';
    canvas.style.height = canvasHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  class Bubble {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.vx = rand(-2, 2);
      this.vy = rand(-3, -1);
      this.size = rand(bubbleSize * 0.5, bubbleSize * 3);
      this.alpha = 255;
    }

    update() {
      this.vy += gravity;
      this.vx *= damping;
      this.vy *= damping;
      this.x += this.vx;
      this.y += this.vy;

      // Bounce off bottom
      if (this.y > canvasHeight - this.size / 2) {
        this.y = canvasHeight - this.size / 2;
        this.vy *= -bounceFactor;
        this.vx *= 0.95;
      }
      // Bounce off sides
      if (this.x < this.size / 2) {
        this.x = this.size / 2;
        this.vx *= -bounceFactor;
      }
      if (this.x > canvasWidth - this.size / 2) {
        this.x = canvasWidth - this.size / 2;
        this.vx *= -bounceFactor;
      }
      // Bounce off top
      if (this.y < this.size / 2) {
        this.y = this.size / 2;
        this.vy *= -bounceFactor;
      }
      // Fade out slowly once settled
      if (Math.abs(this.vy) < 0.5 && this.y > canvasHeight - this.size) {
        this.alpha -= 1.5;
      }
    }

    display() {
      const a = this.alpha / 255;
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${strokeRgb[0]},${strokeRgb[1]},${strokeRgb[2]},${a})`;
      ctx.fillStyle = `rgba(${bgRgb[0]},${bgRgb[1]},${bgRgb[2]},${a})`;
      ctx.beginPath();
      ctx.ellipse(this.x, this.y, this.size / 2, this.size / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    isDead() {
      return this.alpha <= 0;
    }
  }

  // Modes 1–4: old shape particle
  class OldParticle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.yspeed = gravity1;
    }

    update() {
      if (shape === 0 || shape === 1) {
        this.y += this.yspeed;
        this.yspeed += gravity1 * (shape === 1 ? 4 : 1);
        if (this.y + shapeSize / 2 > canvasHeight) {
          this.y = canvasHeight - shapeSize / 2;
          this.yspeed *= shape === 1 ? -0.2 : -0.7;
          if (Math.abs(this.yspeed) < 1) this.yspeed = 0;
        }
      } else if (shape === 2) {
        this.y -= this.yspeed;
        this.yspeed += gravity1;
      }
    }

    display() {
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgb(${strokeRgb[0]},${strokeRgb[1]},${strokeRgb[2]})`;
      ctx.fillStyle = `rgb(${bgRgb[0]},${bgRgb[1]},${bgRgb[2]})`;
      if (shape === 0) {
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, shapeSize / 2, shapeSize / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else if (shape === 1) {
        ctx.beginPath();
        ctx.rect(this.x - shapeSize / 2, this.y - shapeSize / 2, shapeSize, shapeSize);
        ctx.fill();
        ctx.stroke();
      } else if (shape === 2) {
        ctx.beginPath();
        ctx.moveTo(this.x - shapeSize / 2, this.y + (this.x - canvasWidth / 2) * 0.25);
        ctx.lineTo(this.x + shapeSize / 2, this.y - (this.x - canvasWidth / 2) * 0.25);
        ctx.stroke();
      } else if (shape === 3) {
        ctx.beginPath();
        ctx.moveTo(canvasWidth / 2, canvasHeight / 2);
        ctx.lineTo(this.x, this.y);
        ctx.lineTo(this.x + shapeSize, this.y + shapeSize);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
    }
  }

  function drawFrame() {
    ctx.fillStyle = `rgb(${bgRgb[0]},${bgRgb[1]},${bgRgb[2]})`;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    const mx = mouseX;
    const my = mouseY;

    if (mode === 0) {
      if (isMouseInsideHeader) {
        const mouseMoved = Math.abs(mx - prevMouseX) > 1 || Math.abs(my - prevMouseY) > 1;
        if (mouseMoved && mx > 0 && mx < canvasWidth && my > 0 && my < canvasHeight) {
          for (let i = 0; i < spawnRate; i++) {
            bubbles.push(new Bubble(mx + rand(-5, 5), my + rand(-5, 5)));
          }
        }
      }

      if (bubbles.length > maxBubbles) {
        bubbles.splice(0, bubbles.length - maxBubbles);
      }

      for (let i = bubbles.length - 1; i >= 0; i--) {
        const bubble = bubbles[i];
        bubble.update();
        bubble.display();
        if (bubble.isDead()) {
          bubbles.splice(i, 1);
        }
      }
    } else {
      for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].update();
        bubbles[i].display();
      }
    }

    prevMouseX = mx;
    prevMouseY = my;
  }

  // Only animate while there is something to animate. This keeps the sketch
  // idle (zero CPU) at rest and resumes on interaction.
  function loop() {
    drawFrame();
    if (bubbles.length > 0 || isMouseInsideHeader) {
      rafId = requestAnimationFrame(loop);
    } else {
      // Final clear so no settled frame lingers, then park the loop.
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      rafId = null;
    }
  }

  function ensureRunning() {
    if (rafId === null) rafId = requestAnimationFrame(loop);
  }

  // --- Event handlers ---
  function onMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;

    if (!isMouseInsideHeader) return;

    // Modes 1–4 spawn particles directly on move
    if (mode > 0 && mouseX > 0 && mouseX < canvasWidth && mouseY > 0 && mouseY < canvasHeight) {
      bubbles.push(new OldParticle(mouseX, mouseY));
      if (bubbles.length > 400) {
        bubbles.splice(0, bubbles.length - 400);
      }
    }
    ensureRunning();
  }

  function onMouseEnter() {
    isMouseInsideHeader = true;
    ensureRunning();
  }

  function onMouseLeave() {
    isMouseInsideHeader = false;
  }

  function onClick() {
    bubbles = [];
    shapeSize = rand(5, 200);
    shape = (shape + 1) % 4;
    mode = (mode + 1) % 5; // cycle 0–4 (bouncing circles + 4 old shapes)
    ensureRunning();
  }

  function onResize() {
    resize();
  }

  resize();
  header.addEventListener('mouseenter', onMouseEnter);
  header.addEventListener('mouseleave', onMouseLeave);
  header.addEventListener('click', onClick);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('resize', onResize);

  if (header.matches(':hover')) {
    isMouseInsideHeader = true;
    ensureRunning();
  }

  sketchInstance = {
    stop() {
      if (rafId !== null) cancelAnimationFrame(rafId);
      header.removeEventListener('mouseenter', onMouseEnter);
      header.removeEventListener('mouseleave', onMouseLeave);
      header.removeEventListener('click', onClick);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      canvas.remove();
    },
  };
}

export function stopSketch() {
  if (sketchInstance) {
    sketchInstance.stop();
    sketchInstance = null;
  }
}

if (document.getElementById('header')) {
  startSketch();
}
