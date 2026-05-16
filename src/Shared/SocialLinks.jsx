const links = [
  {
    title: 'Dribbble',
    icon: 'dribbble-icon',
    url: 'https://dribbble.com/w3debugger'
  }, {
    title: 'LinkedIn',
    icon: 'linkedin-icon',
    url: 'https://ae.linkedin.com/in/w3debugger'
  }
]

export default function SocialLinks() {
  return (
    <nav class="flex items-center gap-2.5">
      {links.map((link) => (
        <a
          class="inline-flex items-center justify-center w-[34px] h-[34px] rounded-full bg-[rgba(10,8,18,0.5)] border border-[var(--c-border-soft)] text-cosmic-muted transition-colors hover:text-white hover:border-cosmic-violet hover:bg-[rgba(180,140,255,0.12)] hover:shadow-[0_0_18px_-4px_rgba(180,140,255,0.55)]"
          href={link.url}
          title={link.title}
          key={link.title}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg class="w-3.5 h-3.5 fill-current">
            <use href={'#' + link.icon}></use>
          </svg>
        </a>
      ))}
    </nav>
  )
}
