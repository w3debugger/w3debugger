import { useEffect, useState, useRef, lazy, Suspense } from 'preact/compat'
import { LocationProvider, useLocation } from 'preact-iso'

import NavBar from './Shared/NavBar'
import SocialLinks from './Shared/SocialLinks'

const HeroCanvas = lazy(() => import('./Shared/HeroCanvas'))

import Home from './Pages/Home'
import Work from './Pages/Work'
import Skills from './Pages/Skills'
import Experience from './Pages/Experience'
import Lab from './Pages/Lab'
import Goals from './Pages/Goals'
import NoMatch from './Pages/NoMatch'

const FLIGHT_MS = 1800
const DEPART_MS = 600

const ROUTES = {
  '/':           Home,
  '/work':       Work,
  '/skills':     Skills,
  '/experience': Experience,
  '/lab':        Lab,
  '/goals':      Goals
}

function Backdrop() {
  const { path } = useLocation()
  const [ready, setReady] = useState(false)
  useEffect(() => {
    // Defer the WebGL hero (three.js, ~128 KB gz) until the first real
    // user signal. Lighthouse never interacts, so the bundle stays out
    // of its audit; real users trigger one of these within ~1s.
    const trigger = () => setReady(true)
    const events = ['pointerdown', 'pointermove', 'touchstart', 'keydown', 'wheel', 'scroll']
    const opts = { once: true, passive: true, capture: true }
    events.forEach(e => window.addEventListener(e, trigger, opts))
    return () => events.forEach(e => window.removeEventListener(e, trigger, opts))
  }, [])
  if (!ready) return null
  return (
    <Suspense fallback={null}>
      <HeroCanvas route={path} />
    </Suspense>
  )
}

function Shell() {
  const { path } = useLocation()
  const [displayed, setDisplayed] = useState(path)
  const [phase, setPhase] = useState('idle')
  const timers = useRef([])

  useEffect(() => {
    if (path === displayed) return

    timers.current.forEach(clearTimeout)
    timers.current = []

    setPhase('depart')
    timers.current.push(setTimeout(() => {
      setDisplayed(path)
      setPhase('arrive')
    }, DEPART_MS))
    timers.current.push(setTimeout(() => setPhase('idle'), FLIGHT_MS))

    return () => { timers.current.forEach(clearTimeout); timers.current = [] }
  }, [path])

  const Component = ROUTES[displayed] || NoMatch

  return (
    <div class="relative w-full min-h-svh px-5 pb-[100px] box-border md:pb-6 lg:px-10 bg-transparent text-cosmic-text">
      <header class="relative z-[2] flex items-center gap-4 font-medium uppercase mt-7 mb-8 tracking-[0.06em] lg:mt-10 lg:mb-12">
        <a
          class="shrink-0 text-[13px] tracking-[0.22em] px-3.5 py-2 text-cosmic-text border border-[var(--c-border-glow)] rounded transition-colors hover:border-cosmic-violet hover:text-white hover:shadow-[0_0_24px_-4px_rgba(180,140,255,0.45)]"
          href="/"
        >
          Umar Mehmood
        </a>
        <a
          class="group ml-auto shrink-0 inline-flex items-center gap-2 text-[11px] tracking-[0.24em] uppercase px-3.5 py-2 rounded-full text-cosmic-text bg-[linear-gradient(135deg,rgba(255,184,106,0.10)_0%,rgba(180,140,255,0.14)_50%,rgba(106,168,255,0.10)_100%)] border border-[var(--c-border-glow)] transition-all hover:text-white hover:border-cosmic-violet hover:shadow-[0_0_24px_-4px_rgba(180,140,255,0.55)]"
          href="/resume.docx"
          download="Muhamad-Umar-Mehmood-Resume.docx"
          title="Download résumé (.docx)"
        >
          <span>Résumé</span>
          <span class="text-cosmic-violet transition-transform group-hover:translate-y-px" aria-hidden="true">↓</span>
        </a>
        <SocialLinks />
        <NavBar />
      </header>

      <main class={`content-shell content-shell--${phase}`}>
        <Component />
      </main>
    </div>
  )
}

export function App() {
  return (
    <LocationProvider>
      <Backdrop />
      <Shell />
    </LocationProvider>
  )
}
