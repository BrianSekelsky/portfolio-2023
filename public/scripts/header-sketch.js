import p5 from 'https://cdn.skypack.dev/p5@1.9.0';

let sketchInstance;
let isMouseInsideHeader = false;

// Color configuration
const BG_COLOR = '#FFFFFF';
const FG_COLOR = '#050517';

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
    let isLoading = true;

    const bgRgb = hexToRgb(BG_COLOR);
    const fgRgb = hexToRgb(FG_COLOR);

    const displayText = "Brian Sekelsky is a designer, working across user experience, visual design, and code.";

    // Responsive settings
    let fontSize, bubbleSize, gridSpacing, hoverRadius, leftMargin;

    const returnDelay = 2500;
    const easeSpeed = 0.06;
    const gravity = 0.3;
    const mobileBreakpoint = 640;

    function calculateResponsiveValues() {
      const width = p.width;

      if (width < 640) {
        fontSize = 58;
        bubbleSize = 2;
        gridSpacing = 3;
        hoverRadius = 35;
        leftMargin = 16;
      } else if (width < 768) {
        fontSize = 80;
        bubbleSize = 2;
        gridSpacing = 3.5;
        hoverRadius = 40;
        leftMargin = 32;
      } else if (width < 1024) {
        fontSize = 86;
        bubbleSize = 2;
        gridSpacing = 3.5;
        hoverRadius = 45;
        leftMargin = 32;
      } else {
        fontSize = 100;
        bubbleSize = 2;
        gridSpacing = 3.5;
        hoverRadius = 50;
        leftMargin = 32;
      }
    }

    function getCanvasDimensions() {
      if (!header) return { width: window.innerWidth, height: window.innerHeight };
      // Use clientWidth/clientHeight to exclude border from dimensions
      return { width: header.clientWidth, height: header.clientHeight };
    }

    class Bubble {
      constructor(x, y) {
        this.homeX = x;
        this.homeY = y;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.size = bubbleSize;
        this.falling = false;
        this.fallTime = 0;
        this.returning = false;

        // Grayscale opacity for resting state
        this.opacity = p.random(0.65, 1.0);

        // Random color when falling
        this.randomColor = null;
        this.hasColor = false;
      }

      checkHover(mx, my) {
        if (this.returning) return;
        const d = p.dist(mx, my, this.x, this.y);
        if (d < hoverRadius) {
          this.falling = true;
          this.fallTime = p.millis();

          // Generate random color on fall
          if (!this.hasColor) {
            this.randomColor = [
              Math.round(p.random(50, 255)),
              Math.round(p.random(50, 255)),
              Math.round(p.random(50, 255))
            ];
            this.hasColor = true;
          }

          // Push away from mouse
          const angle = p.atan2(this.y - my, this.x - mx);
          this.vx += p.cos(angle) * 2.5;
          this.vy += p.sin(angle) * 1;
        }
      }

      update() {
        if (this.falling) {
          // Apply gravity and friction
          this.vy += gravity;
          this.vx *= 0.98;
          this.vy *= 0.98;

          this.x += this.vx;
          this.y += this.vy;

          // Bounce off bottom
          if (this.y > p.height - this.size) {
            this.y = p.height - this.size;
            this.vy *= -0.5;
            this.vx *= 0.7;
          }

          // Bounce off sides
          if (this.x < this.size || this.x > p.width - this.size) {
            this.vx *= -0.8;
            this.x = p.constrain(this.x, this.size, p.width - this.size);
          }

          // Time to return?
          if (p.millis() - this.fallTime > returnDelay) {
            this.returning = true;
            this.falling = false;
          }
        }

        if (this.returning) {
          // Ease back home
          const dx = this.homeX - this.x;
          const dy = this.homeY - this.y;

          this.vx += dx * easeSpeed;
          this.vy += dy * easeSpeed;
          this.vx *= 0.7;
          this.vy *= 0.7;

          this.x += this.vx;
          this.y += this.vy;

          // Close enough?
          if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
            this.x = this.homeX;
            this.y = this.homeY;
            this.vx = 0;
            this.vy = 0;
            this.returning = false;
            // Reset to grayscale when home
            this.hasColor = false;
            this.randomColor = null;
          }
        }
      }

      display() {
        if (this.hasColor && this.randomColor) {
          // Use random color while falling or returning
          p.fill(this.randomColor[0], this.randomColor[1], this.randomColor[2]);
        } else {
          // Grayscale when at rest
          const r = Math.round(fgRgb[0] * this.opacity + bgRgb[0] * (1 - this.opacity));
          const g = Math.round(fgRgb[1] * this.opacity + bgRgb[1] * (1 - this.opacity));
          const b = Math.round(fgRgb[2] * this.opacity + bgRgb[2] * (1 - this.opacity));
          p.fill(r, g, b);
        }
        p.noStroke();
        p.rect(this.x, this.y, this.size, this.size);
      }
    }

    function isPointInText(x, y, pg) {
      const px = Math.floor(x);
      const py = Math.floor(y);
      if (px < 0 || px >= pg.width || py < 0 || py >= pg.height) return false;
      const idx = 4 * (py * pg.width + px);
      return pg.pixels[idx] < 128;
    }

    function createBubblesFromText() {
      calculateResponsiveValues();

      const isMobile = window.innerWidth < mobileBreakpoint;
      const textWidthRatio = isMobile ? 1 : 0.75;
      const maxWidth = (p.width * textWidthRatio) - leftMargin * 2;

      // Create offscreen buffer for text
      const pg = p.createGraphics(p.width, p.height);
      pg.pixelDensity(1);
      pg.background(bgRgb[0], bgRgb[1], bgRgb[2]);
      pg.fill(fgRgb[0], fgRgb[1], fgRgb[2]);
      pg.textFont('freighttextcmp-pro');
      pg.textStyle(p.ITALIC);
      pg.textSize(fontSize);
      pg.textAlign(p.CENTER, p.CENTER);

      // Word wrap
      const words = displayText.split(' ');
      const lines = [];
      let currentLine = '';

      for (const word of words) {
        const testLine = currentLine ? currentLine + ' ' + word : word;
        if (pg.textWidth(testLine) > maxWidth && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) lines.push(currentLine);

      // Draw text
      const totalHeight = lines.length * fontSize;
      const verticalOffset = ((p.height - totalHeight) / 3) + 25;

      for (let i = 0; i < lines.length; i++) {
        pg.text(lines[i], p.width / 2, verticalOffset + (fontSize / 2) + i * fontSize);
      }

      pg.loadPixels();

      // Sample points from text
      bubbles = [];
      for (let x = 0; x < p.width; x += gridSpacing) {
        for (let y = 0; y < p.height; y += gridSpacing) {
          const px = x + p.random(-gridSpacing * 0.1, gridSpacing * 0.1);
          const py = y + p.random(-gridSpacing * 0.1, gridSpacing * 0.1);

          if (isPointInText(px, py, pg)) {
            bubbles.push(new Bubble(px, py));
          }
        }
      }

      pg.remove();
      isLoading = false;
    }

    p.setup = () => {
      header = document.getElementById('header');
      if (!header) return;

      header.addEventListener('mouseenter', () => { isMouseInsideHeader = true; });
      header.addEventListener('mouseleave', () => { isMouseInsideHeader = false; });

      const dimensions = getCanvasDimensions();

      const canvas = p.createCanvas(dimensions.width, dimensions.height);
      canvas.parent(header); // Append canvas inside header for proper clipping
      canvas.style('position', 'absolute');
      canvas.style('top', '0');
      canvas.style('left', '0');
      canvas.style('z-index', '0');
      canvas.style('display', 'block');
      canvas.style('margin', '0');
      canvas.style('padding', '0');

      // Wait for font then create bubbles
      const fontSpec = 'italic 100px freighttextcmp-pro';

      document.fonts.load(fontSpec).then(() => {
        if (document.fonts.check(fontSpec)) {
          createBubblesFromText();
        } else {
          // Fallback: try after short delay
          setTimeout(createBubblesFromText, 1000);
        }
      }).catch(() => {
        setTimeout(createBubblesFromText, 1000);
      });
    };

    p.draw = () => {
      p.background(bgRgb[0], bgRgb[1], bgRgb[2]);
      p.rectMode(p.CENTER);

      if (isLoading) {
        // Just show blank background while loading
        return;
      }

      const isMobile = window.innerWidth < mobileBreakpoint;

      for (const bubble of bubbles) {
        // Desktop hover interaction
        if (isMouseInsideHeader && !isMobile) {
          bubble.checkHover(p.mouseX, p.mouseY);
        }

        bubble.update();
        bubble.display();
      }
    };

    p.windowResized = () => {
      if (!header) return;

      const dimensions = getCanvasDimensions();
      p.resizeCanvas(dimensions.width, dimensions.height);

      if (!isLoading) {
        createBubblesFromText();
      }
    };
  });
}

export function stopSketch() {
  if (sketchInstance) {
    sketchInstance.remove();
    sketchInstance = null;
  }
}

startSketch();
