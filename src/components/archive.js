/**
 * Archive component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import styled from "styled-components"
import { StaticQuery, graphql, Link } from "gatsby"

const POST_ARCHIVE_QUERY = graphql `
        query BlogPostArchive{
            allMarkdownRemark(limit: 5, sort: {
                order: DESC,
                fields: [frontmatter___date]
            }) {
                edges {
                    node {
                        frontmatter {
                            title
                            slug
                        }
                    }
                }
            }
        }
    `

const ArchiveList = styled.ul`
    padding: 0;
    margin: 0;
    list-style: none;
    a {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        font-size: 0.8rem;
        text-decoration: underline;
        color: navy;        
    }
`;


const Archive = () => (
  <StaticQuery
    query={POST_ARCHIVE_QUERY}
    render={({allMarkdownRemark}) => (
      <>
        <aside>
            <h3>Archive</h3>    
            <ArchiveList>
            {allMarkdownRemark.edges.map(edge => (
                <li key={edge.node.frontmatter.slug}>
                    <Link to={`/posts${edge.node.frontmatter.slug}`}>
                        {edge.node.frontmatter.title}
                    </Link>
                </li>
            ))}
            </ArchiveList>
        </aside>
      </>
    )}
  />
)

export default Archive
