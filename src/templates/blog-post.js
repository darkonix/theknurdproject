import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'

import Intro from '../components/Intro'
import Layout from '../components/Layout'
import Subscribe from '../components/Subscribe'
import Support from '../components/Support'
import SEO from '../components/SEO'
import Footer from '../components/Footer'
import { formatReadingTime } from '../utils/helpers'
import { rhythm, scale } from '../utils/typography'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteMetadata = get(this.props, 'data.site.siteMetadata')
    const { previous, next, slug } = this.props.pageContext
    return (
      <Layout location={this.props.location} title={siteMetadata.title}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description}
          slug={post.fields.slug}
          embedUrl={post.frontmatter.embedUrl}
        />

        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: 'center',
          maxWidth: '472px',
          margin: '0 auto',
        }}>
          <h1><a href="/">The Knurd Project</a></h1>
          <Subscribe />
          <h2 style={{ marginBottom: '.25em' }}>{post.frontmatter.title}</h2>
          <small style={{ marginBottom: '1.75em' }}>
              {`${post.frontmatter.published_date} • `}
               
               <Link style={{ boxShadow: 'none' }} to={post.frontmatter.media_url.replace('//', '://')}>
                Download
              </Link>
            </small>
        </div>
      
        {
          <iframe
            src={`https://player.captivate.fm/${post.frontmatter.id}`}
            class="captivate-sharer"
            width="100%"
            height="170"
            border-radius="10px"
            frameBorder="0"
            scrolling="no"
            seamless
          ></iframe>
        }

        <div dangerouslySetInnerHTML={{ __html: post.html }} />

        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={`/${previous.fields.category}/${previous.fields.slug}`} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={`/${next.fields.category}/${next.fields.slug}`} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      <Footer />
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      timeToRead
      frontmatter {
        id
        title
        published_date(formatString: "DD/MM/YY")
        media_url
      }
      fields {
        slug
      }
    }
  }
`
