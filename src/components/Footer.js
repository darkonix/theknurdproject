import React from 'react'
import { Link } from 'gatsby'

import { rhythm } from '../utils/typography'
import FooterSubscribe from './FooterSubscribe'

class Footer extends React.Component {
  render() {
    return (
      <footer
        style={{
          marginTop: rhythm(3 / 4),
          paddingTop: rhythm(1 / 2),
          textAlign: 'center',
        }}
      >
        <FooterSubscribe />
        <div style={{ paddingTop: '40px' }}>Hosts: Darkonix, Laivindil e Dri</div>
        <Link
          style={{
            boxShadow: 'none',
            textDecoration: 'none',
            color: 'inherit'
          }}
          to={'/'}
        >
          All rights reserved
        </Link>
      </footer>
    )
  }
}

export default Footer
