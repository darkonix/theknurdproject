const path = require("path");
const slugify = require('slugify')

function dedupeCategories(posts) {
  const uniqueCategories = new Set()
  posts.forEach(({ node }) => {
    uniqueCategories.add(node.fields.category)
  })

  return Array.from(uniqueCategories)
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const categoryList = path.resolve('./src/templates/category-list.js')
    const blogList = path.resolve('./src/templates/blog-list.js')
    const blogPost = path.resolve('./src/templates/blog-post.js')
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              sort: { fields: [frontmatter___created, frontmatter___title], order: [DESC, DESC] },
              limit: 1000
            ) {
              edges {
                node {
                  fields {
                    slug
                    category
                  }
                  frontmatter {
                    id
                    title
                  }
                  fileAbsolutePath
                }
              }
            }
          }
        `
      ).then((result) => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges;

        posts.forEach((post, index) => {
          const previous =
            index === posts.length - 1 ? null : posts[index + 1].node;
          const next = index === 0 ? null : posts[index - 1].node;

          createPage({
            path: `/${post.node.fields.category}/${post.node.fields.slug}`,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
            },
          })
        })

        const postsPerPage = 10
        const totalPages = Math.ceil(posts.length / postsPerPage)

        Array.from({ length: totalPages }).forEach((_, i) => {
          createPage({
            path: i === 0 ? `/` : `${i + 1}`,
            component: blogList,
            context: {
              limit: postsPerPage,
              skip: i * postsPerPage,
              numPages: totalPages,
              currentPage: i + 1
            },
          })
        })

        // Create array of every category without duplicates
        const dedupedCategories = dedupeCategories(posts)

        // Iterate over categories and create page for each
        dedupedCategories.forEach(category => {  
          const catPosts = posts.filter(function(post){
            return post.node.fields.category == category;
          })

          const catPages = Math.ceil(catPosts.length / postsPerPage)

          Array.from({ length: catPages }).forEach((_, i) => {
            createPage({
              path: i === 0 ? `${category}/` : `${category}/${i + 1}`,
              component: categoryList,
              context: {
                category,
                limit: postsPerPage,
                skip: i * postsPerPage,
                numPages: catPages,
                currentPage: i + 1
              },
            })
          })
        })
      })
    )
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const slug = slugify(node.frontmatter.title).toLowerCase();
    createNodeField({
      name: `slug`,
      node,
      value: slug,
    })

    const category = path.basename(path.dirname(node.fileAbsolutePath))
    createNodeField({
      name: `category`,
      node,
      value: category,
    })
  }
}
