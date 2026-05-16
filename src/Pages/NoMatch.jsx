import { useEffect } from 'preact/hooks'
import { useLocation } from 'preact-iso'

const KNOWN_ROUTES = ['/', '/work', '/skills', '/experience', '/lab', '/goals']

export default function NoMatch() {
  const { path, route } = useLocation()

  useEffect(() => {
    const lower = path.toLowerCase()
    if (lower !== path && KNOWN_ROUTES.includes(lower)) {
      route(lower, true)
      return
    }
    document.title = 'Lost in space — Muhamad Umar Mehmood'
  }, [path, route])

  return (
    <div class="max-w-[900px] mx-auto min-h-[calc(100vh-220px)] flex items-center justify-center">
      <div class="cosmic-panel cosmic-panel--glow max-w-[560px] text-center !py-11 !px-10">
        <p class="inline-block text-[10px] tracking-[0.42em] uppercase text-cosmic-violet m-0 mb-3.5 [text-shadow:0_0_18px_rgba(180,140,255,0.45)]">signal lost</p>
        <h1 class="gradient-text gradient-text--rose [font-size:clamp(28px,4.2vw,44px)] font-extrabold tracking-[0.02em] leading-[1.15] m-0 mb-[18px]">404 · Beyond the map</h1>
        <p class="text-[15px] leading-[1.75] text-cosmic-muted m-0 mb-7">
          There&rsquo;s no destination here. The route{' '}
          <code class="font-mono text-[13px] px-2 py-0.5 mx-0.5 bg-[rgba(180,140,255,0.08)] border border-[var(--c-border-glow)] rounded text-cosmic-violet">{path}</code>
          {' '}drifts somewhere past charted space.
        </p>
        <a
          class="inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-cosmic-violet border-b border-[rgba(180,140,255,0.35)] pb-[3px] transition-all hover:text-cosmic-rose hover:border-cosmic-rose hover:gap-3"
          href="/"
        >
          <span>Return to home orbit</span>
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  )
}
