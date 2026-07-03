import p5 from 'p5';

let sketchInstance;
let isMouseInsideHeader = false;

// Color configuration — tuned for the pure-blue header background (bg-pureblue)
const BG_COLOR = '#1e2ffe'; // matches --color-pureblue

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : [0, 0, 0];
}

export function startSketch() {
  sketchInstance = new p5((p) => {
    let header;
    let bubbles = [];

    const bgRgb = hexToRgb(BG_COLOR);

    // Physics constants
    const gravity = 0.3;
    const damping = 0.99;
    const bounceFactor = 0.6;
    const bubbleSize = 12;
    const maxBubbles = 200;

    // Spawn settings
    const spawnRate = 3; // bubbles per frame while mouse moves
    let prevMouseX = 0;
    let prevMouseY = 0;

    let canvasWidth = 0;
    let canvasHeight = 0;

    function getCanvasDimensions() {
      if (!header) return { width: window.innerWidth, height: window.innerHeight };
      return { width: header.clientWidth, height: header.clientHeight };
    }

    class Bubble {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = p.random(-2, 2);
        this.vy = p.random(-3, -1);
        this.size = p.random(bubbleSize * 0.5, bubbleSize * 3);
        // Random color option (uncomment to enable)
        // this.colorR = Math.round(p.random(100, 255));
        // this.colorG = Math.round(p.random(100, 255));
        // this.colorB = Math.round(p.random(100, 255));
        this.alpha = 255;
      }

      update() {
        // Apply gravity
        this.vy += gravity;

        // Apply damping
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
        p.stroke(255, this.alpha);
        p.strokeWeight(1);
        // Random color option (uncomment and comment the line below to enable)
        // p.fill(this.colorR, this.colorG, this.colorB, this.alpha);
        p.fill(bgRgb[0], bgRgb[1], bgRgb[2], this.alpha);
        p.ellipse(this.x, this.y, this.size, this.size);
        p.noStroke();
      }

      isDead() {
        return this.alpha <= 0;
      }
    }

    p.setup = () => {
      header = document.getElementById('header');
      if (!header) return;

      header.addEventListener('mouseenter', () => { isMouseInsideHeader = true; });
      header.addEventListener('mouseleave', () => { isMouseInsideHeader = false; });

      if (header.matches(':hover')) {
        isMouseInsideHeader = true;
      }

      const dimensions = getCanvasDimensions();
      canvasWidth = dimensions.width;
      canvasHeight = dimensions.height;

      const canvas = p.createCanvas(canvasWidth, canvasHeight);
      canvas.parent(header);
      canvas.style('position', 'absolute');
      canvas.style('top', '0');
      canvas.style('left', '0');
      canvas.style('z-index', '0');
      canvas.style('display', 'block');
      canvas.style('margin', '0');
      canvas.style('padding', '0');

      p.noStroke();
    };

    p.draw = () => {
      p.background(bgRgb[0], bgRgb[1], bgRgb[2]);

      const mx = p.mouseX;
      const my = p.mouseY;

      // Spawn bubbles at mouse position when moving
      if (isMouseInsideHeader) {
        const mouseMoved = Math.abs(mx - prevMouseX) > 1 || Math.abs(my - prevMouseY) > 1;
        if (mouseMoved && mx > 0 && mx < canvasWidth && my > 0 && my < canvasHeight) {
          for (let i = 0; i < spawnRate; i++) {
            bubbles.push(new Bubble(mx + p.random(-5, 5), my + p.random(-5, 5)));
          }
        }
      }

      prevMouseX = mx;
      prevMouseY = my;

      // Cap total bubbles
      if (bubbles.length > maxBubbles) {
        bubbles.splice(0, bubbles.length - maxBubbles);
      }

      // Update and draw bubbles, remove dead ones
      for (let i = bubbles.length - 1; i >= 0; i--) {
        const bubble = bubbles[i];
        bubble.update();
        bubble.display();
        if (bubble.isDead()) {
          bubbles.splice(i, 1);
        }
      }
    };

    p.windowResized = () => {
      if (!header) return;

      const dimensions = getCanvasDimensions();
      canvasWidth = dimensions.width;
      canvasHeight = dimensions.height;
      p.resizeCanvas(canvasWidth, canvasHeight);
    };
  });
}

export function stopSketch() {
  if (sketchInstance) {
    sketchInstance.remove();
    sketchInstance = null;
  }
}

if (document.getElementById('header')) {
  startSketch();
}
