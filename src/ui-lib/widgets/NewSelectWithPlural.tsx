/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React, { FC, memo, useState } from 'react';
import styled from 'styled-components';
import {
  SearchPic, ArrowIcon, CheckDoneIcon, RequiredStarIcon,
} from '../icons';
import { TravelsFontMixixn20 } from '../../constants/fontsConfigs';
import requiredSvg from '../../assets/requiredIcon.svg';
import { ErrorForInput } from '../FormElements';

const Div = styled.div`
    width: 100%;
    max-height: 780px;
    display: flex;
    flex-direction: column;
`;
const LiWrapper = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  align-self: flex-start;
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  cursor: pointer;
  flex-direction: column;
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 56px;
  right: 20px;
`;

const SpecialityInput = styled.input<{ isOpen: boolean, withError: boolean }>`
    padding: 16px 15px;
    width: 100%;
    border: ${({ withError, theme: { errorColor } }) => (withError ? `1px solid ${errorColor}` : 'none')};
    border-radius: 7px;
    outline: none;
    box-sizing: border-box;
    color: ${({ theme: { mainTextColor } }) => mainTextColor};
    box-shadow: ${({ isOpen }) => (isOpen ? '0px 8px 20px 0px rgba(0, 0, 0, 0.25)' : 'none')};
    ${TravelsFontMixixn20}
    background-color: ${({ isOpen, theme: { plateColor, focusColor } }) => (isOpen ? focusColor : plateColor)};
    & ::placeholder {
      ${TravelsFontMixixn20}
      color:  ${({ theme: { placeholderColor } }) => placeholderColor};
    }

`;

const ListDiv = styled.div<{ isOpen: boolean }>`
    padding: 16px 24px;
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
    flex-direction: column;
    gap: 16px;
    transition: opacity ease .4s;
    background-color: ${({ isOpen, theme: { plateColor, focusColor } }) => plateColor};
    box-shadow: ${({ isOpen }) => (isOpen ? '0px 8px 20px 0px rgba(0, 0, 0, 0.25)' : 'none')};
    overflow: auto;
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
`;

const InputWithSearch = styled.input`
    padding: 16px 15px;
    width: 100%;
    border: ${({ theme: { mainButtonColor } }) => `1px solid ${mainButtonColor}`};
    border-radius: 25px;
    outline: none;
    box-sizing: border-box;
    color: ${({ theme: { mainTextColor } }) => mainTextColor};
    ${TravelsFontMixixn20}
    background-color: ${({ theme: { plateColor } }) => plateColor};
    & ::placeholder {
      ${TravelsFontMixixn20}
      color:  ${({ theme: { placeholderColor } }) => placeholderColor};
    }
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;

`;
const ListForLevels = styled(List)<{ isOpen:boolean }>`
   display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
   padding: 16px 24px;
   
    flex-direction: column;
    gap: 16px;
  
    background-color: ${({ isOpen, theme: { plateColor, focusColor } }) => plateColor};
    box-shadow: ${({ isOpen }) => (isOpen ? '0px 8px 20px 0px rgba(0, 0, 0, 0.25)' : 'none')};
    overflow: auto;
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
`;
const ListItem = styled.li`
     ${TravelsFontMixixn20}
     color:  ${({ theme: { mainTextColor } }) => mainTextColor};
     display: flex;
     align-items: center;
     gap: 21px;
     cursor: pointer;
     align-items: flex-start;
`;

const LevelListItem = styled(ListItem)`
  align-items: center;
  &:hover {
    color: ${({ theme: { mainButtonColor } }) => mainButtonColor};
  }
`;
const CheckBoxLabel = styled.label`
   display: flex;
   gap: 21px;
   cursor: pointer;
`;
const Span = styled.span`
    width: 24px;
    height: 24px;
    border-radius: 8px;
    border: ${({ theme: { mainButtonColor } }) => `1px solid ${mainButtonColor}`};
    position: relative;
`;

const P = styled.p`
  color: ${({ theme: { placeholderColor } }) => placeholderColor};
  text-align: center;
  ${TravelsFontMixixn20}
`;

const Checkbox = styled.input`
  position: absolute;
   z-index: -1;
   opacity: 0;
   &:checked+svg {
    display: block;
   }
`;
const Label = styled.label<{ forRequired:boolean }>`
  ${TravelsFontMixixn20}
  color:${({ theme: { mainTextColor } }) => mainTextColor};
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 270px;
    display: ${({ forRequired }) => (forRequired ? 'block' : 'none')};
    width: 10px;
    height: 10px;
    background-image:url(${requiredSvg});
    background-repeat: no-repeat;
    background-size: cover;
  }
`;

const LabelForSelectLevel = styled(Label)`
  &::after {
    left: 90px;
  }
`;

export const SelectLevels: FC<{
  setLevel:(item: string) => void,
  level: string,
  forRequired: boolean,
  withError: boolean,
}> = memo(({
  setLevel,
  level,
  forRequired,
  withError,
}) => {
  const [isOpen, open] = useState(false);

  return (
    <Div>
      <LabelForSelectLevel
        onClick={() => open(!isOpen)}
        htmlFor='level'
        forRequired={forRequired}>
        Уровень
        <SpecialityInput
          withError={withError}
          id='level'
          placeholder='Укажите ваш уровень'
          readOnly
          value={level}
          isOpen={isOpen} />
        <IconWrapper onClick={(e) => { e.preventDefault(); open(!isOpen); }}>
          <ArrowIcon isOpen={isOpen} />
        </IconWrapper>
      </LabelForSelectLevel>
      <ListForLevels isOpen={isOpen}>
        <LevelListItem onClick={() => setLevel('Начальный')}>Начальный</LevelListItem>
        <LevelListItem onClick={() => setLevel('Средний')}>Средний</LevelListItem>
        <LevelListItem onClick={() => setLevel('Продвинутый')}>Продвинутый</LevelListItem>
      </ListForLevels>
      {withError && <ErrorForInput style={{ marginTop: '20px' }}>Укажите ваш уровень</ErrorForInput>}
    </Div>
  );
});

const NewSelectWithPlural: FC<{
  setProfession: (item: string) => void,
  professionValue: string,
  placeholder1: string,
  placeholder2: string,
  emptyCase: string,
  forRequired:boolean,
  baseArr: { name: string, array: string[] }[],
  arrForSearch: string[],
  label: string;
  withError: boolean,
}> = ({
  setProfession,
  professionValue,
  placeholder1,
  placeholder2,
  emptyCase,
  baseArr,
  arrForSearch,
  forRequired,
  label,
  withError,
}) => {
  const [customValue, setCustomValue] = useState('');
  const [currentCategory, setCategory] = useState('');
  const [isOpen, open] = useState(false);
  const filteredArr = (value: string) => {
    const reg = new RegExp(`^${value}`, 'i');
    return arrForSearch.filter((el) => reg.test(el));
  };

  return (

    <Div>
      <Label
        forRequired={forRequired}
        onClick={() => open(!isOpen)}
        htmlFor='prof'>
        {label}
        <SpecialityInput
          withError={withError}
          id='prof'
          placeholder={placeholder1}
          readOnly
          value={professionValue}
          isOpen={isOpen} />
        <IconWrapper onClick={(e) => { e.preventDefault(); open(!isOpen); }}>
          <ArrowIcon isOpen={isOpen} />
        </IconWrapper>
      </Label>
      <ListDiv isOpen={isOpen}>
        <Wrapper>
          <InputWithSearch
            placeholder={placeholder2}
            maxLength={150}
            type='text'
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)} />
          <SearchPic />
        </Wrapper>
        <List>
          {customValue
            ? (filteredArr(customValue).length > 0 ? filteredArr(customValue)?.map((el) => (
              <ListItem>
                <CheckBoxLabel onChange={() => setProfession(el)} htmlFor={el}>
                  <Span>
                    <Checkbox type='checkbox' id={el} checked={el === professionValue} />
                    <CheckDoneIcon />
                  </Span>
                  {el}
                </CheckBoxLabel>
              </ListItem>
            )) : <P>{emptyCase}</P>)
            : baseArr?.map(({ name, array }, index) => (
              <ListItem style={{ flexDirection: 'column', gap: '20px' }}>
                <LiWrapper>
                  <ArrowIcon isOpen={name === currentCategory} onClick={() => setCategory((prevState) => (prevState === name ? '' : name))} />
                  <CheckBoxLabel onChange={() => setProfession(name)} htmlFor={name}>
                    <Span>
                      <Checkbox type='checkbox' id={name} checked={name === professionValue} />
                      <CheckDoneIcon />
                    </Span>
                    {name}
                  </CheckBoxLabel>
                </LiWrapper>

                {name === currentCategory
                    && (
                      <List style={{ paddingLeft: '80px' }}>
                        {array.map((el) => (
                          <ListItem>
                            <CheckBoxLabel htmlFor={el} onChange={() => setProfession(el)}>
                              <Span>
                                <Checkbox type='checkbox' id={el} checked={el === professionValue} />
                                <CheckDoneIcon />
                              </Span>
                              {el}
                            </CheckBoxLabel>
                          </ListItem>
                        ))}
                      </List>
                    )}
              </ListItem>
            ))}
        </List>

      </ListDiv>
      {withError && <ErrorForInput style={{ marginTop: '20px' }}>Укажите вашу специальность</ErrorForInput>}
    </Div>
  );
};

export default memo(NewSelectWithPlural);

/// Введите свою специальность
/// Введите специальность, например: Data engineer
/// Не нашли вашей профессии
