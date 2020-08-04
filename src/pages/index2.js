import React from 'react'

import BlogIndex from '../components/BlogIndex'

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___created, frontmatter___title], order: [DESC, DESC] }
      ) {
      edges {
        node {
          fields {
            slug
            category
          }
          html
          timeToRead
          frontmatter {
            id
            created
            duration
            title
            enclosures_url_1
          }
        }
      }
    }
  }
`

const Index = (props) => {
  return (
    <BlogIndex pagedata={props.data} />
  )
}

export default Index