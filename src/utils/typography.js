import Typography from 'typography'
import Wordpress2016 from 'typography-theme-wordpress-2016'

Wordpress2016.overrideThemeStyles = () => ({
  a: {
    color: 'var(--textLink)',
    boxShadow: 'none',
  },
  hr: {
    background: 'var(--hr)',
  },
  'blockquote em': {
    color: '#404040',
    fontSize: '14px',
  },
  'a:hover': {
    boxShadow: '0 1px 0 0 currentColor'
  },
  'a.anchor': {
    pointerEvents: 'none',
    cursor: 'default',
    fontWeight: '800',
  },
  'a.anchor svg[aria-hidden="true"]': {
    stroke: 'var(--textLink)',
  },
  'p code': {
    fontSize: '1.1rem',
  },
  'li code': {
    fontSize: '1rem',
  },
  blockquote: {
    color: 'inherit',
    borderLeftColor: 'inherit',
    opacity: '0.8',
  },
})

delete Wordpress2016.googleFonts

const typography = new Typography(Wordpress2016)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
