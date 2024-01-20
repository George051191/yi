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
import { TAchievementNew } from '../../types/apiTypes';

const AchievementsBlock: FC<{
  onChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, index?: number) => void,
  fileOnChange: (e: ChangeEvent<HTMLInputElement>, index?: number) => void,
  addOption: () => void,
  achievementsList: TAchievementNew[],
  deleteFunc: (index: number, pos: number) => void,
  submitAchievements:(index: number) => void,
}> = ({
  onChange,
  addOption,
  achievementsList,
  submitAchievements,
  deleteFunc,
  fileOnChange,
}) => {
  const [isOpen, openListOfEducation] = useState(true);
  const { theme } = useSelector((state) => state.all);
  return (
    <>
      <GridBox isOpen={isOpen}>
        {achievementsList?.map((el, index) => (
          <GridColumnElement>
            <BlackDelIcon
              onClick={(e:any) => { e.preventDefault(); deleteFunc(el.id!, index); }}
              style={{ position: 'absolute', top: '0px', right: '0px' }} />
            <InputWithNoValidation
              name='achieveName'
              label='Название достижения'
              type='text'
              value={el.achievement_name}
              onChange={(e) => onChange(e, index)}
              placeholder='Введите название вашего достижения' />
            <TextAreaWithNoValidation
              name='result'
              onChange={(e) => onChange(e, index)}
              label='Расскажите про ваше достижение'
              maxLength={500}
              value={el.description}
              placeholder=''
              height={160} />
            <BlockForFileAdd
              inputName='achieve'
              headerText='Документ'
              fileName=''
              file={el.image || ''}
              currentIndex={index}
              textStub='Прикрепите документ или скриншот результата'
              buttonText='Добавить файл с устройства'
              setFileToState={fileOnChange} />
            <UniversalButton
              type='button'
              onClick={(e) => { e.preventDefault(); submitAchievements(index); }}
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
              achievementsList.length < 2
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
      {isOpen && achievementsList.length >= 2 && (
        <ButtonWithCross
          onClick={addOption}
          withText={false}
          height={56} />
      )}
    </>
  );
};

export default memo(AchievementsBlock);
