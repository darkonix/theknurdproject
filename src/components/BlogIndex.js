import React from 'react'
import { Link, graphql } from 'gatsby'

import Intro from './Intro'
import Layout from './Layout'
import SEO from './SEO'
import Footer from './Footer'
import { rhythm } from '../utils/typography'
import moment from 'moment'

const BlogIndex = ({ siteTitle, location, posts, numPages, currentPage, category }) => {
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
    const nextPage = (currentPage + 1).toString()

    return (
      <Layout location={location} title={siteTitle}>
      <SEO />
      <Intro />
      <hr />

      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <div key={node.fields.slug}>
            <h3
              style={{
                marginTop: rhythm(1),
                marginBottom: rhythm(1 / 4),
                textDecoration: 'underline',
              }}
            >
              <Link style={{ boxShadow: 'none' }} to={`/${node.fields.category}/${node.fields.slug}`}>
                {title}
              </Link>
            </h3>
            <small>
              {moment(parseInt(node.frontmatter.created)).format('DD/MM/YYYY')}
              {` • ${(node.frontmatter.duration.length > 3) ? Math.ceil(node.frontmatter.duration / 60) : node.frontmatter.duration} min 🎧`}
            </small>
            {
              <iframe
                src={`https://player.captivate.fm/${node.frontmatter.id}`}
                class="captivate-sharer"
                width="100%"
                height="170"
                border-radius="10px"
                frameBorder="0"
                scrolling="no"
                seamless
              ></iframe>
            }

            <div dangerouslySetInnerHTML={{ __html: node.html }} />
          </div>
        )
      })}
      <div>
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            listStyle: "none",
            padding: 0,
          }}
        >
          {!isFirst && (
            <Link
              to={prevPage}
              rel="prev"
              style={{
                marginTop: "0.1rem",
                marginBottom: "0.1rem",
                padding: "0.5rem",
                color: "var(--headerColor)",
              }}
            >
              {"<< "}
            </Link>
          )}
          {Array.from({ length: numPages }, (_, i) => (
            <li
              key={`pagination-number${i + 1}`}
              style={{
                margin: 0,
              }}
            >
              <Link
                to={`/${(category ? category + "/" : "") + (i === 0 ? "" : i + 1)}`}
                activeClassName={'anchor'}
                style={{
                  marginTop: "0.1rem",
                  marginBottom: "0.1rem",
                  padding: "0.5rem",
                  textDecoration: "none",
                  color: "var(--headerColor)",
                  background: i + 1 === currentPage ? "var(--headerColor)" : "",
                }}
              >
                {i + 1}
              </Link>
            </li>
          ))}
          {!isLast && (
            <Link
              to={nextPage}
              rel="next"
              style={{
                marginTop: "0.1rem",
                marginBottom: "0.1rem",
                padding: "0.5rem",
                color: "var(--headerColor)",
              }}
            >
              {" >>"}
            </Link>
          )}
        </ul>
      </div>

      <Footer />
    </Layout>
  )
}

export default BlogIndex
