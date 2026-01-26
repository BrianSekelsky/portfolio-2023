import p5 from 'p5';

console.log("bubble text loaded");

let sketchInstance;
let isMouseInsideHeader = false;

// Theme colors
let currentTheme = {
  background: 255,
  bubbleMin: 0,
  bubbleMax: 100
};

function getThemeColors() {
  const isDark = document.documentElement.classList.contains('dark');
  return {
    background: isDark ? 15 : 255,
    bubbleMin: isDark ? 155 : 0,
    bubbleMax: isDark ? 255 : 100
  };
}

// Listen for theme changes
window.addEventListener('theme-change', () => {
  currentTheme = getThemeColors();
});

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
    let bubbles = [];
    let font;

    // Configuration
    const displayText = "Brian Sekelsky is a designer, working across user experience, visual design, and code.";

    // Responsive settings - will be calculated in setup/resize
    let fontSize;
    let bubbleSize;
    let gridSpacing;
    let hoverRadius;
    let leftMargin;
    let canvasXPosition;

    // Fixed settings
    const returnDelay = 3000;
    const easeSpeed = 0.055;
    const gravity = 0.25;

    // Breakpoint for mobile (matches Tailwind's sm: breakpoint)
    const mobileBreakpoint = 640;

    function calculateResponsiveValues() {
      const width = p.width;

      if (width < 640) {
        // Mobile phones
        fontSize = 52;
        bubbleSize = 1.5;
        gridSpacing = 2;
        hoverRadius = 30;
        leftMargin = 16;
      } else if (width < 768) {
        // Tablets / large phones
        fontSize = 52;
        bubbleSize = 1.5;
        gridSpacing = 2.25;
        hoverRadius = 35;
        leftMargin = 32;
      } else if (width < 1024) {
        // Small laptops / tablets landscape
        fontSize = 72;
        bubbleSize = 2;
        gridSpacing = 3;
        hoverRadius = 40;
        leftMargin = 32;
      } else {
        // Desktop
        fontSize = 100;
        bubbleSize = 2;
        gridSpacing = 3;
        hoverRadius = 40;
        leftMargin = 32;
      }
    }

    function getCanvasPosition() {
      // Check if we're on mobile (nav at top) or desktop (nav on left)
      if (window.innerWidth < mobileBreakpoint) {
        // Mobile: nav is at top, canvas starts at left edge
        return { x: 0, y: 88 };
      } else {
        // Desktop: nav is 64px wide on left
        return { x: 64, y: 0 };
      }
    }

    function getCanvasDimensions() {
      if (!header) return { width: window.innerWidth, height: window.innerHeight };

      if (window.innerWidth < mobileBreakpoint) {
        // Mobile: full width, header height
        return {
          width: window.innerWidth,
          height: header.offsetHeight
        };
      } else {
        // Desktop: width minus nav, header height
        return {
          width: window.innerWidth - 64,
          height: header.offsetHeight
        };
      }
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

        this.randomGray = p.random(0, 50);

        // Random value for jitter (unique per bubble)
        this.jitterSeed = p.random(3);

        // Physics
        this.bounceFactor = -0.6;
        this.friction = 0.98;

        // Wobble
        this.wobbleOffset = p.random(p.TWO_PI);
        this.wobbleSpeed = p.random(0.02, 0.04);
      }

      checkHover(mx, my) {
        let d = p.dist(mx, my, this.x, this.y);
        if (d < hoverRadius && !this.returning) {
          this.falling = true;
          this.fallTime = p.millis();
          // Push away from mouse
          let angle = p.atan2(this.y - my, this.x - mx);
          this.vx += p.cos(angle) * 2;
          this.vy += p.sin(angle) * 0.5;
        }
      }

      update() {
        if (this.falling) {
          // Gravity
          this.vy += gravity;

          // Friction
          this.vx *= this.friction;
          this.vy *= this.friction;

          // Move
          this.x += this.vx;
          this.y += this.vy;

          // Bounce off bottom
          if (this.y > p.height - this.size) {
            this.y = p.height - this.size;
            this.vy *= this.bounceFactor;
            this.vx *= 0.8;
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
          let dx = this.homeX - this.x;
          let dy = this.homeY - this.y;

          this.vx += dx * easeSpeed;
          this.vy += dy * easeSpeed;

          // Damping
          this.vx *= 0.65;
          this.vy *= 0.65;

          this.x += this.vx;
          this.y += this.vy;

          // Close enough?
          if (p.abs(dx) < 0.5 && p.abs(dy) < 0.5 && p.abs(this.vx) < 0.1 && p.abs(this.vy) < 0.1) {
            this.x = this.homeX;
            this.y = this.homeY;
            this.vx = 0;
            this.vy = 0;
            this.returning = false;
          }
        }

        // Wobble at rest
        if (!this.falling && !this.returning) {
          this.wobbleOffset += this.wobbleSpeed;
        }
      }

      display() {
        // Map stored randomGray (0-100) to current theme range
        const gray = p.map(this.randomGray, 0, 100, currentTheme.bubbleMin, currentTheme.bubbleMax);
        p.fill(gray);
        p.noStroke();
        p.rectMode(p.CENTER);

        let displaySize = this.size;
        if (!this.falling && !this.returning) {
          displaySize += p.sin(this.wobbleOffset) * 0.1;
        }

        p.rect(this.x, this.y, displaySize, displaySize);
      }
    }

    // Check if a point is inside the text using a pixel-based approach
    function isPointInText(x, y, pg) {
      let px = Math.floor(x);
      let py = Math.floor(y);
      if (px < 0 || px >= pg.width || py < 0 || py >= pg.height) return false;

      let idx = 4 * (py * pg.width + px);
      // Check if pixel is dark (text was drawn in black)
      return pg.pixels[idx] < 128;
    }

    function createBubblesFromText() {
      bubbles = [];

      calculateResponsiveValues();

      const lineHeight = fontSize * 1;
      const maxWidth = p.width - leftMargin * 2; // leave margin on both sides

      // Create an off-screen graphics buffer to render text
      let pg = p.createGraphics(p.width, p.height);
      pg.pixelDensity(1);
      pg.background(255);
      pg.fill(0);
      pg.textFont('freight-text-pro');
      pg.textStyle(p.ITALIC);
      pg.textSize(fontSize);

      // Split text into paragraphs (by \n), then wrap each paragraph
      const paragraphs = displayText.split('\n');
      let allLines = [];

      for (let para of paragraphs) {
        let words = para.split(' ');
        let currentLine = '';

        for (let word of words) {
          let testLine = currentLine ? currentLine + ' ' + word : word;
          let testWidth = pg.textWidth(testLine);

          if (testWidth > maxWidth && currentLine) {
            allLines.push(currentLine);
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        }
        if (currentLine) {
          allLines.push(currentLine);
        }
      }

      // Draw each line
      for (let i = 0; i < allLines.length; i++) {
        let xOffset = leftMargin;
        let yOffset = fontSize + i * lineHeight;
        pg.text(allLines[i], xOffset, yOffset);
      }

      pg.loadPixels();

      // Grid-based fill: check each point on a grid
      for (let x = 0; x < p.width; x += gridSpacing) {
        for (let y = 0; y < p.height; y += gridSpacing) {
          let px = x + p.random(-gridSpacing * 0.1, gridSpacing * 0.1);
          let py = y + p.random(-gridSpacing * 0.1, gridSpacing * 0.1);

          if (isPointInText(px, py, pg)) {
            bubbles.push(new Bubble(px, py));
          }
        }
      }

      pg.remove();
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

      const dimensions = getCanvasDimensions();
      const position = getCanvasPosition();

      const canvas = p.createCanvas(dimensions.width, dimensions.height);
      canvas.style('opacity', 0);
      canvas.style('transition', 'opacity 0.6s ease');
      setTimeout(() => canvas.style('opacity', 1), 1);
      canvas.position(position.x, position.y);
      canvas.style('z-index', '-1');

      // Initialize theme colors
      currentTheme = getThemeColors();

      createBubblesFromText();
    };

    p.draw = () => {
      p.background(currentTheme.background);

      for (let bubble of bubbles) {
        if (isMouseInsideHeader) {
          bubble.checkHover(p.mouseX, p.mouseY);
        }
        bubble.update();
        bubble.display();
      }
    };

    p.windowResized = () => {
      if (header) {
        const dimensions = getCanvasDimensions();
        const position = getCanvasPosition();

        p.resizeCanvas(dimensions.width, dimensions.height);

        // Update canvas position
        const canvas = document.querySelector('canvas');
        if (canvas) {
          canvas.style.left = position.x + 'px';
          canvas.style.top = position.y + 'px';
        }

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
