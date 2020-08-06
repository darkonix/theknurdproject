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
      sort: { fields: [frontmatter___published_date], order: DESC }
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
            title
            published_date(formatString: "L LT", locale: "pt-BR")
            media_url
          }
        }
      }
    }
  }
`

export default BlogList