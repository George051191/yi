import React, {
  ChangeEvent, Dispatch, FC, SetStateAction, memo, useState,
} from 'react';
import styled, { useTheme } from 'styled-components';
import Themes from '../../themes';
import BlockForFileAdd from '../NewBlockForAddingFiles';

import {
  InputWithNoValidation, CustomDateInput, InputBox, Label,
} from '../FormElements';
import { ButtonWithCross, UniversalButton } from '../RestyledButtons';
import { useSelector, useDispatch } from '../../store/store.types';
import { TravelsFontMixixn24 } from '../../constants/fontsConfigs';
import { TEducation } from '../../types/apiTypes';
import createAutoCorrectedDatePipe from '../../helpers/dateFunc';
import { BlackDelIcon } from '../icons';

export const GridBox = styled.ul<{ isOpen: boolean }>`
    display: ${({ isOpen }) => (isOpen ? 'grid' : 'none')};
    grid-template-columns: repeat(2, minmax(340px, 1fr));
    grid-auto-flow: row;
    opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
    transition: all ease .4s;
    list-style: none;
    margin: 0;
    padding: 0;
    column-gap: 22px;
    row-gap: 22px;
    width: 100%;
`;

export const GridColumnElement = styled.li`
  display:flex;
  flex-direction: column;
  gap: 25px;
  position: relative;
  align-items: flex-start;
  & button {
    font-size: 20px;
  }
`;

const NewEducationBlock: FC<{
  onChange: (e: ChangeEvent<HTMLInputElement>, index?: number) => void,
  fileOnChange: (e: ChangeEvent<HTMLInputElement>, index?: number) => void,
  text: string,
  addOption: () => void,
  coursesList: TEducation[],
  nameOfInputForFile: string,
  deleteFunc: (index: number, pos:number) => void,
  submitEducation: (index: number) => void,
}> = ({
  onChange,
  fileOnChange,
  addOption,
  coursesList,
  text,
  deleteFunc,
  submitEducation,
  nameOfInputForFile,
}) => {
  const [isOpen, openListOfEducation] = useState(true);
  const autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd.mm.yyyy', { minYear: 1970, maxYear: new Date().getFullYear() });
  const { theme } = useSelector((state) => state.all);
  return (
    <>
      <GridBox isOpen={isOpen}>
        {coursesList?.map((el, index) => (
          <GridColumnElement>

            <BlackDelIcon
              onClick={(e:any) => { e.preventDefault(); deleteFunc(el.id!, index); }}
              style={{ position: 'absolute', top: '0px', right: '0px' }} />
            <InputWithNoValidation
              name='educationName'
              label='Название организации'
              type='text'
              value={el.organization_name}
              onChange={(e) => onChange(e, index)}
              placeholder='Введите название учреждения' />
            <InputWithNoValidation
              name='speciality'
              label='Специальность/название курса'
              type='text'
              value={el.speciality}
              onChange={(e) => onChange(e, index)}
              placeholder='Введите название специальности или курса' />
            <InputBox>
              <Label htmlFor='educationEnd'>Дата окончания обучения</Label>
              <CustomDateInput
                mask={[/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/]}
                pipe={autoCorrectedDatePipe}
                guide={false}
                name='educationEnd'
                id='educationEnd'
                value={el.education_end_year}
                onChange={(e) => onChange(e, index)}
                placeholder='11.11.2023' />
            </InputBox>

            <BlockForFileAdd
              headerText='Документ'
              fileName='Ваш файл'
              file={el.image || ''}
              currentIndex={index}
              inputName={nameOfInputForFile}
              textStub='Прикрепите документ'
              buttonText='Добавить файл с устройства'
              setFileToState={fileOnChange} />
            <UniversalButton
              onClick={(e) => { e.preventDefault(); submitEducation(index); }}
              type='button'
              textColor={Themes[theme].mainBg}
              backColor={Themes[theme].sliderColor}
              borderColor=''
              paddingLeft={40}
              paddingTop={20}>
              Сохранить
            </UniversalButton>

          </GridColumnElement>

        ))}
        {
            coursesList.length < 2
            && (
              <GridColumnElement style={{ width: '50%' }}>
                <ButtonWithCross
                  onClick={addOption}
                  withText={false}
                  height={526.86} />
              </GridColumnElement>
            )
          }
      </GridBox>

      {isOpen && coursesList.length >= 2 && (
      <ButtonWithCross
        onClick={addOption}
        withText={false}
        height={56} />
      )}

    </>
  );
};

export default memo(NewEducationBlock);
