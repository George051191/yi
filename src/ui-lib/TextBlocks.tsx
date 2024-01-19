/* eslint-disable import/prefer-default-export */
import React from 'react';
import styled from 'styled-components';

export const SectionHeader = styled.h2`
    font-family: 'Comforta';
    font-size: 39px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: ${({ theme: { mainButtonColor } }) => mainButtonColor};
    margin: 0;
    align-self: center;
    text-align: center;
`;

export const Text = styled.p`
    color: ${({ theme: { mainTextColor } }) => mainTextColor};
    font-family: 'TTTravels';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin: 0; 
`;
