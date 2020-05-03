import React from 'react';
import { Flex, Stack, PseudoBox, Box, IconButton, useColorMode, Image } from '@chakra-ui/core';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { FixedObject } from 'gatsby-image';
export interface NavBarProps {
  isHome?: boolean;
}

interface DATA {
  logo: {
    childImageSharp: {
      fixed: FixedObject;
    };
  };
}

const NavBar: React.SFC<NavBarProps> = (props: NavBarProps) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const data: DATA = useStaticQuery(graphql`
    query navBarQuery {
      logo: file(relativePath: { eq: "img/mighty-logo.png" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          fixed {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  return (
    <Flex
      as="nav"
      w="100vw"
      align="center"
      justify="center"
      bg="bg"
      fontSize={['md', 'lg', 'xl', 'xl']}
      h="7vh"
      boxShadow="md"
      p={2}
    >
      <Flex w={['100vw', '100vw', '80vw', '80vw']} justify="space-around">
        <Image h="5vh" src={data.logo.childImageSharp.fixed.src} alt="Logo of Chakra-ui" />
        <Stack
          fontFamily="Merriweather Sans"
          spacing={8}
          justify="center"
          align="center"
          color="headerText1"
          isInline
        >
          <PseudoBox position="relative">
            <Link to="/">React</Link>
          </PseudoBox>
          <PseudoBox position="relative">
            <Link to="/">Gatsby</Link>
          </PseudoBox>
          <PseudoBox position="relative">
            <Link to="/">Typescript</Link>
          </PseudoBox>
        </Stack>
        <Box>
          <IconButton
            aria-label="Color mode switch icon"
            rounded="full"
            icon={colorMode === 'light' ? 'moon' : 'sun'}
            onClick={toggleColorMode}
          >
            Change Color Mode
          </IconButton>
        </Box>
      </Flex>
    </Flex>
  );
};

export default NavBar;
