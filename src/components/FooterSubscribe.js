import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'

const query = graphql`
  query getFooterF {
    site {
      siteMetadata {
        siteUrl,
        feed {
          rss
          apple
        }
        categories {
          title
          feed {
            rss
            apple
          }
        }
      }
    }
  }
`

const FooterSubscribe = () => {
  return (
    <StaticQuery
      query={query}
      render={data => {
        const metaData = data.site.siteMetadata
        return (
          <div>
            {metaData.categories.map((category) => (
              <div>
                <h3 style={{marginTop: '1.75rem'}}>{category.title}</h3>
                <a href={category.feed.apple} target="_blank">
                  iTunes
                </a>{' '}
                &bull;{' '}
                <a href={category.feed.rss} target="_blank" rel="noopener noreferrer">
                  RSS
                </a>
              </div>
            ))}
          </div>
        )
      }}
    />
  )
}

export default FooterSubscribe
