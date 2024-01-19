/* eslint-disable ternary/no-dupe */
/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
/* eslint-disable react/require-default-props */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, memo, useState } from 'react';
import {
  FieldValues, UseFormRegister,
} from 'react-hook-form';
import styled from 'styled-components';
import {
  HideIcon, ShowIcon,
} from './icons';

export const Container = styled.div<{ marginTop?: number }>`
    display: flex;
    flex-direction: column;
    width: 100%;
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
    position: relative;
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
`;

export const Error = styled.span`
    color: ${({ theme: { tomatoColor } }) => tomatoColor};
    font-family: 'TTTravels';
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

const IconsWrapper = styled.div`
  position: absolute;
  display: flex;
  top: 47px;
  right: 0;
  cursor: pointer;
  z-index: 9999999;
`;

export const DisabledInput: FC<{
  name: string,
  value: any,
}> = ({
  name,
  value,
}) => (
  <Container>
    <Label>{name}</Label>
    <Input disabled value={value} />
  </Container>
);

export const RegularInput: FC<{
  register: UseFormRegister<FieldValues>,
  name: string,
  label: string,
  options: { [key: string]: any },
  errorMessage: string,
  maxLength?: number,
  type: string,
  value?: string,
  placeholder?: string,
  disabled?: boolean,
}> = ({
  register, name, label, options, errorMessage, maxLength = 10000, type, value, placeholder = '', disabled = false,
}) => {
  const [inputType, changeType] = useState<string>('password');

  return (
    <Container>
      <Label htmlFor={name}>{label}</Label>
      {type === 'password'
        && (
          <IconsWrapper onClick={() => changeType((prevState) => (prevState === 'password' ? 'text' : 'password'))}>
            {inputType === 'password' ? <ShowIcon /> : <HideIcon />}

          </IconsWrapper>
        )}
      <Input disabled={disabled} placeholder={placeholder} type={type === 'password' ? inputType : type} maxLength={maxLength} id={name} {...register(name, options)} />
      {errorMessage && <Error>{errorMessage}</Error>}
    </Container>
  );
};
/// /////////////
const NameInputContainer = styled(Container)`
  width: auto;
  align-items: center;
`;
const NameInput = styled.input`
    width: 100% ;
    color:  ${({ theme: { mainTextColor } }) => mainTextColor};
    font-family: 'TTTravels';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    border: none;
    outline: none;
    background: transparent;
    ::placeholder {
      color:  ${({ theme: { mainTextColor } }) => mainTextColor};
    font-family: 'TTTravels';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    }
`;

export const InputWithNoLabel: FC<{
  register: UseFormRegister<FieldValues>,
  name: string,
  options: { [key: string]: any },
  errorMessage: string,
  maxLength: number,
  placeholder?: string,
}> = memo(({
  register, name, options, errorMessage, maxLength, placeholder = '',
}) => (
  <NameInputContainer>
    <NameInput placeholder={placeholder} id={name} maxLength={maxLength} {...register(name, options)} />
    {errorMessage && <Error>{errorMessage}</Error>}
  </NameInputContainer>
));

/// ////
const TextArea = styled.textarea<{ height: number }>`
        border: none;
        color:${({ theme: { mainTextColor } }) => mainTextColor};
        display: block;
        font-family: 'TTTravels';
        font-size: 20px;
        font-weight: 500;
        line-height: 50px;
        background-attachment: local;
        resize: none;
        height: ${({ height }) => height}px;
        background: transparent;
        width: 100%;
        background-image: -webkit-linear-gradient(top, transparent, transparent 49px, rgb(218, 218, 218) 0px), -webkit-radial-gradient(0% 46%, circle closest-corner, rgb(245, 245, 245), rgb(245, 245, 245) 0%, transparent 0%), -webkit-radial-gradient(0% -18%, circle closest-corner, rgb(204, 204, 204), rgb(204, 204, 204) 21.5%, transparent 0%);
        z-index: 2;
        -webkit-background-size:  100% 50px;
        background-size: 100% 50px;
        &:focus {
          border: none;
          outline: none;

        }
        &:focus+div {
          display: none;
        }
`;

export const RegularTextarea: FC<{
  register: UseFormRegister<FieldValues>,
  name: string,
  options: { [key: string]: any },
  errorMessage: string,
  label: string,
  height: number,
  disabled?: boolean,
}> = memo(({
  register,
  name,
  options,
  errorMessage,
  label,
  height,
  disabled = false,
}) => (
  <Container>
    <Label htmlFor={name}>{label}</Label>
    <TextArea disabled={disabled} height={height} id={name} {...register(name, options)} />
    {errorMessage && <Error>{errorMessage}</Error>}
  </Container>
));

export const DisabledTextArea: FC<{
  name: string,
  value: any,
}> = ({
  name,
  value,
}) => (
  <Container>
    <Label>{name}</Label>
    <TextArea disabled value={value} height={200} />

  </Container>
);
