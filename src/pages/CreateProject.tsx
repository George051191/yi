/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/always-return */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable import/no-named-as-default */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, {
  FC, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import styled from 'styled-components';
import {
  useLocation,
  useNavigate, useParams,
} from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
import {
  setMany, getMany, clear, delMany,
} from 'idb-keyval';
import { ArrowIcon, AddIcon, CrossIcon } from '../ui-lib/icons';
import SliderComponent from '../ui-lib/widgets/Slider';
import Button from '../ui-lib/Button';
import 'react-toastify/dist/ReactToastify.css';
import InputComponent from '../ui-lib/InputComponent';
import TeamMatePlate from '../ui-lib/TeamMatePlate';
import BigTextField from '../ui-lib/BigTextField';
import { FileInput, Label as FileLabel, ButtonForFileAdd } from '../ui-lib/widgets/HiddenContainer';
import CrewBox from '../ui-lib/CrewBox';
import Select from '../ui-lib/Select';
import SelectWithPlural from '../ui-lib/SelectWithPlural';
import { projectDirections } from '../constants/textsForLanding';
import PromptHidden from '../ui-lib/HiddenPrompt';
import {
  useLazyGetUserProjectByIdQuery, useCreateProjectMutation, useUpdateProjectMutation, jwt, useGetCurrentUserQuery,
} from '../api/api';
import { TProject } from '../types/apiTypes';
import { makeToast } from '../helpers/promts';
import { RoundBackButton } from '../ui-lib/Buttons';
import { Skeleton2 } from '../ui-lib/widgets/Skeleton';
import BaseSection from '../ui-lib/widgets/BaseSection';
import { SectionHeader } from '../ui-lib/TextBlocks';
import { CustomPropsBreadcrumb } from './CreateDiploma';

const Plate = styled.div`
     border-radius: 91px;
     padding-top: 36px;
     gap:79px;
     width: 100%;
     padding-inline: 80px;
     box-sizing: border-box;
     position: relative;
     display: flex;
     background-color: ${({ theme: { plateColor } }) => plateColor};
     padding-bottom: 36px;
     margin-bottom: 87px;
     justify-content: center;
`;

const SliderContainer = styled.div`
  display: flex;
  gap: 60px;
  width: 65%;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  max-width: 888px ;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CheckBoxInput = styled.input`
    z-index: -100;
    position: absolute;

    
`;
const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  width: 100%;
`;

const Label = styled.label<{ isChecked: boolean }>`
    position: relative;
    display: flex;
    gap: 15px;
    color: ${({ theme: { mainTextColor } }) => mainTextColor};;
    font-family: 'TTTravels';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    align-items: center;
    justify-content: flex-start;
    border: ${({ theme: { mainButtonColor } }) => `1px solid ${mainButtonColor}`};
    background-color: ${({ isChecked, theme: { mainButtonColor, mainBg } }) => (isChecked ? mainButtonColor : 'transparent')}; 
    width: 50px;
    height: 30px;
    border-radius: 40px;
    cursor: pointer;
    & span {
        transform: ${({ isChecked }) => (isChecked ? 'translateX(30px)' : 'translateX(6px)')};
        background-color: ${({ theme: { plateColor }, isChecked }) => (isChecked ? plateColor : 'transparent')}
    }
`;

const Switcher = styled.span`
    border-radius: 50px;
    width: 15px;
    height: 15px;
    transition: all ease .2s;
   
    background-color: transparent;
    border: ${({ theme: { mainButtonColor } }) => `1px solid ${mainButtonColor}`};
`;

const P = styled.p`
  color: ${({ theme: { mainTextColor } }) => mainTextColor};;
  font-family: 'TTTravels';
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin: 0;
  cursor: pointer;
`;

const Div = styled.div`
  display: flex;
  gap: 35px;
`;

const FieldSet = styled.fieldset`
  border: none;
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 550px;
`;

const ControlBox = styled.div`
  gap: 18px;
  display: inline-flex;
  flex-direction: column;
  width: 100%;
  align-self: center;
  align-items:center;
`;

const CustomAddButton = styled(ButtonForFileAdd) <{ isOrange: boolean }>`
  background-color: ${({ theme: { sliderColor, mainButtonColor }, isOrange }) => (isOrange ? sliderColor : mainButtonColor)};
  color:  ${({ theme: { mainBg, mainTextColor }, isOrange }) => (isOrange ? mainTextColor : mainBg)};
  border: none;
  cursor: pointer;
  padding: 20px 44px;
`;

const CustomReductButton = styled(CustomAddButton)`
   background-color: ${({ theme: { sliderColor, mainButtonColor }, isOrange }) => (!isOrange ? sliderColor : mainButtonColor)};
  color:  ${({ theme: { mainBg, mainTextColor }, isOrange }) => (!isOrange ? mainTextColor : mainBg)};
  border: none;
  cursor: pointer;
  padding: 20px 44px;
`;

const LabelForStatus = styled.label`
    color: ${({ theme: { mainTextColor } }) => mainTextColor};
    font-family: 'TTTravels';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 23px;
    `;

const AddButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: ${({ theme: { mainTextColor } }) => `1px solid ${mainTextColor}`};
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self:center;
`;

const TeamContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 23px;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 504px;
`;

export const LinkForFileLoad = styled.a`
    color: ${({ theme: { mainTextColor } }) => mainTextColor};
    font-family: 'TTTravels';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-decoration: none;
    align-self: flex-start;
    @media screen and (max-width:1000px) {
      font-size: 14px;
    }
`;
const FakeElement = styled.div`
  width: 90px;
  height: 43px;
`;
const StageBox = styled.span`
  position: absolute;
  cursor: help;
  top:37px;
  right: 60px;
  border-radius: 25px;
  background-color: rgb(243, 160, 59, 0.4);
  color: #F3A03B;
  width: 79px;
  height: 64px;
  font-family: 'TTTravels';
  font-size: 25px;
  font-style: normal;
  font-weight: 600;
  line-height: 80%;
  letter-spacing: -0.625px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CreateProject: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [nameError, setNameError] = useState<string>('');
  const [isSubmited, setSubmit] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const [isForPublish, setPublish] = useState(false);
  const [workStatus, setWorkStatus] = useState(false);
  const [doneStatus, setDoneStatus] = useState(false);
  const [projectDate, setProjectDate] = useState<Date | string>('');
  const [file, setFile] = useState<File | any>('');
  const [aboutFile, setAboutFile] = useState<any>('');
  const [imageArray, setImageToArray] = useState<any>([]);
  const [imageFile, setImageFile] = useState<any>('');
  const [value, getValue] = useState<string>('');
  const [stageValue, getStageValue] = useState<string>('');
  const [achieveValue, getAchieveValue] = useState<string[]>([]);
  const [teamArray, setTeamArray] = useState<{ spec: string, task: string, forMoney: boolean, level: string }[]>([]);
  const [currentOpenIndex, setCurrentIndex] = useState(-1);
  const [isHiddenStageOpen, openHiddenStage] = useState(false);
  const [crew, setCrew] = useState<{ id: number | string, name: string, speciality: string }[]>();
  const { id } = useParams();
  const [permission, givePermission] = useState<boolean>(false);
  const [valueObject, setValueToObject] = useState<{ projectName?: string, idea?: string, conception?: string }>({ projectName: '', idea: '', conception: '' });
  const [getUserProjectById, { data: curProject, status: getStatus, isLoading: loading }] = useLazyGetUserProjectByIdQuery();
  const [createProject, { status, isLoading }] = useCreateProjectMutation();
  const [updateProject, { status: updateStatus, isLoading: updateLoading }] = useUpdateProjectMutation();
  const { data, error } = useGetCurrentUserQuery();

  const setValueForSelectFields = (direction: string) => {
    if (direction === value) { getValue(''); return; }
    getValue(direction);
  };

  const openAndClose = useCallback((index: number) => {
    if (permission) { return; }
    setCurrentIndex(index === currentOpenIndex ? -1 : index);
  }, [currentOpenIndex, permission]);
  const calculateexpertsFullness = () => {
    if (teamArray.length !== 0) {
      if (teamArray.some((el) => {
        const condition1 = el.task === '';
        const condition2 = el.level === '';
        const condition3 = el.spec === '';
        return condition1 || condition2 || condition3;
      })) {
        return 0;
      } return 1.2;
    }
  };

  const checkAndFillValue = useCallback((inputValue: any, name?: string) => {
    setValueToObject({ ...valueObject, [name!]: inputValue });
  }, [valueObject]);
  const firstOptionsArr = useMemo(() => ['Идея',
    'Концепция',
    'Прототип',
    'MVP',
    'Первые продажи',
    'Масштабирование',
  ], []);
  const secondOptionArr = useMemo(() => ['Выигран крупный грант',
    'Привлечены венчурные инвестиции',
    'Пройдена акселерационная программа',
    'Выигран крупный конкурс',
    'Есть весомый партнёр',
    'Есть крупный заказчик',
    'Вышли на международный уровень',
    'Нет достижений',
    'Другое',
  ].filter((el) => achieveValue.indexOf(el) === -1), [achieveValue]);
  const calculateFieldFilling = () => {
    const stringFields = 8;
    const arrFullness = calculateexpertsFullness();
    const achives = achieveValue[0] ?? '';
    // const image = imageArray[0] ?? '';
    const notEmptyFields = [
      projectDate,
      valueObject.projectName,
      valueObject.conception,
      // aboutFile,
      // image,
      value,
      valueObject.idea,
      stageValue,
      achives].filter((el) => {
      const firstCondition = el !== '';
      const secondCondition = el !== undefined;
      return firstCondition && secondCondition;
    }).length;
    const stringPercentage = (notEmptyFields / stringFields) * 100 + (arrFullness! || 0) * 10;
    return Math.round(stringPercentage);
  };

  const deleteTeamMate = (index: number) => {
    if (permission) { return; }
    const copyArr = [...teamArray];
    copyArr.splice(index, 1);
    setTeamArray(copyArr);
  };
  const addNewTeamMate = () => {
    const copyArr = [...teamArray];
    copyArr.push({
      spec: '', task: '', forMoney: false, level: '',
    });
    setTeamArray(copyArr);
  };

  const setSpecInTeamPlate = (item: string, key1?: any, key2?: any, index?: number) => {
    const teamMate = teamArray[index!];
    const teamMateCopy = { ...teamMate };
    const teamArrayCopy = [...teamArray];
    teamMateCopy.spec === item ? teamMateCopy.spec = '' : teamMateCopy.spec = item;
    teamArrayCopy.splice(
      index!,
      1,
      {
        spec: teamMateCopy.spec, task: teamMateCopy.task, forMoney: teamMateCopy.forMoney, level: teamMateCopy.level,
      },
    );
    setTeamArray(teamArrayCopy);
  };

  const setTaskInItem = (key: string, name?: string, smt?: number) => {
    const teamMate = teamArray[smt!];
    const teamMateCopy = { ...teamMate };
    const teamArrayCopy = [...teamArray];
    teamMateCopy.task = key!;
    teamArrayCopy.splice(
      smt!,
      1,
      {
        spec: teamMateCopy.spec, task: teamMateCopy.task, forMoney: teamMateCopy.forMoney, level: teamMateCopy.level,
      },
    );
    setTeamArray(teamArrayCopy);
  };

  const setLevelInItem = (index: number, item: string) => {
    const teamMate = teamArray[index];
    const teamMateCopy = { ...teamMate };
    const teamArrayCopy = [...teamArray];
    teamMateCopy.level = item;
    teamArrayCopy.splice(
      index,
      1,
      {
        spec: teamMateCopy.spec, task: teamMateCopy.task, forMoney: teamMateCopy.forMoney, level: teamMateCopy.level,
      },
    );
    setTeamArray(teamArrayCopy);
  };

  const setForMoney = (index: number, item: boolean) => {
    if (permission) { return; }
    const teamMate = teamArray[index];
    const teamMateCopy = { ...teamMate };
    const teamArrayCopy = [...teamArray];
    teamMateCopy.forMoney = item;
    teamArrayCopy.splice(
      index,
      1,
      {
        spec: teamMateCopy.spec, task: teamMateCopy.task, forMoney: teamMateCopy.forMoney, level: teamMateCopy.level,
      },
    );
    setTeamArray(teamArrayCopy);
  };

  const setFileToArray = useCallback(() => {
    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.addEventListener('load', () => {
        setAboutFile(reader.result);
      });
    }
    if (imageFile) {
      const reader = new FileReader();
      if (/\.(jpe?g|png)$/i.test(imageFile.name)) {
        reader.readAsDataURL(imageFile);
        reader.addEventListener('load', () => {
          const arrCopy = [...imageArray];
          arrCopy.push(reader.result);
          setImageToArray(arrCopy);
        });
      } else {
        toast.error('Необходим jpg или png файл');
        setImageFile('');
      }
    }
  }, [file, imageFile]);

  useEffect(() => {
    setFileToArray();
  }, [file, aboutFile, imageFile]);

  const setStatesValues = (obj: TProject) => {
    setValueToObject({
      projectName: obj.name,
      idea: obj.idea,
      conception: obj.description,
    });
    setPublish(obj.isPublished);

    setProjectDate(obj.year);

    setAboutFile(obj.file);
    setImageToArray(obj.images);
    getValue(obj.division);

    getStageValue(obj.stage);
    getAchieveValue(obj.achievements);
    setTeamArray(obj.experts);
    setCrew(obj.team);
    if (obj.status === 'done') {
      setWorkStatus(false);
      setDoneStatus(true);
    } else {
      setWorkStatus(true);
      setDoneStatus(false);
    }
  };
  useEffect(() => {
    if (valueObject.projectName === '' || valueObject.projectName === null || valueObject.projectName === undefined || valueObject.projectName.length <= 2) {
      setNameError('Название должно содержать минимум 2 символа');
    } else { setNameError(''); }
  }, [valueObject.projectName]);

  useEffect(() => {
    const setAllValues = async (index: string | number) => {
      try {
        const currentProject = await getUserProjectById(index).unwrap();
        setStatesValues(currentProject);
      } catch (err: any) {
        toast.error('Перезагрузите страницу');
      }
    };
    id ? setAllValues(id) : setCrew([{ id: data?.id!, speciality: 'Основатель', name: 'jhjhj' }]);
  }, [id, isLoading, data]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!jwt.test()) {
      navigate('/registration');
      return;
    }
    if (permission) {
      givePermission(false);
      return;
    }
    setSubmit(true);
    /*  if (teamArray.some((el) => {
       const condition1 = el.task === '';
       const condition2 = el.level === '';
       return condition1 || condition2;
     })) { return; }
     if ([nameError, directionError, ideaError, conceptionError, stageError, statusError].some((el) => el !== '')) { return; } */
    if (nameError) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const fullness = calculateFieldFilling();
    const createUpdateObj = {
      projectId: id,
      name: valueObject.projectName!,
      idea: valueObject.idea!,
      status: doneStatus ? 'done' : 'inProcess',
      stage: stageValue,
      achievements: achieveValue,
      year: projectDate,
      division: value,
      images: imageArray,
      file: aboutFile,
      description: valueObject.conception!,
      experts: teamArray,
      descriptionFullness: fullness,
      isPublished: isForPublish,
    };

    try {
      id || allDone
        ? await updateProject(createUpdateObj)
        : await createProject(createUpdateObj);
      setAllDone(true);
      delMany(['projectName', 'direction', 'idea', 'conception', 'stage', 'achieves', 'images']);
      navigate('/projects-list');
    } catch (err: any) {
      console.log('Перезагрузите страницу');
    }
  };
  useEffect(() => {
    makeToast(null, updateStatus);
  }, [updateStatus]);

  useEffect(() => {
    makeToast(error, status);
  }, [error, status]);

  const setValueToAchieves = useCallback((el: string) => {
    if (achieveValue.includes('Нет достижений') || el === 'Нет достижений') {
      getAchieveValue(['Нет достижений']);
      setCurrentIndex(-1);
      return;
    }
    const copyArr = [...achieveValue];
    copyArr.push(el);
    getAchieveValue(copyArr);
  }, [achieveValue]);

  const listener = (e: any) => {
    if (e.target.id === 'main' || e.target.id === 'expertsect') {
      setCurrentIndex(-1);
    }
  };

  useEffect(() => {
    document.addEventListener('click', listener);
    return () => {
      document.removeEventListener('click', listener);
    };
  }, []);
  /// / autosave
  const setDataToDB = (val1: any, val2: any, val3: any, val4: any, val5: any, val6: any, val7: any, val8: any) => {
    if (id) { return; }
    setMany([
      ['projectName', val1],
      ['idea', val3],
      ['conception', val4],
      ['direction', val2],
      ['stage', val5],
      ['achieves', val6],
      ['images', val7],
    ]);
  };
  const timer = useRef<string | number | NodeJS.Timeout | undefined>();
  useEffect(() => {
    clearTimeout(timer.current);

    timer.current = setTimeout(setDataToDB, 1000, valueObject.projectName, value, valueObject.idea, valueObject.conception, stageValue, achieveValue, imageArray, projectDate);
  }, [value, valueObject.projectName, valueObject.idea, valueObject.conception, stageValue, achieveValue, imageArray, projectDate]);

  const setValuesFromDB = () => {
    if (id) { return; }
    getMany(['projectName', 'direction', 'idea', 'conception', 'stage', 'achieves', 'images']).then(([firstVal, secondVal, thirdVal, fourthVal, fivthVal, sixVal, sevenVal, eightVal]) => {
      setValueToObject({ idea: thirdVal, conception: fourthVal, projectName: firstVal });
      getValue(secondVal);
      getStageValue(fivthVal);
      getAchieveValue(sixVal || []);
      setImageToArray(sevenVal || []);
    });
  };
  useEffect(() => {
    setValuesFromDB();
  }, []);
  useEffect(() => {
    if (id) { givePermission(true); }
  }, [getStatus]);
  const deleteAchieve = useCallback((idx: number) => {
    if (permission) { return; }
    const copyArr = [...achieveValue];
    copyArr.splice(idx, 1);
    getAchieveValue(copyArr);
  }, [achieveValue, permission]);

  const makeStatusForWork = useCallback(() => {
    setDoneStatus(false);
    setWorkStatus(!workStatus);
  }, [workStatus]);

  const makeStatusForDone = useCallback(() => {
    setWorkStatus(false);
    setDoneStatus(!doneStatus);
  }, [doneStatus]);

  const findPathName = () => [
    { path: '/projects-list/:id', breadcrumb: CustomPropsBreadcrumb, props: { text: (curProject?.name || '') } },
  ];

  return (
    loading
      ? <Skeleton2 />
      : (
        <BaseSection routes={findPathName()}>
          <RoundBackButton top={0} left={40} onClick={() => navigate(location.state || '/projects')}><ArrowIcon /></RoundBackButton>
          <FakeElement />
          <Plate id='expertsect'>
            <StageBox onMouseLeave={() => openHiddenStage(false)} onMouseOver={() => openHiddenStage(true)}>
              {isHiddenStageOpen
            && (
              <PromptHidden
                text='Заполни более 35%, чтобы проект перенёсся в личный кабинет членов команды'
                top={0}
                left={-285}
                width='320px' />

            )}
              {calculateFieldFilling()}
              %
            </StageBox>

            <SliderContainer id='expertsect'>
              <SliderComponent imagesArray={imageArray} width={290} height={325} />
              <CustomAddButton isOrange={false} type='button'>
                Добавить файл с устройства
                <FileLabel htmlFor='imagefile' />
                <FileInput
                  type={permission ? 'text' : 'file'}
                  onChange={(e) => { setImageFile(e.target.files![0]); }}
                  id='imagefile'
                  name='imagefile' />
              </CustomAddButton>
            </SliderContainer>
            <Form id='expertsect' onSubmit={(e) => onSubmit(e)}>
              {/* <ContainerForInput>
            <NameInput
              disabled={permission}
              onChange={(e) => checkAndFillValue(e.target.value, e.target.name)}
              value={valueObject.projectName || ''}
              type='text'
              maxLength={60}
              name='projectName'
              placeholder='Название проекта' />
            {nameError && isSubmited && <Error>{nameError}</Error>}
          </ContainerForInput> */}

              <FieldSet>
                <InputComponent
                  onChange={(e) => checkAndFillValue(e.target.value, e.target.name)}
                  inputValue={valueObject.projectName || ''}
                  type='text'
                  isSubmited={isSubmited}
                  disabled={permission}
                  name='projectName'
                  errorMessage={nameError}
                  label='Название проекта' />
                <SelectWithPlural
                  idx={0}
              /* error={directionError} */
                  arr={projectDirections}
                  name='select'
                  label='Направление'
                  value={value || ''}
                  isSubmited={isSubmited}
                  getValue={setValueForSelectFields}
                  isOpen={currentOpenIndex === 0}
                  openSelect={openAndClose} />
                <BigTextField
                  isSubmited={isSubmited}
              /* error={ideaError} */
                  length={180}
                  value={valueObject.idea}
                  name='idea'
                  disabled={permission}
                  label='Идея проекта'
                  onChange={checkAndFillValue} />
                <InputComponent
                  onChange={(e) => setProjectDate(e.target.value)}
                  inputValue={projectDate || ''}
                  value={projectDate || ''}
                  type='date'
                  disabled={permission}
                  name='year'
                  label='Дата начала работы над проектом' />

                <StatusContainer>
                  <LabelForStatus>Статус</LabelForStatus>
                  <Div style={{ marginBottom: '28px', alignItems: 'center' }}>
                    <Label
                      htmlFor='work'
                      isChecked={workStatus}>
                      <CheckBoxInput
                        disabled={permission}
                        type='checkbox'
                        id='work'
                        onChange={makeStatusForWork} />
                      <Switcher />
                    </Label>
                    <P onClick={makeStatusForWork}>В работе</P>
                  </Div>
                  <Div style={{ alignItems: 'center' }}>
                    <Label
                      htmlFor='done'
                      isChecked={doneStatus}>
                      <CheckBoxInput
                        disabled={permission}
                        type='checkbox'
                        id='done'
                        onChange={makeStatusForDone} />
                      <Switcher />
                    </Label>
                    <P onClick={makeStatusForDone}>Завершен</P>
                  </Div>
                  {/* {statusError && isSubmited && <Error style={{ marginTop: '10px' }}>{statusError}</Error>} */}
                </StatusContainer>
                <Box>
                  <Select
                    isSubmited={isSubmited}
                /*      error={stageError} */
                    openSelect={openAndClose}
                    idx={1}
                    isOpen={currentOpenIndex === 1}
                    name='stage'
                    label='Стадия проекта'
                    getValue={getStageValue}
                    optionArr={firstOptionsArr}
                    value={stageValue || ''} />
                  <Select
                    height='auto'
                    optionArr={secondOptionArr}
                    value=''
                    array={achieveValue}
                    isWithList={achieveValue.length > 0}
                    getValue={setValueToAchieves}
                    label='Достижения'
                    name='achieve'
                    deleteOption={deleteAchieve}
                    idx={2}
                    isOpen={currentOpenIndex === 2}
                    openSelect={openAndClose} />
                </Box>

                {/*  под вопросом это поле, скорей всего будут аватарки с именами пользователей, ведущие на их портфолио */}
                {crew !== undefined && crew.length !== 0 && (
                <CrewBox crew={crew} />
                )}
                {/*  здесь меняй дизайн этого поля, оно может ьыть оч большим */}
                <TeamContainer>
                  <LabelForStatus>Требуемые специалисты</LabelForStatus>
                  {teamArray.map((el, index) => (
                    <TeamMatePlate
                      width={175}
                      spec={el.spec || ''}
                      withCross
                      deleteItem={() => deleteTeamMate(index)}
                      index={index}
                      callback4={setSpecInTeamPlate}
                      disabled={permission}
                      isSubmited={isSubmited}
                      callback2={setForMoney}
                      value2={el.forMoney}
                      value1={el.task || ''}
                      value3={el.level || ''}
                      callback3={setLevelInItem}
                      callback1={setTaskInItem} />
                  ))}

                  {!permission && <AddButton type='button' onClick={addNewTeamMate}><AddIcon /></AddButton>}
                </TeamContainer>

                <BigTextField
                  specGap
              /* error={conceptionError} */
                  isSubmited={isSubmited}
                  length={10000}
                  value={valueObject.conception}
                  name='conception'
                  disabled={permission}
                  label='Описание концепции'
                  onChange={checkAndFillValue} />
                <ControlBox>
                  {!aboutFile ? <LabelForStatus style={{ textDecoration: 'none', alignSelf: 'start', marginBottom: '0px' }}>Добавить дополнительный файл:</LabelForStatus>
                    : <LinkForFileLoad download href={aboutFile}>{file.name}</LinkForFileLoad>}
                  <CustomAddButton isOrange={false} type='button'>
                    Добавить файл с устройства
                    <FileLabel htmlFor='file' />
                    <FileInput
                      type={permission ? 'text' : 'file'}
                      onChange={(e) => { e.preventDefault(); setFile(e.target.files![0]); }}
                      id='file'
                      name='aboutfile' />
                  </CustomAddButton>
                  {id || allDone ? (!permission ? <CustomReductButton isOrange={updateLoading} type='submit'>{updateLoading ? 'Сохранение...' : 'Сохранить'}</CustomReductButton> : <Button type='submit' isColored={updateLoading} text={updateLoading ? 'Сохранение...' : 'Редактировать'} />)
                    : <CustomReductButton isOrange={isLoading || permission} type='submit'>{isLoading ? 'Сохранение...' : 'Сохранить'}</CustomReductButton>}
                </ControlBox>
              </FieldSet>

            </Form>
          </Plate>
        </BaseSection>
      )
  );
};

export default CreateProject;

// настрой создание и апдейт проектов
