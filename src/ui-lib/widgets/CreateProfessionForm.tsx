import React, {
  ChangeEvent, FC, useCallback, useState,
} from 'react';
import styled from 'styled-components';
import { professions, arrForProfessionSearch } from '../../constants/textsForLanding';
import { TravelsFontMixixn20, TravelsFontMixixn24 } from '../../constants/fontsConfigs';
import NewSelectWithPlural, { SelectLevels } from './NewSelectWithPlural';
import { InputWithTags, TextAreaWithNoValidation } from '../FormElements';
import { UniversalButton } from '../RestyledButtons';
import { useSelector } from '../../store/store.types';
import Themes from '../../themes';

const Header2 = styled.h2`
  color: ${({ theme: { mainTextColor } }) => mainTextColor};
  ${TravelsFontMixixn24}
  align-self: center;
`;

const P = styled.p`
  color: ${({ theme: { placeHolderColor } }) => placeHolderColor};
  ${TravelsFontMixixn20}
  align-self: center;
`;

type TProfession = {
  professionName: string,
  expDescription: string,
  teamWorkExp: string,
  skills?: string[],
};
/// уровень, выпадающий список скиллов у инпут с тегами, переходы, апи

const CreateProfessionForm: FC = () => {
  const { theme } = useSelector((state) => state.all);
  const [professionsArray, setValueInProfessionsArray] = useState<TProfession[]>([{
    professionName: '',
    expDescription: '',
    teamWorkExp: '',
    skills: [],
  }]);
  const [softSkills, setSoftSkills] = useState<string[]>([]);
  const [level, setLevel] = useState<string>('');
  const setProfessionInCurrentObject = useCallback((el: string) => {
    /*  const copyArr = [...professionsArray];
        const changeObject = copyArr[index];
        const copyChangeObject = { ...changeObject };
        copyArr[index] = { ...copyChangeObject, professionName: el };
        setValueInProfessionsArray(copyArr); */
  }, [professionsArray]);
  const setSkillInCurrentArrInProfession = useCallback((el: string, index: number) => {
    if (el === '' || professionsArray[index].skills?.includes(el)) { return; }
    const cop = structuredClone(professionsArray);
    const copyArr = [...professionsArray];
    const changeObject = copyArr[index];
    const copyChangeObject = { ...changeObject };
    copyChangeObject.skills?.push(el);
    copyArr[index] = copyChangeObject;
    setValueInProfessionsArray(copyArr);
  }, [professionsArray]);

  const deleteSkillInCurrentArrInProfession = useCallback((tagId: number, index: number) => {
    const copyArr = [...professionsArray];
    const changeObject = copyArr[index];
    const copyChangeObject = { ...changeObject };
    copyChangeObject.skills?.splice(tagId, 1);
    copyArr[index] = copyChangeObject;
    setValueInProfessionsArray(copyArr);
  }, [professionsArray]);

  const setExpertiseToProfObject = useCallback((e: ChangeEvent<HTMLTextAreaElement>, index?: number) => {
    const copyArr = [...professionsArray];
    const changeObject = copyArr[index!];
    const copyChangeObject = { ...changeObject };
    switch (e.target.id) {
      case 'exp': {
        copyArr[index!] = { ...copyChangeObject, expDescription: e.target.value };
        setValueInProfessionsArray(copyArr);
        break;
      }
      case 'teamExp': {
        copyArr[index!] = { ...copyChangeObject, teamWorkExp: e.target.value };
        setValueInProfessionsArray(copyArr);
        break;
      }
    }
  }, [professionsArray]);

  return (
    <>
      <Header2>Специальность</Header2>
      <P>Выберите специальность, которую Вы хотите выложить на витрину</P>
      <InputWithTags
        hasError
        setTagToArray={setSkillInCurrentArrInProfession}
        deleteTagFromArray={deleteSkillInCurrentArrInProfession}
        forRequired
        label='Hard skills'
        name='hardSkills'
        type='text'
        placeholder='Напишите hard skill. Например: Figma'
        maxLength={200}
        tags={[]} />
      <InputWithTags
        hasError
        setTagToArray={setSkillInCurrentArrInProfession}
        deleteTagFromArray={deleteSkillInCurrentArrInProfession}
        forRequired
        label='Hard skills'
        name='hardSkills'
        type='text'
        placeholder='Напишите hard skill. Например: Figma'
        maxLength={200}
        tags={[]} />
      <TextAreaWithNoValidation
        name='exp'
        label='Опыт работы'
        maxLength={1000}
        value=''
        placeholder='Расскажите про Ваш опыт'
        height={160}
        onChange={setExpertiseToProfObject} />
      <UniversalButton
        style={{ alignSelf: 'end' }}
        onClick={() => console.log(123)}
        type='button'
        textColor={Themes[theme].mainTextColor}
        backColor={Themes[theme].sliderColor}
        borderColor=''
        paddingLeft={40}
        paddingTop={20}>
        Добавить себя, как специалиста
      </UniversalButton>

    </>
  );
};
export default CreateProfessionForm;
