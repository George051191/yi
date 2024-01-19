/* eslint-disable ternary/no-unreachable */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { FC } from 'react';
import styled from 'styled-components';
import { TButton } from '../types/componentsTypes';

const StyledButton = styled.button<{ isColored: boolean }>`
    display: flex;
    padding: 20px 44px;
    border-radius: 36px;
    background-color: ${({ isColored, theme: { mainButtonColor, buttonSubcolor } }) => (isColored ? mainButtonColor : buttonSubcolor)};
    color: ${({ isColored, theme: { subMainTextColor, mainTextColor } }) => (isColored ? subMainTextColor : mainTextColor)};
    font-family: 'TTTravels';
    border: ${({ isColored, theme: { mainButtonColor } }) => (isColored ? 'none' : `1px solid ${mainButtonColor}`)};
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 80%; /* 20px */
    letter-spacing: -0.625px;
    z-index: 0;
    text-align: center;
    justify-content: center;
    cursor: pointer;
    z-index: 9999;
    position: relative;
     @media screen and (max-width: 560px) {
      padding:11.582px 18.875px;
      font-size: 15px;
      justify-content: center;
    } 
`;

const ButtonCustom = styled.button`
   display: flex;
    padding: 20px 44px;
    border-radius: 36px;
    border: none;
    background-color: ${({ theme: { sliderColor } }) => sliderColor};
    color: ${({ theme: { mainTextColor } }) => mainTextColor};
    font-family: 'TTTravels';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 80%; /* 20px */
    letter-spacing: -0.625px;
    z-index: 0;
    text-align: center;
    justify-content: center;
    cursor: pointer;
    z-index: 9999;
    position: relative;
     @media screen and (max-width: 560px) {
      padding:11.582px 18.875px;
      font-size: 15px;
      justify-content: center;
    } 
`;

const P = styled.p`
    color: red;
    font-family: 'TTTravels';
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin: 0;
    position: absolute;
    top: 80px;
    left: 60px;
`;

const Button: FC<TButton> = ({
  onClick, isColored, text, type, disabled, isShown, showYellow = false,
}) => (
  showYellow
    ? (
      <ButtonCustom
        disabled={disabled}
        type={type}
        onClick={onClick}>
        {text}
        {isShown && <P>Заполните все поля корректно</P>}
      </ButtonCustom>
    )
    : (
      <StyledButton
        disabled={disabled}
        type={type}
        onClick={onClick}
        isColored={isColored}>
        {text}
        {isShown && <P>Заполните все поля корректно</P>}
      </StyledButton>
    )
);

export default Button;
