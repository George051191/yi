import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

import LightWoff from './TTTravels-Light.woff';
import LightWoff2 from './TTTravels-Light.woff2';
import RegularWoff from './TTTravels-Regular.woff';
import RegularWoff2 from './TTTravels-Regular.woff2';
import MediumWoff from './TTTravels-Medium.woff';
import MediumWoff2 from './TTTravels-Medium.woff2';
import Comfortaa from './comfortaa-regular-russian.ttf';
import ComfortaSemiBold from './comfortaa-semibold-russian.ttf';
import BlueCurveRegular from './blue-curve-3-russian.ttf';

import TriSpaceRegular from './trispace-regular-russian.ttf';

export const GlobalStyles = createGlobalStyle`
  ${normalize}
`;

export const TriSpace = createGlobalStyle`
     @font-face {
        font-family: 'TriSpace';
        src: local('TriSpace'),
            url(${TriSpaceRegular}) format('truetype');       
            font-weight: 400;
            font-style: normal;
            font-display: swap;
    }
`;

export const ComfortaFont = createGlobalStyle`
     @font-face {
        font-family: 'Comforta';
        src: local('Comforta'),
            url(${Comfortaa}) format('truetype');       
            font-weight: 400;
            font-style: normal;
            font-display: swap;
    }
    @font-face {
        font-family: 'Comforta';
        src: local('Comfortaa SemiBold'),
            url(${ComfortaSemiBold}) format('truetype');       
            font-weight: 700;
            font-style: normal;
            font-display: swap;
    }
`;

export const BluCurve = createGlobalStyle`
     @font-face {
        font-family: 'BlueCurve';
        src: local('BlueCurve'),
            url(${BlueCurveRegular}) format('truetype');
            font-display: swap;
            font-weight: 400;
            font-style: normal;
    }
`;

export const TTTravels = createGlobalStyle`
    @font-face {
        font-family: 'TTTravels';
        src: local('TT Travels Medium'),
            url(${MediumWoff}) format('woff'),
            url(${MediumWoff2}) format('woff2');
            font-weight: 500;
            font-style: normal;
            font-display: swap;
    }
    @font-face {
        font-family: 'TTTravels';
        src: local('TT Travels Regular'),
            url(${RegularWoff}) format('woff'),
            url(${RegularWoff2}) format('woff2');
            font-weight: 400;
            font-style: normal;
            font-display: swap;
    }
    @font-face {
        font-family: 'TTTravels';
        src: local('TT Travels Light'),
            url(${LightWoff}) format('woff'),
            url(${LightWoff2}) format('woff2');
            font-weight: 300;
            font-style: normal;
            font-display: swap;
    }

`;
