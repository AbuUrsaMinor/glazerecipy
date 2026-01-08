import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/glazerecipy/', // Set base for GitHub Pages deployment
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg'],
      manifest: {
        name: "Tamara's Glaze Inventory Magic Shop",
        short_name: 'Glaze Shop',
        description: 'Personal glaze recipe library for ceramic artists',
        theme_color: '#9333ea',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/glazerecipy/',
        icons: [
          {
            src: 'icon.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
          },
          {
            src: 'icon.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
          },
        ],
      },
    }),
  ],
})
