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
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
})

export default config
