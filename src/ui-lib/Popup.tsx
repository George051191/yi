/* eslint-disable react/no-array-index-key */
import React, {
  ChangeEvent, FC, ReactNode, useCallback, useEffect, useState,
} from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { navRoutes } from '../constants/routes';
import { TravelsFontMixixn20, TravelsFontMixixn24 } from '../constants/fontsConfigs';
import { BlueDeleteIcon } from './icons';
import NewSelectWithPlural from './widgets/NewSelectWithPlural';
import { InputWithTags, TextAreaWithNoValidation } from './FormElements';

import { openCreateProfessionPopup } from '../store/allSlice';
import { useDispatch } from '../store/store.types';

const PopupPlate = styled.ul<{ isVisible: any, forSmall: boolean }>`
    width: 264px;
    height: 167px;
    overflow: hidden;
    border-radius: 30px;
    border: ${({ theme: { mainButtonColor } }) => `1px solid ${mainButtonColor}`};
    display:  ${({ isVisible }) => (isVisible === 'exited' ? 'none' : 'flex')};
    flex-direction: column;
    list-style: none;
    padding: 0;
    position: absolute;
    visibility: ${({ isVisible }) => (isVisible === 'entered' ? 1 : 0)};
    opacity: ${({ isVisible }) => (isVisible === 'entered' ? 1 : 0)};
    top: 40px;
    left: -8px;
    z-index:100;
    background: rgb(255, 254, 250);
    transition: .3s;
    @media screen and (max-width: 930px) {
      right:20px;
      height: 240px;
      left:inherit;
      z-index:99999;
      display: ${({ forSmall }) => (forSmall ? 'flex' : 'none')};
    }
`;

const PopupItem = styled.li<{ index: boolean }>`
    flex-basis: 33%;
    border-bottom:${({ index }) => (index ? '1px solid rgb(29, 68, 208)' : 'none')} ; 
    display: flex;
    -webkit-box-align: start;
    align-items: center;
    -webkit-box-pack: center;
    border-left: none;
    border-right: none;
    padding-left: 12px;
    color: ${({ theme: { mainTextColor } }) => mainTextColor};
    ${TravelsFontMixixn20}
    &:hover {
      color: ${({ theme: { mainBg } }) => mainBg};
      background-color: ${({ theme: { mainButtonColor } }) => mainButtonColor};
    }

`;

const PopupItemCustom = styled(PopupItem)`
  display: none;
  @media screen and (max-width:930px) {
    display: flex;

  }
`;
export const PopupWithCustomRoutes: FC<{
  isVisible: any,
  open: React.Dispatch<React.SetStateAction<boolean>>,
  arr: { path: string, name: string }[],
}> = ({
  isVisible,
  open,
  arr,
}) => {
  const navigate = useNavigate();
  const closeByClickOverlay = (e: any) => {
    e.target.id !== 'link' && open(false);
  };
  useEffect(() => {
    document.addEventListener('click', closeByClickOverlay);
    return () => {
      document.removeEventListener('click', closeByClickOverlay);
    };
  }, []);
  return (
    <PopupPlate forSmall={false} isVisible={isVisible}>
      {
          (arr || []).map((el, index) => (
            <PopupItemCustom style={{ display: 'flex' }} index={index !== 2} onClick={() => navigate(el.path)}>{el.name}</PopupItemCustom>
          ))
        }
    </PopupPlate>
  );
};

const Plate = styled.form`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  max-width: 1370px;
  height: 100%;
  overflow-y: auto;
  width: 100%;
  position: relative;
  border-radius: 20px;
  border:${({ theme: { mainButtonColor } }) => `0.734px solid ${mainButtonColor}`};
  background: ${({ theme: { mainBg } }) => mainBg};
`;

export const UniversalPopupPlateWithCross: FC<{ close: any, children: ReactNode }> = ({ close, children }) => {
  const dispatch = useDispatch();
  return (
    <Plate>
      <BlueDeleteIcon onClick={close} style={{ top: '10px', right: '10px' }} />
      {children}
    </Plate>
  );
};

const Popup: FC<{ isVisible: boolean, open: React.Dispatch<React.SetStateAction<boolean>>, forSmall: boolean }> = ({ isVisible, open, forSmall }) => {
  const navigate = useNavigate();
  const closeByClickOverlay = (e: any) => {
    e.target.id !== 'link' && open(false);
  };
  useEffect(() => {
    document.addEventListener('click', closeByClickOverlay);
    return () => {
      document.removeEventListener('click', closeByClickOverlay);
    };
  }, []);
  return (
    <PopupPlate forSmall={forSmall} isVisible={isVisible}>
      <PopupItemCustom index onClick={() => navigate('/profile')}>Личный кабинет</PopupItemCustom>
      <PopupItemCustom index onClick={() => navigate('/settings')}>Настройки</PopupItemCustom>
      <PopupItemCustom index onClick={() => navigate('/achieves')}>Достижения</PopupItemCustom>
      {navRoutes.map((el, index) => (
        <PopupItem key={index} index={index === 1 || index === 2 || index === 0} onClick={() => navigate(el.path)}>{el.name}</PopupItem>
      ))}

    </PopupPlate>
  );
};

export default Popup;
