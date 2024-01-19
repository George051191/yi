/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import pavuk from '../../assets/pavuk.png';
import {
  ArrowIcon,
  HeaderCloseIcon,
  AttentionIcon,
  SettingIcon,
} from '../icons';
import { useSelector } from '../../store/store.types';
import Popup, { PopupWithCustomRoutes } from '../Popup';
import burger from '../../assets/burger.svg';
import Breadcrumbs from './BreadCrumbs';
import { LogoLink } from '../../pages/Login';
import { TravelsFontMixixn20 } from '../../constants/fontsConfigs';

const Logo = styled.img`
    width: 152px;
    height: 60px;
    cursor: pointer;
    object-fit: cover;
    align-self: baseline;
    cursor: pointer;
`;

const Header = styled.header<{ widthPadding: boolean, isColourChange: boolean, isHidden:boolean }>`
    background-color: ${({ theme: { mainBg, subMainBg, modalOverlay }, isColourChange }) => (isColourChange ? subMainBg : mainBg)};
    width: 100%;
    display: ${({ isHidden }) => (isHidden ? 'none' : 'block')};
`;
const BurgerImage = styled.img`
  width: 24px;
  height: 24px;
`;

const BurgerWrapper = styled.div<{ isClicked: boolean }>`
  width: 24px;
  height: 24px;
  transform: ${({ isClicked }) => (isClicked ? 'rotate(90deg)' : 'none')};
  transition: all ease .5s;
  display: none;
  cursor: pointer;
  @media screen and (max-width: 950px) {
    display: flex;
  }
`;

const HeaderContainer = styled.nav`
    max-width: 1728px;
    width: 100%;
    display: flex;
    margin: 0px auto;
    
    justify-content: space-between;
    padding-inline: 40px;
    box-sizing: border-box;
    z-index: 50000;
    gap: 15px;
    height: 85px;
    @media screen and (max-width: 700px) {
      padding-inline: 10px;
    }
`;

const NavList = styled.ul`
    display: flex;
    gap: 54px;
    list-style: none;
    padding: 0px;
    margin: 0px;
    justify-content: center;
    z-index: 5000;
    align-self: center;
    @media screen and (max-width: 1100px) {
      gap: 10px;
    }
`;

const NavItem = styled.li<{ isStyled?: boolean }>`
    color:  ${({ theme: { mainTextColor } }) => mainTextColor};
    ${TravelsFontMixixn20}
    position: relative;
    display: flex;
    gap: 8px;
    cursor: pointer;
    align-items: baseline;
    text-decoration-line: ${({ isStyled }) => (isStyled ? 'underline' : 'none')};
    &:hover {
      span {
        width: 100%;
      }
    }
    @media screen and (max-width: 950px) {
      font-size: 14px;
      display: none;
    }
   
`;
const StyledLink = styled(Link)`
    color:  ${({ theme: { mainTextColor } }) => mainTextColor};
    ${TravelsFontMixixn20}
    text-decoration: none;
    @media screen and (max-width: 950px) {
      display: none;
    }
`;
const FakeLink = styled.p`
    color:  ${({ theme: { mainTextColor } }) => mainTextColor};
    ${TravelsFontMixixn20}
    text-decoration: none;
    margin: 0;
    @media screen and (max-width: 950px) {
      display: none;
    }
`;

const Span = styled.span<{ isCurrent: boolean }>`
  height: 1px;
  background-color: ${({ theme: { mainButtonColor } }) => mainButtonColor} ;
  width:${({ isCurrent }) => (isCurrent ? '100%' : '0%')};
  transition: all ease .3s;
`;

const UserInfo = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
`;

const SmallAvatar = styled(Link)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;
  display: block;
`;

const Avatar = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const HeaderElement: FC<{
  isColourChange: boolean,
  userAvatar: string,
}> = ({
  isColourChange,
  userAvatar,
}) => {
  const [vitrinaIsOpen, openVitrina] = useState(false);
  const [specisOpen, openSpec] = useState(false);
  const [isClicked, click] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isFullFilled } = useSelector((state) => state.all);
  if (location.pathname === '/registration' || location.pathname === '/login') {
    return null;
  }

  const routeArr1 = [
    { name: 'Витрина проектов', path: '/all-projects' },
    { name: 'Витрина специалистов', path: '/team-window/team-list' },
    { name: 'Настройки', path: '/settings' },
  ];

  const routeArr2 = [
    { name: 'Отклики проектов', path: '/responses-projects' },
    { name: 'Отклики специалистов', path: '/responses-experts' },
    { name: 'Мои отклики', path: '/my-responses' },
  ];

  return (
    <Header
      isHidden={location.pathname === '/create-spec'}
      isColourChange={isColourChange}
      widthPadding={isFullFilled || location.pathname === '/'}>
      <HeaderContainer>
        <LogoLink to='/'>
          <Logo
            src={pavuk}
            alt='logo' />
        </LogoLink>
        <NavList>
          <NavItem style={{ flexDirection: 'column', gap: '3px' }}>
            <StyledLink to='/achieves'>Достижения</StyledLink>
            <Span isCurrent={location.pathname === '/achieves'} />
          </NavItem>
          <NavItem style={{ flexDirection: 'column', gap: '3px' }}>
            <StyledLink to='/projects'>Мои проекты</StyledLink>
            <Span isCurrent={location.pathname === '/projects'} />
          </NavItem>

          <NavItem id='link' onClick={() => { openVitrina(!vitrinaIsOpen); openSpec(false); }}>
            <FakeLink id='link'>Витрина</FakeLink>
            <ArrowIcon
              style={{ alignSelf: 'center' }}
              id='link'
              isOpen={vitrinaIsOpen} />
            <Transition in={vitrinaIsOpen} timeout={300}>
              {(state: any) => (<PopupWithCustomRoutes arr={routeArr1} open={openVitrina} isVisible={state} />)}
            </Transition>
          </NavItem>
          <NavItem id='link' onClick={() => { openSpec(!specisOpen); openVitrina(false); }}>
            <FakeLink id='link'>Отклики</FakeLink>
            <ArrowIcon
              style={{ alignSelf: 'center' }}
              id='link'
              isOpen={specisOpen} />
            <Transition in={specisOpen} timeout={300}>
              {(state) => (<PopupWithCustomRoutes arr={routeArr2} open={openSpec} isVisible={state} />)}
            </Transition>
          </NavItem>

        </NavList>
        <UserInfo>
          <LogoLink to='/'>
            <AttentionIcon />
          </LogoLink>
          <LogoLink to='/settings'>
            <SettingIcon />
          </LogoLink>

          <SmallAvatar to='/profile-info'>
            <Avatar src={userAvatar} alt='чувак здесь твое фото' />
          </SmallAvatar>
        </UserInfo>
        <BurgerWrapper id='link' isClicked={isClicked} onClick={() => click(!isClicked)}>
          <BurgerImage id='link' src={burger} />

        </BurgerWrapper>
      </HeaderContainer>
    </Header>
  );
};

export default HeaderElement;
