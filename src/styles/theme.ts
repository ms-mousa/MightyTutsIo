import { theme } from '@chakra-ui/core';
import { lighten, darken } from 'polished';
const colors = {
  bg: '#011528',
  header1: '#82AAFF',
  header2: '$F78C6C',
  sub: '#C792EA',
  body: '#D6DEEB',
};
export const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    bg: colors.bg,
    bgLight1: lighten('0.05', colors.bg),
    bgLight2: lighten('0.6', colors.bg),
    bgDark1: darken('0.3', colors.bg),
    bgDark2: darken('0.6', colors.bg),
    headerText1: colors.header1,
    headerText2: colors.header2,
    subText: colors.sub,
    bodyText: colors.body,
  },
};
