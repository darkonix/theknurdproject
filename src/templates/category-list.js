// CategoryList.js
import React from "react"
import { Link, graphql } from "gatsby"

import BlogIndex from "../components/BlogIndex"

const BlogList = ({ data, pageContext}) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const {numPages, currentPage, category } = pageContext

  return (
    <BlogIndex siteTitle={siteTitle} posts={posts} numPages={numPages} currentPage={currentPage} category={category} />
  )
}

export const pageQuery = graphql`
  query categoryPageQuery($skip: Int!, $limit: Int!, $category: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___created], order: DESC }
      limit: $limit
      skip: $skip
      filter: { fields: { category: { eq: $category } } }
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

export default BlogList