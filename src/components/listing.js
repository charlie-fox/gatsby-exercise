import React from "react"
import styled from "styled-components"
import { Link, StaticQuery, graphql } from "gatsby"

const LISTING_QUERY = graphql`
    query BlogPostListing {
        allMarkdownRemark(limit: 10, sort: {
            order: DESC,
            fields: [frontmatter___date]
        }) {
            edges {
                node {
                    excerpt
                    frontmatter {
                        date(formatString: "MMMM DD, YYYY")
                        title
                        slug
                    }
                }
            }
        }
    }
`

const Post = styled.article`
    box-shadow: 0px 3px 10px rgba(25,17,34,0.05);
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    a {
        color: #000;
        text-decoration: none;
    }
    p {
        font-size: 0.8rem;
    }
    h2 {
        margin-bottom: 0;
    }
    .read-more a {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        font-size: 0.8rem;
        text-decoration: underline;
        color: navy;
    }

`;

const Listing = () => (
    <StaticQuery

        query={LISTING_QUERY}
        render={({ allMarkdownRemark }) => (
            allMarkdownRemark.edges.map(({node}) => (
                <Post key={node.frontmatter.slug}>
                    <Link to={`/posts${node.frontmatter.slug}`}><h2>{node.frontmatter.title}</h2></Link>
                    <p>{node.frontmatter.date}</p>
                    <p>{node.excerpt}</p>
                    <div className="read-more">
                        <Link to={`/posts${node.frontmatter.slug}`}>Read More</Link>
                    </div>
                </Post>
            ))
        )}

    />
)

export default Listing
