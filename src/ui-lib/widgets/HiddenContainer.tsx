/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  memo, FC, useRef, useState, useEffect,
} from 'react';
import styled from 'styled-components';

export const FileInput = styled.input`
    position: absolute;
    z-index: -100;

`;

export const Label = styled.label`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height:100%;
    cursor: pointer;

`;

export const ButtonForFileAdd = styled.button`
    max-width: 525px;
    display: inline-flex;
    position: relative;
    padding: 27px 44px;
    align-items: flex-start;
    border-radius: 36px;
    border: ${({ theme: { mainButtonColor } }) => `1px solid ${mainButtonColor}`};
    background: ${({ theme: { mainBg } }) => mainBg};
    color: ${({ theme: { mainTextColor } }) => mainTextColor};
    font-family: 'TTTravels';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    line-height: 80%;
    letter-spacing: -0.625px;
    overflow: hidden;
    @media screen and (max-width: 1200px) {
      font-size: 17px;
      align-items: center;
    }
`;
