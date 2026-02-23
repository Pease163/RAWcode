import { defineConfig, type Plugin } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'

function fontPreload(): Plugin {
  return {
    name: 'font-preload',
    transformIndexHtml: {
      order: 'post',
      handler(_html, ctx) {
        const fontsToPreload = ['unbounded-cyrillic-700', 'sf-pro-display-regular'];

        if (ctx.bundle) {
          // Build mode — find hashed font paths in the bundle
          const tags: { tag: string; attrs: Record<string, string>; injectTo: 'head-prepend' }[] = [];
          for (const name of Object.keys(ctx.bundle)) {
            if (name.endsWith('.woff2') && fontsToPreload.some(f => name.includes(f))) {
              tags.push({
                tag: 'link',
                attrs: { rel: 'preload', href: `/${name}`, as: 'font', type: 'font/woff2', crossorigin: '' },
                injectTo: 'head-prepend',
              });
            }
          }
          return tags;
        }

        // Dev mode — use source paths
        return fontsToPreload.map(f => ({
          tag: 'link' as const,
          attrs: { rel: 'preload', href: `/src/assets/fonts/${f}.woff2`, as: 'font', type: 'font/woff2', crossorigin: '' },
          injectTo: 'head-prepend' as const,
        }));
      },
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    imagetools(),
    fontPreload(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'motion': ['motion'],
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'lenis': ['lenis'],
          'icons': ['lucide-react'],
        }
      }
    }
  }
})
