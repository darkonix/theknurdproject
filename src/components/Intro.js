import React from 'react'
import { Link } from 'gatsby'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'
import cover from '../assets/icon.jpg'
import Subscribe from './Subscribe'

class Intro extends React.Component {
  render() {
    return (
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: 'center',
          maxWidth: '620px',
          margin: '0 auto',
        }}>
          <h1><Link to={"/"}>The Knurd Project</Link></h1>
          <Subscribe />
        </div>
    )
  }
}

export default Intro
