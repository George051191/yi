import type { Preview } from "@storybook/react";
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import Themes from '../src/themes/index';

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      light: Themes.light,
      
    },
    defaultTheme: 'light',
    Provider: ThemeProvider,
  }),
];


const preview: Preview = {
  
  parameters: {
    
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
   
  },
};



export default preview;


