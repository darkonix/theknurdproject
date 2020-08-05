// CategoryList.js
import React from "react"
import { Link, graphql } from "gatsby"

import BlogIndex from "../components/BlogIndex"

const BlogList = ({ data, pageContext}) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const {numPages, currentPage } = pageContext

  return (
    <BlogIndex siteTitle={siteTitle} posts={posts} numPages={numPages} currentPage={currentPage} category="" />
  )
}

export const pageQuery = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___published_date], order: DESC }
      limit: $limit
      skip: $skip
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
            title
            published_date(formatString: "DD/MM/YY")
            media_url
          }
        }
      }
    }
  }
`

export default BlogList