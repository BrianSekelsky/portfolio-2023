import p5 from 'https://cdn.skypack.dev/p5@1.9.0';

let sketchInstance;
let mode = 0; // 0 = new sketch, 1–n = old sketches
let isMouseInsideHeader = false;

function updateCanvasBlur() {
  const canvas = document.querySelector('canvas');
  if (!canvas) return;

  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const blurAmount = Math.min(8, (scrollTop / maxScroll) * 8);

  canvas.style.filter = `blur(${blurAmount.toFixed(1)}px)`;
}

window.addEventListener('scroll', updateCanvasBlur);

export function startSketch() {
  sketchInstance = new p5((p) => {
    let header;
    let particles = [];
    let prevMouseX = 0;
    let prevMouseY = 0;
    let shape = 0;
    let shapeSize;
    let gravity = 0.2;
    let firstTime = true;
    let randomSize = p.random(10, 100);

    class NewParticle {

      constructor(x, y, hue) {
        this.pos = p.createVector(x, y);
        this.vel = p.createVector(p.random(-0.5, 0.5), p.random(1, 2));
        this.size = p.pow(p.random(), 2) * (randomSize - randomSize/2) + randomSize/2;
        this.hue = hue;
        this.alpha = 30;
        this.settled = false;
        this.shapeType = p.random(['ellipse', 'triangle', 'square']);
      }

      update(particles) {
        if (!this.settled) {
          this.vel.y += 0.1;
          this.vel.x += p.random(-0.05, 0.05);
          this.pos.add(this.vel);

          if (this.pos.y + this.size / 2 >= p.height) {
            this.pos.y = p.height - this.size / 2;
            this.vel.set(0, 0);
            this.settled = true;
          } else {
            for (let other of particles) {
              if (other !== this && other.settled) {
                let d = p5.Vector.dist(this.pos, other.pos);
                let verticalGap = other.pos.y - this.pos.y;
                if (d < this.size && verticalGap > 0 && verticalGap < this.size) {
                  this.vel.set(0, 0);
                  this.settled = true;
                  break;
                }
              }
            }
          }
        }

        if (this.settled) {
          this.pos.add(p.createVector(p.random(-0.1, 0.1), 0));
        }

        let mouse = p.createVector(p.mouseX, p.mouseY);
        let dist = p5.Vector.dist(this.pos, mouse);
        if (dist < 60) {
          let repel = p5.Vector.sub(this.pos, mouse);
          repel.setMag(1.5 * (1 - dist / 60));
          this.pos.add(repel);
          if (this.settled && repel.mag() > 0.5) {
            this.settled = false;
            this.vel = repel.copy().mult(0.2);
          }
        }

        for (let other of particles) {
          if (other !== this) {
            let d = p5.Vector.dist(this.pos, other.pos);
            let minDist = (this.size + other.size) / 2;
            if (d < minDist) {
              let push = p5.Vector.sub(this.pos, other.pos);
              push.setMag((minDist - d) * 0.2);
              this.pos.add(push);
            }
          }
        }
      }

      display() {
        p.stroke('#9f9fa9');
        // p.fill(this.hue, 80, 40, this.alpha);
        p.ellipse(this.pos.x, this.pos.y, this.size);
      }
    }

    class OldParticle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.yspeed = gravity;
      }

      update() {
        if (shape === 0 || shape === 1) {
          this.y += this.yspeed;
          this.yspeed += gravity * (shape === 1 ? 4 : 1);
          if (this.y + shapeSize / 2 > p.height) {
            this.y = p.height - shapeSize / 2;
            this.yspeed *= shape === 1 ? -0.2 : -0.7;
            if (Math.abs(this.yspeed) < 1) this.yspeed = 0;
          }
        } else if (shape === 2) {
          this.y -= this.yspeed;
          this.yspeed += gravity;
        }
      }

      display() {
        p.stroke('#9f9fa9');
        p.fill(255);
        if (shape === 0) {
          p.ellipse(this.x, this.y, shapeSize, shapeSize);
        } else if (shape === 1) {
          p.rect(this.x - shapeSize / 2, this.y - shapeSize / 2, shapeSize, shapeSize);
        } else if (shape === 2) {
          p.line(
            this.x - shapeSize / 2,
            this.y + (this.x - p.width / 2) * 0.25,
            this.x + shapeSize / 2,
            this.y - (this.x - p.width / 2) * 0.25
          );
        } else if (shape === 3) {
          p.triangle(
            p.width / 2,
            p.height / 2,
            this.x,
            this.y,
            this.x + shapeSize,
            this.y + shapeSize
          );
        }
      }
    }

    p.setup = () => {
      header = document.getElementById('header');
      isMouseInsideHeader = true;
      if (!header) return;

      header.addEventListener('mouseenter', () => {
        isMouseInsideHeader = true;
      });
      header.addEventListener('mouseleave', () => {
        isMouseInsideHeader = false;
      });

      const canvas = p.createCanvas(header.offsetWidth, header.offsetHeight);
      canvas.style('opacity', 0);
      canvas.style('transition', 'opacity 0.6s ease');
      setTimeout(() => canvas.style('opacity', 1), 1);
      canvas.position(63, 0);
      canvas.style('z-index', '-1');

      p.colorMode(p.HSL, 360, 100, 100, 100);
      shapeSize = p.random(20, 100);
    };

    p.draw = () => {
      p.background(255, 255, 255, 100);

    if (mode === 0) {
      // Only create new particles if mouse is inside header
      if (isMouseInsideHeader && (p.mouseX !== prevMouseX || p.mouseY !== prevMouseY)) {
        let hue = 200 + p.sin((p.frameCount * 0.01) * 30);
        particles.push(new NewParticle(p.mouseX, p.mouseY, hue));
      }

      if (particles.length > 400) {
        particles.splice(0, particles.length - 400);
      }

      for (let particle of particles) {
        particle.update(particles);
        particle.display();
      }

      prevMouseX = p.mouseX;
      prevMouseY = p.mouseY;
    }

      if (mode === 0) {
        if (p.mouseX !== prevMouseX || p.mouseY !== prevMouseY) {
          let hue = 200 + p.sin((p.frameCount * 0.01) * 30);
          particles.push(new NewParticle(p.mouseX, p.mouseY, hue));
        }

        if (particles.length > 400) {
          particles.splice(0, particles.length - 400);
        }

        for (let particle of particles) {
          particle.update(particles);
          particle.display();
        }

        prevMouseX = p.mouseX;
        prevMouseY = p.mouseY;
      } else {
        p.background(255);
        for (let particle of particles) {
          particle.update();
          particle.display();
        }
      }
    };

    p.mouseMoved = () => {
      if (!isMouseInsideHeader) return;

      if (mode > 0 && p.mouseX < p.width && p.mouseY < p.height && p.mouseX > 0) {
        if (firstTime) {
          const helper = document.getElementById('helper');
          if (helper) helper.classList.remove('opacity-0');
          firstTime = false;
        }
        particles.push(new OldParticle(p.mouseX, p.mouseY));
      }
    };

    p.mouseClicked = () => {
      const helper = document.getElementById('helper');
      if (helper) helper.classList.add('opacity-0');
      particles = [];
      shapeSize = p.random(5, 200);
      shape = (shape + 1) % 4;
      mode = (mode + 1) % 5; // cycle through 0–4 (new sketch + 4 old shapes)
    };
  });
}

export function stopSketch() {
  if (sketchInstance) {
    sketchInstance.remove();
    sketchInstance = null;
  }
}
