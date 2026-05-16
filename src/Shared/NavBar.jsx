import { useLocation } from 'preact-iso'

const pages = [
  { path: '/work', label: 'Work' },
  { path: '/skills', label: 'Skills' },
  { path: '/experience', label: 'Career' },
]

const base = "relative text-[11px] tracking-[0.24em] uppercase text-cosmic-muted px-4 py-2 rounded-full transition-colors hover:text-cosmic-text"
const activeCls = " !text-white bg-[linear-gradient(135deg,rgba(255,184,106,0.18)_0%,rgba(180,140,255,0.22)_50%,rgba(106,168,255,0.18)_100%)] shadow-[0_0_24px_-4px_rgba(180,140,255,0.45)] after:content-[''] after:absolute after:left-1/2 after:-bottom-px after:w-[22px] after:h-px after:bg-cosmic-violet after:-translate-x-1/2 after:blur-[0.5px]"

export default function NavBar() {
  const { path } = useLocation()

  return (
    <nav class="fixed left-1/2 bottom-[18px] -translate-x-1/2 flex items-center gap-1 p-2 rounded-full bg-[rgba(10,8,18,0.72)] backdrop-blur-lg border border-[var(--c-border-glow)] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)] z-[9] md:static md:translate-x-0 md:p-1">
      {pages.map((page) => {
        const isActive = path === page.path
        return (
          <a class={base + (isActive ? activeCls : '')} href={page.path} key={page.path}>
            {page.label}
          </a>
        )
      })}
    </nav>
  )
}
