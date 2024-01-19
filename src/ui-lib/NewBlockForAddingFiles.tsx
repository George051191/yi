/* eslint-disable import/prefer-default-export */
import React, { ChangeEvent, FC } from 'react';
import styled, { useTheme } from 'styled-components';
import { TravelsFontMixixn20 } from '../constants/fontsConfigs';

const LinkForFileLoad = styled.a`
    color: ${({ theme: { mainTextColor } }) => mainTextColor};
    ${TravelsFontMixixn20}
    text-decoration: none;
`;

const Container = styled.div`
  gap: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items:start;
`;

const FileInput = styled.input`
    position: absolute;
    z-index: -100;

`;

const Label = styled.label`
    position: relative;
    width: 100%;
    max-width: 390px;
    padding: 20px 44px;
    justify-content: center;
    box-sizing: border-box;
    align-items: center;
    cursor: pointer;
    background-color: ${({ theme: { mainButtonColor } }) => mainButtonColor};
    color: ${({ theme: { mainBg } }) => mainBg};    
    ${TravelsFontMixixn20}
    border-radius: 36px;
    &:hover {
        box-shadow: ${({ theme: { mainButtonColor } }) => `0px 0px 20px 0px ${mainButtonColor}`};
    }
`;

const P = styled.p`
  color: ${({ theme: { mainTextColor } }) => mainTextColor};
  ${TravelsFontMixixn20}
`;

const Span = styled.span`
  color: ${({ theme: { placeholderColor } }) => placeholderColor};
  ${TravelsFontMixixn20}
`;

const BlockForFileAdd: FC<{
  headerText: string,
  fileName: string,
  file: string,
  textStub: string,
  buttonText: string,
  setFileToState: (e: ChangeEvent<HTMLInputElement>, index:number) => void,
  inputName: string,
  currentIndex: number,
}> = ({
  headerText,
  fileName,
  file,
  textStub,
  buttonText,
  setFileToState,
  inputName,
  currentIndex,
}) => (
  <Container>
    <P>
      {headerText}
    </P>
    {fileName
      ? <LinkForFileLoad download href={file}>{fileName}</LinkForFileLoad>
      : <Span>{textStub}</Span>}
    <Label htmlFor={`${inputName}${currentIndex}`}>
      {buttonText}
      <FileInput
        type='file'
        id={`${inputName}${currentIndex}`}
        name={inputName}
        onChange={(e) => { e.preventDefault(); setFileToState(e, currentIndex); }} />
    </Label>
  </Container>
);
export default BlockForFileAdd;
