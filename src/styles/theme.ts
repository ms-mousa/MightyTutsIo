import { theme } from '@chakra-ui/core';
import { lighten, darken } from 'polished';
const darkColors = {
  bg: '#011528',
  header1: '#82AAFF',
  header2: '#F78C6C',
  sub: '#C792EA',
  body: '#D6DEEB',
};
const lightColors = {
  bg: '#011528',
  header1: '#82AAFF',
  header2: '#F78C6C',
  sub: '#C792EA',
  body: '#D6DEEB',
};
export const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    bg: darkColors.bg,
    bgLight1: lighten('0.03', darkColors.bg),
    bgLight2: lighten('0.08', darkColors.bg),
    bgDark1: darken('0.01', darkColors.bg),
    bgDark2: darken('0.02', darkColors.bg),
    headerText1: darkColors.header1,
    headerText2: darkColors.header2,
    subText: darkColors.sub,
    bodyText: darkColors.body,
  },
};
