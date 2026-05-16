import { useEffect } from 'preact/hooks'

const goals = [
  {
    horizon: 'Now',
    title: 'Ship Ounass faster',
    body: 'Continue pushing Core Web Vitals down — image format negotiation, route-level splitting, OpenSearch query tuning, Redis caching. Make every page feel instant in both Arabic and English.'
  }, {
    horizon: 'Next',
    title: 'Deepen AI tooling',
    body: 'Push internal automation further with the Anthropic Agent SDK, MCP servers, and vector search. Build agents that own real workflows end-to-end, not just chat.'
  }, {
    horizon: 'Soon',
    title: 'Open-source something useful',
    body: 'Carve out a small, focused library from work I keep rebuilding — likely around edge-cached search or image delivery. Polished, documented, opinionated.'
  }, {
    horizon: 'On the horizon',
    title: 'Write more publicly',
    body: 'Long-form notes on the craft of performance, the realities of agentic systems, and the small details that make interfaces feel good. Less Twitter, more essays.'
  }, {
    horizon: 'Always',
    title: 'Stay curious',
    body: 'Keep pulling on threads — three.js scenes, shader experiments, new languages, new fields. The work I look back on most fondly always started as side-curiosity.'
  }
]

export default function Goals() {
  useEffect(() => {
    document.title = 'Goals &mdash; What I&rsquo;m Building Next | Muhamad Umar Mehmood'
  }, [])

  return (
    <div class="max-w-[900px] mx-auto min-h-[calc(100vh-220px)]">
      <header class="my-2 mx-auto mb-10 max-w-[720px] text-center lg:mb-14">
        <p class="inline-block text-[10px] tracking-[0.42em] uppercase text-cosmic-violet m-0 mb-3.5 [text-shadow:0_0_18px_rgba(180,140,255,0.45)]">heading toward</p>
        <h1 class="gradient-text gradient-text--gold [font-size:clamp(28px,4.2vw,44px)] font-extrabold tracking-[0.02em] leading-[1.15] m-0 mb-3.5">Goals on the horizon</h1>
        <p class="text-[15px] leading-[1.75] text-cosmic-muted max-w-[640px] mx-auto">Where I&rsquo;m pointing my work next — short-range, mid-range, and the longer light-years out.</p>
      </header>

      <div class="flex flex-col gap-3.5">
        {goals.map((g, i) => (
          <article class="cosmic-panel timeline-card relative !py-[22px] !pr-[26px] !pl-[90px] max-[640px]:!p-[20px_22px]" key={i}>
            <span class="absolute top-6 left-6 text-[10px] tracking-[0.26em] uppercase text-cosmic-violet text-left max-w-[70px] leading-[1.35] [text-shadow:0_0_14px_rgba(180,140,255,0.4)] max-[640px]:static max-[640px]:inline-block max-[640px]:mb-2.5">{g.horizon}</span>
            <h2 class="text-[19px] font-bold tracking-[0.01em] m-0 mb-2">{g.title}</h2>
            <p class="text-[14.5px] leading-[1.75] text-cosmic-muted m-0">{g.body}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
