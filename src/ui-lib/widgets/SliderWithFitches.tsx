import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';
import {
  ShieldIcon1, ShieldIcon2, ShieldIcon3, PeachArrowIcon,
} from '../icons';
import { ComfortaFontMixixn31, TravelsFontMixixn20 } from '../../constants/fontsConfigs';
import Shield1 from '../../assets/orangeshield.svg';
import Shield2 from '../../assets/blueShield.svg';

const BlocksList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
  gap: 90px;
  height: 390px;
  width: 390px;
`;

const BlockListItem = styled.li<{ isShown: boolean }>`
  width: 390px;
  height: 390px;
  border-radius: 50px;
  opacity:  ${({ isShown }) => (isShown ? 1 : 0)};
  display:  flex;
  transition: .5s;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;
  background: ${({ theme: { subMainBg } }) => subMainBg};
  box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.10);
  position: absolute;
  top: 0;
  left: 0;
`;

const BlockListItemHeader = styled.h3`
  color: ${({ theme: { mainButtonColor } }) => mainButtonColor};
  ${ComfortaFontMixixn31}
  margin: 0;
`;

const BlockListItemP = styled.p`
  color: ${({ theme: { mainTextColor } }) => mainTextColor};
  ${TravelsFontMixixn20}
  margin: 0;
  text-align: center;
`;

const BlockListItemImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 150px;
    height: 150px;
    background: url(${Shield1}) no-repeat ;
    background-position: center center;
  
  }
  &::before {
    content: '';
    position: absolute;
    top: 9px;
    left: -11px;
    width: 150px;
    height: 150px;
    background: url(${Shield2}) no-repeat ;
    background-position: center center;
  
  }
`;

const Switcher = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  width: 10px;
  height: 100%;
  justify-content: space-between;
  position: absolute;
  top: 0;
  right: -37px;
  height: 390px;
`;

const SwitcherLine = styled.li<{ isCurrent:boolean }>`
    width: 100%;
    height: 100px;
    background-color: ${({ isCurrent, theme: { sliderColor, mainButtonColor } }) => (isCurrent ? mainButtonColor : sliderColor)};
    box-shadow: ${({ isCurrent, theme: { sliderColor } }) => (isCurrent ? 'none' : `0px 0px 20px 0px ${sliderColor}`)};
    cursor: pointer;
    
`;

const SliderWithFitches: FC = () => {
  const [position, setState] = useState<number>(1);
  return (
    <BlocksList>
      {/*  <Transition in={position === 1} timeout={500}>
        {(state: any) => ( */}
      <BlockListItem isShown={position === 1}>
        <BlockListItemImage><ShieldIcon1 /></BlockListItemImage>
        <BlockListItemHeader>Алгоритмы</BlockListItemHeader>
        <BlockListItemP>Подбор оптимальных проектов и специалистов</BlockListItemP>
      </BlockListItem>
      {/*      )}
      </Transition> */}
      {/*  <Transition in={position === 2} timeout={500}>
        {(state: any) => ( */}
      <BlockListItem isShown={position === 2}>
        <BlockListItemImage><ShieldIcon2 /></BlockListItemImage>
        <BlockListItemHeader>Большой охват</BlockListItemHeader>
        <BlockListItemP>Проекты в 7 ведущих направлениях</BlockListItemP>
      </BlockListItem>
      {/* /*   )}
      </Transition> */ }
      {/*       <Transition in={position === 3} timeout={500}>
        {(state: any) => ( */}
      <BlockListItem isShown={position === 3}>
        <BlockListItemImage><ShieldIcon3 /></BlockListItemImage>
        <BlockListItemHeader>Самореализация</BlockListItemHeader>
        <BlockListItemP>
          Проявляй компетентность и
          <br />
          {' '}
          пробуй новое
        </BlockListItemP>
      </BlockListItem>
      {/*      )}
      </Transition> */}

      <Switcher>
        <SwitcherLine onClick={() => setState(1)} isCurrent={position === 1} />
        <SwitcherLine onClick={() => setState(2)} isCurrent={position === 2} />
        <SwitcherLine onClick={() => setState(3)} isCurrent={position === 3} />
      </Switcher>
    </BlocksList>
  );
};

export default SliderWithFitches;
