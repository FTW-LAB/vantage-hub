import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  server: {
    // Keep local preview reachable while developing (do not break 0.0.0.0:8080)
    host: '0.0.0.0',
    port: 8080,
    strictPort: false,
  },
  plugins: [
    devtools(),
    // On Vercel, NITRO_PRESET/VERCEL forces vercel output; local uses node-server
    nitro({
      preset: process.env.VERCEL || process.env.NITRO_PRESET === 'vercel' ? 'vercel' : undefined,
      rollupConfig: { external: [/^@sentry\//] },
      routeRules: {
        '/**': {
          headers: {
            'Strict-Transport-Security':
              'max-age=63072000; includeSubDomains; preload',
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            'Referrer-Policy': 'strict-origin-when-cross-origin',
            'Permissions-Policy':
              'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=()',
            'Cross-Origin-Opener-Policy': 'same-origin',
            'Cross-Origin-Resource-Policy': 'same-origin',
            'X-DNS-Prefetch-Control': 'off',
            'X-Permitted-Cross-Domain-Policies': 'none',
            'Content-Security-Policy':
              "default-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'; img-src 'self' data: https:; font-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self' https://huggingface.co https://api.github.com https://*.vercel.app; upgrade-insecure-requests",
          },
        },
      },
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
})

export default config
