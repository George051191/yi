/* eslint-disable no-prototype-builtins */
/* eslint-disable no-fallthrough */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-self-assign */
/* eslint-disable no-useless-escape */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-mixed-operators */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react/require-default-props */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable */
import React, {
  FC, useCallback, useEffect, useRef, useState,
} from 'react';
import styled, { useTheme } from 'styled-components';
import {
  Navigate, useLocation, useNavigate, useNavigation, useParams,
} from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import {
  setMany, getMany, clear, delMany, set,
} from 'idb-keyval';
import Avatar from '../ui-lib/Avatar';
import { Label, Error } from '../ui-lib/InputComponent';
import Button from '../ui-lib/Button';
import { useAutoSaveForms } from '../helpers/hooks';
import { TEducationObject } from '../types/componentsTypes';
import {
  jwt, useUpdateUserMutation, useGetCurrentUserQuery, useLazyGetUserByIdQuery, userApi, projectsApi, useGetCurrentUserProjectsQuery,
} from '../api/api';
import { useDispatch } from '../store/store.types';
import {
  AddIcon, DistIcon, VkIcon, TgIcon, OkIcon, CrossIcon,
} from '../ui-lib/icons';
import { makeToast } from '../helpers/promts';
import {
  RegularInput, InputWithNoLabel, RegularTextarea,
} from '../ui-lib/Inputs';
import { setIsFullFilled } from '../store/allSlice';
import EducationBlock from '../ui-lib/widgets/EducationBlock';
import { Skeleton1 } from '../ui-lib/widgets/Skeleton';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    gap: 58px;
    @media screen and (max-width: 1200px) {
      box-sizing: border-box;
      padding-inline: 10px;
    }
`;

const Section = styled.section`
  margin-top: 100px;
  width: 100%;
  padding-bottom: 188px;
  max-width: 1728px;
`;

const Container = styled.ul<{ isOpen?: boolean, amount?: number }>`
    display: flex;
    flex-direction: column;
    width: 100%;
    height:${({ isOpen, amount }) => (isOpen ? 'auto' : '0')};
    transition: all ease .3s;
    overflow: auto;
    gap: 40px;
    align-items: center;
    list-style: none;
    padding: 0;
    overflow: hidden;
`;

export const SocialContainer = styled(Container)`
 overflow: initial;
 gap: 0;
 align-items: flex-start;
 margin: 0;
 padding: 0;
`;

const SupportContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  @media screen and (max-width:650px) {
    flex-direction: column;
  }
`;
export const Hash = styled.li`
    display: flex;
    min-width: 136px;
    height: 37px;
    padding: 27px 44px;
    justify-content: center;
    align-items: center;
    border-radius: 36px;
    background-color: ${({ theme: { mainButtonColor } }) => mainButtonColor};
    color:${({ theme: { mainBg } }) => mainBg};
    font-family: 'TTTravels';
    font-size: 25px;
    font-style: normal;
    font-weight: 400;
    line-height: 80%;
    letter-spacing: -0.5px;
    box-sizing: border-box;
    cursor: pointer;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  max-width: 534px;
  width: 100%;
`;
const ColumnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  @media screen and (max-width:1200px) {
      flex-direction:  column;
      align-items: center;
    }
`;

export const ExitButton = styled.button`
    display: flex;
    padding: 20px 44px;
    border-radius: 36px;
    background-color: ${({ theme: { sliderColor } }) => sliderColor};
    color: ${({ theme: { mainTextColor } }) => mainTextColor};
    font-family: 'TTTravels';
    border: none;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 80%; /* 20px */
    letter-spacing: -0.625px;
    text-align: center;
    cursor: pointer;
    position: relative;
    @media screen and (max-width:560px) {
      padding: 11.582px 18.875px;
      font-size: 15px;
     -webkit-box-pack: center;
     justify-content: center;
    }
`;

export const SocialLink = styled.a`
  margin: 0;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  cursor:pointer;
`;
const SocialLinkStub = styled.div`
  width: 48px;
  height: 48px;
  cursor:pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const SocialLinksContainer = styled.div`
  display: flex;
  width: 144px;
  position: relative;
`;
const LinksContainer = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const LinkToProfile = styled.li`
  display: flex;
  max-width: 270px;
  width: fit-content;
  height: 37px;
  padding: 10px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 36px;
  background-color: ${({ theme: { mainButtonColor } }) => mainButtonColor};
  color:${({ theme: { mainBg } }) => mainBg};
  font-family: 'TTTravels';
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 80%;
  letter-spacing: -0.5px;
  box-sizing: border-box;
  cursor: pointer;
  border: none;
  outline: none;
`;

const ProjectName = styled.p`
  color:${({ theme: { mainBg } }) => mainBg};
  font-family: 'TTTravels';
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 80%;
  letter-spacing: -0.5px;
  margin: 0;
  text-overflow: ellipsis;
    overflow: hidden;
    white-space: pre;
`;

const SocialRedactPlate = styled.div`
  border-radius: 15px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(241, 244, 255, 0.60);
  backdrop-filter: blur(4px);
  width: 300px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  z-index: 99999;
  padding:20px;
  & button {
    padding: 10px 27px;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  top: -4px;
  right: -3px;
  & svg {
    width: 30px;
    height: 30px;
  }
`;

const Input = styled.input`
    border: none;
    outline: none;
    border-bottom: ${({ theme: { borderColor } }) => `1px solid ${borderColor}`};
    color: ${({ theme: { mainTextColor } }) => mainTextColor};
    font-family: 'TTTravels';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 10px;
    background: transparent;
    text-overflow: ellipsis;
    z-index:2;
    &:focus+div {
      display: none;
    }
`;

const Profile: FC<{ withParams?: boolean }> = ({ withParams = false }) => {
  const [userAvatarFile, getAvatar] = useState<File | any>('');
  const [currentImageIndex, setImageIndex] = useState<number>();
  const [userAvatar, setAvatar] = useState<any>('');
  const location = useLocation();
  const [imageEducationFile, getEducationImage] = useState<File | any>('');
  const [socialArr, setSocialArr] = useState<any>([]);
  const [secondaryEducationFile, getSecondaryEducationImage] = useState<File | any>('');
  const [educationObject, setEducationValue] = useState<TEducationObject[]>([]);
  const [secondaryEducationObject, setSecondaryObject] = useState<TEducationObject[]>([]);
  const [permissionForRedact, givePermission] = useState(false);
  const [valueForMakeCheck, setValueForMakeCheck] = useState(0);
  const [currentVk, openVk] = useState<boolean>(false);
  const [currentTg, openTg] = useState<boolean>(false);
  const [currentOk, openOk] = useState<boolean>(false);
  const [objectForSave, setValuesForSaveOject] = useAutoSaveForms();
  const theme = useTheme();
  console.log(theme);
  const {
    register, formState: { errors }, reset, handleSubmit, setValue, getValues, watch, trigger,
  } = useForm();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data, isLoading: loading, error, status, refetch,
  } = useGetCurrentUserQuery();
  const [updateUser, { error: updateError, status: updateStatus, isLoading }] = useUpdateUserMutation();
  const [getUserById, { error: idError, status: idStatus, isLoading: loading2 }] = useLazyGetUserByIdQuery();
  const { data: projects } = useGetCurrentUserProjectsQuery();
  useEffect(() => {
    makeToast(error, status);
  }, [error, status]);
  useEffect(() => {
    makeToast(updateError, updateStatus);
  }, [updateError, updateStatus]);
  useEffect(() => {
    makeToast(idError, idStatus);
  }, [idError, idStatus]);

  /// / добавление даты в обьект образования
  const handleDataChange = (dateString: any, index: number) => {
    const currentChangeObject = educationObject[index];
    const currentChangeObjectCopy = { ...currentChangeObject };
    currentChangeObjectCopy.educationDates = dateString;
    const arrayCopy = [...educationObject];
    arrayCopy.splice(
      index,
      1,
      {
        image: currentChangeObjectCopy?.image,
        organizationName: currentChangeObjectCopy?.organizationName,
        educationDates: currentChangeObjectCopy?.educationDates,
      },
    );
    setEducationValue(arrayCopy);
  };
  const deleteFromEducation = (idx: number) => {
    const copyArr = [...educationObject];
    copyArr.splice(idx, 1);
    setEducationValue(copyArr);
  };
  const deleteSecondaryEducation = (idx: number) => {
    const copyArr = [...secondaryEducationObject];
    copyArr.splice(idx, 1);
    setSecondaryObject(copyArr);
  };
  /// добавление даты в обьект доп образования
  const handleDataChangeSecondary = (dateString: any, index: number) => {
    const currentChangeObject = secondaryEducationObject[index];
    const currentChangeObjectCopy = { ...currentChangeObject };
    currentChangeObjectCopy.educationDates = dateString;
    const arrayCopy = [...secondaryEducationObject];
    arrayCopy.splice(
      index,
      1,
      {
        image: currentChangeObjectCopy?.image,
        organizationName: currentChangeObjectCopy?.organizationName,
        educationDates: currentChangeObjectCopy?.educationDates,
      },
    );
    setSecondaryObject(arrayCopy);
  };
  /// добавление названия в обьект оразования
  const addOptionToEduArr = (item: string, index: number) => {
    const currentChangeObject = educationObject[index];
    const currentChangeObjectCopy = { ...currentChangeObject };
    currentChangeObjectCopy.organizationName = item;
    const arrayCopy = [...educationObject];
    arrayCopy.splice(
      index,
      1,
      {
        image: currentChangeObjectCopy?.image,
        organizationName: currentChangeObjectCopy.organizationName,
        educationDates: currentChangeObjectCopy.educationDates,
      },
    );

    setEducationValue(arrayCopy);
  };

  const setEducationObjectValue = (e: any, index?: number) => {
    const currentChangeObject = educationObject[index!];
    const currentChangeObjectCopy = { ...currentChangeObject };
    currentChangeObjectCopy.organizationName = e.target.value;

    const arrayCopy = [...educationObject];
    arrayCopy.splice(
      index!,
      1,
      {
        image: currentChangeObjectCopy?.image,
        organizationName: currentChangeObjectCopy.organizationName,
        educationDates: currentChangeObjectCopy.educationDates,
      },
    );

    setEducationValue(arrayCopy);
  };

  /// добавление названия в обьект доп образования
  const addOptionToEduArrSecondary = (item: string, index: number) => {
    const currentChangeObject = secondaryEducationObject[index];
    const currentChangeObjectCopy = { ...currentChangeObject };
    currentChangeObjectCopy.organizationName = item;
    const arrayCopy = [...secondaryEducationObject];
    arrayCopy.splice(
      index,
      1,
      {
        image: currentChangeObjectCopy?.image,
        organizationName: currentChangeObjectCopy.organizationName,
        educationDates: currentChangeObjectCopy.educationDates,
      },
    );

    setSecondaryObject(arrayCopy);
  };

  const setEducationObjectValueSecondary = (e: any, index?: number) => {
    const currentChangeObject = secondaryEducationObject[index!];
    const currentChangeObjectCopy = { ...currentChangeObject };
    currentChangeObjectCopy.organizationName = e.target.value;

    const arrayCopy = [...secondaryEducationObject];
    arrayCopy.splice(
      index!,
      1,
      {
        image: currentChangeObjectCopy?.image,
        organizationName: currentChangeObjectCopy.organizationName,
        educationDates: currentChangeObjectCopy.educationDates,
      },
    );
    setSecondaryObject(arrayCopy);
  };

  /// подготовка изображений
  const makePicture = useCallback(() => {
    if (userAvatarFile) {
      const reader = new FileReader();
      if (/\.(jpe?g|png)$/i.test(userAvatarFile.name)) {
        reader.readAsDataURL(userAvatarFile);
        reader.addEventListener('load', () => setAvatar(reader.result));
      } else {
        toast.error('Необходим jpg или png файл');
        getAvatar('');
      }
    }
    if (imageEducationFile) {
      const reader2 = new FileReader();
      reader2.readAsDataURL(imageEducationFile);
      reader2.addEventListener('load', () => {
        const arrCopy = [...educationObject];
        const currentChangeObject = educationObject[currentImageIndex || 0];

        const currentChangeObjectCopy = { ...currentChangeObject };
        arrCopy.splice(
          currentImageIndex || 0,
          1,
          {
            image: reader2.result,
            organizationName: currentChangeObjectCopy.organizationName,
            educationDates: currentChangeObjectCopy.educationDates,
          },
        );
        setEducationValue(arrCopy);
      });
    }
    if (secondaryEducationFile) {
      const reader3 = new FileReader();
      reader3.readAsDataURL(secondaryEducationFile);
      reader3.addEventListener('load', () => {
        const arrCopy = [...secondaryEducationObject];
        const currentChangeObject = secondaryEducationObject[currentImageIndex || 0];
        const currentChangeObjectCopy = { ...currentChangeObject };
        arrCopy.splice(
          currentImageIndex || 0,
          1,
          {
            image: reader3.result,
            organizationName: currentChangeObjectCopy.organizationName,
            educationDates: currentChangeObjectCopy.educationDates,
          },
        );
        setSecondaryObject(arrCopy);
      });
    }
  }, [userAvatarFile, imageEducationFile, secondaryEducationFile]);

  /// отправка данных на сервер и проверка на ошибки
  const submitForm = async (formValues: any) => {
    if (!jwt.test()) {
      navigate('/registration');
      return;
    }
    if (permissionForRedact) {
      givePermission(false);
      return;
    }
    try {
      const formatSocials = (obj: { [key: string]: any }) => {
        const newObject: { [key: string]: any } = {};
        for (const net in obj) {
          if (!obj[net]?.match(/^https\:\/\//)) {
            switch (net) {
              case 'telegram': {
                newObject[net] = `https://t.me/${obj[net]?.slice(1)}`;
                break;
              }
              case 'ok': {
                newObject[net] = `https://${obj[net]}`;
                break;
              }
              case 'vk': {
                newObject[net] = `https://${obj[net]}`;
                break;
              }
            }
          } else {
            newObject[net] = obj[net];
          }
        }
        return newObject;
      };
      await updateUser({
        ...formValues,
        dateOfBirth: formValues.dateOfBirth?.toISOString().slice(0, 10),
        avatar: userAvatar,
        education: {
          firstEducation: educationObject,
          secondaryEducation: secondaryEducationObject,
        },
        socialNetworks: formatSocials(socialArr),
      });
      await delMany(['lastName',
        'firstName',
        'email',
        'hobbies',
        'about',
        'fact',
        'avatar',
        'firstEdu',
        'secondEdu',
        'socialNetworks']);
      givePermission(true);
    } catch (err: any) {
      console.log(err);
    }
  };
  const setUserData = async (obj: any) => {
    const [lastName, firstName, email, hobbies, about, fact, avatar, firstEdu, secondEdu, socialNetworks] = id ? [] : await getMany([
      'lastName',
      'firstName',
      'email',
      'hobbies',
      'about',
      'fact',
      'avatar',
      'firstEdu',
      'secondEdu',
      'socialNetworks']);
    setValuesForSaveOject({
      lastName, firstName, email, hobbies, about, fact, avatar, firstEdu, secondEdu, socialNetworks,
    });
    setValue('lastName', obj?.lastName || lastName);
    setValue('firstName', obj?.firstName || firstName);
    setValue('dateOfBirth', obj?.dateOfBirth);
    setValue('email', obj?.email || email);
    setValue('hobbies', obj?.hobbies || hobbies);
    setValue('about', obj?.about || about);
    setValue('fact', obj?.fact || fact);
    setSocialArr(obj?.socialNetworks || (socialNetworks || ['']));
    setAvatar(obj?.avatar || avatar);
    if (!jwt.test()) {
      setEducationValue(firstEdu || [{ image: '', organizationName: '', educationDates: ['', ''] }]);
      setSecondaryObject(secondEdu || [{ image: '', organizationName: '', educationDates: ['', ''] }]);
      return;
    }
    setEducationValue(obj?.education?.firstEducation?.length === 0 ? (firstEdu || [{ image: '', organizationName: '', educationDates: ['', ''] }]) : obj?.education?.firstEducation!);
    setSecondaryObject(obj?.education?.secondaryEducation?.length === 0 ? (secondEdu || [{ image: '', organizationName: '', educationDates: ['', ''] }]) : obj?.education?.secondaryEducation!);
  };

  /// проставляем изначальные значения всех полей
  useEffect(() => {
    const asyncGet = async (index: string | number) => {
      try {
        const newUser = await getUserById(index).unwrap();
        newUser && setUserData(newUser);
      } catch (err: any) {
        console.log('');
      }
    };
    id ? asyncGet(id) : setUserData(data);
  }, [id, data]);

  useEffect(() => {
    if (data?.first_name) {
      givePermission(true);
    }
  }, [data]);

  const checkFullness = async () => {
    const [lastName, firstName, email, hobbies, about, fact, avatar] = await getMany([
      'lastName',
      'firstName',
      'email',
      'hobbies',
      'about',
      'fact',
      'avatar']);
    const formObjectFull = [lastName, firstName, email, hobbies, about, fact, avatar].some((el) => {
      const condition1 = el === '';
      const condition2 = el === null;
      return condition1 || condition2;
    });
    const educationFirst = educationObject !== undefined && educationObject?.length !== 0 && educationObject.some((el) => {
      const condition1 = el.organizationName === '';
      const condition2 = el.educationDates[0] === '';
      const condition3 = el.educationDates[1] === '';
      return condition1 || condition2 || condition3;
    });
    const educaionSecond = secondaryEducationObject !== undefined && secondaryEducationObject?.length !== 0 && secondaryEducationObject.some((el) => {
      const condition1 = el.organizationName === '';
      const condition2 = el.educationDates[0] === '';
      const condition3 = el.educationDates[1] === '';
      return condition1 || condition2 || condition3;
    });
    if (formObjectFull || educationFirst || educaionSecond) {
      dispatch(setIsFullFilled(false));
      return;
    } dispatch(setIsFullFilled(true));
  };
  useEffect(() => {
    checkFullness();
  }, [educationObject, secondaryEducationObject, valueForMakeCheck]);

  useEffect(() => {
    makePicture();
  }, [userAvatarFile, makePicture]);
  /// / autosave
  useEffect(() => {
    setValuesForSaveOject({ ...objectForSave, avatar: userAvatar });
  }, [userAvatar]);
  useEffect(() => {
    setValuesForSaveOject({ ...objectForSave, firstEdu: educationObject });
  }, [educationObject]);
  useEffect(() => {
    setValuesForSaveOject({ ...objectForSave, secondEdu: secondaryEducationObject });
  }, [secondaryEducationObject]);
  useEffect(() => {
    setValuesForSaveOject({ ...objectForSave, socialNetworks: socialArr });
  }, [socialArr]);

  /// добавление нового элемента в массивы образований и соцсетей
  const addToArray = (array: TEducationObject[] | string[], type: 'first' | 'second' | 'third') => {
    const copyArr = [...array];
    type === 'third' ? copyArr.push('') : copyArr.push({ image: '', organizationName: '', educationDates: ['', ''] });
    if (type === 'first') {
      setEducationValue(copyArr as TEducationObject[]);
      return;
    }
    if (type === 'second') {
      setSecondaryObject(copyArr as TEducationObject[]);
      return;
    }
    if (type === 'third') {
      setSocialArr(copyArr as string[]);
      return;
    }
  };

  /// выход
  const exitFrom = () => {
    jwt.remove();
    clear();
    navigate('/');
    dispatch(userApi.util.resetApiState());
    dispatch(projectsApi.util.resetApiState());
  };
  return (
    (loading || loading2)
      ? <Skeleton1 />
      : (
        <Section>

          <Toaster position='bottom-right' />
          <Form onSubmit={handleSubmit(submitForm)}>
            <Avatar forProfile={!id && !permissionForRedact} setAvatar={getAvatar} userAvatar={userAvatar} />
            <ColumnContainer>
              <Column>
                <RegularInput
                  errorMessage={errors?.lastName?.message as string}
                  maxLength={20}
                  disabled={!!id || permissionForRedact}
                  type='text'
                  options={{
                    required: 'Заполните поле',
                    minLength: {
                      value: 2,
                      message: 'Фамилия введена не полностью',
                    },
                    pattern: {
                      value: /^[А-Яёа-я]+$/,
                      message: 'Некорректное значение',
                    },
                    onBlur: (e: any) => { setValueForMakeCheck((prev) => prev + 1); setValuesForSaveOject({ ...objectForSave, lastName: e.target.value }); },
                  }}
                  register={register}
                  name='lastName'
                  label='Фамилия' />
                <RegularInput
                  errorMessage={errors?.firstName?.message as string}
                  maxLength={20}
                  disabled={!!id || permissionForRedact}
                  type='text'
                  options={{
                    required: 'Заполните поле',
                    minLength: {
                      value: 2,
                      message: 'Имя введено не полностью',
                    },
                    pattern: {
                      value: /^[А-Яёа-я]+$/,
                      message: 'Некорректное значение',
                    },
                    onBlur: (e: any) => { setValueForMakeCheck((prev) => prev + 1); setValuesForSaveOject({ ...objectForSave, firstName: e.target.value }); },
                  }}
                  register={register}
                  name='firstName'
                  label='Имя' />
                <RegularInput
                  errorMessage=''
                  type='date'
                  disabled={!!id || permissionForRedact}
                  options={{ valueAsDate: true }}
                  register={register}
                  name='dateOfBirth'
                  label='Дата рождения' />

                {(location.state?.hasOwnProperty('haveRights') && location.state?.haveRights) && (
                  <RegularInput
                    errorMessage={errors?.email?.message as string}
                    type='text'
                    disabled={!!id || permissionForRedact}
                    options={{
                      required: 'Заполните поле',
                      minLength: {
                        value: 6,
                        message: 'Поле должно содержать минимум 6 символов',
                      },
                      maxLength: {
                        value: 30,
                        message: 'Поле должно содержать маскимум 30 символов',
                      },
                      validate: (value: any) => {
                        const emailRegex = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,5})$/;
                        const phoneRegex = /^(\+?\d{1,2})?[-. ]?(\d{1,4}[-. ]?)?(\d{1,4})(\d*)$/;
                        return emailRegex.test(value) || phoneRegex.test(value) || 'Некорректное значение';
                      },
                      onBlur: (e: any) => { setValueForMakeCheck((prev) => prev + 1); setValuesForSaveOject({ ...objectForSave, email: e.target.value }); },
                    }}
                    register={register}
                    name='email'
                    label='Email' />
                )}

                {!id && (
                  <RegularInput
                    errorMessage={errors?.email?.message as string}
                    type='text'
                    disabled={!!id || permissionForRedact}
                    options={{
                      required: 'Заполните поле',
                      minLength: {
                        value: 6,
                        message: 'Поле должно содержать минимум 6 символов',
                      },
                      maxLength: {
                        value: 30,
                        message: 'Поле должно содержать маскимум 30 символов',
                      },
                      validate: (value: any) => {
                        const emailRegex = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,5})$/;
                        const phoneRegex = /^(\+?\d{1,2})?[-. ]?(\d{1,4}[-. ]?)?(\d{1,4})(\d*)$/;
                        return emailRegex.test(value) || phoneRegex.test(value) || 'Некорректное значение';
                      },
                      onBlur: (e: any) => { setValueForMakeCheck((prev) => prev + 1); setValuesForSaveOject({ ...objectForSave, email: e.target.value }); },
                    }}
                    register={register}
                    name='email'
                    label='Email' />
                )}
                <EducationBlock
                  educationArr={educationObject}
                  educationType='Образование'
                  createEducationObject={() => addToArray(educationObject, 'first')}
                  addOption={addOptionToEduArr}
                  deleteFunc={deleteFromEducation}
                  setIndex={setImageIndex}
                  disabled={!!id || permissionForRedact}
                  setFile={getEducationImage}
                  fileInputName='firstEducation'
                  calendareHandler={handleDataChange}
                  onChange={setEducationObjectValue} />
                <EducationBlock
                  educationArr={secondaryEducationObject}
                  educationType='Дополнительное образование'
                  createEducationObject={() => addToArray(secondaryEducationObject, 'second')}
                  addOption={addOptionToEduArrSecondary}
                  deleteFunc={deleteSecondaryEducation}
                  setIndex={setImageIndex}
                  disabled={!!id || permissionForRedact}
                  setFile={getSecondaryEducationImage}
                  fileInputName='secondaryEducation'
                  calendareHandler={handleDataChangeSecondary}
                  onChange={setEducationObjectValueSecondary} />
              </Column>
              <Column>
                <RegularTextarea
                  height={100}
                  options={{ onBlur: (e: any) => { setValueForMakeCheck((prev) => prev + 1); setValuesForSaveOject({ ...objectForSave, about: e.target.value }); } }}
                  disabled={!!id || permissionForRedact}
                  register={register}
                  name='about'
                  errorMessage=''
                  label='Интересы' />
                <RegularTextarea
                  height={100}
                  options={{ onBlur: (e: any) => { setValueForMakeCheck((prev) => prev + 1); setValuesForSaveOject({ ...objectForSave, hobbies: e.target.value }); } }}
                  disabled={!!id || permissionForRedact}
                  register={register}
                  name='hobbies'
                  errorMessage=''
                  label='Хобби' />
                <RegularInput
                  errorMessage=''
                  type='text'
                  disabled={!!id || permissionForRedact}
                  options={{ onBlur: (e: any) => { setValueForMakeCheck((prev) => prev + 1); setValuesForSaveOject({ ...objectForSave, fact: e.target.value }); } }}
                  register={register}
                  name='fact'
                  label='Интересный факт о себе' />

                {(location.state?.hasOwnProperty('haveRights') && location.state?.haveRights) && (
                  <SupportContainer>
                    <SocialContainer isOpen>
                      <Label style={{ alignSelf: 'start' }}>Социальные сети</Label>
                      <SocialLinksContainer>
                        {socialArr.telegram && permissionForRedact ? (socialArr.telegram === 'https://t.me/undefined' ? <SocialLinkStub><TgIcon /></SocialLinkStub> : <SocialLink href={socialArr.telegram} target='_blank' rel='noopener noreferrer'><TgIcon /></SocialLink>) : <SocialLinkStub onClick={() => !permissionForRedact && openTg(true)}><TgIcon /></SocialLinkStub>}
                        {socialArr.vk && permissionForRedact ? (socialArr.vk === 'https://null' ? <SocialLinkStub><VkIcon /></SocialLinkStub> : <SocialLink href={socialArr.vk} target='_blank' rel='noopener noreferrer'><VkIcon /></SocialLink>) : <SocialLinkStub onClick={() => !permissionForRedact && openVk(true)}><VkIcon /></SocialLinkStub>}
                        {socialArr.ok && permissionForRedact ? (socialArr.ok === 'https://null' ? <SocialLinkStub><OkIcon /></SocialLinkStub> : <SocialLink href={socialArr.ok} target='_blank' rel='noopener noreferrer'><OkIcon /></SocialLink>) : <SocialLinkStub onClick={() => !permissionForRedact && openOk(true)}><OkIcon /></SocialLinkStub>}
                      </SocialLinksContainer>

                    </SocialContainer>
                  </SupportContainer>
                )}

                {!id && (
                  <SupportContainer>
                    <SocialContainer isOpen>
                      <Label style={{ alignSelf: 'start' }}>Социальные сети</Label>
                      <SocialLinksContainer>
                        {currentVk
                          && (
                            <SocialRedactPlate>
                              <IconWrapper onClick={() => { openVk(false); if (!socialArr.vk?.match(/^https\:\/\/vk\.com\//)) { setSocialArr({ ...socialArr, vk: null }); } }}><CrossIcon /></IconWrapper>
                              <Input value={socialArr.vk === 'https://null' ? '' : socialArr.vk} onChange={(e) => setSocialArr({ ...socialArr, vk: e.target.value })} />
                              {socialArr.vk !== null && socialArr.vk !== '' && !(socialArr.vk?.match(/^https\:\/\/vk\.com\//) || socialArr.vk?.match(/^vk\.com\//)) && <Error>Ссылка ведет не в ВК</Error>}
                              <Button onClick={() => { openVk(false); }} disabled={socialArr.vk === null || socialArr.vk === '' || !(socialArr.vk?.match(/^https\:\/\/vk\.com\//) || socialArr.vk?.match(/^vk\.com\//))} isColored type='button' text='Записать и закрыть' />
                            </SocialRedactPlate>
                          )}
                        {currentOk
                          && (
                            <SocialRedactPlate>
                              <IconWrapper onClick={() => { openOk(false); if (!socialArr.ok?.match(/^https\:\/\/ok\.ru\//)) { setSocialArr({ ...socialArr, ok: null }); } }}><CrossIcon /></IconWrapper>
                              <Input value={socialArr.ok === 'https://null' ? '' : socialArr.ok} onChange={(e) => setSocialArr({ ...socialArr, ok: e.target.value })} />
                              {socialArr.ok !== null && socialArr.ok !== '' && !(socialArr.ok?.match(/^https\:\/\/ok\.ru\//) || socialArr.ok?.match(/^ok\.ru\//)) && <Error>Ссылка ведет не в ОК</Error>}
                              <Button onClick={() => openOk(false)} disabled={socialArr.ok === null || socialArr.ok === '' || !(socialArr.ok?.match(/^https\:\/\/ok\.ru\//) || socialArr.ok?.match(/^ok\.ru\//))} isColored type='button' text='Записать и закрыть' />

                            </SocialRedactPlate>
                          )}
                        {currentTg
                          && (
                            <SocialRedactPlate>
                              <IconWrapper onClick={() => { openTg(false); if (!socialArr.telegram?.match(/^https:\/\/t\.me\//)) { setSocialArr({ ...socialArr, telegram: null }); } }}><CrossIcon /></IconWrapper>
                              <Input value={socialArr.telegram === 'https://t.me/undefined' ? '' : socialArr.telegram} onChange={(e) => setSocialArr({ ...socialArr, telegram: e.target.value })} />
                              {socialArr.telegram !== null && socialArr.telegram !== '' && !(socialArr.telegram?.match(/^https:\/\/t\.me\//) || socialArr.telegram?.match(/^@/)) && <Error>Ссылка ведет не в ТГ</Error>}
                              <Button onClick={() => openTg(false)} disabled={socialArr.telegram === null || socialArr.telegram === ''} isColored type='button' text='Записать и закрыть' />

                            </SocialRedactPlate>
                          )}
                        {socialArr.telegram && permissionForRedact ? (socialArr.telegram === 'https://t.me/undefined' ? <SocialLinkStub><TgIcon /></SocialLinkStub> : <SocialLink href={socialArr.telegram} target='_blank' rel='noopener noreferrer'><TgIcon /></SocialLink>) : <SocialLinkStub onClick={() => !permissionForRedact && openTg(true)}><TgIcon /></SocialLinkStub>}
                        {socialArr.vk && permissionForRedact ? (socialArr.vk === 'https://null' ? <SocialLinkStub><VkIcon /></SocialLinkStub> : <SocialLink href={socialArr.vk} target='_blank' rel='noopener noreferrer'><VkIcon /></SocialLink>) : <SocialLinkStub onClick={() => !permissionForRedact && openVk(true)}><VkIcon /></SocialLinkStub>}
                        {socialArr.ok && permissionForRedact ? (socialArr.ok === 'https://null' ? <SocialLinkStub><OkIcon /></SocialLinkStub> : <SocialLink href={socialArr.ok} target='_blank' rel='noopener noreferrer'><OkIcon /></SocialLink>) : <SocialLinkStub onClick={() => !permissionForRedact && openOk(true)}><OkIcon /></SocialLinkStub>}
                      </SocialLinksContainer>

                    </SocialContainer>
                    {projects?.length !== 0 && !id && (
                      <LinksContainer>
                        <Label style={{ alignSelf: 'start' }}>Проекты</Label>
                        {projects?.map((el) => (
                          <LinkToProfile onClick={() => navigate(`/project/${el.id}`, { state: '/profile' })}>
                            <ProjectName>{el.name}</ProjectName>
                            <DistIcon />
                          </LinkToProfile>
                        ))}
                      </LinksContainer>
                    )}
                  </SupportContainer>
                )}
           {/*      {data?.projects && data.projects.length !== 0 && (
                  <Container isOpen>
                    <Label style={{ alignSelf: 'start', marginBottom: '0px' }}>Проекты</Label>
                    <ColumnContainer style={{ justifyContent: 'initial', gap: '20px' }}>
                      {(data?.projects ?? []).map((el) => (
                        <Hash>
                          {el.name}
                          <DistIcon />
                        </Hash>
                      ))}
                    </ColumnContainer>
                  </Container>
                )} */}
              </Column>
            </ColumnContainer>
            {/* {id ? <Button isColored text='Назад' type='button' onClick={() => navigate(-1)} />
              : (
                <>
                  {data?.firstName ? (!permissionForRedact ? <Button isColored text={isLoading ? 'Сохранение...' : 'Сохранить'} type='submit' /> : <Button isColored={isLoading} type='submit' text={isLoading ? 'Сохранение...' : 'Редактировать'} />) : <Button isColored text={isLoading ? 'Сохранение...' : 'Сохранить'} type='submit' />}
                  {location.state ? <Button isColored text='Назад' type='button' onClick={() => navigate(-1)} /> : <ExitButton onClick={exitFrom} type='button'>Выйти</ExitButton>}
                </>
              )} */}
          </Form>
        </Section>
      )
  );
};

export default Profile;
