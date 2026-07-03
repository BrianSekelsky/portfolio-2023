let sketchInstance;
let isMouseInsideHeader = false;
let mode = 0; // 0 = bouncing circles, 1–4 = old shape variants

// Color configuration — tuned for the pure-blue header background (#1e2ffe)
const bgRgb = [30, 47, 254];

export async function startSketch() {
  const { default: p5 } = await import('p5');

  sketchInstance = new p5((p) => {
    let header;
    let bubbles = [];

    // Physics constants
    const gravity = 0.3;
    const damping = 0.99;
    const bounceFactor = 0.6;
    const bubbleSize = 12;
    const maxBubbles = 200;

    // Spawn settings
    const spawnRate = 3; // bubbles per frame while mouse moves

    // Mode 1–4 (old shapes) settings
    let shape = 0; // 0=ellipse, 1=rect, 2=line, 3=triangle
    let shapeSize;
    const gravity1 = 0.2;

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
        p.stroke(255);
        p.strokeWeight(1);
        p.fill(bgRgb[0], bgRgb[1], bgRgb[2]);
        if (shape === 0) {
          p.ellipse(this.x, this.y, shapeSize, shapeSize);
        } else if (shape === 1) {
          p.rect(this.x - shapeSize / 2, this.y - shapeSize / 2, shapeSize, shapeSize);
        } else if (shape === 2) {
          p.line(
            this.x - shapeSize / 2,
            this.y + (this.x - canvasWidth / 2) * 0.25,
            this.x + shapeSize / 2,
            this.y - (this.x - canvasWidth / 2) * 0.25
          );
        } else if (shape === 3) {
          p.triangle(
            canvasWidth / 2,
            canvasHeight / 2,
            this.x,
            this.y,
            this.x + shapeSize,
            this.y + shapeSize
          );
        }
        p.noStroke();
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

      shapeSize = p.random(20, 100);
      p.noStroke();
    };

    p.draw = () => {
      p.background(bgRgb[0], bgRgb[1], bgRgb[2]);

      const mx = p.mouseX;
      const my = p.mouseY;

      if (mode === 0) {
        // Bouncing circles mode
        if (isMouseInsideHeader) {
          const mouseMoved = Math.abs(mx - prevMouseX) > 1 || Math.abs(my - prevMouseY) > 1;
          if (mouseMoved && mx > 0 && mx < canvasWidth && my > 0 && my < canvasHeight) {
            for (let i = 0; i < spawnRate; i++) {
              bubbles.push(new Bubble(mx + p.random(-5, 5), my + p.random(-5, 5)));
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
        // Old shape modes (1–4)
        for (let i = 0; i < bubbles.length; i++) {
          bubbles[i].update();
          bubbles[i].display();
        }
      }

      prevMouseX = mx;
      prevMouseY = my;
    };

    p.mouseMoved = () => {
      if (!isMouseInsideHeader) return;

      // In old shape modes, spawn particles on mouse move
      if (mode > 0 && p.mouseX > 0 && p.mouseX < canvasWidth && p.mouseY > 0 && p.mouseY < canvasHeight) {
        bubbles.push(new OldParticle(p.mouseX, p.mouseY));
        if (bubbles.length > 400) {
          bubbles.splice(0, bubbles.length - 400);
        }
      }
    };

    p.mouseClicked = () => {
      bubbles = [];
      shapeSize = p.random(5, 200);
      shape = (shape + 1) % 4;
      mode = (mode + 1) % 5; // cycle through 0–4 (bouncing circles + 4 old shapes)
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
