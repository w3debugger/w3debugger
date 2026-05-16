import { useEffect } from 'preact/hooks'

const experiments = [
  {
    title: 'Cosmic Hero',
    role: 'Three.js · GLSL · Preact',
    note: 'The galaxy/wormhole/pulsar scene you are flying through right now. Route changes become camera flights through space.'
  }, {
    title: 'Agent SDK Playground',
    role: 'Claude Agent SDK · MCP',
    note: 'Experiments wiring Claude into internal tools — MCP servers for codebase search, schema introspection, and review.'
  }, {
    title: 'Vector Search Tuning',
    role: 'OpenSearch KNN · Embeddings',
    note: 'Personalized product discovery driven by user-behaviour embeddings. Indexing pipelines and similarity tuning.'
  }, {
    title: 'Image Format Negotiation',
    role: 'Cloudflare Workers · Sharp',
    note: 'Edge-resolved AVIF/WebP/JPEG delivery with format scoring, hooked into Ounass storefront for Core Web Vitals.'
  }, {
    title: 'Preact Signals Migration',
    role: 'Preact · Signals',
    note: 'Migrating a Redux-shaped state tree to fine-grained signals — fewer re-renders, smaller bundles, cleaner code.'
  }, {
    title: 'Edge-Cached Search',
    role: 'OpenSearch · Redis',
    note: 'Latency-budget-aware caching of search queries with stampede protection and staleness windows.'
  }
]

export default function Lab() {
  useEffect(() => {
    document.title = 'Lab &mdash; Experiments in Frontend, Full-Stack & AI | Muhamad Umar Mehmood'
  }, [])

  return (
    <div class="max-w-[900px] mx-auto min-h-[calc(100vh-220px)]">
      <header class="my-2 mx-auto mb-10 max-w-[720px] text-center lg:mb-14">
        <p class="inline-block text-[10px] tracking-[0.42em] uppercase text-cosmic-violet m-0 mb-3.5 [text-shadow:0_0_18px_rgba(180,140,255,0.45)]">field experiments</p>
        <h1 class="gradient-text gradient-text--magenta [font-size:clamp(28px,4.2vw,44px)] font-extrabold tracking-[0.02em] leading-[1.15] m-0 mb-3.5">The Lab</h1>
        <p class="text-[15px] leading-[1.75] text-cosmic-muted max-w-[640px] mx-auto">Side projects, prototypes, and experiments across frontend, backend, and AI — where I stretch the stack, test new tools, and bring the lessons back to production.</p>
      </header>

      <div class="grid gap-4 grid-cols-[repeat(auto-fill,minmax(280px,1fr))] max-[600px]:grid-cols-1">
        {experiments.map((x, i) => (
          <article class="cosmic-panel timeline-card !pt-[22px] !pb-6 !px-6" key={i}>
            <header class="flex items-baseline gap-2.5 mb-1.5">
              <span class="text-[10px] tracking-[0.3em] text-cosmic-faint tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <h2 class={`gradient-text ${['gradient-text--cool','gradient-text--warm','gradient-text--blue','gradient-text--rose','gradient-text--gold','gradient-text--violet'][i % 6]} text-[17px] font-bold m-0`}>{x.title}</h2>
            </header>
            <p class="text-[11px] tracking-[0.2em] uppercase text-cosmic-muted m-0 mb-3.5">{x.role}</p>
            <p class="text-sm leading-[1.7] text-cosmic-muted m-0">{x.note}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
