import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  output: "static",
  // adapter: netlify()

  // Image optimization
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
    domains: [],
    remotePatterns: [{ protocol: "https" }]
  },

  // Build optimizations
  build: {
    inlineStylesheets: 'auto',
  },

  // Vite optimizations for code splitting
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/p5/')) return 'p5';
            if (id.includes('node_modules/gsap/')) return 'gsap';
          }
        }
      }
    }
  }
});