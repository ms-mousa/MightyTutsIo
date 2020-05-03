import React from 'react';
import { Badge, Text, Box, Grid, PseudoBox, Flex } from '@chakra-ui/core';
import { PageContext } from '../../../templates/post';
import { Link } from 'gatsby';
import ReadMoreButton from './ReadMoreButton';
import { customTheme } from '../../../styles/theme';

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
      maxW="800px"
      h={['50vh', '50vh', '20vh', '20vh']}
      overflow="hidden"
      bg="bgLight1"
    >
      <Flex h="100%" direction={['column', 'column', 'row', 'row']}>
        <PseudoBox
          w="120%"
          h="120%"
          mt={-3}
          ml={-3}
          backgroundSize="cover"
          flex={['1 0 50%', '1 0 50%', '1 0 40%', '1 0 40%']}
          backgroundImage={`url(${featuredPost.frontmatter.image.childImageSharp.fluid.src})`}
        />
        <Flex display="flex" direction="column" px="2" pt="2" h="100%">
          <PseudoBox mb="2" as="div">
            <Text fontFamily="Merriweather Sans" fontWeight="400" fontSize="xl" color="headerText1">
              <Link to={featuredPost.fields.slug}>{featuredPost.frontmatter.title}</Link>
            </Text>
            <Text fontFamily="Fira Code" fontSize="md" fontWeight="light" color="subText">
              {featuredPost.frontmatter.subTitle}
            </Text>
          </PseudoBox>
          <PseudoBox position="relative">
            <Text
              fontSize="sm"
              fontWeight="light"
              maxH="12vh"
              overflow="hidden"
              css={{
                '&:before': {
                  content: `' '`,
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  left: '0',
                  top: '0',
                  background: `linear-gradient(transparent 70%,${customTheme.colors.bgLight1})`,
                },
              }}
            >
              {featuredPost.excerpt}
            </Text>
          </PseudoBox>
          <Flex mt="auto">
            {featuredPost.frontmatter.tags.map(tag => (
              <Badge key={tag} mr="2" variant="solid" variantColor="orange">
                {tag}
              </Badge>
            ))}
          </Flex>
          <ReadMoreButton link={featuredPost.fields.slug} />
        </Flex>
      </Flex>
    </Box>
  );
};

export default FeaturedCard;
