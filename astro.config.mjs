import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
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
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'p5': ['p5'],
            'gsap': ['gsap']
          }
        }
      }
    }
  }
});