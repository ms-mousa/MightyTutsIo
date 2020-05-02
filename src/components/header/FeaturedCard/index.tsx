import React from 'react';
import { Badge, Text, Box, Grid, PseudoBox, Flex } from '@chakra-ui/core';
import { PageContext } from '../../../templates/post';
import { Link } from 'gatsby';
import ReadMoreButton from './ReadMoreButton';

export interface FeaturedCardProps {
  post: {
    node: PageContext;
  };
}

const FeaturedCard: React.SFC<FeaturedCardProps> = (props: FeaturedCardProps) => {
  const { node: featuredPost } = props.post;
  return (
    <Box
      css={{
        '&:hover .more': {
          top: '-20px',
        },
      }}
      p="2"
      rounded="lg"
      boxShadow="lg"
      mx="auto"
      mb="10"
      border="1px solid"
      borderColor="bgDark2"
      w="40vw"
      h="20vh"
      overflow="hidden"
      bg="bgLight1"
    >
      <Grid h="100%" columnGap="0" templateRows="1fr" templateColumns="0.8fr 1fr">
        <PseudoBox
          w="100%"
          h="120%"
          m={-3}
          backgroundSize="cover"
          backgroundImage={`url(${featuredPost.frontmatter.image.childImageSharp.fluid.src})`}
        />
        <Flex direction="column" justify="space-between" p="2" h="100%">
          <PseudoBox mb="2" as="div">
            <Text fontFamily="Fira Code" fontWeight="400" fontSize="xl" color="headerText1">
              <Link to={featuredPost.fields.slug}>{featuredPost.frontmatter.title}</Link>
            </Text>
            <Text fontFamily="Fira Code" fontSize="md" fontWeight="light" color="subText">
              {featuredPost.frontmatter.subTitle}
            </Text>
          </PseudoBox>
          <Text fontSize="sm" fontWeight="light">
            {featuredPost.excerpt}
          </Text>
          <Flex align="baseline">
            {featuredPost.frontmatter.tags.map(tag => (
              <Badge key={tag} mr="2" variant="solid" variantColor="orange">
                {tag}
              </Badge>
            ))}
          </Flex>
          <ReadMoreButton link={featuredPost.fields.slug} />
        </Flex>
      </Grid>
    </Box>
  );
};

export default FeaturedCard;
