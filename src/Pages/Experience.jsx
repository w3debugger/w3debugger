import { useEffect } from 'preact/hooks'

const experience = [
  {
    label: 'Present',
    year: 'Nov 2016',
    title: 'Ounass · Al Tayer Group',
    subtitle: 'Frontend Developer · Full-Stack Contributor',
    description: "Building the high-traffic e-commerce platforms behind Al Tayer's luxury portfolio &mdash; led by Ounass, the Middle East's flagship destination for luxury fashion, beauty, and home, serving customers across the GCC in Arabic and English. Frontend is the home base &mdash; storefronts in React, Preact, and Next.js with TypeScript and Tailwind, hardened for Core Web Vitals, accessibility, and dual-language UX. Reach extends across the full stack: Node.js services on Express, Hono, and Fastify, search on OpenSearch (with KNN-powered personalization), caching on Redis, content in Contentful, delivery on AWS and Cloudflare Workers. Recently leading internal AI tooling with the Anthropic Agent SDK, MCP servers, and the Google AI SDK to automate codebase search, review, and developer workflows.",
    url: 'https://www.ounass.ae/'
  }, {
    label: 'Got the opportunity',
    year: 'Aug 2015',
    title: 'Bond Internet Consultancy',
    subtitle: 'Frontend Developer & UX / UI Designer',
    description: 'Lead UI developer on client work in Angular and Adobe Experience Manager &mdash; owning the frontend workflow on Sass, BEM, Grunt, and Git. Partnered daily with art directors, project managers, and designers to ship websites, landing pages, and email campaigns on Sitecore and Umbraco. A regular voice in new-business pitches, turning concepts into high-fidelity prototypes and strategic microsites that helped win accounts.',
    url: 'http://www.bondinco.com/'
  }, {
    label: 'Jump into the code',
    year: 'Jan 2012',
    title: 'VirtueNetz',
    subtitle: 'Frontend Developer & UX / UI Designer',
    description: "Designed and shipped a broad mix of web and print projects across the agency's client roster. Web work spanned WordPress and WooCommerce stores, responsive landing pages, and full frontend builds in PHP, HTML, CSS, LESS, and jQuery. Print and identity work in Photoshop, Illustrator, and InDesign. Brought disciplined wireframes, sitemaps, and user-experience thinking to every project that moved through the studio.",
    url: 'http://www.virtuenetz.com/'
  }, {
    label: 'Improve UX / UI',
    year: 'Apr 2011',
    title: 'ConceptBeans',
    subtitle: 'UX / UI Designer',
    description: "Designed web and brand-identity projects across the agency's client roster. Produced wireframes, mockups, and high-fidelity prototypes, and partnered closely with developers to keep the shipped product faithful to the design intent."
  }, {
    label: 'My first company',
    year: 'Feb 2011',
    title: 'Mars Multimedia',
    subtitle: 'Junior UI Designer',
    description: 'My first design role &mdash; where I learned the fundamentals of web design and the rhythm of professional client work, from milestones and feedback cycles to shipping on deadline.'
  }
]

export default function Experience() {
  useEffect(() => {
    document.title = 'Career &mdash; Frontend & Full-Stack Experience | Muhamad Umar Mehmood'
  }, [])

  return (
    <div class="max-w-[900px] mx-auto min-h-[calc(100vh-220px)]">
      <header class="my-2 mx-auto mb-10 max-w-[720px] text-center lg:mb-14">
        <p class="inline-block text-[10px] tracking-[0.42em] uppercase text-cosmic-violet m-0 mb-3.5 [text-shadow:0_0_18px_rgba(180,140,255,0.45)]">trajectory</p>
        <h1 class="gradient-text gradient-text--violet [font-size:clamp(28px,4.2vw,44px)] font-extrabold tracking-[0.02em] leading-[1.15] m-0 mb-3.5">A career across galaxies</h1>
        <p class="text-[15px] leading-[1.75] text-cosmic-muted max-w-[640px] mx-auto">15+ years of shipping &mdash; where I&rsquo;ve worked, what I built, and what each step taught me.</p>
      </header>

      <ol class="list-none p-0 m-0">
        {experience.map((item, i) => (
          <li class="grid grid-cols-[24px_1fr] gap-5 mb-6 last:mb-0 max-[600px]:grid-cols-[18px_1fr] max-[600px]:gap-3.5" key={i}>
            <div class="relative flex justify-center pt-7" aria-hidden="true">
              <span class="relative w-[11px] h-[11px] rounded-full bg-cosmic-violet shadow-[0_0_14px_2px_rgba(180,140,255,0.55)] z-[2]" />
              {i < experience.length - 1 && (
                <span class="absolute top-[38px] -bottom-6 left-1/2 w-px -translate-x-1/2 bg-[linear-gradient(180deg,rgba(180,140,255,0.45)_0%,rgba(180,140,255,0.05)_100%)]" />
              )}
            </div>
            <article class="cosmic-panel timeline-card !py-[22px] !px-[26px] max-[600px]:!py-[18px] max-[600px]:!px-5">
              <div class="flex items-center gap-3 mb-2.5">
                <span class="text-[11px] tracking-[0.22em] uppercase text-cosmic-violet tabular-nums">{item.year}</span>
                <span class="text-[10px] tracking-[0.24em] uppercase text-cosmic-faint before:content-['·'] before:mr-3 before:text-cosmic-faint">{item.label}</span>
              </div>
              <h2 class="text-[22px] font-bold tracking-[0.01em] m-0 mb-1 max-[600px]:text-[18px]">
                {item.url
                  ? <a class={`gradient-text ${['gradient-text--gold','gradient-text--rose','gradient-text--cool','gradient-text--magenta','gradient-text--blue'][i % 5]} transition-opacity hover:opacity-85`} href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
                  : <span class={`gradient-text ${['gradient-text--gold','gradient-text--rose','gradient-text--cool','gradient-text--magenta','gradient-text--blue'][i % 5]}`}>{item.title}</span>}
              </h2>
              <p class="text-xs tracking-[0.18em] uppercase text-cosmic-muted m-0 mb-3.5">{item.subtitle}</p>
              <p class="text-[14.5px] leading-[1.75] text-cosmic-muted m-0">{item.description}</p>
            </article>
          </li>
        ))}
      </ol>
    </div>
  )
}
