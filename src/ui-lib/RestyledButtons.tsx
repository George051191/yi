/* eslint-disable react/require-default-props */
/* eslint-disable import/prefer-default-export */
import React, { FC, useState } from 'react';
import styled from 'styled-components';
import {
  TravelsFontMixixn15,
  TravelsFontMixixn20,
  TravelsFontMixixn24,
  ComfortaFontMixixn31,
  ComfortaFontMixixn39,
} from '../constants/fontsConfigs';
import {
  CrossIcon, PushPic, ArrowIcon, CheckDoneIcon,
} from './icons';

export const UniversalButton = styled.button<{
  textColor: string,
  backColor: string,
  borderColor: string | null,
  paddingTop: number,
  paddingLeft: number,
}>`
    padding: ${({ paddingTop, paddingLeft }) => `${paddingTop}px ${paddingLeft}px`};
    background-color: ${({ backColor }) => backColor};
    border: ${({ borderColor }) => (borderColor ? `1px solid ${borderColor}` : 'none')};
    color: ${({ textColor }) => textColor};    
    ${TravelsFontMixixn20}
    font-size: 25px;
    font-style: normal;
    cursor: pointer;
    border-radius: 36px;
    &:hover {
      box-shadow: ${({ backColor }) => `0px 0px 20px 0px ${backColor}`};
    } 
`;

const AddButtonCircle = styled.div`
  border-radius: 50px;
  border: ${({ theme: { mainTextColor } }) => `${mainTextColor} 1px solid`};
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  transform:rotate(45deg);
`;

const ButtonPlate = styled.button<{ height: number }>`
  border: none;
  outline: none;
  width: 100%;
  border-radius: 7px;
  min-height: ${({ height }) => height}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 19px;
  cursor: pointer;
`;

const ButtonText = styled.p`
  margin: 0;
  color: ${({ theme: { placeholderColor } }) => placeholderColor};
  ${TravelsFontMixixn24}  
`;

export const ButtonWithCross: FC<{
  withText?: boolean,
  text?: string,
  height: number,
  onClick: () => void,
}> = ({
  withText = false,
  text,
  height,
  onClick,
}) => (
  <ButtonPlate type='button' onClick={onClick} height={height}>
    {withText && <ButtonText>{text}</ButtonText>}
    <AddButtonCircle>
      <CrossIcon style={{ width: '20px', height: '20px' }} />
    </AddButtonCircle>
  </ButtonPlate>
);

const P = styled.p`
  color: ${({ theme: { mainTextColor } }) => mainTextColor};
  margin: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 250px;
`;

export const RoundBackButton = styled.button<{ top: number, left: number }>`
background-color: transparent ;
width: 24px;
height: 24px;
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

const DivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 146px;
  right: 20px;
`;

const RoundSpan = styled.div`
  padding: 15px 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 36px;
  background: ${({ theme: { sliderColor } }) => sliderColor};
  color: ${({ theme: { mainTextColor } }) => mainTextColor};
  ${TravelsFontMixixn20}
  z-index: 2;
`;
const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 301px;
  padding: 15px 20px;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  transform: translateY(-42px);
  min-height: 60px;
  border-radius: 27px;
  z-index: 1;
  background: ${({ theme: { lightPeach } }) => lightPeach};

`;
const ListItem = styled.li`
  display: flex;
  width: 100%;
  gap: 15px;
  position: relative;
`;
const FakeInput = styled.input`
  position: absolute;
  z-index: -10;
  opacity: 0;
  &:checked+label span svg{
    display: block;

  }
  &:checked+label span svg path{
   stroke:${({ theme: { mainTextColor } }) => mainTextColor};
    
  }
`;
const Label = styled.label`
  color: ${({ theme: { mainTextColor } }) => mainTextColor};
  display: flex;
  gap: 20px;
  ${TravelsFontMixixn20}
  cursor: pointer;
`;
const InputStub = styled.span`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: ${({ theme: { mainTextColor } }) => `${mainTextColor} 2px solid`};
  border-radius: 7px;
`;
export const ButtonWithDropBox: FC<{ projects?: string[] }> = ({ projects }) => {
  const [state, setState] = useState(true);
  return (
    <DivWrapper>
      <RoundSpan>Пригласить в команду</RoundSpan>
      <List>
        <ListItem>
          <FakeInput type='checkbox' name='1' id='1' />

          <Label htmlFor='1'>
            <InputStub>
              <CheckDoneIcon style={{ width: '16px', height: '17px' }} />
            </InputStub>
            <P>jrkjgorgjogj hgfgfh fgfdgf  ffgfgjkjj yt vxfj kjjhgh fgddfghvhb</P>
          </Label>
        </ListItem>
      </List>
    </DivWrapper>
  );
};
