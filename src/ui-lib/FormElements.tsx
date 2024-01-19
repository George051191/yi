/* eslint-disable radix */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
/* eslint-disable import/prefer-default-export */
import React, {
  ChangeEvent, FC, memo, useState,
} from 'react';
import {
  FieldValues, UseFormRegister,
  Controller,
} from 'react-hook-form';
import styled from 'styled-components';
import MaskedInput from 'react-text-mask';
import createAutoCorrectedDatePipe from '../helpers/dateFunc';

import {
  RequiredStarIcon,
  ArrowIconNew,
  ShowIcon,
  HideIcon,
  BlackDelIcon,
  PushPic,
  TgIcon,
  GitIcon,
  VkIcon,
} from './icons';
import {
  TravelsFontMixixn15,
  TravelsFontMixixn20,
  TravelsFontMixixn24,
  ComfortaFontMixixn31,
  ComfortaFontMixixn39,
} from '../constants/fontsConfigs';
import { ButtonWithCross } from './RestyledButtons';

export const Label = styled.label`
    width: fit-content;
    display: flex;
    color: ${({ theme: { mainTextColor } }) => mainTextColor};
    ${TravelsFontMixixn20}
    position: relative;
`;

const Input = styled.input<{ notValid?: boolean }>`
    padding: 16px 15px;
    padding-right: 30px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-radius: 7px;
    text-overflow: ellipsis;
    white-space: nowrap;
    outline: none;
    color: ${({ theme: { mainTextColor } }) => mainTextColor};
    border: ${({ notValid, theme: { errorColor } }) => (notValid ? `1px solid ${errorColor}` : 'none')};
    ${TravelsFontMixixn20}
    background-color: ${({ theme: { plateColor } }) => plateColor};
    & ::placeholder {
       ${TravelsFontMixixn20} 
      color:  ${({ theme: { placeholderColor } }) => placeholderColor};
    }
`;

export const CustomDateInput = styled(MaskedInput) <{ notValid?: boolean }>`
    padding: 16px 15px;
    padding-right: 30px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-radius: 7px;
    text-overflow: ellipsis;
    white-space: nowrap;
    outline: none;
    color: ${({ theme: { mainTextColor } }) => mainTextColor};
    border: ${({ notValid, theme: { errorColor } }) => (notValid ? `1px solid ${errorColor}` : 'none')};
    ${TravelsFontMixixn20}
    background-color: ${({ theme: { plateColor } }) => plateColor};
    & ::placeholder {
      ${TravelsFontMixixn20} 
      color:  ${({ theme: { placeholderColor } }) => placeholderColor};
    }
`;
export const ErrorForInput = styled.p`
    color:  ${({ theme: { errorColor } }) => errorColor};
    ${TravelsFontMixixn15}
    font-weight: 400;
    margin: 0;
`;
export const FieldSet = styled.fieldset`
    border: none;
    margin: none;
    padding: none;
    display: flex;
    gap: 25px;
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    & legend {
      margin-bottom: 25px;
    }
`;

export const Legend = styled.legend`
    color: ${({ theme: { mainTextColor } }) => mainTextColor};
    ${TravelsFontMixixn24}
    position: relative;
`;

const SmallLegend = styled.legend`
    color: ${({ theme: { mainTextColor } }) => mainTextColor};
    ${TravelsFontMixixn20}
    position: relative;
    grid-column: -1/1;
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

export const InputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

export const ExtendedBlockHeader: FC<{
  isOpen: boolean,
  color: string,
  width: number,
  fontConfig: any,
  openHiddenBlock: () => void,
  text: string,
}> = ({
  isOpen,
  color,
  width,
  fontConfig,
  openHiddenBlock,
  text,
}) => (
  <Wrapper style={{ cursor: 'pointer' }} onClick={openHiddenBlock}>
    {/* <P fontConfig={fontConfig} color={color}>{text}</P> */}
    <ArrowIconNew isOpen={isOpen} color={color} width={width} />
  </Wrapper>
);

const TextArea = styled.textarea<{ notValid?: boolean, height: number }>`
    padding: 16px 15px;
    width: 100%;
    min-height: ${({ height }) => height}px;
    border: none;
    resize: none;
    border-radius: 7px;
    outline: none;
    box-sizing: border-box;
    color: ${({ theme: { mainTextColor } }) => mainTextColor};
    ${TravelsFontMixixn20}  
    border: ${({ notValid, theme: { errorColor } }) => (notValid ? `1px solid ${errorColor}` : 'none')};
    background-color: ${({ theme: { plateColor } }) => plateColor};
    & ::placeholder {
      ${TravelsFontMixixn20}  
      color:  ${({ theme: { placeholderColor } }) => placeholderColor};
    }
`;
const IconsWrapper = styled.div`
  position: absolute;
  display: flex;
  top: 60px;
  right: 8px;
  cursor: pointer;
  z-index: 9999999;
`;
export const DateInput: FC<{
  forRequired?: boolean,
  register: UseFormRegister<FieldValues>,
  name: string,
  control: any,
  label: string,
  options: { [key: string]: any },
  errorMessage: string,
  mask: any,
  placeholder?: string,
}> = memo(({
  forRequired = false,
  register,
  name,
  label,
  options,
  mask,
  errorMessage,
  control,
  placeholder = '',
}) => {
  const autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd.mm.yyyy', { minYear: 1970, maxYear: new Date().getFullYear() });
  return (
    <InputBox>
      <Label htmlFor={name}>
        {label}
        {forRequired && <RequiredStarIcon />}
      </Label>
      <Controller
        control={control}
        name={name}
        rules={{
          required: 'Заполните поле',
          minLength: {
            value: 10,
            message: 'Данные введены не полностью',
          },
        }}
        render={({
          field: {
            onChange, onBlur, value, ref,
          },
        }) => (
          <CustomDateInput
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            mask={mask}
            pipe={autoCorrectedDatePipe}
            guide={false}
            notValid={!!errorMessage}
            placeholder={placeholder}
            id={name} />
        )} />
      {errorMessage && <ErrorForInput>{errorMessage}</ErrorForInput>}
    </InputBox>
  );
});

export const BasicInput: FC<{
  forRequired?: boolean,
  register: UseFormRegister<FieldValues>,
  name: string,
  label: string,
  options: { [key: string]: any },
  errorMessage: string,
  maxLength?: number,
  type: string,
  value?: string,
  placeholder?: string,
  autocomplete?: string,
}> = memo(({
  forRequired = false,
  register,
  name,
  label,
  options,
  errorMessage,
  maxLength = 10000,
  type,
  value,
  autocomplete = 'off',
  placeholder = '',
}) => {
  const [inputType, changeType] = useState<string>('password');

  return (
    <InputBox>
      <Label htmlFor={name}>
        {label}
        {forRequired && <RequiredStarIcon />}
      </Label>
      {type === 'password'
        && (
          <IconsWrapper onClick={() => changeType((prevState) => (prevState === 'password' ? 'text' : 'password'))}>
            {inputType === 'password' ? <ShowIcon /> : <HideIcon />}
          </IconsWrapper>
        )}
      <Input
        autoComplete={autocomplete}
        notValid={!!errorMessage}
        placeholder={placeholder}
        type={type === 'password' ? inputType : type}
        maxLength={maxLength}
        id={name}
        {...register(name, options)} />
      {errorMessage && <ErrorForInput>{errorMessage}</ErrorForInput>}
    </InputBox>
  );
});

const GridFieldset = styled.fieldset`
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: auto 1fr;
  gap: 25px;
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  & svg {
    align-self: center;
    cursor: auto;
  }
`;

const GridError = styled(ErrorForInput)`
  grid-column: -1/1;
`;

export const SocialsInputs: FC<{
  isErrorFlag: boolean,
  vk: string,
  tg: string,
  git: string,
  vkError?: any,
  gitError?: any,
  tgError?: any,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}> = memo(({
  vk,
  tg,
  git,
  onChange,
  isErrorFlag,
  vkError = false,
  gitError = false,
  tgError = false,
}) => {
  const [openRules, setOpenRule] = useState({ vk: false, ok: false });

  return (
    <GridFieldset>
      <SmallLegend style={{ marginBottom: '25px' }}>
        Социальные сети
        <RequiredStarIcon />
      </SmallLegend>
      {isErrorFlag && <GridError>Укажите хотя бы одну социальную сеть</GridError>}

      <VkIcon />

      <Input
        placeholder='@id0000001'
        notValid={!!vkError}
        type='text'
        value={vk}
        maxLength={100}
        name='vk'
        onChange={(e) => onChange(e)}
        id='vk' />

      {vkError && <GridError style={{ paddingLeft: '65px' }}>Некорректное значение</GridError>}

      <TgIcon />

      <Input
        placeholder='@proecteam'
        notValid={!!tgError}
        type='text'
        maxLength={100}
        name='tg'
        value={tg}
        onChange={(e) => onChange(e)}
        id='tg' />
      {tgError && <GridError style={{ paddingLeft: '65px' }}>Некорректное значение</GridError>}

      <GitIcon />

      <Input
        placeholder='https://github.com/'
        notValid={!!gitError}
        type='text'
        maxLength={100}
        value={git}
        name='git'
        onChange={(e) => onChange(e)}
        id='git' />

      {gitError && <GridError style={{ paddingLeft: '65px' }}>Некорректное значение</GridError>}

    </GridFieldset>
  );
});

export const InputWithNoValidation: FC<{
  name: string,
  label: string,
  maxLength?: number,
  type: string,
  index?: number,
  value?: string,
  onChange: (e: ChangeEvent<HTMLInputElement>, index?: number) => void;
  placeholder?: string,
}> = memo(({
  name,
  label,
  onChange,
  maxLength,
  type,
  value,
  index,
  placeholder,
}) => (
  <InputBox>
    <Label htmlFor={name}>
      {label}
    </Label>
    <Input
      onChange={(e) => onChange(e, index)}
      value={value}
      placeholder={placeholder}
      type={type}
      maxLength={maxLength}
      name={name}
      id={name} />
  </InputBox>
));

export const BasicTextArea: FC<{
  forRequired?: boolean,
  register: UseFormRegister<FieldValues>,
  name: string,
  label: string,
  options: { [key: string]: any },
  errorMessage: string,
  maxLength?: number,
  value?: string,
  placeholder?: string,
  height: number,
}> = memo(({
  forRequired = false,
  register,
  name,
  label,
  options,
  errorMessage,
  maxLength = 10000,
  value,
  placeholder = '',
  height,
}) => (
  <InputBox>
    <Label htmlFor={name}>
      {label}
      {forRequired && <RequiredStarIcon />}
    </Label>
    <TextArea
      height={height}
      notValid={!!errorMessage}
      placeholder={placeholder}
      maxLength={maxLength}
      id={name}
      {...register(name, options)} />
    {errorMessage && <ErrorForInput>{errorMessage}</ErrorForInput>}
  </InputBox>
));
/// with no hook form
export const TextAreaWithNoValidation: FC<{
  name: string,
  label: string,
  maxLength?: number,
  minLength?: number,
  value?: string,
  placeholder?: string,
  errorMessage?: boolean,
  height: number,
  currentIndex?: number,
  forRequired?: boolean,
  onChange: (e: ChangeEvent<HTMLTextAreaElement>, index?: number) => void,
}> = memo(({
  name,
  label,
  minLength = 0,
  errorMessage = false,
  maxLength = 10000,
  value,
  placeholder = '',
  height,
  onChange,
  forRequired = false,
  currentIndex,
}) => (
  <InputBox>
    <Label htmlFor={name}>
      {label}
      {forRequired && <RequiredStarIcon />}
    </Label>
    <TextArea
      notValid={errorMessage}
      onChange={(e) => onChange(e, currentIndex)}
      value={value}
      minLength={minLength}
      height={height}
      name={name}
      placeholder={placeholder}
      maxLength={maxLength}
      id={name} />
    {errorMessage && <ErrorForInput>Значение должно содержать от 10 букв</ErrorForInput>}
  </InputBox>
));

export const RoundTagBlock = styled.li`
  padding: 4px 15px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  display: flex;
  border-radius: 100px;
  background-color: ${({ theme: { sliderColor } }) => sliderColor};
  ${TravelsFontMixixn20}
  color: ${({ theme: { mainTextColor } }) => mainTextColor};
  word-break: break-all;
  `;

export const TagBox = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;
const PushButton = styled.button`
  border: none;
  outline: none;
  background-color: ${({ theme: { sliderColor } }) => sliderColor};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 7px;
  height: 56px;
  max-width: 120px;
  width: 100%;
`;

export const InputWithTags: FC<{
  tags: string[];
  currentObjectIndex?: number,
  setTagToArray: (item: string, index: number) => void;
  label: string;
  name: string;
  forRequired: boolean;
  deleteTagFromArray: (tagId: number, index: number) => void;
  placeholder: string;
  type: string;
  maxLength: number;
  hasError: boolean;
}> = memo(({
  tags,
  setTagToArray,
  deleteTagFromArray,
  label,
  hasError,
  name,
  forRequired,
  placeholder,
  type,
  currentObjectIndex = 0,
  maxLength,
}) => {
  const [value, setValue] = useState<string>('');
  return (
    <InputBox>
      <Label htmlFor={name}>
        {label}
        {forRequired && <RequiredStarIcon />}
      </Label>
      <TagBox>
        {tags?.map((el, index) => (
          <RoundTagBlock>
            {el}
            <BlackDelIcon onClick={() => deleteTagFromArray(index, currentObjectIndex)} />
          </RoundTagBlock>
        ))}
      </TagBox>
      <Wrapper>
        <Input
          notValid={hasError}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          value={value}
          type={type}
          maxLength={maxLength}
          id={name} />
        <PushButton type='button' onClick={() => { setTagToArray(value, currentObjectIndex); setValue(''); }}>
          <PushPic />
        </PushButton>
      </Wrapper>
      {hasError && <ErrorForInput>Укажите хотя бы один навык</ErrorForInput>}
    </InputBox>
  );
});
