import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';
import {
  TravelsFontMixixn20,
  ComfortaFontMixixn31,
  ComfortaFontMixixn39,
} from '../../constants/fontsConfigs';
import Image1 from '../../assets/1.png';
import Image2 from '../../assets/2.png';
import Image3 from '../../assets/6.png';
import Image4 from '../../assets/4.png';
import Image5 from '../../assets/5.png';
import Image6 from '../../assets/7.png';
import { PeachArrowIcon } from '../icons';

const TeamSection = styled.section`
  max-width: 1440px;
  width: 100%;
  padding-inline: 20px;
  display: flex;
  flex-direction: column;
  gap: 70px;
  margin-top: 150px;
  margin-bottom: 50px;
  box-sizing: border-box;
  align-items: center;
`;

const TeamSectionHeader = styled.h2`
  color: ${({ theme: { mainButtonColor } }) => mainButtonColor};
  ${ComfortaFontMixixn39}
  margin: 0;
`;

const TeamSectionSliderContiner = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  gap: 40px;
  align-items: center;
  position: relative;
  justify-content: center;
  width: 100%;
`;

const TeamSectionCardHeader = styled.h3`
   color: ${({ theme: { mainButtonColor } }) => mainButtonColor};
   ${ComfortaFontMixixn31}
   margin: 0;
`;

const TeamSectionP = styled.p`
  color: ${({ theme: { mainTextColor } }) => mainTextColor};
  ${TravelsFontMixixn20}
  margin: 0;
  text-align: center;
`;

const TeamSectionSliderItem = styled.li<{ isShown: any }>`
  position: relative;
  max-width: 360px;
  width: 100%;
  flex-shrink: 0;
  height: 409px;
  border-radius: 37.75px;
  border: ${({ theme: { subMainBg } }) => `${subMainBg} 3px solid`};
  box-shadow: 0px 0px 30.2px 0px rgba(0, 0, 0, 0.10);
  flex-direction: column;
  opacity:  ${({ isShown }) => (isShown === 'entered' ? 1 : 0)};
  display:  ${({ isShown }) => (isShown === 'exited' ? 'none' : 'flex')};
  transition: .5s;
  align-items: center;
  gap: 12px;
  @media screen and (max-width:1360px) {
    flex-shrink: 1;
  }
`;

const TeamSectionSliderElTop = styled.div`
  width: 100%;
  height: 290px;
  border-radius: 37.75px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme: { subMainBg } }) => subMainBg};
  box-shadow: 0px 0px 30.2px 0px rgba(0, 0, 0, 0.10);

`;

const SliderImage = styled.img`
  width: 182px;
  height: 232px;
  object-fit: cover;
`;

const SliderForLanding: FC = () => {
  const [isChanged, changeSlides] = useState(false);

  return (
    <TeamSection>
      <TeamSectionHeader>Команда</TeamSectionHeader>
      <TeamSectionSliderContiner>
        {isChanged && <PeachArrowIcon style={{ transform: 'rotate(180deg)' }} onClick={() => changeSlides(!isChanged)} />}
        <Transition in={isChanged} timeout={500}>
          {(state: any) => (
            <TeamSectionSliderItem isShown={state}>
              <TeamSectionSliderElTop>
                <SliderImage src={Image1} alt='здесь крутые ребята' />
              </TeamSectionSliderElTop>
              <TeamSectionCardHeader>Зайченко Евгения</TeamSectionCardHeader>
              <TeamSectionP>дизайнер</TeamSectionP>
            </TeamSectionSliderItem>
          )}
        </Transition>
        <Transition in={isChanged} timeout={500}>
          {(state: any) => (
            <TeamSectionSliderItem isShown={state}>
              <TeamSectionSliderElTop>
                <SliderImage src={Image3} alt='здесь крутые ребята' />
              </TeamSectionSliderElTop>
              <TeamSectionCardHeader>Трубачев Георгий</TeamSectionCardHeader>
              <TeamSectionP>фронтэнд-разработчик</TeamSectionP>
            </TeamSectionSliderItem>
          )}
        </Transition>
        <Transition in={isChanged} timeout={500}>
          {(state: any) => (
            <TeamSectionSliderItem isShown={state}>
              <TeamSectionSliderElTop>
                <SliderImage src={Image6} alt='здесь крутые ребята' />
              </TeamSectionSliderElTop>
              <TeamSectionCardHeader>Морозов Александр</TeamSectionCardHeader>
              <TeamSectionP>бэкенд-разработчик</TeamSectionP>
            </TeamSectionSliderItem>
          )}
        </Transition>
        <Transition in={!isChanged} timeout={500}>
          {(state: any) => (
            <TeamSectionSliderItem isShown={state}>
              <TeamSectionSliderElTop>
                <SliderImage src={Image2} alt='здесь крутые ребята' />
              </TeamSectionSliderElTop>
              <TeamSectionCardHeader>Ермакова Ариадна</TeamSectionCardHeader>
              <TeamSectionP>продакт-менеджер</TeamSectionP>
            </TeamSectionSliderItem>
          )}
        </Transition>
        <Transition in={!isChanged} timeout={500}>
          {(state: any) => (
            <TeamSectionSliderItem isShown={state}>
              <TeamSectionSliderElTop>
                <SliderImage src={Image5} alt='здесь крутые ребята' />
              </TeamSectionSliderElTop>
              <TeamSectionCardHeader>Куркина Татьяна</TeamSectionCardHeader>
              <TeamSectionP>тимлид</TeamSectionP>
            </TeamSectionSliderItem>
          )}
        </Transition>
        <Transition in={!isChanged} timeout={500}>
          {(state: any) => (
            <TeamSectionSliderItem isShown={state}>
              <TeamSectionSliderElTop>
                <SliderImage src={Image4} alt='здесь крутые ребята' />
              </TeamSectionSliderElTop>
              <TeamSectionCardHeader>Уланова Мария</TeamSectionCardHeader>
              <TeamSectionP>
                методолог разработки
                <br />
                {' '}
                структуры
              </TeamSectionP>
            </TeamSectionSliderItem>
          )}
        </Transition>
        {!isChanged && <PeachArrowIcon onClick={() => changeSlides(!isChanged)} />}
      </TeamSectionSliderContiner>
    </TeamSection>
  );
};

export default SliderForLanding;
