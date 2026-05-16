import { useEffect } from 'preact/hooks'

const clusterGradients = [
  'gradient-text--warm',
  'gradient-text--cool',
  'gradient-text--rose',
  'gradient-text--blue',
  'gradient-text--magenta',
  'gradient-text--violet',
  'gradient-text--gold',
  'gradient-text--cool'
]

const skills = [
  { title: 'AI / LLM',              items: ['Claude Agent SDK', 'MCP', 'AWS Bedrock', 'Google Gemini', 'Prompt Engineering'] },
  { title: 'Cloud & Infrastructure',items: ['AWS (S3, Bedrock, Athena, STS)', 'Cloudflare Workers', 'Wrangler', 'Sentry', 'New Relic', 'PM2'] },
  { title: 'Backend',               items: ['Node.js', 'Express', 'Hono', 'Fastify', 'Slack Bolt', 'Sharp', 'REST APIs'] },
  { title: 'Data & Search',         items: ['PostgreSQL', 'MySQL', 'Redis', 'OpenSearch', 'Knex', 'RabbitMQ', 'IndexedDB'] },
  { title: 'Frontend & Desktop',    items: ['React', 'Preact', 'Preact Signals', 'Zustand', 'CodeMirror', 'Electron', 'react-markdown'] },
  { title: 'Testing',               items: ['Jest', 'Vitest', 'Playwright', 'Testing Library', 'MSW', 'Puppeteer'] },
  { title: 'Build & Styling',       items: ['Vite', 'esbuild', 'Babel', 'Tailwind CSS', 'daisyUI', 'Sass', 'PostCSS'] },
  { title: 'Languages',             items: ['TypeScript', 'JavaScript', 'HTML5', 'CSS3'] }
]

export default function Skills() {
  useEffect(() => {
    document.title = 'Skills &mdash; Frontend, Full-Stack, AI & UI/UX | Muhamad Umar Mehmood'
  }, [])

  return (
    <div class="max-w-[900px] mx-auto min-h-[calc(100vh-220px)]">
      <header class="my-2 mx-auto mb-10 max-w-[720px] text-center lg:mb-14">
        <p class="inline-block text-[10px] tracking-[0.42em] uppercase text-cosmic-violet m-0 mb-3.5 [text-shadow:0_0_18px_rgba(180,140,255,0.45)]">technical stack</p>
        <h1 class="gradient-text gradient-text--cool [font-size:clamp(28px,4.2vw,44px)] font-extrabold tracking-[0.02em] leading-[1.15] m-0 mb-3.5">An asteroid belt of tools</h1>
        <p class="text-[15px] leading-[1.75] text-cosmic-muted max-w-[640px] mx-auto">A full-stack toolkit I reach for day-to-day — from interface, through services and data, down to the cloud underneath, with AI tooling layered on top.</p>
      </header>

      <div class="max-w-[760px] mx-auto flex flex-col gap-9">
        {skills.map((cluster, i) => (
          <section key={i}>
            <header class="grid grid-cols-[auto_auto_1fr_auto] items-center gap-3.5 mb-4">
              <span class="text-[10px] tracking-[0.32em] text-cosmic-faint tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <h2 class={`gradient-text ${clusterGradients[i % clusterGradients.length]} text-[15px] font-bold tracking-[0.04em] m-0`}>{cluster.title}</h2>
              <span class="h-px bg-[linear-gradient(90deg,rgba(180,140,255,0.3)_0%,rgba(180,140,255,0.04)_100%)]" aria-hidden="true" />
              <span class="text-[10px] tracking-[0.28em] text-cosmic-faint tabular-nums">{cluster.items.length}</span>
            </header>
            <ul class="list-none p-0 m-0 flex flex-wrap gap-2">
              {cluster.items.map((it, j) => (
                <li
                  class="text-[13px] tracking-[0.01em] px-3.5 py-2 rounded-full bg-[rgba(180,140,255,0.05)] border border-[rgba(180,140,255,0.18)] text-cosmic-text transition-all cursor-default hover:bg-[rgba(180,140,255,0.12)] hover:border-cosmic-violet hover:text-white hover:-translate-y-px hover:shadow-[0_6px_18px_-6px_rgba(180,140,255,0.5)]"
                  key={j}
                >
                  {it}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
