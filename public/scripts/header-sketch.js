import p5 from 'https://cdn.skypack.dev/p5@1.9.0';

let sketchInstance;

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
    let particles = [];
    let shape = 0;
    let shapeSize;
    let gravity = 0.2;
    let firstTime = true;
    let header;

    p.setup = () => {
      header = document.getElementById('header');
      if (!header) return;

      const canvas = p.createCanvas(header.offsetWidth, header.offsetHeight);
        canvas.style('opacity', 0);
        canvas.style('transition', 'opacity 0.6s ease');
        setTimeout(() => canvas.style('opacity', 1), 50);
      canvas.position(63, 0);
      canvas.style('z-index', '-1');
      shapeSize = p.random(20, 100);
    };

    p.draw = () => {
      p.background(255);
      for (let particle of particles) {
        particle.update();
        particle.show();
      }
    };

    p.mouseMoved = () => {
      if (p.mouseX < p.width && p.mouseY < p.height && p.mouseX > 0) {
        if (firstTime) {
          const helper = document.getElementById('helper');
          if (helper) helper.classList.remove('opacity-0');
          firstTime = false;
        }
        particles.push(new Particle(p.mouseX, p.mouseY));
      }
    };

    p.mouseClicked = () => {
      const helper = document.getElementById('helper');
      if (helper) helper.classList.add('opacity-0');
      particles = [];
      shapeSize = p.random(5, 200);
      shape = (shape + 1) % 4;
    };

    class Particle {
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

      show() {
        p.stroke(0);
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
  });
}

export function stopSketch() {
  if (sketchInstance) {
    sketchInstance.remove();
    sketchInstance = null;
  }
}
