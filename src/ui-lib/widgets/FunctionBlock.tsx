/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import styled, { keyframes } from 'styled-components';
import Marquee from 'react-fast-marquee';
import PlateWithImage from '../PlateWithImage';
import TextBlock from '../TextBox';
import { First, Second, Third } from '../../constants/textsForLanding';
import landingImage1 from '../../assets/coworkers3.png';
import landingImage2 from '../../assets/coworkers.png';
import landingImage3 from '../../assets/lamding3.png';
import img1 from '../../assets/1.png';
import img2 from '../../assets/2.png';
import img3 from '../../assets/3.png';
import img4 from '../../assets/4.png';
import img5 from '../../assets/5.png';
import img6 from '../../assets/6.png';
import smallCloud from '../../assets/smallCloud.png';

import collaborators from '../../assets/collaborators5.png';
import {
  RoundArrowIcon, CheckedRadio, TopIcon, PeopleIcon, AlgoIcon, ArrowToTopIcon,
} from '../icons';
import cloud from '../../assets/cloud.png';
import { useSelector } from '../../store/store.types';
import { SectionHeader } from '../TextBlocks';

const Section = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-inline: 40px;
    max-width: 1540px;
    width: 100%;
    margin-top: 500px;
    box-sizing: border-box;
    position: relative;
    @media screen and (max-width: 1200px) {
      margin-top: 250px;
    }
`;

const P = styled.p`
    color: ${({ theme: { mainTextColor } }) => mainTextColor};
    font-family: 'TTTravels';
    font-size: 25px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin: 0;
    margin-bottom: 65px;
    @media screen and (max-width: 700px) {
      font-size: 20px;
    }
`;

const H2 = styled.h2`
    color: ${({ theme: { mainTextColor } }) => mainTextColor};
    font-family: 'TTTravels';
    font-size: 60px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin: 0;
    text-align: center;
    margin-bottom: 110px;
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
    font-family: 'TTTravels';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 80%;
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
  top: -292px;
  @media screen and (max-width:760px) {
    top: -230px;
  }
`;

const RoundDiv = styled.div`
  display: inline-flex;
  padding: 30px 60px;
  border-radius: 72px;
  width: 600px;
  border:${({ theme: { sliderColor } }) => `3px solid ${sliderColor}`};
  color: ${({ theme: { mainButtonColor } }) => mainButtonColor};
  font-family: 'Comforta';
  font-size: 39px;
  font-style: normal;
  font-weight: 400;
  line-height: 80%; 
  letter-spacing: -1.5px;
  align-items: center;
  justify-content: center;
  z-index: 50;
  box-sizing: border-box;
  @media screen and (max-width: 940px) {
    transform: none !important;
  }
  @media screen and (max-width: 660px) {
    width:100%;
    text-align: center;
    font-size:35px;
  }
  @media screen and (max-width: 470px) {
    padding: 10.729px 21.458px;
    font-size: 25px;
  }
`;

const ColouredP = styled.p`
  margin: 0;
  color: ${({ theme: { mainButtonColor } }) => mainButtonColor};
  font-family: 'Comforta';
  font-size: 39px;
  font-style: normal;
  font-weight: 400;
  line-height: 80%; 
  letter-spacing: -1.5px;
  position:absolute;
  top: 105px;
  left: -239px;
  top: 189px;
  left: -6px;
  @media screen and (max-width: 940px) {
    top: 26px;
  }
  @media screen and (max-width: 660px) {
    font-size: 35px;
  }
  @media screen and (max-width: 470px) {
    font-size: 20px;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 45px;
  left: 128px;
  @media screen and (max-width: 940px) {
    transform: rotate(41deg);
  }
  @media screen and (max-width: 660px) {
    left: 67px;
  }
  @media screen and (max-width: 470px) {
    left: 30px;
    top: 25px;
    & svg {
      width: 24px;
      height: 24px;
    }
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  
  transform: translateX(200px);
  @media screen and (max-width:1160px) {
      
      z-index: 99999;
    }
    @media screen and (max-width: 940px){
      transform: none;
      margin-top: 175px;
    }
    @media screen and (max-width: 470px) {
      margin-top: 88px;
    }
`;

const Li = styled.li`
    color: ${({ theme: { mainTextColor } }) => mainTextColor};
    font-family: 'TTTravels';
    font-size: 25px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin: 0;
    display: flex;
    gap: 26px;
    align-items: center;
    margin-bottom: 36px;
    @media screen and (max-width: 470px) {
      font-size: 14px;
      & svg {
        width: 20px;
        height: 20px;
      }
    }
`;

const Div = styled.div`
  display: flex;
  margin-top: 96px;
  position: relative;
  z-index: 50;
  @media screen and (max-width: 940px) {
    flex-direction: column;
  }
`;

const CardContainer = styled.ul`
  display: flex;
  gap: 96px;
  list-style: none;
  padding:0;
  margin: 0;
  margin-top: 111px;
  @media screen and (max-width: 1450px) {
    gap: 2%;
  }
  @media screen and (max-width: 1000px ) {
    flex-direction: column;
    gap: 50px;
    align-items: center;
  }
`;

const CardAbout = styled.li`
  width: 398px;
  height: 378.361px;
  border-radius: 50px;
  background: #EAEEFF;
  box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.10);
  backdrop-filter: blur(4px);
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  justify-content: end;
  cursor: pointer;
  transition: all ease .5s;
  &:hover {
    transform: translateY(-15px);
  }
  @media screen and (max-width: 1450px){
    width: 34%;
  }
  @media screen and (max-width: 1000px ) {
    width: 70%;
  }
  @media screen and (max-width: 700px) {
    width: 320px;
    
  }
`;

const SmallColouredP = styled.p`
  text-align: center;
  font-family:'Comforta';
  font-size: 39px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: ${({ theme: { mainButtonColor } }) => mainButtonColor};
  margin: 0;
  @media screen and (max-width: 760px) {
    font-size: 19px;
    font-weight: 400;
  }
`;

const OrangeRoundDiv = styled.div`
  height: 153px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 50px;
  background: ${({ theme: { sliderColor } }) => sliderColor};
  backdrop-filter: blur(4px);
  text-align: center;
  @media screen and (max-width: 700px) {
    padding: 10px;
    box-sizing: border-box;
  }
`;

const TeammateImage = styled.img`
  width: 239.547px;
  height: 306.707px;
  flex-shrink: 0;
  margin-top: 11px;
  margin-bottom: 18px;
  @media screen and (max-width:1000px) {
    width: 150px;
    height: 180px;
  }
`;

const TeamMateItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TeamContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr fr;
  column-gap: 200px;
  row-gap: 70px;
  z-index: 5000;
  margin-top: 100px;
  @media screen and (max-width:1200px) {
    column-gap: 0;
    row-gap: 0;
  }
  @media screen and (max-width:620px) {
    display: none;
  }
`;
const TeamContainerOrdered = styled.ul`
  display: none;
  @media screen and (max-width:620px) {
    grid-template-columns: 1fr 1fr;
    margin-top: 50px;
    gap: 28px;
  
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
 
  grid-template-rows: 1fr fr;
 
  z-index: 5000;
  margin-top: 100px;}
`;

const CloudImageDiv = styled.div`
  position: absolute;
  width: 1205.124px;
  height: 764px;
  background-repeat: no-repeat;
  background: url(${cloud});
  top: 247px;
  @media screen and (max-width: 620px) {
   display: none;
  }
`;

const SmallCloudImage = styled.div`
  display: none;
  @media screen and (max-width: 620px) {
    position: absolute;
    background: url(${smallCloud});
    display: block;
    background-repeat: no-repeat;
    width: 570px;
    height: 370px;
    margin-bottom: 25px;
  }
`;

const Image = styled.img`
    width: 727px;
    height: 868px;
    object-fit: contain;
    flex: auto;
    z-index: 5000; 
    margin-top: 39px;
    @media screen and (max-width:1160px) {
      width: 44vw;
      z-index: 1;
    }
    @media screen and (max-width: 940px) {
      width: 100%;
    }
    @media screen and (max-width: 470px) {
      height: auto;
    }
`;

const moveButton = keyframes`
   0% {
    transform: translateY(10px);
  }
  
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(10px);
  }
`;

const MatePosition = styled.p`
    color:  ${({ theme: { mainTextColor } }) => mainTextColor};
    font-family: 'TTTravels';
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-decoration: underline;
    margin: 0;
    text-align: center;
    @media screen and (max-width: 760px) {
    font-size: 14px;
  }
`;

const RefDiv = styled.div`
  display: none;
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
  /* animation: ${moveButton} 3s linear infinite;  */
  @media screen and (max-width:1000px) {
    width:50px;
    height:50px;

}
`;

const FunctionBlock: FC = () => {
  const [isShown, setShow] = useState(false);
  const [firstShown, setFirstShown] = useState(false);
  const [secondShown, setSecondShown] = useState(false);
  const [thirdShown, setThirdShown] = useState(false);
  const { isColoured } = useSelector((state) => state.all);
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

  useEffect(() => {
    document.addEventListener('scroll', toggleVisibility);
    return () => {
      document.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (

    <>
      <BackToTopButton isColoured={isColoured} onClick={() => { scrollToTop(); }} isShown={isShown}>
        <ArrowToTopIcon isColoured={isColoured} />
      </BackToTopButton>
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
        <PlateWithImage
          isInView={firstShown}
          gap={0}
          imageHeight={91}
          width={100}
          image={landingImage3}
          isReversed={false}
          align='center'
          height={704}>
          <TextBlock
            path='/team-list'
            setScreenState={setFirstShown}
            isInView={firstShown}
            buttonAlligin='center'
            widthButton
            buttonText='Собрать команду'
            top={-138}
            left={-283}
            mainText={First.mainText}
            pathsArray={['/projects', '/projects-window', '/team-list']}
            linksArray={['«Моих проектах»', '«Витрине проектов»', '«Витрине специалистов»']}
            paragraphsArray={First.paragraphsArray} />
        </PlateWithImage>
        <PlateWithImage
          isRight
          isInView={secondShown}
          padding={101}
          image={landingImage2}
          isReversed
          align='center'
          imageHeight={95}
          width={100}
          height={704}>
          <TextBlock
            path='/projects-window'
            isInView={secondShown}
            setScreenState={setSecondShown}
            buttonText='Присоединиться к проекту'
            buttonAlligin='center'
            widthButton
            align='baseline'
            top={-88}
            deg='320deg'
            left={-184}
            isCenter
            mainText={Second.mainText}
            pathsArray={['/profile', '/projects', '/team-list', '/projects-window']}
            linksArray={['«Личном кабинете»', '«Моих проектах»', '«Витрине специалистов»', '«Витрине проектов»']}
            paragraphsArray={Second.paragraphsArray} />
        </PlateWithImage>
        <PlateWithImage
          isInView={thirdShown}
          imageHeight={100}
          width={100}
          height={704}
          padding={210}
          gap={0}
          image={landingImage1}
          isReversed={false}>
          <TextBlock
            path='/profile'
            isInView={thirdShown}
            setScreenState={setThirdShown}
            buttonAlligin='center'
            buttonText='Создать портфолио'
            widthButton
            deg='200deg'
            top={-171}
            left={-337}
            mainText={Third.mainText}
            pathsArray={['/profile', '/', '/projects']}
            linksArray={['«Личном кабинете»', '«Достижениях»', '«Моих проектах»']}
            paragraphsArray={Third.paragraphsArray} />
        </PlateWithImage>
      </Section>
      <Section style={{ marginTop: '160px', position: 'relative' }}>

        <CloudImageDiv style={{
          top: '126px',
          width: '1961px',
          height: '1061px',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '82%',
          transform: 'rotate(168deg)',
        }} />
        <RoundDiv style={{ transform: 'translateY(125px)' }}>
          Тебе с нами по пути
        </RoundDiv>
        <Div style={{ width: '100%', alignItems: 'center', marginTop: '0' }}>

          <ColouredP>
            Если ты
            <IconWrapper><RoundArrowIcon /></IconWrapper>
          </ColouredP>
          <List>

            <Li>
              <CheckedRadio />
              Представитель молодежи с идеями и
              <br />
              {' '}
              проектами
            </Li>
            <Li>
              <CheckedRadio />
              Молодой специалист с желанием
              <br />
              {' '}
              развиваться
            </Li>
            <Li>
              <CheckedRadio />
              Предприниматель с опытом
            </Li>
            <Li>
              <CheckedRadio />
              Ученый с разработками
              {' '}
            </Li>
          </List>
          <Image src={collaborators} />
        </Div>
      </Section>
      <Section style={{ marginTop: '250px' }}>
        <RoundDiv>ПроекТим - это про</RoundDiv>
        <CardContainer>
          <CardAbout>
            <SmallColouredP>Алгоритмы</SmallColouredP>
            <AlgoIcon />
            <OrangeRoundDiv><P style={{ margin: '0', fontWeight: '500' }}>Подбор оптимальных проектов и специалистов</P></OrangeRoundDiv>
          </CardAbout>
          <CardAbout>
            <SmallColouredP>Большой охват</SmallColouredP>
            <PeopleIcon />
            <OrangeRoundDiv><P style={{ margin: '0', fontWeight: '500' }}>Проекты в 7 ведущих направлениях</P></OrangeRoundDiv>
          </CardAbout>
          <CardAbout>
            <SmallColouredP>
              Место для
              <br />
              {' '}
              самореализации
            </SmallColouredP>
            <TopIcon />
            <OrangeRoundDiv><P style={{ margin: '0', fontWeight: '500' }}>Проявляй компетентность и пробуй новое</P></OrangeRoundDiv>
          </CardAbout>
        </CardContainer>
      </Section>
      <Section style={{ position: 'relative', marginTop: '160px', marginBottom: '450px' }}>
        <CloudImageDiv style={{ transform: 'rotate(125deg)', left: '-357px' }} />
        <CloudImageDiv style={{ transform: 'rotate(301deg)', right: '-344px', top: '180px' }} />
        <SmallCloudImage style={{ top: '88px', transform: 'rotate(358deg)' }} />
        <SmallCloudImage style={{ top: '378px', transform: 'rotate(179deg)' }} />
        <SmallCloudImage style={{ top: '700px', transform: 'rotate(187deg)' }} />
        <RoundDiv style={{ width: 'auto' }}>
          Команда
        </RoundDiv>
        <TeamContainerOrdered>
          <TeamMateItem>
            <TeammateImage src={img2} />
            <SmallColouredP>Ермакова Ариадна</SmallColouredP>
            <MatePosition>продакт-менеджер</MatePosition>
          </TeamMateItem>
          <TeamMateItem>
            <TeammateImage src={img5} />
            <SmallColouredP>Куркина Татьяна</SmallColouredP>
            <MatePosition>тимлид</MatePosition>
          </TeamMateItem>
          <TeamMateItem>
            <TeammateImage src={img4} />
            <SmallColouredP>Уланова Мария</SmallColouredP>
            <MatePosition>методолог разработки структуры</MatePosition>
          </TeamMateItem>
          <TeamMateItem>
            <TeammateImage src={img1} />
            <SmallColouredP>Зайченко Евгения</SmallColouredP>
            <MatePosition>дизайнер</MatePosition>
          </TeamMateItem>
          <TeamMateItem>
            <TeammateImage src={img3} />
            <SmallColouredP>Лукашов Алексей</SmallColouredP>
            <MatePosition>бэкенд-разработчик, техлид</MatePosition>
          </TeamMateItem>
          <TeamMateItem>
            <TeammateImage src={img6} />
            <SmallColouredP>Трубачев Георгий</SmallColouredP>
            <MatePosition>фронтэнд-разработчик</MatePosition>
          </TeamMateItem>
        </TeamContainerOrdered>
        <TeamContainer>

          <TeamMateItem>
            <TeammateImage src={img1} />
            <SmallColouredP>Зайченко Евгения</SmallColouredP>
            <MatePosition>дизайнер</MatePosition>
          </TeamMateItem>
          <TeamMateItem>
            <TeammateImage src={img2} />
            <SmallColouredP>Ермакова Ариадна</SmallColouredP>
            <MatePosition>продакт-менеджер</MatePosition>
          </TeamMateItem>
          <TeamMateItem>
            <TeammateImage src={img3} />
            <SmallColouredP>Лукашов Алексей</SmallColouredP>
            <MatePosition>бэкенд-разработчик, техлид</MatePosition>
          </TeamMateItem>
          <TeamMateItem>
            <TeammateImage src={img4} />
            <SmallColouredP>Уланова Мария</SmallColouredP>
            <MatePosition>методолог разработки структуры</MatePosition>
          </TeamMateItem>
          <TeamMateItem>
            <TeammateImage src={img5} />
            <SmallColouredP>Куркина Татьяна</SmallColouredP>
            <MatePosition>тимлид</MatePosition>
          </TeamMateItem>
          <TeamMateItem>
            <TeammateImage src={img6} />
            <SmallColouredP>Трубачев Георгий</SmallColouredP>
            <MatePosition>фронтэнд-разработчик</MatePosition>
          </TeamMateItem>
        </TeamContainer>
      </Section>

    </>
  );
};

export default FunctionBlock;
