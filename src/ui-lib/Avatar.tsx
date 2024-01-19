/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { FC } from 'react';
import styled from 'styled-components';
import avatr from '../assets/avatarDefault.png';
import { TAvatar } from '../types/componentsTypes';
import { AddIcon } from './icons';

export const AvatarImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0px;
    left: 0px;
`;
const Div = styled.div`
  position: relative;
`;

export const AvatarWrapper = styled.div`
    width: 250px;
    height: 250px;
    overflow: hidden;
    border-radius: 50%;
    border:${({ theme: { mainTextColor } }) => `1px solid ${mainTextColor}`} ;
    position: relative;
`;

export const FileInput = styled.input`
  position: absolute;
  z-index: -10;

`;
const Label = styled.label`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: ${({ theme: { mainTextColor } }) => `1px solid ${mainTextColor}`};
  background-color: ${({ theme: { mainBg } }) => mainBg}; ;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  right: 27px;
`;

const Avatar: FC<TAvatar> = ({ setAvatar, userAvatar, forProfile = true }) => (
  <Div>
    <AvatarWrapper>
      <AvatarImage src={userAvatar || avatr} />

    </AvatarWrapper>
    {forProfile && (
      <>
        <Label htmlFor='file'><AddIcon /></Label>
        <FileInput onChange={(e) => { setAvatar(e.target.files![0]); }} type='file' id='file' name='file' />
      </>
    )}
  </Div>
);

export default Avatar;
