import React, {
  ChangeEvent, FC, useCallback, useState,
} from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router';
import { professions, arrForProfessionSearch } from '../constants/textsForLanding';
import { TravelsFontMixixn20, TravelsFontMixixn24 } from '../constants/fontsConfigs';
import NewSelectWithPlural, { SelectLevels } from '../ui-lib/widgets/NewSelectWithPlural';
import { InputWithTags, TextAreaWithNoValidation } from '../ui-lib/FormElements';
import { UniversalButton } from '../ui-lib/RestyledButtons';
import { useSelector } from '../store/store.types';
import Themes from '../themes';
import { BlueDeleteIcon } from '../ui-lib/icons';
import { useAddProfessionMutation, useNewGetCurrentUserQuery, useUpdateProfessionMutation } from '../api/api';

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

const Section = styled.section`
    box-sizing: border-box;
    padding-inline: 20px;
    display: flex;
    padding-top: 35px;
    padding-bottom: 90px;
    flex-direction: column;
    position: relative;
    width: 100%;
    
    gap: 66px;
    align-items: center;
    background-color: ${({ theme: { modalOverlay } }) => modalOverlay};
`;

const Plate = styled.form`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  max-width: 1370px;
  height: 100%;
  overflow-y: auto;
  width: 100%;
  position: relative;
  border-radius: 20px;
  border:${({ theme: { mainButtonColor } }) => `0.734px solid ${mainButtonColor}`};
  background: ${({ theme: { mainBg } }) => mainBg};
  box-sizing: border-box;
`;

type TProfession = {
  id?: 0,
  profession_name?: string,
  level?: string,
  experience?: string,
  hard_skills?: string[],
  soft_skills?: string[],
};
/// выпадающий список скиллов у инпут с тегами, переходы, апи, валидация при создпнии професии

const CreationForm: FC = () => {
  const { theme } = useSelector((state) => state.all);
  const { data, error } = useNewGetCurrentUserQuery();
  const [createProfession] = useAddProfessionMutation();
  const [updateProfession] = useUpdateProfessionMutation();
  const navigate = useNavigate();
  const [softSkills, setSoftSkills] = useState<string[]>([]);
  const [hardSkills, setHardSkills] = useState<string[]>([]);
  const [level, setLevel] = useState<string>('');
  const [profession, setProfessionName] = useState<string>('');
  const [expirience, setExpirience] = useState<string>('');
  const [isSubmited, setSubmit] = useState(false);
  const { id } = useParams();
  const setSoftSkillInProfession = useCallback((el: string) => {
    if (el === '' || softSkills.includes(el)) { return; }
    const copy = [...softSkills];
    copy.push(el);
    setSoftSkills(copy);
  }, [softSkills]);

  const deleteSoftSkill = useCallback((index: number) => {
    const copy = [...softSkills];
    copy.splice(index, 1);
    setSoftSkills(copy);
  }, [softSkills]);

  const setHardSkillInProfession = useCallback((el: string) => {
    if (el === '' || hardSkills.includes(el)) { return; }
    const copy = [...hardSkills];
    copy.push(el);
    setHardSkills(copy);
  }, [hardSkills]);

  const deleteHardSkill = useCallback((index: number) => {
    const copy = [...hardSkills];
    copy.splice(index, 1);
    setHardSkills(copy);
  }, [hardSkills]);

  const checkProfession = () => profession !== '';
  const checkLevel = () => level !== '';
  /*  const checkHards = () => hardSkills.length !== 0; */
  const checkExpirience = () => expirience.length > 10;
  const pushProfession = async (e: any) => {
    e.preventDefault();
    setSubmit(true);
    if (!checkExpirience() || /* !checkHards() || */ !checkLevel() || !checkProfession()) { return; }
    const profObj = {
      profession_name: profession,
      level,
      experience: expirience,
      hard_skills: hardSkills,
    };
    try {
      id ? await updateProfession({
        prof: profObj,
        userId: data?.id!,
        professionId: +id,
      })
        : await createProfession({
          prof: profObj,
          userId: data?.id!,
        });
      navigate('/team-window/team-list');
    } catch (err: any) {
      console.log(err);
    }
  };
  const setExpToState = (e: ChangeEvent<HTMLTextAreaElement>, index?: number) => {
    const exp = e.target.value;
    setExpirience(exp);
  };

  return (
    <Section>
      <Plate onSubmit={(e) => pushProfession(e)}>
        <BlueDeleteIcon onClick={() => navigate('/team-window/team-list')} style={{ top: '10px', right: '10px' }} />
        <Header2>Специальность</Header2>
        <P>Выберите специальность, которую Вы хотите выложить на витрину</P>
        <NewSelectWithPlural
          withError={!checkProfession() && isSubmited}
          forRequired
          label='Название специальности'
          setProfession={setProfessionName}
          professionValue={profession}
          placeholder1='Выерите свою специальность'
          placeholder2='Введите специальность, например: Data engineer'
          emptyCase='Не нашли вашей специальности'
          baseArr={professions}
          arrForSearch={arrForProfessionSearch} />
        <SelectLevels
          withError={!checkLevel() && isSubmited}
          forRequired
          setLevel={setLevel}
          level={level} />
        <InputWithTags
          hasError={false}
          setTagToArray={setHardSkillInProfession}
          deleteTagFromArray={deleteHardSkill}
          forRequired
          label='Hard skills'
          name='hardSkills'
          type='text'
          placeholder='Напишите hard skill. Например: Figma'
          maxLength={200}
          tags={hardSkills} />
        <InputWithTags
          hasError={false}
          setTagToArray={setSoftSkillInProfession}
          deleteTagFromArray={deleteSoftSkill}
          forRequired
          label='Soft skills'
          name='softSkills'
          type='text'
          placeholder='Напишите soft skill. Например: упорство'
          maxLength={200}
          tags={softSkills} />
        <TextAreaWithNoValidation
          errorMessage={isSubmited && !checkExpirience()}
          forRequired
          minLength={10}
          name='exp'
          label='Опыт работы'
          maxLength={1000}
          value={expirience}
          placeholder='Расскажите про Ваш опыт'
          height={160}
          onChange={setExpToState} />
        <UniversalButton
          style={{ alignSelf: 'end' }}
          type='submit'
          textColor={Themes[theme].mainTextColor}
          backColor={Themes[theme].sliderColor}
          borderColor=''
          paddingLeft={40}
          paddingTop={20}>
          Добавить себя, как специалиста
        </UniversalButton>
      </Plate>
    </Section>
  );
};
export default CreationForm;
