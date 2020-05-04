import { graphql } from 'gatsby';
import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { FluidObject } from 'gatsby-image';

import { Footer } from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import { PostCard } from '../components/PostCard';
import Wrapper from '../components/Wrapper';
import IndexLayout from '../layouts';
import {
  AuthorProfileImage,
  inner,
  outer,
  PostFeed,
  SiteHeader,
  SiteHeaderContent,
  SiteTitle,
  SiteMain,
  SiteArchiveHeader,
  NoImage,
  SiteNavMain,
} from '../styles/shared';
import { PageContext } from './post';
import { Helmet } from 'react-helmet';
import config from '../website-config';
import NavBar from '../components/header/NavBar';
import { Box, Avatar, Flex, Text, PseudoBox, Stack, Link, Grid } from '@chakra-ui/core';
import ArticleCard from '../components/header/ArticleCard';

interface AuthorTemplateProps {
  pathContext: {
    slug: string;
  };
  pageContext: {
    author: string;
  };
  data: {
    logo: {
      childImageSharp: {
        fluid: any;
      };
    };
    allMarkdownRemark: {
      totalCount: number;
      edges: Array<{
        node: PageContext;
      }>;
    };
    authorYaml: {
      id: string;
      website?: string;
      twitter?: string;
      facebook?: string;
      location?: string;
      profile_image?: {
        childImageSharp: {
          fluid: FluidObject;
        };
      };
      bio?: string;
      avatar: {
        childImageSharp: {
          fluid: FluidObject;
        };
      };
    };
  };
}

const Author: React.FC<AuthorTemplateProps> = props => {
  const author = props.data.authorYaml;

  const edges = props.data.allMarkdownRemark.edges.filter(edge => {
    const isDraft = edge.node.frontmatter.draft !== true || process.env.NODE_ENV === 'development';

    let authorParticipated = false;
    if (edge.node.frontmatter.author) {
      edge.node.frontmatter.author.forEach(element => {
        if (element.id === author.id) {
          authorParticipated = true;
        }
      });
    }

    return isDraft && authorParticipated;
  });
  const totalCount = edges.length;

  const AuthorMeta = (props: { children: any }) => {
    return (
      <Text
        css={{
          '&:before': {
            display: 'inline-block',
            content: `'•'`,
            margin: '0 12px',
          },
        }}
      >
        {props.children}
      </Text>
    );
  };

  return (
    <>
      <Helmet>
        <html lang={config.lang} />
        <title>
          {author.id} - {config.title}
        </title>
        <meta name="description" content={author.bio} />
        <meta property="og:site_name" content={config.title} />
        <meta property="og:type" content="profile" />
        <meta property="og:title" content={`${author.id} - ${config.title}`} />
        <meta property="og:url" content={config.siteUrl + props.pathContext.slug} />
        <meta property="article:publisher" content="https://www.facebook.com/ghost" />
        <meta property="article:author" content="https://www.facebook.com/ghost" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${author.id} - ${config.title}`} />
        <meta name="twitter:url" content={config.siteUrl + props.pathContext.slug} />
        {config.twitter && (
          <meta
            name="twitter:site"
            content={`@${config.twitter.split('https://twitter.com/')[1]}`}
          />
        )}
        {config.twitter && (
          <meta
            name="twitter:creator"
            content={`@${config.twitter.split('https://twitter.com/')[1]}`}
          />
        )}
      </Helmet>
      <Wrapper>
        <PseudoBox as="header">
          <NavBar />
          <Box bg="bgLight2">
            <Flex
              py="6"
              alignItems="self-end"
              direction="row"
              maxW="1040px"
              margin="0 auto"
              pt="15vh"
            >
              <Avatar
                size="2xl"
                boxShadow="lg"
                src={props.data.authorYaml.avatar.childImageSharp.fluid.src}
              />
              <Box ml="6">
                <Text
                  fontWeight="bold"
                  as="h1"
                  fontSize="3.2rem"
                  fontFamily="Open Sans"
                  color="headerText1"
                >
                  {author.id}
                </Text>
                <Text fontFamily="Open Sans" mb="2" fontSize="1.2rem">
                  {author.bio}
                </Text>
                <Stack
                  fontFamily="Open Sans"
                  isInline
                  textTransform="uppercase"
                  letterSpacing="wide"
                  fontSize="0.9rem"
                >
                  <Text> {author.location} </Text>
                  <AuthorMeta>
                    {' '}
                    {totalCount > 1 && `${totalCount} posts`}
                    {totalCount === 1 && '1 post'}
                    {totalCount === 0 && 'No posts'}{' '}
                  </AuthorMeta>
                  {author.website && (
                    <AuthorMeta>
                      <Link href={author.website} target="_blank" rel="noopener noreferrer">
                        Website
                      </Link>
                    </AuthorMeta>
                  )}
                  {author.twitter && (
                    <AuthorMeta>
                      <Link href={author.website} target="_blank" rel="noopener noreferrer">
                        Twitter
                      </Link>
                    </AuthorMeta>
                  )}
                </Stack>
              </Box>
            </Flex>
          </Box>
        </PseudoBox>
        <Box as="main">
          <Box margin="0 auto" maxW="1040px">
            <Grid
              p="3"
              m="0 auto"
              gridGap="5"
              maxW="1040px"
              w="100%"
              templateColumns="repeat(auto-fit, minmax(250px, 1fr))"
            >
              {edges.map(post => {
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
          </Box>
        </Box>
        <Footer />
      </Wrapper>
    </>
  );
};

export const pageQuery = graphql`
  query($author: String) {
    authorYaml(id: { eq: $author }) {
      id
      website
      twitter
      bio
      facebook
      location
      profile_image {
        childImageSharp {
          fluid(maxWidth: 3720) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      avatar {
        childImageSharp {
          fluid(quality: 100, srcSetBreakpoints: [40, 80, 120]) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }

    allMarkdownRemark(
      filter: { frontmatter: { draft: { ne: true } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 2000
    ) {
      edges {
        node {
          excerpt(pruneLength: 280)
          timeToRead
          frontmatter {
            title
            tags
            date
            draft
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
                    fluid(quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
          fields {
            layout
            slug
          }
        }
      }
    }
  }
`;

export default Author;
