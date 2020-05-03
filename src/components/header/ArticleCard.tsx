import { Avatar, AvatarGroup, Box, Flex, PseudoBox, Text } from '@chakra-ui/core';
import React from 'react';
import { PageContext } from '../../templates/post';
import { format } from 'date-fns';
export interface ArticleCardProps {
  post: {
    node: PageContext;
  };
  index: number;
}

const ArticleCard: React.SFC<ArticleCardProps> = (props: ArticleCardProps) => {
  const { node: post } = props.post;
  const { index } = props;
  const spanMapLarge: { [key: string]: number } = { 0: 2, 1: 2, 2: 2, 4: 3 };
  const spanMapMed: { [key: string]: number } = { 0: 3, 1: 4, 2: 4, 4: 4 };
  const spanMapSmall: { [key: string]: number } = { 0: 4, 1: 4, 2: 4, 4: 4 };
  return (
    <Flex
      // gridColumn={[
      //   `span ${spanMapSmall[index]}`,
      //   `span ${spanMapSmall[index]}`,
      //   `span ${spanMapMed[index]}`,
      //   `span ${spanMapLarge[index]}`,
      // ]}
      direction="column"
      minH="350px"
      h="400px"
      rounded="lg"
      boxShadow="sm"
      border="1px solid"
      borderColor="bgLight2"
      overflow="hidden"
      bg="bgLight1"
    >
      {post.frontmatter.image.childImageSharp.fluid.src && (
        <PseudoBox
          w="100%"
          flex="0 0 45%"
          h="80%"
          backgroundSize="cover"
          backgroundPosition="center center"
          backgroundImage={`url(${post.frontmatter.image.childImageSharp.fluid.src})`}
        />
      )}
      <Flex direction="column" justify="space-between" p="2" flexGrow={1}>
        <PseudoBox as="div">
          <Text fontFamily="Merriweather Sans" color="headerText2" fontWeight="400" fontSize="xl">
            {post.frontmatter.title}
          </Text>
        </PseudoBox>
        <Text fontSize="sm" fontWeight="light">
          {post.excerpt}
        </Text>
        <Flex my="2" alignItems="center">
          <AvatarGroup size="sm" max={2}>
            {post.frontmatter.author.map(author => (
              <Avatar key={author.id} src={author.avatar.children[0].fluid.src} />
            ))}
          </AvatarGroup>
          <Box ml="2">
            {post.frontmatter.author.map(author => (
              <Text key={author.bio} fontWeight="bold">
                {author.id}
              </Text>
            ))}
            <Text fontSize="0.7rem" textTransform="uppercase" letterSpacing="wide">
              {post.timeToRead} mins read ·{' '}
              {format(new Date(post.frontmatter.date), 'do, MMM, yyyy.')}
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ArticleCard;
