/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable ternary/no-unreachable */
/* eslint-disable react/require-default-props */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { TTextBlock } from '../types/componentsTypes';
import cloud from '../assets/cloud.png';
import Button from './Button';
import { useOnScreen } from '../helpers/hooks';

const Div = styled.ul<{ isCenter: boolean, align?: string, buttonAlligin: string, isShown: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 60px;
    width: 100%;
    max-height: ${({ isCenter }) => (isCenter ? '435px' : 'none')};
    height:${({ isCenter }) => (isCenter ? '100%' : 'auto')};
    text-align: ${({ isCenter }) => (isCenter ? 'center' : 'none')};
    position: relative;
    list-style: none;
    padding: 0;
    margin-right: -75px;
    align-self: ${({ align }) => align};
    align-items: ${({ buttonAlligin }) => buttonAlligin};
    opacity:${({ isShown }) => (isShown ? '1' : '0')};
    transition: all ease 1s;
    @media screen and (max-width: 1560px) {
      margin-right: 0;
    }
    @media screen and (max-width: 1290px) {
      width: 600px;
      align-self: center;
    }
    @media screen and (max-width: 650px) {
      width: 100%;
    }
`;

const H2 = styled.h2`
    width: 100%;
    margin: 0;
    color: ${({ theme: { mainButtonColor } }) => mainButtonColor};
    font-family: 'Comforta';
    font-size: 39px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    z-index: 5000;
    text-align: start;
    @media screen and (max-width: 1290px) {
      text-align: center;
    }
    @media screen and (max-width: 560px) {
      font-size: 25px;
    }
`;

const Paragraph = styled.li`
    font-size: 25px;
    font-weight: 500;
    margin: 0;
    color: ${({ theme: { mainTextColor } }) => mainTextColor};
    font-family: 'TTTravels';
    font-style: normal;
    z-index: 5000;
    line-height: normal;
    display: flex;
    gap: 55px;
    text-align: start;
    width: 100%;
    @media screen and (max-width: 1290px) {
    gap: 0;
    
  }
  @media screen and (max-width: 470px) {
      gap: 20px;
    }
`;

const StyledLink = styled(Link)`
  color: ${({ theme: { mainTextColor } }) => mainTextColor};;
  font-family: 'TTTravels';
  font-size: 25px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-decoration-line: underline;
  &:hover {
    color: ${({ theme: { mainButtonColor } }) => mainButtonColor};
    font-weight: 600;
  }
  @media screen and (max-width: 650px) {
    font-size: 25px;
  }
  @media screen and (max-width: 560px) {
    font-size: 21px;
  }
  @media screen and (max-width: 470px) {
      font-size: 15px;
    }
`;

const CloudImage = styled.div<{ deg?: string, top: number, left: number }>`
  width: 1205px;
  height: 791px;
  background: url(${cloud});
  background-repeat: no-repeat;
  z-index: 0;
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  transform: ${({ deg }) => `rotate(${deg})`};
`;

const Span = styled.span`
  font-family: 'Comforta';
  font-size: 39px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: ${({ theme: { mainButtonColor } }) => mainButtonColor};
  display: block;
  max-width: 16%;
  width: 100%;
  @media screen and (max-width: 1290px) {
    font-size: 30px;
    align-self: center;
  }
  @media screen and (max-width: 650px) {
    font-size: 25px;
  }
  @media screen and (max-width: 470px) {
      font-size: 19px;
    }
`;

const P = styled.p`
  margin: 0;
  color: ${({ theme: { mainTextColor } }) => mainTextColor};
  font-family: 'TTTravels';
  font-style: normal;
  z-index: 5000;
  line-height: normal;
  font-size: 25px;
  font-weight: 500;
  @media screen and (max-width: 650px) {
    font-size: 25px;
  }
  @media screen and (max-width: 560px) {
    font-size: 21px;
  }

  @media screen and (max-width: 470px) {
      font-size: 15px;
    }
`;

const TextBlock: FC<TTextBlock> = ({
  isCenter = false,
  mainText,
  paragraphsArray,
  left,
  top,
  align,
  deg,
  widthButton,
  buttonText,
  buttonAlligin,
  isInView = false,
  setScreenState,
  linksArray,
  pathsArray,
  path,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref);
  const navigate = useNavigate();
  useEffect(() => {
    setScreenState(onScreen);
  }, [onScreen]);
  return (
    <Div isShown={isInView} buttonAlligin={buttonAlligin} align={align} isCenter={isCenter}>
      <CloudImage ref={ref} deg={deg} top={top} left={left} />
      <H2>{mainText}</H2>
      {paragraphsArray.map((el, index) => (
        <Paragraph key={index}>
          <Span>
            / 0 {index + 1}
          </Span>
          <P>{el}<br /><StyledLink to={pathsArray[index]}>{linksArray[index]}</StyledLink></P>

        </Paragraph>
      ))}
      {widthButton && <Button onClick={() => navigate(path || '')} isColored type='button' text={buttonText} />}
    </Div>

  );
};

export default TextBlock;
