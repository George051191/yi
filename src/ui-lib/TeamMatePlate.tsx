/* eslint-disable react/require-default-props */
import React, {
  FC, memo, useEffect, useState,
} from 'react';
import styled from 'styled-components';
import BigTextField from './BigTextField';
import {
  QuestionIcon, RubIcon, CheckDoneIcon, CheckIputIcon, AddIcon, CrossIcon, ArrowIcon,
} from './icons';
import PromptHidden from './HiddenPrompt';
import { professions } from '../constants/textsForLanding';
import SelectWithPlural from './SelectWithPlural';

const Plate = styled.li<{ isSmall: boolean }>`
    width:${({ isSmall }) => (isSmall ? '366px' : '502px')};
    height: ${({ isSmall }) => (isSmall ? '304px' : '369px')};
    border-radius: 38px;
    border: ${({ theme: { mainButtonColor } }) => `1px solid ${mainButtonColor}`};
    display: flex;
    flex-direction: column;
    gap: 32px;
    position: relative;
    padding-bottom: ${({ isSmall }) => (isSmall ? '5px' : 'none')};
`;

const HeaderDiv = styled.div<{ isSmall: boolean }>`
    border-radius: 71.5px;
    outline: ${({ theme: { mainButtonColor } }) => `1px solid ${mainButtonColor}`};
    position: relative;
    align-items: center;
    justify-content: end;
    background: rgb(241, 244, 255);
    width: ${({ isSmall }) => (isSmall ? '99%' : '100%')};
    height: 74px;
    transform: ${({ isSmall }) => (isSmall ? 'translate(2px, 0px)' : 'translate(0px,0px)')};
    justify-content: end;
    display: flex;
`;

const ColouredDiv = styled.div<{ width: number, isSmall: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    padding: ${({ isSmall }) => (isSmall ? '21px 44px' : '28px 44px')} ;
    border-radius: 71.5px;
    border: ${({ theme: { mainButtonColor } }) => `1px solid ${mainButtonColor}`};
    background: ${({ theme: { mainButtonColor } }) => mainButtonColor};
    color:${({ theme: { mainBg } }) => mainBg};
    font-family: 'TTTravels';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 80%; /* 20px */
    letter-spacing: -0.625px;
    cursor: pointer;
    text-align: center;
    width: ${({ width }) => width}px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    & path {
      stroke: ${({ theme: { mainBg } }) => mainBg};
    }
`;

const Span = styled.span<{ isSmall: boolean }>`
    color:${({ theme: { mainTextColor } }) => mainTextColor};
    font-family: 'TTTravels';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 80%; /* 20px */
    letter-spacing: -0.625px;
    margin-right: ${({ isSmall }) => (isSmall ? 'none' : '66px')};
    cursor: pointer;
    width:${({ isSmall }) => (isSmall ? '141px' : 'auto')};
`;

const Div = styled.div`
    width: 100%;
    padding-left: 28px;
    padding-right: 41px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
`;
export const RoundDiv = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: ${({ theme: { mainButtonColor } }) => `1px solid ${mainButtonColor}`};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const Checkbox = styled.input`
  position: absolute;
   z-index: -1;
   opacity: 0; 
   width: 24px;
    height: 24px;
`;
const Wrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Label = styled.label`
    position: relative;
    width: 24px;
    height: 24px;
    display: inline;
    cursor: pointer;
    padding-inline: 0 !important;
`;

const Datalist = styled.ul<{ isOpen: boolean }>`
    border-radius: 50px;
    background: rgba(241, 244, 255, 0.60);
    backdrop-filter: blur(4px);
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    gap: 15px;
    position: absolute;
    top: 86px;
    padding: 5px;
    z-index: 99999;
    list-style: none;
    margin: 0;
    padding: 0;
`;

const DataListForSpec = styled.div<{ isOpen: boolean }>`
    border-radius: 50px;
    background: rgba(241, 244, 255, 0.60);
    backdrop-filter: blur(4px);
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    gap: 15px;
    position: absolute;
    top: 84px;
    left: 13px;
    padding: 5px;
    z-index: 99999;
    list-style: none;
    margin: 0;
    padding: 0;
    & ul {
      height: 300px;
      overflow-y: scroll;
    }
`;

const Option = styled.li`
    color: ${({ theme: { mainTextColor } }) => mainTextColor};
    font-family: 'TTTravels';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    cursor: pointer;
    &:focus {
        color: ${({ theme: { mainButtonColor } }) => mainButtonColor};
        font-style: 500;
    }
`;

const TextareaWrapper = styled.div`
  padding-inline: 28px;
  box-sizing: border-box;
`;

const TeamMatePlate: FC<{
  callback1?: (key: string, name?: string, smt?: number) => void,
  callback2?: (index: number, item: boolean) => void,
  callback3?: (index: number, item: string) => void,
  callback4?: (item: string, key1?: any, key2?: any, index?: number) => void,
  deleteItem?: () => void;
  withCross?: boolean;
  value1: string,
  value2: boolean,
  value3: string,
  spec: string,
  index: number,
  disabled?: boolean
  isSubmited?: boolean;
  isSmall?: boolean,
  width: number,
}> = ({
  value1, value2, callback1, callback2, value3, callback3, callback4, index, disabled = false, deleteItem, withCross = false, isSmall = false, isSubmited = false, spec, width,
}) => {
  const [isOpen, open] = useState(false);
  const [isSpecOpen, openSpec] = useState(false);
  const [isHiddenMoneyOpen, openHiddenMoney] = useState(false);
  /*  useEffect(() => {
    if (value1 === '' || value3 === '' || spec === '') {
      setErrors('Заполните задачу и выбирете специалиста и уровень');
    } else if (value1?.length <= 10) {
      setErrors('Задача должна содержать от 10 символов');
    } else { setErrors(''); }
  }, [value1, value3]); */
  const open1 = () => {
    openSpec(!isSpecOpen);
    open(false);
  };
  const open2 = () => {
    open(!isOpen);
    openSpec(false);
  };
  return (
    <Plate isSmall={isSmall}>
      {isSpecOpen && (
      <DataListForSpec isOpen={isSpecOpen}>
        <SelectWithPlural
          indexOfPlate={index}
          withOnlyFilter
          withValueField={false}
          arr={professions}
          name='profession'
          label=''
          value={spec}
          idx={0}
          getValue={callback4}
          isOpen={isSpecOpen} />
      </DataListForSpec>
      )}
      {isHiddenMoneyOpen
          && (
            <PromptHidden
              width='260px'
              top={92}
              left={135}
              text='Если ты готов оплачивать работу специалиста, нажми на галочку' />
          )}
      {withCross && <CrossIcon onClick={deleteItem} style={{ position: 'absolute', top: '26px', right: '-25px' }} />}
      <HeaderDiv isSmall={isSmall}>
        <ColouredDiv isSmall={isSmall} width={width} onClick={() => !disabled && open1()}>
          {spec || 'Специалист'}
          {withCross && <ArrowIcon style={{ position: 'absolute', top: '34px', right: '21px' }} isOpen={isSpecOpen} onClick={() => !disabled && open1()} />}
        </ColouredDiv>
        <Span isSmall={isSmall} onClick={() => !disabled && open2()}>
          {value3 || 'Уровень'}
          {withCross && <ArrowIcon style={{ position: 'absolute', top: '34px', right: '21px' }} isOpen={isOpen} onClick={() => !disabled && open2()} />}
          <Datalist isOpen={isOpen}>
            {['Начальный', 'Средний', 'Продвинутый'].map((el) => (
              <Option onClick={() => { callback3 && callback3(index, el); }}>{el}</Option>
            ))}
          </Datalist>
        </Span>
      </HeaderDiv>
      <Div>
        <Wrapper>
          <Checkbox onChange={(e) => callback2 && callback2(index, e.target.checked)} type='checkbox' id={`check${index}`} />
          <Label style={{ paddingInline: '0 !important' }} htmlFor={`check${index}`}>
            <CheckIputIcon />
            {value2 && <CheckDoneIcon />}
            {' '}

          </Label>
          <RoundDiv
            style={{ cursor: 'help' }}
            onMouseLeave={() => openHiddenMoney(false)}
            onMouseOver={() => openHiddenMoney(true)}
            onClick={() => callback2 && callback2(index, !value2)}>
            <RubIcon />
          </RoundDiv>
        </Wrapper>
      </Div>
      <TextareaWrapper>
        <BigTextField
          isSubmited={isSubmited}
          /* error={levelAndTaskError} */
          length={10000}
          value={value1 || ''}
          name='special'
          label='Задача'
          disabled={disabled}
          idx={index}
          onChange={callback1} />
      </TextareaWrapper>
    </Plate>
  );
};

export default memo(TeamMatePlate);
