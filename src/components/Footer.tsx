import { Box, Flex, PseudoBox, Stack } from '@chakra-ui/core';
import { Link } from 'gatsby';
import React from 'react';
import { RiFacebookBoxLine, RiRssLine, RiTwitterLine, RiYoutubeLine } from 'react-icons/ri';
import config from '../website-config';

export const Footer: React.FC = () => {
  return (
    <Box
      fontSize={['0.7rem', '0.7rem', '1rem', '1rem']}
      borderTop="1px solid"
      borderTopColor="bgLight1"
      p="2"
      mt="3"
      as="footer"
      bg="bgDark2"
      h="8vh"
      color="bodyText"
    >
      <Flex
        mt="2"
        justify="space-between"
        maxW="1040px"
        w={['100vw', '100vw', '80vw', '80vw']}
        px="3"
        mx="auto"
      >
        <Box as="section">
          <Link to="/">{config.title}</Link> &copy; {new Date().getFullYear()}{' '}
          {config.footer && <Link to="/">| {config.footer}</Link>}
        </Box>
        <Stack isInline as="section">
          {config.facebook && (
            <PseudoBox>
              <a href={config.facebook} target="_blank" rel="noopener noreferrer">
                <PseudoBox as={RiFacebookBoxLine} fontSize="2xl" color="subText" />
              </a>
            </PseudoBox>
          )}
          {config.youtube && (
            <PseudoBox>
              <a href={config.youtube} target="_blank" rel="noopener noreferrer">
                <PseudoBox as={RiYoutubeLine} fontSize="2xl" color="subText" />
              </a>
            </PseudoBox>
          )}
          {config.twitter && (
            <PseudoBox>
              <a href={config.twitter} target="_blank" rel="noopener noreferrer">
                <PseudoBox as={RiTwitterLine} fontSize="2xl" color="subText" />
              </a>
            </PseudoBox>
          )}
          <PseudoBox>
            <a href="/rss.xml">
              <PseudoBox as={RiRssLine} fontSize="2xl" color="subText" />
            </a>
          </PseudoBox>
        </Stack>
      </Flex>
    </Box>
  );
};
