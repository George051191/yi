/* eslint-disable react-hooks/rules-of-hooks */
import React, {
  Dispatch, FC, SetStateAction, useEffect, useRef,
} from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/logo.png';
import pavuk from '../../assets/bigpavuk.png';
import { useOnScreen } from '../../helpers/hooks';
import pdftext from '../../assets/pnd.pdf';
import { setButtonColour } from '../../store/allSlice';
import { useDispatch } from '../../store/store.types';
import ThemeSwitcher from '../ThemeSwitcher';
import { LinkForFileLoad } from '../../pages/CreateProject';
import { BagIcon, TelegramIcon } from '../icons';
import { TravelsFontMixixn20 } from '../../constants/fontsConfigs';

const Logo = styled.img`
    width: 100%;
    height: 100%;
    cursor: pointer;
    object-fit: contain;
    @media screen and (max-width:820px) {
      width: 90px;
      height: 100px;
    }
`;

const StyledLinkMedium = styled(Link)`
    color: ${({ theme: { mainBg } }) => mainBg};
    ${TravelsFontMixixn20}
    text-decoration-line: none;
    text-align: start;
    @media screen and (max-width:1000px) {
      font-size: 14px;
    }

`;

const StyledLink = styled(Link)`
    color: ${({ theme: { mainBg } }) => mainBg};
    ${TravelsFontMixixn20}
    text-decoration-line: none;
    text-align: start;
    @media screen and (max-width:1000px) {
      font-size: 14px;
    }
`;

const Li = styled.li`
    display: flex;
    margin-bottom: 30px;
    color: ${({ theme: { mainBg } }) => mainBg};
    text-align: center;
    ${TravelsFontMixixn20}
    font-weight: 700;
    align-items: center;
    @media screen and (max-width: 820px) {
      margin-bottom: 20px;
      & svg {
        width: 27px;
        height: 27px;
      }
    }
`;

const LiForLogo = styled.li`
  width: 320px;
  height: 270px;
  flex-shrink: 0;
  border-radius: 54.023px;
  background: #FFFDF6;
  display: flex;
  align-items: baseline;
  justify-content: center;
  @media screen and (max-width:820px) {
    width: 120px;
    height: 120px;
    border-radius: 30.618px;
  }
`;

const LinksContainer = styled.ul`
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    list-style: none;
    align-self: flex-start;
`;

const Footer = styled.footer`
    min-height: 683px;
    width: 100%;
    overflow: hidden;
    background-color: ${({ theme: { mainButtonColor } }) => mainButtonColor};
    display: flex;
    align-items: center;
    border-top-left-radius: 70px;
    border-top-right-radius: 70px;
    position: relative;
    @media screen and (max-width: 820px) {
      padding-top: 12px;
      padding-bottom: 20px;
      display: flex;
      flex-direction: column;
    }
`;

const FooterContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0 auto;
    gap: 10px;
    padding-inline: 40px;
    position: relative;
  
    @media screen and (max-width: 820px) {
      flex-direction: column;
      padding-inline: 20px;
    }
`;

const LiForPdf = styled.li`
    display: flex;
    margin-bottom: 30px;
    color: ${({ theme: { mainBg } }) => mainBg};
    text-align: center;
    ${TravelsFontMixixn20}
    align-items: center;
    width: 320px;
    margin-top: 30px;
    text-align: start;
    & a {
      color: ${({ theme: { mainBg } }) => mainBg};
    }
    @media screen and (max-width: 820px) {
      margin-bottom: 20px;
    }
`;

const LinkToTg = styled.a`
    color: ${({ theme: { mainBg } }) => mainBg};
    text-align: center;
    ${TravelsFontMixixn20}
    text-decoration: none;
    align-items: center;
    display: flex;
    @media screen and (max-width:1000px) {
      font-size: 14px;
    }
`;

const FooterElement: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const ref = useRef<HTMLElement>(null);
  const onScreen = useOnScreen(ref);
  useEffect(() => {
    dispatch(setButtonColour(onScreen));
  }, [onScreen, ref]);

  return (
    <Footer ref={ref}>

      <FooterContainer>
        <LinksContainer>
          <LiForLogo>
            <Logo src={pavuk} />
          </LiForLogo>
          <LiForPdf>
            <LinkForFileLoad download href={pdftext}>Политика пользовательского соглашения</LinkForFileLoad>
          </LiForPdf>
          <Li>
            <LinkToTg href='mailto:contact@проектим.рф'>
              <BagIcon style={{ marginRight: '27px' }} />
              contact@проектим.рф
            </LinkToTg>
          </Li>
          <Li>
            <LinkToTg target='_blank' href='https://t.me/proekteam'>
              <TelegramIcon style={{ marginRight: '27px' }} />
              @proekteam
            </LinkToTg>
          </Li>
        </LinksContainer>
        <LinksContainer>
          <Li><StyledLink to='/profile'>Личный кабинет</StyledLink></Li>
          <Li><StyledLink to='/achieves'>Достижения</StyledLink></Li>
          {/* <Li><StyledLink to='/all-projects'>Проекты</StyledLink></Li> */}
          <Li><StyledLink to='/projects'>Мои проекты</StyledLink></Li>
          {/* <Li><StyledLink to='/projects-window'>/ Витрина проектов</StyledLink></Li> */}
          <Li><StyledLink to='/settings'>Настройки</StyledLink></Li>
        </LinksContainer>
        <LinksContainer>
          <Li>Витрина</Li>
          <Li><StyledLinkMedium to='/projects-window'>Витрина проектов</StyledLinkMedium></Li>
          <Li><StyledLinkMedium to='/team-window'>Витрина специалистов</StyledLinkMedium></Li>
        </LinksContainer>
        <LinksContainer>
          <Li>Отклики</Li>
          <Li><StyledLinkMedium to='/responses-experts'>Отклики специалистов</StyledLinkMedium></Li>
          <Li><StyledLinkMedium to='/responses-projects'>Отклики проектов</StyledLinkMedium></Li>
          <Li><StyledLinkMedium to='/my-responses'>Мои отклики</StyledLinkMedium></Li>

        </LinksContainer>

      </FooterContainer>
      {/* <ThemeSwitcher /> */}
    </Footer>
  );
};

export default FooterElement;
