import React from 'react'

import { rhythm } from '../utils/typography'

const Layout = ({ children }) => {
  return (
    <div
      style={{
        color: 'var(--textNormal)',
        background: 'var(--bg)',
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: rhythm(24),
        padding: `${rhythm(1)} ${rhythm(3 / 4)}`,
      }}
    >
      {children}
    </div>
  )
}

export default Layout
