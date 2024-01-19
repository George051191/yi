/* eslint-disable ternary/no-dupe */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, {
  FC, useRef, memo,
} from 'react';
import styled from 'styled-components';
import {
  Input, Label, Container, Error,
} from './InputComponent';
import { TBigTextField } from '../types/componentsTypes';
import { setPrompText } from '../helpers/promts';

const StyledLabel = styled(Label)`
  flex-direction : column ;
  align-items: baseline;
  margin-bottom: 0px;
`;

export const TextArea = styled.textarea`
        border: none;
        color:${({ theme: { mainTextColor } }) => mainTextColor};
        display: block;
        font-family: 'TTTravels';
        font-size: 20px;
        font-weight: 500;
        line-height: 50px;
        background-attachment: local;
        resize: none;
        height: 100px;
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

const Promt = styled.div`
  width: 94%;
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
const CustomError = styled(Error) <{ margin: boolean }>`
  margin-top:${({ margin }) => (margin ? '40px' : '0px')};
`;

const BigTextField: FC<TBigTextField> = ({
  name,
  label,
  onChange,
  value,
  marginTop,
  length,
  disabled = false,
  error,
  specGap = false,
  isSubmited = false,
  idx,
  forProfile = false,
  onChangeForProfile,
}) => (
  <Container style={{ marginTop }}>
    <StyledLabel htmlFor={name}>
      {label}
    </StyledLabel>
    {forProfile ? <TextArea id={name} disabled={disabled} value={value} rows={29} maxLength={length} name={name} onChange={(e) => onChangeForProfile && onChangeForProfile(e)} />
      : <TextArea id={name} disabled={disabled} value={value} rows={29} maxLength={length} name={name} onChange={(e) => onChange && onChange(e.target.value, e.target.name, idx)} />}
    {!value && (
      <Promt>
        {!disabled && setPrompText(label)}
      </Promt>
    )}
    {error && isSubmited && <CustomError margin={specGap}>{error}</CustomError>}
  </Container>
);

export default memo(BigTextField);
