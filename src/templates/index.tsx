import { Box, PseudoBox, Text, Grid } from '@chakra-ui/core';
import { css } from '@emotion/core';
import { graphql } from 'gatsby';
import { FixedObject } from 'gatsby-image';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Footer } from '../components/Footer';
import FeaturedCard from '../components/header/FeaturedCard/';
import NavBar from '../components/header/NavBar';
import Pagination from '../components/Pagination';
import { PostCard } from '../components/PostCard';
import Wrapper from '../components/Wrapper';
import { inner, outer, PostFeed, Posts, SiteMain } from '../styles/shared';
import { customTheme } from '../styles/theme';
import config from '../website-config';
import { PageContext } from './post';
import ArticleCard from '../components/header/ArticleCard';

export interface IndexProps {
  pageContext: {
    currentPage: number;
    numPages: number;
  };
  data: {
    logo: {
      childImageSharp: {
        fixed: FixedObject;
      };
    };
    header: {
      childImageSharp: {
        fixed: FixedObject;
      };
    };
    allMarkdownRemark: {
      edges: Array<{
        node: PageContext;
      }>;
    };
  };
}

const IndexPage: React.FC<IndexProps> = props => {
  const { width, height } = props.data.header.childImageSharp.fixed;

  return (
    <>
      <Helmet>
        <html lang={config.lang} />
        <title>{config.title}</title>
        <meta name="description" content={config.description} />
        <meta property="og:site_name" content={config.title} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={config.title} />
        <meta property="og:description" content={config.description} />
        <meta property="og:url" content={config.siteUrl} />
        <meta
          property="og:image"
          content={`${config.siteUrl}${props.data.header.childImageSharp.fixed.src}`}
        />
        {config.facebook && <meta property="article:publisher" content={config.facebook} />}
        {config.googleSiteVerification && (
          <meta name="google-site-verification" content={config.googleSiteVerification} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={config.title} />
        <meta name="twitter:description" content={config.description} />
        <meta name="twitter:url" content={config.siteUrl} />
        <meta
          name="twitter:image"
          content={`${config.siteUrl}${props.data.header.childImageSharp.fixed.src}`}
        />
        {config.twitter && (
          <meta
            name="twitter:site"
            content={`@${config.twitter.split('https://twitter.com/')[1]}`}
          />
        )}
        <meta property="og:image:width" content={width.toString()} />
        <meta property="og:image:height" content={height.toString()} />
      </Helmet>
      <Wrapper>
        <NavBar />
        <Box
          as="header"
          css={{
            background: `linear-gradient(${customTheme.colors.bgLight2} 70%, ${customTheme.colors.bg} 30%)`,
          }}
          p="2"
        >
          <PseudoBox textAlign="center" py="12" zIndex={2}>
            <Text fontFamily="Merriweather Sans" color="headerText2" fontSize="3xl">
              {config.title}
            </Text>
            <Text fontFamily="Open Sans" color="subText" fontSize="md">
              {config.description}
            </Text>
          </PseudoBox>
          <FeaturedCard
            //@ts-ignore
            post={props.data.allMarkdownRemark.edges.find(edge => edge.node.frontmatter.featured)}
          />
        </Box>
        <Grid
          p="3"
          m="0 auto"
          gridGap="5"
          maxW="1040px"
          w="100%"
          templateColumns="repeat(auto-fit, minmax(250px, 1fr))"
        >
          {props.data.allMarkdownRemark.edges.map(post => {
            // filter out drafts in production
            return (
              (post.node.frontmatter.draft !== true || process.env.NODE_ENV !== 'production') &&
              !post.node.frontmatter.featured && (
                <ArticleCard
                  index={post.node.fields.slug}
                  key={post.node.fields.slug}
                  post={post}
                />
              )
            );
          })}
        </Grid>

        {/* <main id="site-main" css={[SiteMain, outer]}>
          <div css={[inner, Posts]}>
            <div css={[PostFeed]}>
              {props.data.allMarkdownRemark.edges.map((post, index) => {
                // filter out drafts in production
                return (
                  (post.node.frontmatter.draft !== true ||
                    process.env.NODE_ENV !== 'production') && (
                    <PostCard key={post.node.fields.slug} post={post.node} large={index === 0} />
                  )
                );
              })}
            </div>
          </div>
        </main>
        {props.children}
        {props.pageContext.numPages > 1 && (
          <Pagination
            currentPage={props.pageContext.currentPage}
            numPages={props.pageContext.numPages}
          />
        )} */}
        <Footer />
      </Wrapper>
    </>
  );
};

export const pageQuery = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!) {
    logo: file(relativePath: { eq: "img/mighty-logo.png" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed(height: 120) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    header: file(relativePath: { eq: "img/blog-cover.png" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed(width: 2000, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { ne: true } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          timeToRead
          frontmatter {
            title
            subTitle
            date
            tags
            draft
            featured
            excerpt
            image {
              childImageSharp {
                fluid(maxWidth: 3720) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            author {
              id
              bio
              avatar {
                children {
                  ... on ImageSharp {
                    fluid(quality: 100, srcSetBreakpoints: [40, 80, 120]) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
          excerpt
          fields {
            layout
            slug
          }
        }
      }
    }
  }
`;

const HomePosts = css`
  /* @media (min-width: 795px) {
    .post-card-large {
      flex: 1 1 100%;
      flex-direction: row;
      padding-bottom: 40px;
      min-height: 280px;
      border-top: 0;
    }

    .post-card-large .post-card-title {
      margin-top: 0;
      font-size: 3.2rem;
    }

    .post-card-large:not(.no-image) .post-card-header {
      margin-top: 0;
    }

    .post-card-large .post-card-image-link {
      position: relative;
      flex: 1 1 auto;
      margin-bottom: 0;
      min-height: 380px;
    }

    .post-card-large .post-card-image {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .post-card-large .post-card-content {
      flex: 0 1 361px;
      justify-content: center;
    }

    .post-card-large .post-card-title {
      margin-top: 0;
      font-size: 3.2rem;
    }

    .post-card-large .post-card-content-link {
      padding: 0 0 0 40px;
    }

    .post-card-large .post-card-meta {
      padding: 0 0 0 40px;
    }

    .post-card-large .post-card-excerpt p {
      margin-bottom: 1.5em;
      font-size: 1.8rem;
      line-height: 1.5em;
    } 
  }*/
`;

export default IndexPage;
