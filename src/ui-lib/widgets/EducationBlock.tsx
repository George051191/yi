/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
import React, {
  ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useRef, useState,
} from 'react';
import styled from 'styled-components';
import { ConfigProvider, DatePicker } from 'antd';
import locale from 'antd/locale/ru_RU';
import dayjs, { Dayjs } from 'dayjs';
import { ArrowIcon, CrossIcon, AddIcon } from '../icons';
import { Text } from '../TextBlocks';
import { Input, Container, Label } from '../Inputs';
import { AddButton } from '../Buttons';
import { TEducationObject } from '../../types/componentsTypes';
import { useLazyGetUniversitiesQuery } from '../../api/api';

const { RangePicker } = DatePicker;
const EducationType = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: baseline;
    cursor: pointer;
`;

const Datalist = styled.ul`
    padding: 0;
    margin: 0;
    border-radius: 50px;
    background: rgba(241, 244, 255, 0.60);
    backdrop-filter: blur(4px);
    display: flex;
    flex-direction: column;
    gap: 15px;
    position: absolute;
    top: 86px;
    padding: 15px;
    list-style: none;
    z-index: 99999;
    overflow-y: auto;
    height: 267px;
    width: 100%;
`;

const Option = styled.li`
    color: ${({ theme: { mainTextColor } }) => mainTextColor};
    font-family: 'TTTravels';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    white-space: break-spaces;
    cursor: pointer;
    &:hover {
        color: ${({ theme: { mainButtonColor } }) => mainButtonColor};
        font-style: 500;
    }
`;

const CalendarLabel = styled.span`
  color: ${({ theme: { mainTextColor } }) => mainTextColor};
  font-family: 'TTTravels';
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 20px;
  @media screen and (max-width:560px) {
      font-size: 20px;
      
    } 
`;

const CalendarDiv = styled.div`
  width: 100%;
  border-bottom: ${({ theme: { borderColor } }) => `1px solid ${borderColor}`};
  align-items:center;
  display:flex;
  align-items: baseline;
  flex-direction:column;
  & .ant-picker-suffix {
    display: none;
  }
  & .ant-picker-range-separator {
    display:none;
  }
  & input {
    color: ${({ theme: { mainTextColor } }) => mainTextColor} !important;
    font-family: 'TTTravels';
    font-size: 20px !important;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  & .ant-picker {
    background-color: transparent;
    width: 152px;
  }
  & .ant-picker,.ant-picker-range {
    border: none;
    outline: none;
    box-shadow:none;
    padding: 0;
  }
  & .ant-picker,.ant-picker-range:focus {
    outline: none;
    border: none;
    box-shadow: none;
  }
  & .ant-picker-active-bar {
    display: none;
  }
  
  & .ant-picker-panels { 
    flex-direction: column !important;
  } 
  & .ant-picker-range-separator {
    color: ${({ theme: { mainTextColor } }) => mainTextColor};
    display: block;
  }
  .ant-picker-clear {
    display: none;
  }

`;

const LinkForFileLoad = styled.a`
    color: ${({ theme: { mainBgColor } }) => mainBgColor};
    font-family: 'TTTravels';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-decoration: none;
    align-self: flex-start;
    cursor: pointer;
    @media screen and (max-width:1000px) {
      font-size: 14px;
    }
`;

const ButtonForFileAdd = styled.button`
    max-width: 525px;
    position: relative;
    padding: 27px 44px;
    align-items: flex-start;
    border-radius: 36px;
    border: ${({ theme: { mainButtonColor } }) => `1px solid ${mainButtonColor}`};
    background: ${({ theme: { mainBg } }) => mainBg};
    color: ${({ theme: { mainTextColor } }) => mainTextColor};
    font-family: 'TTTravels';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    line-height: 80%;
    letter-spacing: -0.625px;
    overflow: hidden;
    align-self: 'center';
    justify-content: 'center';
    @media screen and (max-width: 1200px) {
      font-size: 17px;
      align-items: center;
    }
`;

const FileInput = styled.input`
    position: absolute;
    z-index: -100;

`;

const LabelHidden = styled.label`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height:100%;
    cursor: pointer;

`;

const EducationsList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const EducationUnit = styled.li`
    display: flex;
    flex-direction: column;
    gap: 60px;
    position: relative;
`;

type TEducationForm = {
  onChange: (e: ChangeEvent<HTMLInputElement>, index?: number) => void;
  setFile: Dispatch<SetStateAction<File>>;
  setIndex: Dispatch<SetStateAction<any>>;
  calendareHandler: (dateString: any, index: number, date?: any) => void;
  fileInputName: string;
  index: number;
  disabled: boolean;
  withCross: boolean;
  deleteFunc: (key: number) => void;
  addOption: (item: string, index: number) => void;
  item: TEducationObject;
};

const EducationForm: FC<TEducationForm> = ({
  item,
  onChange,
  setFile,
  setIndex,
  calendareHandler,
  fileInputName,
  index,
  disabled,
  deleteFunc,
  addOption,
  withCross,
}) => {
  const [isOpen, open] = useState(false);
  const [currentEduArr, setCurrentEduArr] = useState<string[]>([]);
  const [getUniversities, { error, status }] = useLazyGetUniversitiesQuery();
  const timer = useRef<string | number | NodeJS.Timeout | undefined>();
  const getUniversityWithLetters = async (value: string) => {
    const array = await getUniversities(value).unwrap();
    setCurrentEduArr(array);
  };
  useEffect(() => {
    clearTimeout(timer.current);

    timer.current = setTimeout(getUniversityWithLetters, 500, item.organizationName);
  }, [item.organizationName]);
  return (
    <EducationUnit>
      {withCross && !disabled && (
        <CrossIcon
          onClick={deleteFunc}
          style={{
            position: 'absolute', top: '5px', right: '0px', zIndex: '999999999',
          }} />
      )}
      <Container>
        <Label htmlFor={item.organizationName}>Название организации</Label>
        <Input disabled={disabled} id={item.organizationName} value={item.organizationName} onChange={(e) => { onChange(e, index); open(true); }} />
      </Container>
      {!disabled && isOpen && currentEduArr?.length !== 0
        && (
          <>
            <CrossIcon
              onClick={() => { setCurrentEduArr([]); open(false); }}
              style={{
                position: 'absolute', top: '68px', right: '-22px', zIndex: '999999999',
              }} />
            <Datalist>
              {currentEduArr.map((el) => (
                <Option onClick={() => { addOption && addOption(el, index); open(false); }}>{el}</Option>
              ))}
            </Datalist>

          </>
        )}
      <CalendarDiv>
        <CalendarLabel>Год начала – Год окончания</CalendarLabel>
        <ConfigProvider locale={locale}>
          {item.educationDates[0] !== '' && item.educationDates[1] !== '' ? <RangePicker picker='year' disabled={disabled} value={[dayjs(item.educationDates[0]), dayjs(item.educationDates[1])]} placeholder={['', '']} onChange={(e, dateString) => { calendareHandler(dateString, index); }} />
            : <RangePicker picker='year' disabled={disabled} placeholder={['', '']} onChange={(e, dateString) => { calendareHandler(dateString, index); }} />}
        </ConfigProvider>
      </CalendarDiv>
      {item.image && <LinkForFileLoad download href={item.image as string}>Диплом</LinkForFileLoad>}

      {!disabled && (
        <ButtonForFileAdd type='button'>
          Добавить  изображение из файлов
          <LabelHidden onClick={() => { setIndex(index); }} htmlFor={fileInputName} />
          <FileInput
            id={fileInputName}
            name={fileInputName}
            onChange={(e) => { e.preventDefault(); setFile(e.target.files![0]); }}
            type='file' />
        </ButtonForFileAdd>
      )}

    </EducationUnit>
  );
};

type TEducationBlock = {
  educationType: string;
  onChange: (e: ChangeEvent<HTMLInputElement>, index?: number) => void;
  setFile: Dispatch<SetStateAction<File>>;
  setIndex: Dispatch<SetStateAction<any>>;
  calendareHandler: (dateString: any, index: number, date?: any) => void;
  fileInputName: string;
  disabled: boolean;
  deleteFunc: (key: number) => void;
  addOption: (item: string, index: number) => void;
  educationArr: TEducationObject[];
  createEducationObject: () => void;
};

const EducationBlock: FC<TEducationBlock> = ({
  educationType,
  onChange,
  setFile,
  setIndex,
  calendareHandler,
  fileInputName,
  disabled,
  deleteFunc,
  addOption,
  educationArr,
  createEducationObject,
}) => {
  const [isOpen, open] = useState(false);
  return (
    <>
      <EducationType onClick={() => open(!isOpen)}>
        <Text>{educationType}</Text>
        <ArrowIcon isOpen={isOpen} />
      </EducationType>
      {isOpen
        && (
          <EducationsList>
            {(educationArr || []).map((el, idx) => (
              <EducationForm
                withCross={idx !== 0}
                item={el}
                onChange={onChange}
                setFile={setFile}
                setIndex={setIndex}
                calendareHandler={calendareHandler}
                fileInputName={fileInputName}
                index={idx}
                disabled={disabled}
                deleteFunc={() => deleteFunc(idx)}
                addOption={addOption} />
            ))}
            {!disabled
              && (
                <AddButton style={{ alignSelf: 'center' }} onClick={createEducationObject} type='button'>
                  <AddIcon />
                </AddButton>
              )}
          </EducationsList>
        )}

    </>
  );
};

export default EducationBlock;
