import { useEffect } from 'preact/hooks'

const projects = [
  {
    title: 'Ounass',
    type: 'Frontend Developer · Full-Stack Contributor',
    url: 'https://www.ounass.ae',
    current: true,
    summary: [
      "The Middle East's flagship destination for luxury fashion, beauty, and home. Launched by Al Tayer Group in 2016, Ounass now carries over 300 brands and ships across the GCC, with dual-language shopping and 2-hour delivery in Dubai.",
      "Performance sits at the centre of most of what I do. On the frontend: image format negotiation, route-level code splitting, Core Web Vitals tuning, accessibility and RTL/LTR parity. On the backend: query optimization, Redis caching, OpenSearch tuning, chasing tail latency across Node.js services on Express, Hono, and Fastify. The goal is simple — Ounass should feel instant and rank strongly in Arabic and English alike.",
      "Lately, AI has joined the work too. Vector embeddings and OpenSearch KNN power personalized product discovery and similar-item recommendations from real user behaviour, and internal automation runs on the Anthropic Agent SDK and MCP."
    ]
  },
  { title: 'Our Heroes',       type: 'Side Project',           url: 'https://ourheroes.io/' },
  { title: 'Gap',              type: 'Frontend Engineering',   url: 'https://www.gap.ae/' },
  { title: 'Mamas & Papas',    type: 'Frontend Engineering',   url: 'https://www.mamasandpapas.ae/' },
  { title: 'Geeks',            type: 'Redesign & Engineering', url: 'https://www.geeks.ae' },
  { title: 'Stubble & Strife', type: 'Frontend Engineering',   url: 'https://www.stubbleandstrife.com/' },
  { title: 'HopScotch',        type: 'Frontend Engineering',   url: 'https://www.ilovehopscotch.com/' },
  { title: 'SegmentNext',      type: 'Design & Engineering',   url: 'https://segmentnext.com/' },
  { title: 'Vortex Creation',  type: 'Design & Engineering',   url: 'https://www.behance.net/gallery/22634175/Vortex-Creation' },
  { title: 'FEGroup',          type: 'Frontend Engineering',   url: 'http://fegroup.net.au/' }
]

const eyebrow = "inline-block text-[10px] tracking-[0.42em] uppercase text-cosmic-violet m-0 mb-3.5 [text-shadow:0_0_18px_rgba(180,140,255,0.45)]"
const titleGradient = "gradient-text gradient-text--warm [font-size:clamp(28px,4.2vw,44px)] font-extrabold tracking-[0.02em] leading-[1.15] m-0 mb-3.5"
const lead = "text-[15px] leading-[1.75] text-cosmic-muted max-w-[640px] mx-auto"

export default function Work() {
  useEffect(() => {
    document.title = 'Selected Work — Frontend, Full-Stack & E-commerce | Muhamad Umar Mehmood'
  }, [])

  const current = projects.find(p => p.current)
  const previous = projects.filter(p => !p.current)

  return (
    <div class="max-w-[900px] mx-auto min-h-[calc(100vh-220px)]">
      <header class="my-2 mx-auto mb-10 max-w-[720px] text-center lg:mb-14">
        <p class={eyebrow}>selected work</p>
        <h1 class={titleGradient}>Things I&rsquo;ve shipped</h1>
        <p class={lead}>A selection of projects across e-commerce, retail, and editorial platforms — designed and engineered with performance, accessibility, and craft at the centre. Frontend-led, full-stack where it counts.</p>
      </header>

      {current && (
        <section class="max-w-[720px] mx-auto pt-2 pb-5 text-center">
          <p class={eyebrow}>currently shipping</p>
          <h2 class="gradient-text gradient-text--magenta [font-size:clamp(40px,6vw,72px)] font-extrabold tracking-[0.005em] leading-[1.05] my-2">{current.title}</h2>
          <p class="text-xs tracking-[0.28em] uppercase text-cosmic-muted m-0 mb-9">{current.type}</p>
          <div class="text-left mx-auto mb-8 max-w-[620px]">
            {current.summary.map((p, i) => (
              <p class="text-[15.5px] leading-[1.8] text-[rgba(243,238,249,0.78)] m-0 mb-[18px] last:mb-0" key={i}>{p}</p>
            ))}
          </div>
          <a
            class="inline-flex items-center gap-2 text-xs tracking-[0.24em] uppercase text-cosmic-violet border-b border-[rgba(180,140,255,0.35)] pb-1 transition-all hover:text-cosmic-rose hover:border-cosmic-rose hover:gap-3.5"
            href={current.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit {current.title} <span aria-hidden="true">→</span>
          </a>
        </section>
      )}

      <div class="h-px bg-[linear-gradient(90deg,transparent_0%,rgba(180,140,255,0.4)_50%,transparent_100%)] mt-14 mb-8" />

      <section class="max-w-[720px] mx-auto">
        <h3 class="text-[13px] font-bold tracking-[0.32em] uppercase text-cosmic-faint m-0 mb-5">Previous Constellations</h3>
        <ul class="list-none p-0 m-0 border-t border-[var(--c-border-soft)]">
          {previous.map((p, i) => (
            <li class="border-b border-[var(--c-border-soft)]" key={i}>
              <a class="work-row text-cosmic-text" href={p.url} target="_blank" rel="noopener noreferrer">
                <span class="text-[10px] tracking-[0.3em] text-cosmic-faint tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                <span class="work-row-title text-[18px] font-semibold tracking-[0.01em] transition-colors">{p.title}</span>
                <span class="work-row-role text-[11px] tracking-[0.2em] uppercase text-cosmic-muted text-right">{p.type}</span>
                <span class="work-row-arrow text-sm text-cosmic-faint text-right" aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
