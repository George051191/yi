/* eslint-disable ternary/no-dupe */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/no-array-index-key */
import React, { FC, memo, useState } from 'react';
import styled from 'styled-components';
import { ArrowIcon, CheckDoneIcon, CheckIputIcon } from './icons';
import { Input, Promt, Error } from './InputComponent';
import { setPrompText } from '../helpers/promts';

const DirectionsList = styled.ul<{ positioned: boolean }>`
    list-style: none;
    padding: 0;
    margin: 0;
    max-width: 560px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    border-radius: 50px;
    border: ${({ positioned, theme: { mainButtonColor } }) => (positioned ? `1px solid ${mainButtonColor}` : 'none')};
    background:${({ positioned }) => (positioned ? 'rgba(241, 244, 255, 1)' : 'transparent')};  
    position:${({ positioned }) => (positioned ? 'absolute' : 'relative')};
    top:${({ positioned }) => (positioned ? '38px' : '0')}; 
    left: -19px;
    padding: 34px;
    z-index: 99999;
`;

const PluralDirectionsList = styled(DirectionsList)`
   position: relative;
   top: 0px;
   padding: 0  0 0 74px;
   background: transparent;
   border: none;
   gap: 14px;
   right: 0px;
   height: 200px;
   overflow-y: scroll;
`;
export const Li = styled.li`
    display: flex;
    gap: 17px;
    width: 100%;
    flex-direction: column;
    cursor: pointer;
    position: relative;
   
`;

const PluralLi = styled(Li)`
   flex-direction: row;
   align-items: center;
`;

const Div = styled.div<{ height: string }>`
    width: 100%;
    height:${({ height }) => height};
    position: relative;
    display: flex;
    flex-direction: column;
`;

const InputName = styled.label`
    color: ${({ theme: { mainTextColor } }) => mainTextColor};
    font-family: 'TTTravels';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const P = styled.p`
    color: ${({ theme: { mainTextColor } }) => mainTextColor};
    font-family: 'TTTravels';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin: 0;
    flex: auto;
`;

export const Wrapper = styled.div`
  display:flex;
  gap: 17px;
  align-items: center;
`;

export const Label = styled.label`
    display: flex;
    gap: 17px;
    position: relative;
    align-items: center;
    cursor: pointer;
`;
export const Icon = styled(CheckDoneIcon) <{ isShown: boolean }>`
    display: ${({ isShown }) => (isShown ? 'block' : 'none')};

`;
export const Checkbox = styled.input`
  position: absolute;
   z-index: -1;
   opacity: 0; 
   width: 24px;
    height: 24px;
   
`;

export const IconWrapper = styled.div`
  position: relative;
  width:24px;
  height:24px;
`;

export const Direction: FC<{
  open: any,
  isOpen: boolean,
  indexOfPlate?: number,
  arr: any,
  name: string,
  onClick: (key: string, key1?: string, key2?: any, key3?: any) => void,
  value: string | string[],
  positioned: boolean;
}> = ({
  arr,
  name,
  onClick,
  open,
  isOpen,
  value,
  positioned,
  indexOfPlate,
}) => {
  const [isIconShown, showIcon] = useState(-1);
  return (

    <Li>
      <Wrapper>
        <ArrowIcon onClick={() => { open(); }} style={{ flexShrink: '0' }} isOpen={isOpen} />
        <IconWrapper onClick={() => { onClick(name, undefined, arr, indexOfPlate); showIcon(-1); }}>
          {positioned && <Icon isShown={value === name} />}
          {!positioned && <Icon isShown={value.indexOf(name) > -1} />}
          <CheckIputIcon style={{ flexShrink: '0' }} />
        </IconWrapper>
        <P onClick={() => { onClick(name, undefined, arr, indexOfPlate); showIcon(-1); }}>{name}</P>
      </Wrapper>
      {isOpen
          && (
            <PluralDirectionsList
              positioned={positioned}>
              {arr.map((el: any, index: number) => (
                <PluralLi key={index} onClick={(e) => { e.stopPropagation(); onClick(el, name, undefined, indexOfPlate); showIcon(index); }}>
                  <Checkbox id={el} type={positioned ? 'radio' : 'checkbox'} name='checkform' />
                  <IconWrapper>
                    {positioned && <Icon isShown={value === el} />}
                    {!positioned && <Icon isShown={value.indexOf(el) > -1} />}
                    <CheckIputIcon style={{ flexShrink: '0' }} />

                  </IconWrapper>
                  {!positioned && <P style={{ textDecoration: 'none' }}>{el}</P>}
                  {positioned
                    && (
                      <Label htmlFor={el}>
                        <P style={{ textDecoration: 'none' }}>{el}</P>
                      </Label>
                    )}
                </PluralLi>
              ))}
            </PluralDirectionsList>
          )}
    </Li>
  );
};

const SelectWithPlural: FC<{
  isOpen: boolean,
  idx: number,
  indexOfPlate?: number,
  openSelect?: (e: any) => void,
  name: string,
  arr: any[],
  label: string,
  value: string | string[],
  getValue: any,
  withValueField?: boolean,
  withOnlyFilter?: boolean,
  error?: string,
  isSubmited?: boolean;
}> = ({
  openSelect,
  isOpen,
  idx,
  name,
  arr,
  label,
  getValue,
  indexOfPlate,
  value,
  withValueField = true,
  withOnlyFilter = false,
  error = '',
  isSubmited = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const openAndClose = (index: number) => {
    setCurrentIndex(index === currentIndex ? -1 : index);
  };
  return (
    <Div height='auto'>
      {!withOnlyFilter && (
      <InputName onClick={() => openSelect && openSelect(idx)}>
        {label}
        <ArrowIcon style={{ marginLeft: '20px' }} isOpen={isOpen} />
      </InputName>
      )}
      {withValueField && <Input readOnly onClick={() => openSelect && openSelect(idx)} type='text' id={name} value={value} />}
      {isOpen && (
      <DirectionsList positioned={withValueField}>
        {arr.map((el, index) => (
          <Direction
            indexOfPlate={indexOfPlate}
            positioned={withValueField}
            value={value}
            open={() => openAndClose(index)}
            isOpen={index === currentIndex}
            key={index}
            onClick={getValue}
            arr={el.array}
            name={el.name} />
        ))}
      </DirectionsList>
      )}
      {error && isSubmited && <Error style={{ marginTop: '5px' }}>{error}</Error>}
      {!value && <Promt>{setPrompText(label)}</Promt>}
    </Div>
  );
};

export default memo(SelectWithPlural);
