import React from 'react';
import { ThemeProvider, CSSReset, ColorModeProvider, PseudoBox } from '@chakra-ui/core';
import { customTheme } from '../styles/theme';

export interface WrapperProps {
  children: React.ReactNode;
}
import '../styles/fonts.css';

const Wrapper: React.SFC<WrapperProps> = (props: WrapperProps) => {
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <ColorModeProvider>
        <PseudoBox color="bodyText" bg="bg" minW="100vw" minH="100vh" margin="0 auto">
          {props.children}
        </PseudoBox>
      </ColorModeProvider>
    </ThemeProvider>
  );
};

export default Wrapper;
