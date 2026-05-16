import { useEffect } from 'preact/hooks'

export default function Home() {
  useEffect(() => {
    document.title = 'Muhamad Umar Mehmood — Frontend Developer (Full Stack) & UI/UX Designer'
    document.body.classList.add('route-home')
    return () => document.body.classList.remove('route-home')
  }, [])

  const yearsOfExperience = (new Date().getFullYear()) - 2010

  return (
    <div class="max-w-[760px] mx-auto relative z-[2] h-[calc(100svh-200px)] md:h-[calc(100svh-180px)] flex flex-col justify-center text-center px-2 overflow-hidden">
      <p class="hero-fade text-[11px] font-extrabold tracking-[0.42em] uppercase text-cosmic-violet m-0 mb-6 [text-shadow:0_2px_0_rgba(0,0,0,0.95),0_3px_6px_rgba(0,0,0,0.85),0_0_24px_rgba(180,140,255,0.65)]">
        designing &amp; engineering products end&#8209;to&#8209;end
      </p>

      <h1 class="flex flex-col gap-1 font-extrabold tracking-[-0.01em] m-0 mb-7 leading-[1.02] [font-size:clamp(36px,6vw,68px)] [text-shadow:0_4px_0_rgba(0,0,0,0.9),0_6px_12px_rgba(0,0,0,0.85),0_10px_32px_rgba(0,0,0,0.7)]">
        <span class="hero-rise block">Frontend Developer</span>
        <span class="hero-rise block gradient-text gradient-text--rose font-bold [animation-delay:0.15s]">&amp; UI/UX Designer</span>
      </h1>

      <p class="hero-fade text-[16.5px] font-semibold leading-[1.6] m-0 mb-7 max-w-[580px] mx-auto text-white/95 [&_strong]:font-extrabold [&_strong]:text-white [text-shadow:0_2px_0_rgba(0,0,0,0.95),0_4px_10px_rgba(0,0,0,0.85),0_8px_24px_rgba(0,0,0,0.6)] [animation-delay:0.3s]">
        Based in Dubai, UAE with <strong>{yearsOfExperience}+ years</strong> shipping fast, accessible products at scale &mdash; front of the stack to the edge, with <strong>full-stack reach</strong> across services, search, caching, and cloud. Currently at <strong>Al Tayer Group</strong> on <strong>Ounass</strong>.
      </p>

      <p class="hero-fade m-0 [animation-delay:0.5s]">
        <a
          class="text-cosmic-violet text-sm font-bold tracking-[0.18em] uppercase border-b border-[rgba(180,140,255,0.5)] pb-1 transition-colors hover:text-cosmic-rose hover:border-cosmic-rose [text-shadow:0_2px_0_rgba(0,0,0,0.95),0_3px_8px_rgba(0,0,0,0.85)]"
          href="mailto:w3debugger@gmail.com"
        >
          w3debugger@gmail.com
        </a>
      </p>
    </div>
  )
}
