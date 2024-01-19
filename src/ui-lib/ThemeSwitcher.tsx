import React, { FC } from 'react';
import styled from 'styled-components';
import { SunIcon, MoonIcon } from './icons';
import { useDispatch, useSelector } from '../store/store.types';
import { setTheme } from '../store/allSlice';

const Label = styled.label`
    position: relative;
    width: 50px;
    height: 30px;
    background-color: #F3A03B;
    border-radius: 15.5px;
    display: flex;
    align-items: center;
    @media screen and (max-width:1000px) {
      width: 37px;
      height: 17px;
    }
`;

const Input = styled.input`
  position:absolute;
  z-index: -999999;
  opacity: 0;
  &:checked+span {
    transform: translateX(25px);
  }
`;

const Span = styled.span`
    border-radius: 50% ;
    background-color:  ${({ theme: { mainButtonColor } }) => mainButtonColor}; ;
    width: 20px;
    height: 20px;
    transition: all ease .4s;
    @media screen and (max-width:1000px) {
      width: 10px;
      height: 10px;
    }
`;

const Wrapper = styled.div`
  width: 132px;
  display: flex;
  gap: 12px;
  position: absolute;
  bottom: 10px;
  right: 106px;
  @media screen and (max-width: 1000px) {
    align-items: center;
    left: 33px;
  }
`;

const ThemeSwitcher: FC = () => {
  const dispatch = useDispatch();
  const changeThemeWithKey = (key: 'light' | 'dark') => {
    localStorage.setItem('theme', `${key}`);
    dispatch(setTheme(key));
  };
  return (
    <Wrapper>
      <SunIcon onClick={() => changeThemeWithKey('light')} />
      <Label htmlFor='switcher'>
        <Input checked={localStorage.getItem('theme') === 'dark'} type='checkbox' id='switcher' />
        <Span />
      </Label>
      <MoonIcon onClick={() => changeThemeWithKey('dark')} />
    </Wrapper>
  );
};

export default ThemeSwitcher;
