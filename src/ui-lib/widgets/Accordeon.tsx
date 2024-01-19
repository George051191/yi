import React from 'react';
import styled from 'styled-components';
import { TravelsFontMixixn24 } from '../../constants/fontsConfigs';
import { ArrowIcon } from '../icons';
import svgIcon from '../../assets/arrow.svg';
import sliderColorIcon from '../../assets/sliderColoricon.svg';

export const Details = styled.details`
  display: flex;
  flex-direction: column;
  gap: 25px;
  
  position: relative;
  &[open] summary::after {
    transform: rotate(180deg);
  } 

`;

export const Summary = styled.summary`
    ${TravelsFontMixixn24}
    display: flex;
    gap: 20px;
    position: relative;
    color: ${({ theme: { mainTextColor } }) => mainTextColor};
    cursor: pointer;
    margin-bottom: 25px;
    width: fit-content;
    &::marker {
       
        content: none;
    }
    &::after {
        content: url(${svgIcon});
        display: block;
        transform: rotate(270deg);
        transition: all ease .2s;
    }
`;

export const SummaryColored = styled.summary`
   ${TravelsFontMixixn24}
    display: flex;
    gap: 20px;
    position: relative;
    color: ${({ theme: { sliderColor } }) => sliderColor};
    cursor: pointer;
    margin-bottom: 15px;
    width: fit-content;
    &::marker {
       
        content: none;
    }
    &::after {
        content: url(${sliderColorIcon});
        display: block;
        transform: rotate(270deg);
        transition: all ease .2s;
    }
`;

export const AnimatedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;
