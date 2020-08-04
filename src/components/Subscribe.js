import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'

const query = graphql`
  query getFeed {
    site {
      siteMetadata {
        siteUrl,
        feed {
          rss
          apple
        }
      }
    }
  }
`

class Subscribe extends React.Component {
  render() {
    return (
      <StaticQuery
        query={query}
        render={data => {
          const metaData = data.site.siteMetadata;
          return (
            <div>
              <p>
                <Link to={'/report'} activeClassName={'anchor'}>
                  Knurd Report
                </Link>{' '}
                &bull;{' '}
                <Link to={'/jcast'} activeClassName={'anchor'}>
                  JCast
                </Link>{' '}
                &bull;{' '}
                <Link to={'/gundam'} activeClassName={'anchor'}>
                  Café com Gundam
                </Link>{' '}
                &bull;{' '}
                <Link to={'/drunk'} activeClassName={'active'}>
                  Drunk Report
                </Link>
              </p>
              <p>
                <a href={metaData.feed.apple} target="_blank">
                  iTunes
                </a>{' '}
                &bull;{' '}
                <a href={metaData.feed.rss} target="_blank" rel="noopener noreferrer">
                  RSS
                </a>
              </p>
            </div>
          )
        }}
      />
    )
  }
}

export default Subscribe
