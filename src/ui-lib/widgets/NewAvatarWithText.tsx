/* eslint-disable no-trailing-spaces */
/* eslint-disable react/require-default-props */
import React, { FC } from 'react';
import styled from 'styled-components';
import { TgIcon, VkIcon, GitIcon } from '../icons';
import { TravelsFontMixixn30, TravelsFontMixixn20 } from '../../constants/fontsConfigs';
import { ButtonWithDropBox } from '../RestyledButtons';

export const ImageBox = styled.div<{ width: number, height: number }>`
    border-radius: 50%;
    border: ${({ theme: { mainTextColor } }) => `${mainTextColor} 1px solid`};
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;
    overflow: hidden;
    flex-shrink: 0;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Container = styled.div`
    max-width: 570px;
    width: 100%;
    display: flex;
    gap: 70px;
    align-self: flex-start;
`;

const TextBox = styled.div`
  display:flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
const LinksContainer = styled.div`
  display:flex ;
  gap: 10px;
`;
const SocialLink = styled.a`
  margin: 0;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  cursor:pointer;
`;

const H2 = styled.h2`
  color: ${({ theme: { mainTextColor } }) => mainTextColor};
  ${TravelsFontMixixn30}
`;

const P = styled.p`
  color: ${({ theme: { mainTextColor } }) => mainTextColor};
  ${TravelsFontMixixn20}
  white-space: break-spaces;
`;

const ColoredP = styled.p`
   color: ${({ theme: { sliderColor } }) => sliderColor};
   ${TravelsFontMixixn30}
`;

const NewAvatarWithText: FC<{
  vkLink?: string,
  tgLink?: string,
  gitLink?: string,
  header: string,
  age: string,
  proffessionName?: string,
  address: string,
  image: string,
}> = ({
  vkLink,
  tgLink,
  gitLink,
  header,
  age,
  proffessionName,
  address,
  image,
}) => (
  <Container>
    <ImageBox width={181} height={181}>
      <Image src={image} alt='аватарка' />
    </ImageBox>
    <TextBox>
      <H2>
        {header}
      </H2>
      {proffessionName && <ColoredP>{proffessionName}</ColoredP>}
      <P>{`${age} лет,  ${address}`}</P>
      <LinksContainer>
        {tgLink && <SocialLink href={tgLink} target='_blank' rel='noopener noreferrer'><TgIcon /></SocialLink>}
        {vkLink && <SocialLink href={vkLink} target='_blank' rel='noopener noreferrer'><VkIcon /></SocialLink>}
        {gitLink && <SocialLink href={gitLink} target='_blank' rel='noopener noreferrer'><GitIcon /></SocialLink>}
      </LinksContainer>
    </TextBox>
  </Container>
);

export default NewAvatarWithText;
