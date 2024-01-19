import React, {
  ChangeEvent, FC, memo, useState,
} from 'react';
import styled from 'styled-components';
import BlockForFileAdd from '../NewBlockForAddingFiles';
import { InputWithNoValidation, TextAreaWithNoValidation, ExtendedBlockHeader } from '../FormElements';
import { GridBox, GridColumnElement } from './NewEducationBlock';
import { useSelector } from '../../store/store.types';
import Themes from '../../themes';
import { TravelsFontMixixn20 } from '../../constants/fontsConfigs';
import { ButtonWithCross, UniversalButton } from '../RestyledButtons';
import { TSoftSkillTest } from '../../types/componentsTypes';
import { BlackDelIcon } from '../icons';
import { TTest } from '../../types/apiTypes';

const NewBlockForTests: FC<{
  onChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, index?: number) => void,
  fileOnChange: (e: ChangeEvent<HTMLInputElement>, index?: number) => void,
  text: string,
  addOption: () => void,
  testsList: TTest[],
  inputName: string,
  deleteFunc: (index: number) => void,
  submitTestObject:(index: number) => void,
}> = ({
  onChange,
  addOption,
  testsList,
  text,
  submitTestObject,
  inputName,
  deleteFunc,
  fileOnChange,
}) => {
  const [isOpen, openListOfEducation] = useState(true);
  const { theme } = useSelector((state) => state.all);
  return (
    <>
      <GridBox isOpen={isOpen}>
        {testsList?.map((el, index) => (
          <GridColumnElement>
            <BlackDelIcon
              onClick={(e:any) => { e.preventDefault(); deleteFunc(el.id!); }}
              style={{ position: 'absolute', top: '0px', right: '0px' }} />
            <InputWithNoValidation
              name='testName'
              label='Название теста'
              type='text'
              value={el.test_name}
              onChange={(e) => onChange(e, index)}
              placeholder='Введите название пройденного теста' />
            <TextAreaWithNoValidation
              name='result'
              onChange={(e) => onChange(e, index)}
              label='Результат'
              maxLength={500}
              value={el.result}
              placeholder=''
              height={160} />
            <BlockForFileAdd
              inputName={inputName}
              headerText='Документ'
              fileName=''
              file={el.image || ''}
              currentIndex={index}
              textStub='Прикрепите документ или скриншот результата'
              buttonText='Добавить файл с устройства'
              setFileToState={fileOnChange} />
            <UniversalButton
              type='button'
              onClick={(e) => { e.preventDefault(); submitTestObject(index); }}
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
            testsList.length < 2
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
      {isOpen && testsList.length >= 2 && (
      <ButtonWithCross
        onClick={addOption}
        withText={false}
        height={56} />
      )}
    </>
  );
};

export default memo(NewBlockForTests);
