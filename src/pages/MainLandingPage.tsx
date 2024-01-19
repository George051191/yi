/* eslint-disable no-lone-blocks */
import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import styled from 'styled-components';
import Marquee from 'react-fast-marquee';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector } from '../store/store.types';
import Hero1x from '../assets/hero1x.png';
import Hero2x from '../assets/hero2x.png';
import {
  ComfortaFontMixixn31, TravelsFontMixixn24, TravelsFontMixixn20, ComfortaFontMixixn39,
} from '../constants/fontsConfigs';
import { UniversalButton } from '../ui-lib/RestyledButtons';
import Themes from '../themes';
import Image1 from '../assets/lamding3.png';
import Image2 from '../assets/coworkers.png';
import Image3 from '../assets/coworkers3.png';
import Image4 from '../assets/collaborators5.png';
import NewPlate from '../assets/NewPlate13.svg';
import NewPlate2 from '../assets/NewPlate2.svg';
import SmallCrumb1 from '../assets/SmallCrumb1.svg';
import SmallCrumb2 from '../assets/SmallCrumb2.svg';
import SmallCrumb3 from '../assets/Crumb3.svg';
import SmallCrumb4 from '../assets/Crumb4.svg';
import OrangeSlice from '../assets/OrangeSlicePic.svg';
import OrangeSliceShadow from '../assets/OrangeSlicePicShadow.svg';
import RoundImageArrow from '../assets/roundArrow.svg';
import {
  ArrowToTopIcon,
  FullDonePic, ShieldIcon1, ShieldIcon2, ShieldIcon3,
} from '../ui-lib/icons';
import Piece1 from '../assets/orangePieceSmall1.svg';
import Piece2 from '../assets/orangePieceSmall2.svg';
import Shield1 from '../assets/orangeshield.svg';
import Shield2 from '../assets/blueShield.svg';
import SliderForLanding from '../ui-lib/widgets/SliderLanding';
import NewLandingMainTheme from '../assets/NewLandingImage.png';
import { useOnScreen } from '../helpers/hooks';
import { jwt } from '../api/api';
import SliderWithFitches from '../ui-lib/widgets/SliderWithFitches';

const HeroSection = styled.section`
  max-width: 1440px;
  width: 100%;
  box-sizing: border-box;
  padding-inline: 20px;
  height: 41vw;
  max-height: 960px;
  display: flex;
  justify-content: center;
  margin-top: 60px;
  align-items: flex-end;
  background-image: url(${Hero1x});
  background-position: center top;
  background-repeat: no-repeat;
  background-size: contain;
  @media (min-resolution: 2dppx) {
    background-image: url(${Hero2x});
  }
`;

const CrumbTop = styled.li`
  width: 140px;
  height: 69px;
  background: url(${SmallCrumb1}) no-repeat left top, url(${SmallCrumb2}) no-repeat right bottom;
  transform: translateX(188px);
`;

const CrumbBottom = styled.li`
  width: 191px;
  height: 83px;
  background: url(${SmallCrumb3}) no-repeat right top, url(${SmallCrumb4}) no-repeat left bottom;
  transform: translateX(120px);
`;

const AboutSection = styled.section`
   max-width: 1440px;
   width: 100%;
   box-sizing: border-box;
   display: flex;
   justify-content: center;
   padding-inline: 20px;
   margin-bottom: 60px;
`;

const AboutSectionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const AboutSectionButtonsWrapper = styled.div`
  display: flex;
  gap: 20px;

`;

const AboutSectionHeader1 = styled.h1`
    color:${({ theme: { mainButtonColor } }) => mainButtonColor};
    text-align: center;
   ${ComfortaFontMixixn31}
    margin: 0;
    margin-bottom: 20px;
    display: block;
`;

const AboutSectionHeader2 = styled.h2`
   color:${({ theme: { mainTextColor } }) => mainTextColor};
    text-align: center;
    font-family: 'Comforta', 'Arial';
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 28.79px;
    margin: 0;
    margin-bottom: 20px;
    display: block;
`;

const AbilitySection = styled.section`
  max-width: 1440px;
  width: 100%;
  box-sizing: border-box;
  padding-inline: 20px;
`;

const AbilitySectionList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
  padding: 0;
  align-items: center;
  gap: 10px;
`;

const AbilitySectionListItemFirst = styled.li<{ isShown: boolean }>`
  width: 100%;
  height: 37vw;
  max-height: 700px;
  display: flex;
  background-size: contain;
  align-items: center;
  background: url(${NewPlate}) no-repeat left center;
  background-size: contain;
  opacity: ${({ isShown }) => (isShown ? 1 : 0)};
  transition: all ease .4s;
`;

const AbilitySectionListItemSecond = styled.li<{ isShown: boolean }>`
  width: 112%;
  height: 48vw;
  max-height: 700px;
  display: flex;
  background-size: contain;
  align-items: center;
  background: url(${NewPlate2}) no-repeat right center;
  background-size: contain;
  opacity: ${({ isShown }) => (isShown ? 1 : 0)};
  transition: all ease .6s;
`;

const AbilitySectionListItemImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${Image1});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

const AbilitySectionListItemImageThird = styled(AbilitySectionListItemImage)`
  background-image: url(${Image3});
  transform: translateX(-56px);
`;

const AbilitySectionListItemImageSecond = styled(AbilitySectionListItemImage)`
  background-image: url(${Image2});
  transform: translateX(75px);
`;

const AbilitySectionTextBlock = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 40px;
 
  list-style: none;
  margin: 0;
  padding: 0;
 
`;

const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
    align-items: center;
    transform: translateX(53px);
    width: 100%;
`;

const AbilitySectionTextBlock2 = styled(AbilitySectionTextBlock)`
  transform: translateX(-86px);
  @media screen and (max-width: 1350px) {
    transform: translateX(-20px);
  }
`;

const AbilitySectionH2 = styled.h2`
    color:${({ theme: { mainButtonColor } }) => mainButtonColor};
    text-align: center;
    ${ComfortaFontMixixn31}
    margin: 0;
  
`;

const AbilitySectionH2WithMargin = styled(AbilitySectionH2)`
    margin-left: 96px;
`;

const AbilitySectionSpan = styled.span`
    color:${({ theme: { mainButtonColor } }) => mainButtonColor};
    text-align: center;
    ${ComfortaFontMixixn31}
    margin: 0;
`;

const AbilitySectionP = styled.p`
  margin: 0;
  color: ${({ theme: { mainTextColor } }) => mainTextColor};
  ${TravelsFontMixixn20}
  max-width: 420px;
  flex: auto;
`;

const AbilitySectionTextLine = styled.li`
  display: flex;
  width: 100%;
  gap: 4vw;
  align-items: center;
  justify-content: center;
 
`;

const BlockWithOrageSlicesFirst = styled.div`
    position: absolute;
    top: -166px;
    z-index: 0;
    left: -220px;
    width: 649px;
    height: 619px;
    background: url(${OrangeSlice})  center left no-repeat, url(${OrangeSliceShadow})  center right no-repeat;
`;
const BlockWithOrageSlicesSecond = styled.div`
    position: absolute;
    top: 85px;
    width: 649px;
    height: 619px;
    z-index: 0;
    left: 479px;
    transform: rotate(166deg);
    background: url(${OrangeSlice})  center left no-repeat, url(${OrangeSliceShadow})  center right no-repeat;
`;

const BlockWithOrageSlicesThird = styled.div`
    position: absolute;
    top: -120px;
    width: 649px;
    height: 619px;
    z-index: 0;
    left: 958px;
    transform: rotate(74deg);
    background: url(${OrangeSlice})  center left no-repeat, url(${OrangeSliceShadow})  center right no-repeat;
`;

const OrangeSection = styled.section`
    max-width: 1440px;
    width: 100%;
    padding-inline: 20px;
    z-index: 20;
    position: relative;
    box-sizing: border-box;
    margin-top: 200px;
    margin-bottom: 200px;
`;

const OrangeSlicesSection = styled.div`
  width: 100%;
  padding: 60px 90px;
  box-sizing: border-box;
  position: relative;
  z-index: 20;
  display: flex;
  flex-direction: column;
  min-height: 518px;
  border-radius: 119px;
  box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.25);
  background-color: ${({ theme: { subMainBg } }) => subMainBg};
`;
const OrangeSectionImage = styled.div`
  width: 38vw;
  max-width: 660px;
  top: -112px;
  right: 48px;
  position: absolute;
  height: 50vw;
  max-height: 780px;
  background-image: url(${Image4});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

const OrangeSectionHeader = styled.h2`
  margin: 0;
  color: ${({ theme: { mainButtonColor } }) => mainButtonColor};
 ${ComfortaFontMixixn39}
  margin-bottom: 10px;
`;
const OrangeSectionP = styled.p`
  margin: 0;
  color: ${({ theme: { mainButtonColor } }) => mainButtonColor};
  ${ComfortaFontMixixn31}
  position: relative;
  margin-bottom: 22px;
  &::before {
    content: '';
    position: absolute;
    width:90px;
    height: 91px;
    background:url(${RoundImageArrow}) no-repeat center center ;
    top: 25px;
    left: 50px;
  }
`;

const OrangeList = styled.ul`
  list-style: none;
  gap: 60px;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 60px;
  flex-direction: column;
  padding-left: 14%;
`;

const OrangeListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 25px;
  color: ${({ theme: { mainTextColor } }) => mainTextColor};
  ${TravelsFontMixixn20}
`;

const TwoColumnSection = styled.section`
  max-width: 1440px;
  box-sizing: border-box;
  padding-inline: 20px;
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

const OrangePiecesP = styled.p`
  margin: 0;
  position: relative;
  z-index: 50;
  color: ${({ theme: { mainButtonColor } }) => mainButtonColor};
  ${ComfortaFontMixixn31}
`;

const SpanWithOrangePieces = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 370px;
  height: 370px;
  color: ${({ theme: { mainButtonColor } }) => mainButtonColor};
  ${ComfortaFontMixixn39}
  &::before {
    content: '';
    position: absolute;
    top: -16px;
    width: 370px;
    height: 370px;
    background: url(${Piece1}) no-repeat ;
    background-position: center center;
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 370px;
    height: 370px;
    background: url(${Piece2}) no-repeat ;
    background-position: center center;
  }
`;

const RegisterSection = styled.section`
  max-width: 1440px;
  width: 100%;
  height: 600px;
  padding-inline: 20px;
  box-sizing: border-box;
  background: url(${NewLandingMainTheme}) no-repeat left center;
  background-size: 64%;
  display: flex;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 40px;
`;

const RegisterSectionWrapper = styled(AboutSectionWrapper)`
  height:fit-content;
  align-items: end;
  margin-left: auto;
  max-width: 604px;
  width: 100%;
`;

const LinkToSections = styled(Link)`
   color: ${({ theme: { mainTextColor } }) => mainTextColor};
  ${TravelsFontMixixn20}
  text-decoration: none;
  &:hover {
    color:${({ theme: { mainButtonColor } }) => mainButtonColor};
    font-weight: 600;
  }
`;

const HashContainer = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  gap: 45px;
`;

const Hash = styled.li<{ isOrange: boolean }>`
    display: flex;
    height: 37px;
    padding: 27px 44px;
    justify-content: center;
    align-items: center;
    border-radius: 36px;
    background-color: ${({ theme: { mainButtonColor, sliderColor }, isOrange }) => (isOrange ? sliderColor : mainButtonColor)};
    color:${({ theme: { mainBg, mainTextColor }, isOrange }) => (isOrange ? mainTextColor : mainBg)};
    ${TravelsFontMixixn20}
    letter-spacing: -0.5px;
    box-sizing: border-box;
    @media screen and (max-width: 620px) {
      font-size: 15px;
      padding: 11.582px 18.875px;
    }
`;

const MarqueeWrapper = styled.div`
  position: absolute;
  width: 100vw;
  top: -156px;
  @media screen and (max-width:760px) {
    top: -230px;
  }
`;

const Section = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-inline: 20px;
    max-width: 1440px;
    width: 100%;
    margin-top: 130px;
    margin-bottom: 60px;
    box-sizing: border-box;
    position: relative;
    @media screen and (max-width: 1200px) {
      margin-top: 250px;
    }
`;

const BackToTopButton = styled.button<{ isShown: boolean, isColoured: boolean }>`
  width:100px;
  z-index: 999999;
  height: 100px;
  border-radius: 50px;
  border:${({ theme: { mainButtonColor, sliderColor }, isColoured }) => (isColoured ? `3px solid ${sliderColor}` : `3px solid ${mainButtonColor}`)};
  display: ${({ isShown }) => (isShown ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  cursor:pointer;
  position: fixed;
  background-color: ${({ theme: { mainBg, mainButtonColor }, isColoured }) => (isColoured ? mainButtonColor : mainBg)};
  right: 50px;
  bottom: 50px;
  @media screen and (max-width:1000px) {
    width:50px;
    height:50px;

}
`;

const MainLandingPage: FC = () => {
  const [isShown, setShow] = useState(false);
  const [firstShown, setFirstShown] = useState(false);
  const navigate = useNavigate();
  const [secondShown, setSecondShown] = useState(false);
  const [thirdShown, setThirdShown] = useState(false);
  const { theme, isColoured } = useSelector((state) => state.all);
  const toggleVisibility = () => {
    if (window.pageYOffset > 500) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const ref1 = useRef<any>(null);
  const onScreen1 = useOnScreen(ref1);
  const ref2 = useRef<any>(null);
  const onScreen2 = useOnScreen(ref2);
  const ref3 = useRef<any>(null);
  const onScreen3 = useOnScreen(ref3);
  useEffect(() => {
    setFirstShown(onScreen1);
    setSecondShown(onScreen2);
    setThirdShown(onScreen3);
  }, [onScreen1, ref1, onScreen2, onScreen3, ref2, ref3]);

  useEffect(() => {
    document.addEventListener('scroll', toggleVisibility);
    return () => {
      document.removeEventListener('scroll', toggleVisibility);
    };
  }, []);
  return (
    <>
      <HeroSection />
      <BackToTopButton isColoured={isColoured} onClick={() => { scrollToTop(); }} isShown={isShown}>
        <ArrowToTopIcon isColoured={isColoured} />
      </BackToTopButton>
      <AboutSection>
        <AboutSectionWrapper>
          <AboutSectionHeader1>Мы знаем, что для тебя важно, и мы это ПроекТим</AboutSectionHeader1>
          <AboutSectionHeader2>ПроекТим – ресурс для формирования проектных команд и хранения портфолио</AboutSectionHeader2>
          {!jwt.test() && (
            <AboutSectionButtonsWrapper>
              <UniversalButton
                onClick={() => navigate('/registration')}
                type='button'
                textColor={Themes[theme].mainTextColor}
                backColor={Themes[theme].sliderColor}
                borderColor=''
                paddingLeft={44}
                paddingTop={27}>
                Зарегистрироваться
              </UniversalButton>
              <UniversalButton
                onClick={() => navigate('/login')}
                type='button'
                textColor={Themes[theme].mainTextColor}
                backColor={Themes[theme].mainBg}
                borderColor={Themes[theme].sliderColor}
                paddingLeft={44}
                paddingTop={27}>
                Войти
              </UniversalButton>
            </AboutSectionButtonsWrapper>
          )}
        </AboutSectionWrapper>
      </AboutSection>
      <AbilitySection>
        <AbilitySectionList>
          <AbilitySectionListItemFirst isShown={firstShown} ref={ref1}>
            <ListWrapper>
              <AbilitySectionH2>Собери команду</AbilitySectionH2>
              <AbilitySectionTextBlock>

                <AbilitySectionTextLine>
                  <AbilitySectionSpan>/ 01</AbilitySectionSpan>
                  <AbilitySectionP>
                    расскажи о своем проекте в
                    <br />
                    <LinkToSections to='/projects'>Моих проектах</LinkToSections>
                  </AbilitySectionP>
                </AbilitySectionTextLine>
                <AbilitySectionTextLine>
                  <AbilitySectionSpan>/ 02</AbilitySectionSpan>
                  <AbilitySectionP>
                    опубликуй зарос на специалиста в
                    <br />
                    <LinkToSections to='/projects-window'>Витрине проектов</LinkToSections>
                  </AbilitySectionP>
                </AbilitySectionTextLine>
                <AbilitySectionTextLine>
                  <AbilitySectionSpan>/ 03</AbilitySectionSpan>
                  <AbilitySectionP>
                    найди единомышленников в
                    <br />
                    <LinkToSections to='/team-window'>Витрине специалистов</LinkToSections>
                  </AbilitySectionP>
                </AbilitySectionTextLine>

              </AbilitySectionTextBlock>
              <UniversalButton
                onClick={() => navigate('/team-window')}
                type='button'
                textColor={Themes[theme].mainTextColor}
                backColor={Themes[theme].sliderColor}
                borderColor=''
                paddingLeft={44}
                paddingTop={27}>
                Собрать команду
              </UniversalButton>
            </ListWrapper>
            <AbilitySectionListItemImage />

          </AbilitySectionListItemFirst>
          <CrumbTop />
          <AbilitySectionListItemSecond isShown={secondShown} ref={ref2}>
            <AbilitySectionListItemImageSecond />
            <ListWrapper>
              <AbilitySectionH2WithMargin>Присоединись к проекту</AbilitySectionH2WithMargin>
              <AbilitySectionTextBlock2>

                <AbilitySectionTextLine>
                  <AbilitySectionSpan>/ 01</AbilitySectionSpan>
                  <AbilitySectionP>
                    заполни информацию о себе в
                    <br />
                    <LinkToSections to='/profile'>Личном кабинете</LinkToSections>
                  </AbilitySectionP>
                </AbilitySectionTextLine>
                <AbilitySectionTextLine>
                  <AbilitySectionSpan>/ 02</AbilitySectionSpan>
                  <AbilitySectionP>
                    расскажи о своем опыте в
                    <br />
                    <LinkToSections to='/all-projects'>Моих проектах</LinkToSections>
                  </AbilitySectionP>
                </AbilitySectionTextLine>
                <AbilitySectionTextLine>
                  <AbilitySectionSpan>/ 03</AbilitySectionSpan>
                  <AbilitySectionP>
                    укажи свои компетенции в
                    <br />
                    <LinkToSections to='/team-window'>Витрине специалистов</LinkToSections>
                  </AbilitySectionP>
                </AbilitySectionTextLine>
                <AbilitySectionTextLine>
                  <AbilitySectionSpan>/ 04</AbilitySectionSpan>
                  <AbilitySectionP>
                    откликнись на понравившийся проект в
                    <br />
                    <LinkToSections to='/all-projects'>
                      Витрине проектов
                    </LinkToSections>
                  </AbilitySectionP>
                </AbilitySectionTextLine>

              </AbilitySectionTextBlock2>
              <UniversalButton
                onClick={() => navigate('/projects-window')}
                type='button'
                textColor={Themes[theme].mainTextColor}
                backColor={Themes[theme].sliderColor}
                borderColor=''
                paddingLeft={44}
                paddingTop={27}>
                Присоединиться к проекту
              </UniversalButton>
            </ListWrapper>
          </AbilitySectionListItemSecond>
          <CrumbBottom />
          <AbilitySectionListItemFirst isShown={thirdShown} ref={ref3}>
            <ListWrapper>
              <AbilitySectionH2>Создай портфолио</AbilitySectionH2>
              <AbilitySectionTextBlock>
                <AbilitySectionTextLine>
                  <AbilitySectionSpan>/ 01</AbilitySectionSpan>
                  <AbilitySectionP>
                    расскажи о своих хобби в
                    <br />
                    <LinkToSections to='/profile'>Личном кабинете</LinkToSections>
                  </AbilitySectionP>
                </AbilitySectionTextLine>
                <AbilitySectionTextLine>
                  <AbilitySectionSpan>/ 02</AbilitySectionSpan>
                  <AbilitySectionP>
                    загрузи важные файлы в
                    <br />
                    <LinkToSections to='/achieves'>Достижениях</LinkToSections>
                  </AbilitySectionP>
                </AbilitySectionTextLine>
                <AbilitySectionTextLine>
                  <AbilitySectionSpan>/ 03</AbilitySectionSpan>
                  <AbilitySectionP>
                    зафиксируй свой опыт в
                    <br />

                    <LinkToSections to='/projects'>Моих проектах</LinkToSections>
                  </AbilitySectionP>
                </AbilitySectionTextLine>

              </AbilitySectionTextBlock>
              <UniversalButton
                onClick={() => navigate('/profile')}
                type='button'
                textColor={Themes[theme].mainTextColor}
                backColor={Themes[theme].sliderColor}
                borderColor=''
                paddingLeft={44}
                paddingTop={27}>
                Создать портфолио
              </UniversalButton>
            </ListWrapper>
            <AbilitySectionListItemImageThird />

          </AbilitySectionListItemFirst>

        </AbilitySectionList>
      </AbilitySection>
      <OrangeSection>
        <BlockWithOrageSlicesFirst />
        <BlockWithOrageSlicesSecond />
        <BlockWithOrageSlicesThird />
        <OrangeSlicesSection>
          <OrangeSectionHeader>Тебе с нами по пути</OrangeSectionHeader>
          <OrangeSectionP>Если ты</OrangeSectionP>
          <OrangeList>
            <OrangeListItem>
              <FullDonePic />
              Представитель молодежи с идеями и проектами
            </OrangeListItem>
            <OrangeListItem>
              <FullDonePic />
              Молодой специалист с желанием развиваться
            </OrangeListItem>
            <OrangeListItem>
              <FullDonePic />
              Предприниматель с опытом
            </OrangeListItem>
            <OrangeListItem>
              <FullDonePic />
              Ученый с разработками
            </OrangeListItem>
          </OrangeList>
          <OrangeSectionImage />
        </OrangeSlicesSection>
      </OrangeSection>
      <TwoColumnSection>
        <SpanWithOrangePieces>
          <OrangePiecesP>
            ПроекТим
            <br />
            это про

          </OrangePiecesP>
        </SpanWithOrangePieces>
        <SliderWithFitches />
      </TwoColumnSection>
      <SliderForLanding />
      <RegisterSection>
        <RegisterSectionWrapper>
          <AboutSectionHeader1 style={{ fontSize: '39px', textAlign: 'end' }}>Ждем тебя и твой проект. Присоединяйся!</AboutSectionHeader1>

          {!jwt.test() && (
            <UniversalButton
              onClick={() => navigate('/registration')}
              type='button'
              textColor={Themes[theme].mainTextColor}
              backColor={Themes[theme].sliderColor}
              borderColor=''
              paddingLeft={44}
              paddingTop={27}>
              Зарегистрироваться
            </UniversalButton>
          )}

        </RegisterSectionWrapper>
      </RegisterSection>
      <Section>
        <MarqueeWrapper>
          <Marquee gradientColor={[248, 251, 253]} gradientWidth={500}>

            <HashContainer>
              <Hash isOrange>Экология</Hash>
              <Hash isOrange={false}>Наука</Hash>
              <Hash isOrange>Промышленность</Hash>
              <Hash isOrange={false}>Предпринимательство</Hash>
              <Hash isOrange>Социалка</Hash>
              <Hash isOrange={false}>IT </Hash>
              <Hash isOrange>Предпринимательство</Hash>
              <Hash isOrange={false}>Наука</Hash>
              <Hash isOrange>Промышленность</Hash>
            </HashContainer>

          </Marquee>
          <Marquee direction='right' gradientColor={[248, 251, 253]} gradientWidth={500}>

            <HashContainer>
              <Hash isOrange>Экология</Hash>
              <Hash isOrange={false}>Наука</Hash>
              <Hash isOrange>Промышленность</Hash>
              <Hash isOrange={false}>Предпринимательство</Hash>
              <Hash isOrange>Социалка</Hash>
              <Hash isOrange={false}>IT </Hash>
              <Hash isOrange>Предпринимательство</Hash>
              <Hash isOrange={false}>Наука</Hash>
              <Hash isOrange>Промышленность</Hash>
            </HashContainer>

          </Marquee>
        </MarqueeWrapper>
      </Section>
    </>
  );
};

export default MainLandingPage;
