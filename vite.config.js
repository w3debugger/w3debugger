import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'

// Inline the bundled CSS into index.html so it isn't render-blocking.
// Lighthouse flags the <link rel="stylesheet"> as a critical-path request;
// at our CSS size the link costs more than the bytes it saves.
function inlineCss() {
  return {
    name: 'inline-css',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const html = bundle['index.html']
      if (!html || html.type !== 'asset') return

      let source = String(html.source)

      source = source.replace(
        /<link rel="stylesheet"[^>]*href="\/assets\/([^"]+\.css)"[^>]*>/g,
        (match, fileName) => {
          const cssAsset = bundle[`assets/${fileName}`]
          if (!cssAsset || cssAsset.type !== 'asset') return match
          const css = String(cssAsset.source)
          delete bundle[`assets/${fileName}`]
          return `<style>${css}</style>`
        },
      )

      html.source = source
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact(), tailwindcss(), inlineCss()],
})
