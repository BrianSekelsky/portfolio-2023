import p5 from 'https://cdn.skypack.dev/p5@1.9.0';

let sketchInstance;
let isMouseInsideHeader = false;
let canvasElement = null;

function updateCanvasBlur() {
  if (!canvasElement) return;

  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const blurAmount = Math.min(8, (scrollTop / maxScroll) * 8);

  canvasElement.style.filter = `blur(${blurAmount.toFixed(1)}px)`;
}

window.addEventListener('scroll', updateCanvasBlur);

// Color configuration - change these hex codes to customize appearance
const BG_COLOR = '#ffffff'; // Background color
const FG_COLOR = '#000000'; // Foreground/bubble color

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
    let settledBubbles = new Set(); // Track only settled bubbles for collision detection
    let isLoading = true;
    let loadingRotation = 0;
    let prevMouseX = 0;
    let prevMouseY = 0;

    // Detect Safari and disable stacking for performance
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const stackingEnabled = !isSafari;

    // Parse colors
    const bgRgb = hexToRgb(BG_COLOR);
    const fgRgb = hexToRgb(FG_COLOR);

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
    const returnDelay = 5000;
    const easeSpeed = 0.055;
    const gravity = 0.25;
    
    // Breakpoint for mobile (matches Tailwind's sm: breakpoint)
    const mobileBreakpoint = 640;

    function calculateResponsiveValues() {
      const width = p.width;
      
      if (width < 640) {
        // Mobile phones
        fontSize = 64;
        bubbleSize = 1;
        gridSpacing = 2.25;
        hoverRadius = 30;
        leftMargin = 16;
      } else if (width < 768) {
        // Tablets / large phones
        fontSize = 80;
        bubbleSize = 2;
        gridSpacing = 3;
        hoverRadius = 35;
        leftMargin = 32;
      } else if (width < 1024) {
        // Small laptops / tablets landscape
        fontSize = 86;
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
      constructor(x, y, isLoadingBubble = false) {
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
        this.settled = false;
        this.isLoading = isLoadingBubble;

        // Color handling
        this.originalOpacity = p.random(50, 100);
        this.randomOpacity = this.originalOpacity;
        this.randomColor = null; // Will be set when bubble falls
        this.usesRandomColor = false;

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

          // Generate random color on first fall
          if (!this.usesRandomColor) {
            const r = Math.round(p.random(0, 255));
            const g = Math.round(p.random(0, 255));
            const b = Math.round(p.random(0, 255));
            this.randomColor = [r, g, b];
            this.usesRandomColor = true;
          }

          // Push away from mouse
          let angle = p.atan2(this.y - my, this.x - mx);
          this.vx += p.cos(angle) * 2;
          this.vy += p.sin(angle) * 0.5;
        }
      }

      update(settledBubbles) {
        if (this.falling) {
          if (this.settled) {
            // Waiting to return home
            this.vx = 0;
            this.vy = 0;

            // Time to return?
            if (p.millis() - this.fallTime > returnDelay) {
              this.returning = true;
              this.falling = false;
              this.settled = false;
              return false; // No longer settled
            }
            return true; // Still settled
          }

          // Actively falling
          this.vy += gravity;
          this.vx *= this.friction;
          this.vy *= this.friction;

          this.x += this.vx;
          this.y += this.vy;

          // Check collision with settled bubbles (only if stacking enabled)
          if (stackingEnabled) {
            for (let other of settledBubbles.values()) {
              const dx = this.x - other.x;

              // Check if bubbles are close enough to collide (directional)
              if (this.y > other.y - this.size &&
                  this.y < other.y + this.size &&
                  Math.abs(dx) < this.size + other.size) {
                // Land on top of this bubble
                this.y = other.y - this.size - other.size;
                this.vx = 0;
                this.vy = 0;
                this.settled = true;
                return true; // Just settled
              }
            }
          }

          // Bounce off bottom
          if (this.y > p.height - this.size) {
            this.y = p.height - this.size;
            this.vy *= this.bounceFactor;
            this.vx *= 0.8;
            this.settled = true;
            return true; // Just settled
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
            this.settled = false;
            return false; // No longer settled
          }
          return false; // Still falling, not settled
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
            // Reset to original color when home
            this.randomOpacity = this.originalOpacity;
            this.usesRandomColor = false;
            this.randomColor = null;
          }
        }

        // Wobble at rest
        if (!this.falling && !this.returning) {
          this.wobbleOffset += this.wobbleSpeed;
        }
      }

      display() {
        p.noStroke();
        p.rectMode(p.CENTER);

        if (this.usesRandomColor && this.randomColor) {
          // Use random color while falling or settled
          p.fill(this.randomColor[0], this.randomColor[1], this.randomColor[2]);
        } else {
          // Use original grayscale color
          const opacity = this.randomOpacity / 100;
          const r = Math.round(fgRgb[0] * opacity + bgRgb[0] * (1 - opacity));
          const g = Math.round(fgRgb[1] * opacity + bgRgb[1] * (1 - opacity));
          const b = Math.round(fgRgb[2] * opacity + bgRgb[2] * (1 - opacity));
          p.fill(r, g, b);
        }

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
      settledBubbles.clear();

      calculateResponsiveValues();

      // On desktop (non-mobile), constrain text to 3/4 width for readability
      const isMobile = window.innerWidth < mobileBreakpoint;
      const textWidthRatio = isMobile ? 1 : 0.75;
      const maxWidth = (p.width * textWidthRatio) - leftMargin * 2; // leave margin on both sides
      
      // Create an off-screen graphics buffer to render text
      let pg = p.createGraphics(p.width, p.height);
      pg.pixelDensity(1);
      pg.background(bgRgb[0], bgRgb[1], bgRgb[2]);
      pg.fill(fgRgb[0], fgRgb[1], fgRgb[2]);
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
        let yOffset = fontSize + i * fontSize;
        pg.text(allLines[i], xOffset, yOffset);
      }
      
      pg.loadPixels();

      // Grid-based fill: check each point on a grid
      for (let x = 0; x < p.width; x += gridSpacing) {
        for (let y = 0; y < p.height; y += gridSpacing) {
          let px = x + p.random(-gridSpacing * 0.1, gridSpacing * 0.1);
          let py = y + p.random(-gridSpacing * 0.1, gridSpacing * 0.1);

          if (isPointInText(px, py, pg)) {
            bubbles.push(new Bubble(px, py, false));
          }
        }
      }

      pg.remove();

      // Loading state is complete, transition to interactive bubbles
      isLoading = false;
    }

    function createLoadingBubbles() {
      bubbles = [];
      const centerX = p.width / 2;
      const centerY = p.height / 2;
      const radius = 60;
      const numBubbles = 8;

      for (let i = 0; i < numBubbles; i++) {
        const angle = (p.TWO_PI / numBubbles) * i;
        const x = centerX + p.cos(angle) * radius;
        const y = centerY + p.sin(angle) * radius;
        bubbles.push(new Bubble(x, y, true));
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

      const dimensions = getCanvasDimensions();
      const position = getCanvasPosition();

      const canvas = p.createCanvas(dimensions.width, dimensions.height);
      canvasElement = canvas.canvas; // Cache DOM element for blur updates
      canvas.style('opacity', 0);
      canvas.style('transition', 'opacity 0.6s ease');
      setTimeout(() => canvas.style('opacity', 1), 1);
      canvas.position(position.x, position.y);
      canvas.style('z-index', '-1');

      // Start with loading bubbles
      createLoadingBubbles();

      // Wait for font to load, then create text bubbles
      if (window.Typekit && window.Typekit.load) {
        Typekit.load({
          active: () => {
            createBubblesFromText();
          },
          inactive: () => {
            // Fallback if fonts fail to load
            createBubblesFromText();
          }
        });
      } else if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          createBubblesFromText();
        });
      } else {
        // Last resort fallback
        setTimeout(() => {
          createBubblesFromText();
        }, 1500);
      }
    };

    p.draw = () => {
      p.background(bgRgb[0], bgRgb[1], bgRgb[2]);

      if (isLoading) {
        // Animate loading bubbles in a circle
        loadingRotation += 0.02;
        const centerX = p.width / 2;
        const centerY = p.height / 2;
        const radius = 60;

        for (let i = 0; i < bubbles.length; i++) {
          const angle = (p.TWO_PI / bubbles.length) * i + loadingRotation;
          bubbles[i].x = centerX + p.cos(angle) * radius;
          bubbles[i].y = centerY + p.sin(angle) * radius;
          bubbles[i].display();
        }
      } else {
        // Normal interactive bubbles
        for (let i = bubbles.length - 1; i >= 0; i--) {
          const bubble = bubbles[i];
          if (isMouseInsideHeader) {
            bubble.checkHover(p.mouseX, p.mouseY);
          }
          const isNowSettled = bubble.update(settledBubbles);

          // Manage settled bubbles set
          if (isNowSettled && bubble.falling) {
            settledBubbles.add(bubble);
          } else if (!bubble.falling && settledBubbles.has(bubble)) {
            // Bubble is returning home, remove from settled
            settledBubbles.delete(bubble);
          }

          bubble.display();
        }

        // Draw hover radius circle outline made of grid-aligned bubbles (pixel art style)
        if (isMouseInsideHeader) {
          p.noStroke();
          p.rectMode(p.CENTER);

          // Check if mouse is moving
          const mouseMoving = p.dist(p.mouseX, p.mouseY, prevMouseX, prevMouseY) > 0.5;

          // Check grid points within hoverRadius of mouse - draw only outline
          for (let x = p.mouseX - hoverRadius; x <= p.mouseX + hoverRadius; x += gridSpacing) {
            for (let y = p.mouseY - hoverRadius; y <= p.mouseY + hoverRadius; y += gridSpacing) {
              const d = p.dist(x, y, p.mouseX, p.mouseY);
              // Only draw bubbles on the outline
              if (d <= hoverRadius && d > hoverRadius - gridSpacing * 1.2) {
                // Color for hover circle bubbles based on foreground color
                if (mouseMoving) {
                  // Random variation of foreground color (60-100% opacity)
                  const opacity = p.random(0.2, 0.9);
                  const r = Math.round(fgRgb[0] * opacity + bgRgb[0] * (1 - opacity));
                  const g = Math.round(fgRgb[1] * opacity + bgRgb[1] * (1 - opacity));
                  const b = Math.round(fgRgb[2] * opacity + bgRgb[2] * (1 - opacity));
                  p.fill(r, g, b);
                } else {
                  // Static lighter version of foreground (70% opacity)
                  const opacity = 0.6;
                  const r = Math.round(fgRgb[0] * opacity + bgRgb[0] * (1 - opacity));
                  const g = Math.round(fgRgb[1] * opacity + bgRgb[1] * (1 - opacity));
                  const b = Math.round(fgRgb[2] * opacity + bgRgb[2] * (1 - opacity));
                  p.fill(r, g, b);
                }

                // Add wiggle for old video game effect
                const jitterAmount = gridSpacing * 0.25;
                const jitterX = p.sin(x * 0.1 + p.frameCount * 0.05) * jitterAmount;
                const jitterY = p.cos(y * 0.1 + p.frameCount * 0.05) * jitterAmount;

                p.rect(x + jitterX, y + jitterY, bubbleSize, bubbleSize);
              }
            }
          }

          // Update previous mouse position
          prevMouseX = p.mouseX;
          prevMouseY = p.mouseY;
        }
      }
    };

    p.windowResized = () => {
      if (header) {
        const dimensions = getCanvasDimensions();
        const position = getCanvasPosition();

        p.resizeCanvas(dimensions.width, dimensions.height);

        // Update canvas position
        if (canvasElement) {
          canvasElement.style.left = position.x + 'px';
          canvasElement.style.top = position.y + 'px';
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