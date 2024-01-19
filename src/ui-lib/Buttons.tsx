/* eslint-disable import/prefer-default-export */
import React from 'react';
import styled from 'styled-components';

export const RoundBackButton = styled.button<{ top: number, left: number }>`
  background-color: transparent ;
  width: 40px;
  height: 40px;
  border-radius: 50px;
  border: ${({ theme: { mainButtonColor } }) => `1px solid ${mainButtonColor}`};
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  transform: rotate(180deg);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  & path {
    stroke-width: 3px;
    stroke: ${({ theme: { mainButtonColor } }) => mainButtonColor};
  }
`;

export const AddButton = styled.button`
 width: 50px;
 height: 50px;
 border-radius: 50px;
 border: ${({ theme: { mainTextColor } }) => `1px solid ${mainTextColor}`};
 background-color: transparent;
 display: flex;
 align-items: center;
 justify-content: center;
 position: relative;
`;
