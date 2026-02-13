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
    let fontSize, bubbleSize, gridSpacing, hoverRadius, hoverRadiusSq, leftMargin;

    // Physics constants
    const returnDelay = 2500;
    const easeSpeed = 0.06;
    const gravity = 0.00;
    const friction = 0.99;
    const bounce = -0.5;
    const returnFriction = 0.7;
    const sizeEase = 0.1;
    const mobileBreakpoint = 640;
    const displacedSizeMultiplier = 1.3;
    const pushStrength = 2.5;

    // Frame cache
    let frameTime = 0;
    let canvasWidth = 0;
    let canvasHeight = 0;

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
      // Pre-calculate squared radius for distance checks
      hoverRadiusSq = hoverRadius * hoverRadius;
    }

    function getCanvasDimensions() {
      if (!header) return { width: window.innerWidth, height: window.innerHeight };
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
        this.baseSize = bubbleSize;
        this.targetSize = bubbleSize * displacedSizeMultiplier;
        this.displaySize = bubbleSize;
        this.state = 0; // 0 = resting, 1 = falling, 2 = returning
        this.fallTime = 0;

        // Pre-calculate grayscale color (cached, not recalculated each frame)
        const opacity = 0.85 + Math.random();
        this.restR = Math.round(fgRgb[0] * opacity + bgRgb[0] * (1 - opacity));
        this.restG = Math.round(fgRgb[1] * opacity + bgRgb[1] * (1 - opacity));
        this.restB = Math.round(fgRgb[2] * opacity + bgRgb[2] * (1 - opacity));

        // Random color (generated once when needed)
        this.colorR = 0;
        this.colorG = 0;
        this.colorB = 0;
        this.hasColor = false;
      }

      checkHover(mx, my) {
        if (this.state === 2) return; // Skip if returning

        // Squared distance (avoids sqrt)
        const dx = mx - this.x;
        const dy = my - this.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < hoverRadiusSq) {
          this.state = 1;
          this.fallTime = frameTime;

          if (!this.hasColor) {
            this.colorR = 50 + Math.floor(Math.random() * 205);
            this.colorG = 50 + Math.floor(Math.random() * 205);
            this.colorB = 50 + Math.floor(Math.random() * 205);
            this.hasColor = true;
          }

          // Push away from mouse (native Math is faster)
          const angle = Math.atan2(this.y - my, this.x - mx);
          this.vx += Math.cos(angle) * pushStrength;
          this.vy += Math.sin(angle) * pushStrength;
        }
      }

      update() {
        const state = this.state;

        if (state === 1) { // Falling
          this.vy += gravity;
          this.vx *= friction;
          this.vy *= friction;

          this.x += this.vx;
          this.y += this.vy;

          // Bounce off walls
          const size = this.displaySize;
          if (this.y > canvasHeight - size) {
            this.y = canvasHeight - size;
            this.vy *= bounce;
          } else if (this.y < size) {
            this.y = size;
            this.vy *= bounce;
          }

          if (this.x < size) {
            this.x = size;
            this.vx *= bounce;
          } else if (this.x > canvasWidth - size) {
            this.x = canvasWidth - size;
            this.vx *= bounce;
          }

          // Grow size
          this.displaySize += (this.targetSize - this.displaySize) * sizeEase;

          // Time to return?
          if (frameTime - this.fallTime > returnDelay) {
            this.state = 2;
          }
        } else if (state === 2) { // Returning
          const dx = this.homeX - this.x;
          const dy = this.homeY - this.y;

          this.vx += dx * easeSpeed;
          this.vy += dy * easeSpeed;
          this.vx *= returnFriction;
          this.vy *= returnFriction;

          this.x += this.vx;
          this.y += this.vy;

          // Shrink back
          this.displaySize += (this.baseSize - this.displaySize) * sizeEase;

          // Close enough?
          if (dx * dx + dy * dy < 0.25) { // 0.5 * 0.5
            this.x = this.homeX;
            this.y = this.homeY;
            this.vx = 0;
            this.vy = 0;
            this.displaySize = this.baseSize;
            this.state = 0;
            this.hasColor = false;
          }
        }
        // state === 0: resting, no update needed
      }

      display() {
        if (this.hasColor) {
          p.fill(this.colorR, this.colorG, this.colorB);
        } else {
          p.fill(this.restR, this.restG, this.restB);
        }
        p.rect(this.x, this.y, this.displaySize, this.displaySize);
      }
    }

    function isPointInText(x, y, pg) {
      const px = x | 0; // Fast floor
      const py = y | 0;
      if (px < 0 || px >= pg.width || py < 0 || py >= pg.height) return false;
      const idx = (py * pg.width + px) << 2; // * 4 using bit shift
      return pg.pixels[idx] < 128;
    }

    function createBubblesFromText() {
      calculateResponsiveValues();

      const isMobile = window.innerWidth < mobileBreakpoint;
      const textWidthRatio = isMobile ? 1 : 0.75;
      const maxWidth = (p.width * textWidthRatio) - leftMargin * 2;

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

      for (let i = 0; i < words.length; i++) {
        const word = words[i];
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
      const centerX = p.width / 2;

      for (let i = 0; i < lines.length; i++) {
        pg.text(lines[i], centerX, verticalOffset + (fontSize / 2) + i * fontSize);
      }

      pg.loadPixels();

      // Sample points from text
      const newBubbles = [];
      const jitter = gridSpacing * 0.1;

      for (let x = 0; x < p.width; x += gridSpacing) {
        for (let y = 0; y < p.height; y += gridSpacing) {
          const px = x + (Math.random() * 2 - 1) * jitter;
          const py = y + (Math.random() * 2 - 1) * jitter;

          if (isPointInText(px, py, pg)) {
            newBubbles.push(new Bubble(px, py));
          }
        }
      }

      bubbles = newBubbles;
      pg.remove();
      isLoading = false;
    }

    p.setup = () => {
      header = document.getElementById('header');
      if (!header) return;

      header.addEventListener('mouseenter', () => { isMouseInsideHeader = true; });
      header.addEventListener('mouseleave', () => { isMouseInsideHeader = false; });

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

      // Set once, not every frame
      p.rectMode(p.CENTER);
      p.noStroke();

      const fontSpec = 'italic 100px freighttextcmp-pro';

      document.fonts.load(fontSpec).then(() => {
        if (document.fonts.check(fontSpec)) {
          createBubblesFromText();
        } else {
          setTimeout(createBubblesFromText, 1000);
        }
      }).catch(() => {
        setTimeout(createBubblesFromText, 1000);
      });
    };

    p.draw = () => {
      p.background(bgRgb[0], bgRgb[1], bgRgb[2]);

      if (isLoading) return;

      // Cache values for this frame
      frameTime = p.millis();
      const mx = p.mouseX;
      const my = p.mouseY;
      const checkHover = isMouseInsideHeader && window.innerWidth >= mobileBreakpoint;
      const len = bubbles.length;

      for (let i = 0; i < len; i++) {
        const bubble = bubbles[i];

        if (checkHover) {
          bubble.checkHover(mx, my);
        }

        bubble.update();
        bubble.display();
      }

      // Draw cursor circle when hovering over sketch
      if (checkHover && mx > 0 && mx < canvasWidth && my > 0 && my < canvasHeight) {
        p.noFill();
        p.stroke(fgRgb[0], fgRgb[1], fgRgb[2], 80);
        p.strokeWeight(1.5);
        p.ellipse(mx, my, hoverRadius * 2, hoverRadius * 2);
        p.noStroke(); // Reset for next frame
      }
    };

    p.windowResized = () => {
      if (!header) return;

      const dimensions = getCanvasDimensions();
      canvasWidth = dimensions.width;
      canvasHeight = dimensions.height;
      p.resizeCanvas(canvasWidth, canvasHeight);

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
