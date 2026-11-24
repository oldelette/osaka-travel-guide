import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/osaka-travel-guide/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['pwa-192.png', 'pwa-512.png', 'pwa-512-maskable.png'],
      manifest: {
        name: 'Osaka Travel Guide',
        short_name: 'Osaka Guide',
        description: '2026 Osaka Travel Guide',
        lang: 'zh-Hant',
        display: 'standalone',
        theme_color: '#f6f2e9',
        background_color: '#f6f2e9',
        start_url: '/osaka-travel-guide/',
        scope: '/osaka-travel-guide/',
        icons: [
          { src: 'pwa-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'pwa-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: [
          '**/*.{js,css,html,svg,webmanifest}',
          '**/images/cover/dotonbori.jpg',
          '**/images/day1/osaka-castle.jpg',
          '**/images/day2/kiyomizu-dera.jpg',
          '**/images/day3/usj.jpg',
          '**/images/day4/katsuoji-daruma.jpg',
          '**/images/day5/kix-terminal.jpg',
          '**/images/home/*.jpg',
        ],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/css2\?.*family=/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'osaka-google-font-styles-v1',
              expiration: { maxEntries: 2, maxAgeSeconds: 30 * 24 * 60 * 60 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
            handler: 'CacheFirst',
            options: {
              cacheName: 'osaka-google-font-files-v1',
              expiration: { maxEntries: 20, maxAgeSeconds: 30 * 24 * 60 * 60 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /\/osaka-travel-guide\/images\//,
            handler: 'CacheFirst',
            options: {
              cacheName: 'osaka-local-images-v1',
              expiration: { maxEntries: 20, maxAgeSeconds: 30 * 24 * 60 * 60 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
});
