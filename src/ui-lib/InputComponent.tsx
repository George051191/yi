/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable consistent-return */
import React, {
  memo, ChangeEvent, FC, useState, useCallback,
} from 'react';
import styled, { useTheme } from 'styled-components';
import { TInputComponent } from '../types/componentsTypes';
import {
  ArrowIcon, VkIcon, OkIcon, TgIcon, CrossIcon,
} from './icons';
import { Errors } from '../helpers/validation';
import { setPrompText } from '../helpers/promts';

export const Container = styled.div<{ marginTop?: number, isForIcon?: boolean }>`
    display: flex;
    flex-direction: column;
    width: ${({ isForIcon }) => (isForIcon ? '80%' : '100%')};
    margin-top: ${({ marginTop }) => marginTop}px;
    position: relative;
`;

export const Label = styled.label`
    color: ${({ theme: { mainTextColor } }) => mainTextColor};
    font-family: 'TTTravels';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    cursor: pointer;
     @media screen and (max-width:560px) {
      font-size: 20px;
    } 
`;

export const Input = styled.input`
    border: none;
    outline: none;
    border-bottom: ${({ theme: { borderColor } }) => `1px solid ${borderColor}`};
    color: ${({ theme: { mainTextColor } }) => mainTextColor};
    font-family: 'TTTravels';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 10px;
    background: inherit;
    text-overflow: ellipsis;
    z-index:2;
    &:focus+div {
      display: none;
    }
`;

export const Error = styled.span`
    color: red;
    font-family: 'TTTravels';
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

const SocialLink = styled.a`
  margin: 0;
  text-decoration: none;
  display: block;
  width: 32px;
  height: 45px;
  position: absolute;
  top: 11px;
  left: -38px;
  cursor:pointer;
`;

export const Promt = styled.div`
  width: 76%;
  background-color: transparent;
  color: #BBAEAF;
  font-family: 'BlueCurve';
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  position: absolute;
  top: 51px;
  left: 0;
  z-index: 1;
`;

const InputComponent: FC<TInputComponent> = ({
  onChange,
  label,
  errorMessage,
  withArrow,
  isOpen,
  open,
  name,
  type,
  isSubmited,
  disabled = false,
  marginTop,
  value,
  inputValue,
  length,
  forHash,
  addHash,
  withCross = false,
  toShowCross = false,
  deleteFunc,
  idx,
  withInput = true,
  changeForEdu,
}) => {
  const [isShownIcon, showIcon] = useState<boolean>(false);
  const setNetworkIcon = (network: string) => {
    if (network.match(/^https:\/\/vk\.com/)) {
      return <SocialLink href='' target='_blank' rel='noopener noreferrer'><VkIcon /></SocialLink>;
    }
    if (network.match(/^https:\/\/ok\.ru/)) {
      return <SocialLink href={network} target='_blank' rel='noopener noreferrer'><OkIcon /></SocialLink>;
    }
    if (network.match(/^https:\/\/t\.me/)) {
      return <SocialLink href={network} target='_blank' rel='noopener noreferrer'><TgIcon /></SocialLink>;
    }
  };
  return (
    <Container isForIcon={name === 'socialNetworks' && !!setNetworkIcon(inputValue as string)} marginTop={marginTop} onClick={(e: any) => { e.stopPropagation(); typeof open === 'function' && open(!isOpen); }}>
      {withCross && toShowCross && <CrossIcon onClick={deleteFunc} style={{ position: 'absolute', top: '19px', right: '-32px' }} />}
      <Label htmlFor={label}>
        {label}
        {withArrow && <ArrowIcon isOpen={isOpen} />}
      </Label>
      {name === 'socialNetworks' && setNetworkIcon(inputValue as string)}
      {withInput && (
        <Input
          maxLength={length}
          disabled={disabled}
          type={type}
          name={name}
          value={inputValue}
          onChange={(e) => { onChange && onChange(e, idx); changeForEdu && changeForEdu(true); }}
          id={label}
          autoComplete='off' />
      )}
      {!inputValue && <Promt>{!disabled && setPrompText(label!)}</Promt>}
      {forHash && <Error onClick={addHash} style={{ cursor: 'pointer', color: '#1D44D0' }}>Добавить</Error>}
      {name !== 'socialNetworks' && errorMessage && isSubmited && <Error>{errorMessage}</Error>}
      {name === 'socialNetworks' && !inputValue?.match(/https:\/\/.+?\..+?/) && isSubmited && inputValue !== '' && <Error>{Errors.SOCIAL_ERROR}</Error>}
    </Container>
  );
};

export default memo(InputComponent);
