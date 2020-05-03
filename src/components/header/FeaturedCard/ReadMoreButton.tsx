import React from 'react';
import { PseudoBox, Box } from '@chakra-ui/core';
import { Link } from 'gatsby';
import { keyframes } from '@emotion/core';
export interface ReadMoreButtonProps {
  link: string;
}

const ReadMoreButton: React.SFC<ReadMoreButtonProps> = (props: ReadMoreButtonProps) => {
  const { link } = props;
  const readMoreButton = keyframes`
  0% {
    content: "()";
  }
  20% {
    opacity: 0;
  }
  40% {
    content: "=>";
    opacity: 1;
  }
  60% {
    opacity: 0;
  }
  80% {
    content: "{}";
    opacity: 1;
  }
  100% {
    opacity: 0;
  }`;

  return (
    <Box textAlign="right" position="relative">
      <Link to={link}>
        <PseudoBox
          className="more"
          as="div"
          position="absolute"
          left="80%"
          d="flex"
          alignItems="center"
          justifyContent="center"
          p="3"
          boxShadow="lg"
          fontFamily="Fira Code"
          color="subText"
          bg="bgLight2"
          top="15px"
          transition="top 500ms ease-in-out"
          css={{
            clipPath: 'circle(45%)',
            '&:after': {
              content: `"()"`,
              left: '0px',
              position: 'relative',
            },
            '&:hover:after': {
              animation: `${readMoreButton} 2s  linear `,
            },
          }}
        />
      </Link>
    </Box>
  );
};

export default ReadMoreButton;
