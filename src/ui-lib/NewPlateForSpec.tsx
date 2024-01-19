import React, { FC, memo } from 'react';
import styled from 'styled-components';
import { ImageBox, Image } from './widgets/NewAvatarWithText';
import { TravelsFontMixixn24, TravelsFontMixixn30, TravelsFontMixixn20 } from '../constants/fontsConfigs';

/// без кнопки
/// с кнопкой пригласить и отказать
/// только одна кнопка

const Plate = styled.div`
    width: 100%;
    padding: 25px;
    background-color: ${({ theme: { plateColor } }) => plateColor};
    border-radius: 20px;
    border: ${({ theme: { mainButtonColor } }) => `1px solid ${mainButtonColor}`};
    display: flex;
    gap: 19px;
    box-sizing: border-box;
    &:hover {
        box-shadow: ${({ theme: { mainButtonColor } }) => `0px 0px 20px 0px ${mainButtonColor}`};
        cursor: pointer;
    }
`;

const ContentBox = styled.div`
  display: flex ;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  align-items: flex-start;
`;

const P = styled.p`
  color: ${({ theme: { mainTextColor } }) => mainTextColor};
  ${TravelsFontMixixn24}
`;

const Span = styled.span`
  color: ${({ theme: { sliderColor } }) => sliderColor};
  ${TravelsFontMixixn24}
`;

const RoundSpan = styled.span`
  display: flex;
  padding: 4px 15px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  border:${({ theme: { sliderColor } }) => `${sliderColor} 1px solid`};
  color: ${({ theme: { mainTextColor } }) => mainTextColor};
  ${TravelsFontMixixn20}
`;

const NewPlateForSpec: FC<{
  image: string,
  name: string,
  specislity: string,
  level: string,
  onClick: () => void,
}> = ({
  image,
  onClick,
  name,
  specislity,
  level,
}) => (
  <Plate onClick={onClick}>
    <ImageBox width={150} height={150}>
      <Image src={image} alt='аватарка' />
    </ImageBox>
    <ContentBox>
      <P>
        {name}
      </P>
      <Span>
        {specislity}
      </Span>
      <RoundSpan>
        {level}
      </RoundSpan>
    </ContentBox>
  </Plate>
);

export default memo(NewPlateForSpec);
