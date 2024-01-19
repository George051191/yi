import React, { ChangeEvent, FC } from 'react';
import styled from 'styled-components';
import { CrossIcon } from '../icons';
import { TravelsFontMixixn20 } from '../../constants/fontsConfigs';

const AvatarBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 34px;
  position: relative;
`;

const ImageBox = styled.div`
    border-radius: 50%;
    border: ${({ theme: { mainTextColor } }) => `${mainTextColor} 1px solid`};
    width: 181px;
    height: 181px;
    overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const FileInput = styled.input`
  position: absolute;
  z-index: -10;

`;

const AddButtonCircle = styled.label`
  border-radius: 50px;
  border: ${({ theme: { mainTextColor } }) => `${mainTextColor} 1px solid`};
  background-color: ${({ theme: { mainBg } }) => mainBg};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  bottom: 60px;
  width: 36px;
  height: 36px;
  right: 16px;
`;

const P = styled.p`
  margin: 0;
  color: #9D9797;
  ${TravelsFontMixixn20}
`;

const NewAvatar: FC<{
  image: string;
  placeholder: string;
  setImageFile: (e: ChangeEvent<HTMLInputElement>) => void,
}> = ({
  image,
  placeholder,
  setImageFile,
}) => (
  <AvatarBox>
    <AddButtonCircle>
      <FileInput type='file' id='ava' name='ava' onChange={(e) => setImageFile(e)} />
      <CrossIcon style={{ transform: 'rotate(224deg)' }} />
    </AddButtonCircle>
    <ImageBox>
      <Image src={image} alt='чувак тут реально картинка' />

    </ImageBox>
    <P>{placeholder}</P>
  </AvatarBox>
);

export default NewAvatar;
