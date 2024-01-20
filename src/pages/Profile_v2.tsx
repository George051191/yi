/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unsafe-optional-chaining */
import React, {
  ChangeEvent, FC, useCallback, useEffect, useRef, useState,
} from 'react';
import styled from 'styled-components';
import { useFieldArray, useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { string } from 'prop-types';
import {
  useUpdateUserMutation,
  useCreateEducationMutation,
  useUpdateEducationMutation,
  useDeleteEducationMutation,
  useNewGetCurrentUserQuery,
  useCreateTestMutation,
  useUpdateTestMutation,
  useDeleteTestMutation,
  useCreateAchieveMutation,
  useUpdateAchieveMutation,
  useDeleteAchieveMutation,
} from '../api/api';
import NewAvatar from '../ui-lib/widgets/NewAvatars';
import NewBaseSection from '../ui-lib/widgets/NewBaseSection';
import { useSelector } from '../store/store.types';
import {
  Legend,
  FieldSet,
  BasicInput,
  SocialsInputs,
  DateInput,
  TextAreaWithNoValidation,
} from '../ui-lib/FormElements';
import NewBlockForTests from '../ui-lib/widgets/NewBlockForTests';
import NewEducationBlock from '../ui-lib/widgets/NewEducationBlock';
import BlockForAchievements from '../ui-lib/widgets/BlockForAchievements';
import { UniversalButton } from '../ui-lib/RestyledButtons';
import { Skeleton1 } from '../ui-lib/widgets/Skeleton';
import avatarDefault from '../assets/dedaultAvaImg.png';

import {
  Details, Summary, AnimatedWrapper,
} from '../ui-lib/widgets/Accordeon';
import Themes from '../themes';
import { TAchievementNew, TUser } from '../types/apiTypes';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 25px;
  & button[id=submit] {
    margin-top: 80px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
`;

export type TEducation = {
  id?: number,
  organization_name?: string,
  speciality?: string,
  education_end_year?: string,
  image?: string,
};

export type TTest = {
  id?: number,
  test_name?: string,
  result?: string,
  image?: string,
};
/// / в профайл абоут настроить отображение ачивок и открытие попапа если там картинку чел добавил то попап открывай
/// добавить попап при согласие опубликовать профессию
/// / сднлать поле софт скилл с подгрузеой я сейчас уже добовлял поле куда скиллы вписывать. добавил пропсы, поменять onChange там нужно и решить проблему с получением скиллов
const ProfileV2: FC = () => {
  const { data, error } = useNewGetCurrentUserQuery();
  const [updateUser, { status }] = useUpdateUserMutation();
  const [createEducationObj] = useCreateEducationMutation();
  const [updateEducationObject] = useUpdateEducationMutation();
  const [deleteEducationObject] = useDeleteEducationMutation();
  const [createTestObject] = useCreateTestMutation();
  const [updateTestObject] = useUpdateTestMutation();
  const [deleteTestObject] = useDeleteTestMutation();
  const [createAchievements] = useCreateAchieveMutation();
  const [updateAchievement] = useUpdateAchieveMutation();
  const [deleteAchievement] = useDeleteAchieveMutation();
  const { theme } = useSelector((state) => state.all);
  const navigate = useNavigate();
  const [userAvatar, setAvatar] = useState<string | ArrayBuffer>('');
  const [expirience, setExpirience] = useState<string>('');
  const [eduObjectsArr, setValuesOfEduObjectsArr] = useState<TEducation[]>([{
    organization_name: '',
    speciality: '',
    education_end_year: '',

    image: '',
  },
  {
    organization_name: '',
    speciality: '',
    education_end_year: '',

    image: '',
  },
  ]);
  const [tests, setTestToArr] = useState<TTest[]>([
    {
      test_name: '',
      result: '',

      image: '',
    },
    {
      test_name: '',
      result: '',

      image: '',
    },
  ]);
  const [socials, setSocialToObject] = useState({
    vk: '',
    git: '',
    tg: '',
  });

  /// profession
  const [softSkills, setSoftSkills] = useState<string[]>([]);
  const [hardSkills, setHardSkills] = useState<string[]>([]);
  const [achievements, setAchievements] = useState<TAchievementNew[]>([
    {
      achievement_name: '',
      description: '',
      image: '',
    }]);
  const {
    register,
    formState: { errors, isSubmitted },
    handleSubmit,
    setValue,
    control,
  } = useForm();
  /// socials adding
  const setSocialValue = useCallback((e: ChangeEvent<any>) => {
    const regex = /[А-Яёа-я]/gi;
    const filteredValue = e.target.value.replace(regex, '');
    setSocialToObject({
      ...socials,
      [e.target.name]: filteredValue,
    });
  }, [socials]);
  /// / reduct achieve object
  const redactAchieveObject = useCallback((e: ChangeEvent<any>, index?: number) => {
    const copyArr = structuredClone(achievements);
    const changeObject = copyArr[index!];
    switch (e.target.name) {
      case 'achieveName': {
        changeObject.achievement_name = e.target.value;
        setAchievements(copyArr);
        break;
      }
      case 'result': {
        changeObject.description = e.target.value;
        setAchievements(copyArr);
        break;
      }
    }
  }, [achievements]);

  const addNewObjectToAchieves = useCallback(() => {
    const copyArr = [...achievements];
    copyArr.push({
      achievement_name: '',
      description: '',
      image: '',
    });
    setAchievements(copyArr);
  }, [achievements]);

  const submitAchievements = useCallback(async (index: number) => {
    try {
      const currentSavedObject = achievements[index];
      currentSavedObject.id
        ? await updateAchievement({ achieve: currentSavedObject, userId: data?.id!, achieveId: currentSavedObject.id })
        : await createAchievements({ achieve: currentSavedObject, userId: data?.id! });
    } catch (err) {
      console.log(err);
    }
  }, [achievements]);

  const deleteObjInAchievements = useCallback(async (index: number, pos: number) => {
    if (!index) {
      const copyArr = structuredClone(achievements);
      copyArr.splice(pos, 1);
      setAchievements(copyArr);
      return;
    }
    try {
      await deleteAchievement({ userId: data?.id!, achieveId: index });
    } catch (err) {
      console.log(err);
    }
  }, [achievements]);
  /// redact test object
  const redactTestObject = useCallback((e: ChangeEvent<any>, index?: number) => {
    const copyArr = [...tests];
    const changeObject = copyArr[index!];
    const copyChangeObject = { ...changeObject };
    switch (e.target.name) {
      case 'testName': {
        copyArr[index!] = { ...copyChangeObject, test_name: e.target.value };
        setTestToArr(copyArr);
        break;
      }
      case 'result': {
        copyArr[index!] = { ...copyChangeObject, result: e.target.value };
        setTestToArr(copyArr);
        break;
      }
    }
  }, [tests]);

  const addNewObjectToTest = useCallback(() => {
    const copyArr = [...tests];
    copyArr.push({
      test_name: '',
      result: '',
      image: '',
    });
    setTestToArr(copyArr);
  }, [tests]);

  const deleteObjInTests = useCallback(async (index: number, pos: number) => {
    if (!index) {
      const copyArr = structuredClone(tests);
      copyArr.splice(pos, 1);
      setTestToArr(copyArr);
      return;
    }
    try {
      await deleteTestObject({ userId: data?.id!, eduId: index });
    } catch (err) {
      console.log(err);
    }
  }, [tests]);

  const submitTests = useCallback(async (index: number) => {
    try {
      const currentSavedObject = tests[index];
      currentSavedObject.id
        ? await updateTestObject({ eduObj: currentSavedObject, userId: data?.id!, eduId: currentSavedObject.id })
        : await createTestObject({ eduObj: currentSavedObject, userId: data?.id! });
    } catch (err) {
      console.log(err);
    }
  }, [tests]);
  /// redact education objects
  const redactEduObjectInArr = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
    const copyArr = structuredClone(eduObjectsArr);
    const changeObject = copyArr[index!];
    switch (e.target.name) {
      case 'educationName': {
        copyArr[index!] = { ...changeObject, organization_name: e.target.value };
        setValuesOfEduObjectsArr(copyArr);
        break;
      }
      case 'speciality': {
        copyArr[index!] = { ...changeObject, speciality: e.target.value };
        setValuesOfEduObjectsArr(copyArr);
        break;
      }
      case 'educationEnd': {
        copyArr[index!] = { ...changeObject, education_end_year: e.target.value };
        setValuesOfEduObjectsArr(copyArr);
        break;
      }
    }
  }, [eduObjectsArr]);

  const addNewObjectToEduArr = useCallback(() => {
    const copyArr = [...eduObjectsArr];
    copyArr.push({
      organization_name: '',
      speciality: '',
      education_end_year: '',
      image: '',
    });
    setValuesOfEduObjectsArr(copyArr);
  }, [eduObjectsArr]);

  const deleteObjectInEduArr = useCallback(async (index: number, pos: number) => {
    if (!index) {
      const copyArr = structuredClone(eduObjectsArr);
      copyArr.splice(pos, 1);
      setValuesOfEduObjectsArr(copyArr);
      return;
    }
    try {
      await deleteEducationObject({ userId: data?.id!, eduId: index });
    } catch (err) {
      console.log(err);
    }
  }, [eduObjectsArr]);

  const submitEducation = useCallback(async (index: number) => {
    try {
      const currentSavedObject = eduObjectsArr[index];
      currentSavedObject.id
        ? await updateEducationObject({ eduObj: currentSavedObject, userId: data?.id!, eduId: currentSavedObject.id })
        : await createEducationObj({ eduObj: currentSavedObject, userId: data?.id! });
    } catch (err) {
      console.log(err);
    }
  }, [eduObjectsArr]);

  /// / set skills in skillsarr
  const setSkillInSoftArr = useCallback((el: string) => {
    if (el === '' || softSkills.includes(el)) { return; }
    const copyArr = [...softSkills];
    copyArr.push(el);
    setSoftSkills(copyArr);
  }, [softSkills]);

  const deleteSkillInSoftSkillsArr = useCallback((tagId: number, index: number) => {
    const copyArr = [...softSkills];
    copyArr.splice(tagId, 1);
    setSoftSkills(copyArr);
  }, [softSkills]);

  const setSkillInHardArr = useCallback((el: string) => {
    if (el === '' || hardSkills.includes(el)) { return; }
    const copyArr = [...hardSkills];
    copyArr.push(el);
    setHardSkills(copyArr);
  }, [hardSkills]);

  const deleteSkillInHardSkillsArr = useCallback((tagId: number, index: number) => {
    const copyArr = [...hardSkills];
    copyArr.splice(tagId, 1);
    setHardSkills(copyArr);
  }, [hardSkills]);

  /// get File and make string for src
  const makeFileForDownload = useCallback((e: ChangeEvent<HTMLInputElement>, index?: number) => {
    switch (e.target.name) {
      case 'ava': {
        const reader = new FileReader();
        if (/\.(jpe?g|png)$/i.test(e.target.files![0].name)) {
          reader.readAsDataURL(e.target.files![0]);
          reader.addEventListener('load', () => setAvatar(reader.result!));
        } else {
          toast.error('Необходим jpg или png файл');
        }
        break;
      } case 'education': {
        const reader = new FileReader();
        try {
          reader.readAsDataURL(e.target.files![0]);
          reader.addEventListener('load', () => {
            const arrCopy = structuredClone(eduObjectsArr);
            const currentChangeObject = arrCopy[index!];
            currentChangeObject.image = reader.result! as string;
            setValuesOfEduObjectsArr(arrCopy);
          });
        } catch (err) {
          toast.error('Что то пошло не так');
        }
        break;
      }
      case 'tests': {
        const reader = new FileReader();
        try {
          reader.readAsDataURL(e.target.files![0]);
          reader.addEventListener('load', () => {
            const arrCopy = structuredClone(tests);
            const currentChangeObject = arrCopy[index!];
            currentChangeObject.image = reader.result! as string;
            setTestToArr(arrCopy);
          });
        } catch (err) {
          toast.error('Что то пошло не так');
        }
        break;
      } case 'achieve': {
        const reader = new FileReader();
        try {
          reader.readAsDataURL(e.target.files![0]);
          reader.addEventListener('load', () => {
            const arrCopy = structuredClone(achievements);
            const currentChangeObject = arrCopy[index!];
            currentChangeObject.image = reader.result! as string;
            setAchievements(arrCopy);
          });
        } catch (err) {
          toast.error('Что то пошло не так');
        }
        break;
      }
    }
  }, [tests, eduObjectsArr, userAvatar, achievements]);

  const checkSocialError = () => [socials.git, socials.vk, socials.tg].every((el) => el === '');
  const checkSoftSkillsError = () => softSkills.length === 0;
  const checkHardSkillsError = () => hardSkills.length === 0;

  const submit = async (obj: TUser) => {
    if (/* checkHardSkillsError() || checkSoftSkillsError() || */ checkSocialError()) return;
    try {
      await updateUser({

        full_name: obj.full_name,
        avatar: userAvatar as string,
        achievements,
        birth_date: obj.birth_date,

        address: obj.address,
        vk: socials.vk,
        telegram: socials.tg,
        github: socials.git,
        hard_skills: hardSkills,
        soft_skills: softSkills,
        team_work_experience: expirience,

      }).unwrap();

      navigate('/profile-info');
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (data) {
      setValue('full_name', data.full_name || '');
      setValue('birth_date', data.birth_date || '');
      setValue('address', data.address || '');
      setAvatar(data.avatar || '');
      setExpirience(data.team_work_experience || '');
      setSocialToObject({ vk: data.vk || '', tg: data.telegram || '', git: data.github || '' });
      setHardSkills(data.hard_skills || []);
      setSoftSkills(data.soft_skills || []);
      setValuesOfEduObjectsArr(data.educations?.length === 0 ? [{
        organization_name: '',
        speciality: '',
        education_end_year: '',

        image: '',
      },
      ] : (data.educations || []));
      setTestToArr(data.tests?.length === 0 ? [
        {
          test_name: '',
          result: '',

          image: '',
        },
      ] : (data.tests || []));
      setAchievements(data?.achievements?.length === 0 ? [{
        achievement_name: '',
        description: '',
        image: '',
      },
      ] : (data.achievements || []));
    }
  }, [data]);

  const setExpToState = (e: ChangeEvent<HTMLTextAreaElement>, index?: number) => {
    const exp = e.target.value;
    setExpirience(exp);
  };
  return (
    data ? <Skeleton1 />
      : (
        <NewBaseSection title='Личный кабинет' goBackFunc={() => navigate('/')}>
          <NewAvatar
            setImageFile={makeFileForDownload}
            placeholder='Добавьте Ваше фото'
            image={userAvatar || avatarDefault} />
          <Form onSubmit={handleSubmit(submit)}>
            <FieldSet>
              <Legend>Личные данные</Legend>
              <BasicInput
                forRequired
                name='full_name'
                type='text'
                label='Фамилия Имя'
                errorMessage={errors?.full_name?.message as string}
                options={{
                  required: 'Заполните поле',
                  minLength: {
                    value: 2,
                    message: 'Данные введены не полностью',
                  },
                  pattern: {
                    /* value: /^[А-Яёа-я]+$/, */
                    message: 'Некорректное значение',
                  },
                }}
                register={register} />
              <InputWrapper>
                <DateInput
                  control={control}
                  mask={[/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/]}
                  placeholder='11.11.2023'
                  forRequired
                  name='birth_date'
                  label='Дата рождения'
                  errorMessage={errors?.birth_date?.message as string}
                  options={{
                    required: 'Заполните поле',
                    minLength: {
                      value: 1,
                      message: 'Данные введены не полностью',
                    },
                    onChange(event: any) {
                      console.log(errors);
                    },
                  }}
                  register={register} />
                <BasicInput
                  forRequired
                  placeholder='Введите своё фактическое место проживания'
                  name='address'
                  type='text'
                  label='Место проживания'
                  errorMessage={errors?.address?.message as string}
                  options={{
                    required: 'Заполните поле',
                    minLength: {
                      value: 2,
                      message: 'Данные введены не полностью',
                    },
                  }}
                  register={register} />
              </InputWrapper>
              <SocialsInputs
                isErrorFlag={checkSocialError() && isSubmitted}
                tg={socials.tg}
                git={socials.git}
                vk={socials.vk}
                onChange={setSocialValue} />
              <Details open>
                <Summary>Hard skills/опыт</Summary>
                {/* <InputWithTags
                  hasError={checkHardSkillsError() && isSubmitted}
                  setTagToArray={setSkillInHardArr}
                  deleteTagFromArray={deleteSkillInHardSkillsArr}
                  forRequired
                  label='Hard skills'
                  name='hardSkills'
                  type='text'
                  placeholder='Напишите hard skill. Например: Figma'
                  maxLength={180}
                  tags={hardSkills} /> */}
              </Details>
              <Details open>
                <Summary>Образование</Summary>
                <AnimatedWrapper>
                  <NewEducationBlock
                    submitEducation={submitEducation}
                    deleteFunc={deleteObjectInEduArr}
                    onChange={redactEduObjectInArr}
                    fileOnChange={makeFileForDownload}
                    addOption={addNewObjectToEduArr}
                    text='Образование и курсы'
                    coursesList={eduObjectsArr}
                    nameOfInputForFile='education' />
                </AnimatedWrapper>
              </Details>
              <Details open>
                <Summary>Soft skills</Summary>
                <AnimatedWrapper>
                  {/* <InputWithTags
                    hasError={checkSoftSkillsError() && isSubmitted}
                    setTagToArray={setSkillInSoftArr}
                    deleteTagFromArray={deleteSkillInSoftSkillsArr}
                    forRequired
                    label='Soft skills'
                    name='softSkills'
                    type='text'
                    placeholder='Напишите soft skill. Например: упорство'
                    maxLength={50}
                    tags={softSkills || []} /> */}
                  <TextAreaWithNoValidation
                    name='teamExp'
                    label='Опыт взаимодействия в команде'
                    maxLength={1000}
                    value={expirience}
                    placeholder='Расскажите про Ваш опыт взаимодействия в команде за все время. Как вы взаимодействовали ? Какая рабочая атмосфера Вам наиболее подходит? '
                    height={160}
                    onChange={setExpToState} />
                </AnimatedWrapper>
              </Details>
              <Details open>
                <Summary>Тесты soft skills</Summary>
                <AnimatedWrapper>
                  <NewBlockForTests
                    submitTestObject={submitTests}
                    deleteFunc={deleteObjInTests}
                    testsList={tests}
                    inputName='tests'
                    text='Тесты soft skills'
                    onChange={redactTestObject}
                    fileOnChange={makeFileForDownload}
                    addOption={addNewObjectToTest} />
                </AnimatedWrapper>
              </Details>
              <Details open>
                <Summary>Достижения</Summary>
                <BlockForAchievements
                  onChange={redactAchieveObject}
                  addOption={addNewObjectToAchieves}
                  achievementsList={achievements}
                  fileOnChange={makeFileForDownload}
                  deleteFunc={deleteObjInAchievements}
                  submitAchievements={submitAchievements} />
              </Details>
            </FieldSet>
            <UniversalButton
              id='submit'
              style={{ alignSelf: 'end' }}
              type='submit'
              textColor={Themes[theme].mainTextColor}
              backColor={Themes[theme].sliderColor}
              borderColor=''
              paddingLeft={44}
              paddingTop={20}>
              Сохранить
            </UniversalButton>
          </Form>
        </NewBaseSection>
      )
  );
};

export default ProfileV2;

/* onChange,
  addOption,
  achievementsList,
  submitAchievements,
  deleteFunc,
  fileOnChange, */
