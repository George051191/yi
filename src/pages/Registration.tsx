/* eslint-disable react/jsx-indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Toaster } from 'react-hot-toast';
import {
  Navigate, useNavigate,
} from 'react-router';
import { useForm } from 'react-hook-form';
import {
  P, Section, Logo, LogoLink,
} from './Login';
import { UniversalButton } from '../ui-lib/RestyledButtons';
import logoImage from '../assets/bigpavuk.png';
import { CheckDoneIcon, CheckIcon } from '../ui-lib/icons';

import { useRegisterMutation, jwt } from '../api/api';
import 'react-toastify/dist/ReactToastify.css';
import { TravelsFontMixixn20 } from '../constants/fontsConfigs';
import pdf from '../assets/pnd.pdf';
import { LinkForFileLoad } from './CreateProject';
import { makeToast } from '../helpers/promts';
import { BasicInput } from '../ui-lib/FormElements';
import Themes from '../themes';
import { useSelector } from '../store/store.types';

const Checkbox = styled.input`
  position: absolute;
  z-index: -1;
  opacity: 0; 
  width: 24px;
  height: 24px;
`;

const RegLabel = styled.label`
    position: relative;
    width: 24px;
    height: 24px;
    display: inline;
    cursor: pointer;       
`;
const ControlBox = styled.div`
    display: flex;
    flex-direction: column;
   
    width: 100%;
    background-image: url('/logo.png') ;
    margin-top: 35px;
    gap: 25px;
    align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 8px;
  @media screen and (max-width: 560px) {
    align-items: baseline;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 35px;
  
`;

const LiForPdf = styled.span`
    display: flex;
    color: ${({ theme: { mainButtonColor } }) => mainButtonColor};
    text-align: center;
    ${TravelsFontMixixn20}
    align-items: center;
    display: inline;
    margin-right: 6px;
    margin-left: 6px;
    & a {
      color: ${({ theme: { mainButtonColor } }) => mainButtonColor};
      font-size: 20px;
      font-weight: 500;
      @media screen and (max-width: 560px) {
      font-size: 15px;
 }
    }
`;

const Registration: FC = () => {
  const [isChecked, check] = useState<boolean>();
  const { theme } = useSelector((state) => state.all);
  const [register, { error, status }] = useRegisterMutation();
  const navigate = useNavigate();
  const {
    register: createUser, formState: { errors }, reset, handleSubmit, getValues,
  } = useForm();

  const submitForm = async (values: any) => {
    try {
      const user = await register({
        email: values.email,
        password: values.password,
        re_password: values.re_password,
        first_name: values.first_name,
        last_name: values.last_name,
      }).unwrap();

      /* jwt.set(token.jwtToken); */
      reset();
      user && navigate('/login');
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    makeToast(error, status);
  }, [error, status]);

  return (
    jwt.test()
      ? <Navigate to='/' />
      : (
        <Section style={{ padding: '20px' }}>
          <Toaster position='bottom-right' />
          <Form onSubmit={handleSubmit(submitForm)}>
            <LogoLink to='/'>
              <Logo src={logoImage} />
            </LogoLink>
            <BasicInput
              autocomplete='name'
              forRequired
              errorMessage={errors?.first_name?.message as string}
              type='text'
              options={{
                required: 'Заполните поле',
                minLength: {
                  value: 2,
                  message: 'Поле должно содержать минимум 2 символа',
                },
                pattern: {
                  value: /^[А-Яёа-я]+$/,
                  message: 'Некорректное значение',
                },
              }}
              register={createUser}
              name='first_name'
              label='Имя' />
            <BasicInput
              autocomplete='family-name'
              forRequired
              errorMessage={errors?.last_name?.message as string}
              type='text'
              options={{
                required: 'Заполните поле',
                minLength: {
                  value: 2,
                  message: 'Поле должно содержать минимум 2 символа',
                },
                pattern: {
                  value: /^[А-Яёа-я]+$/,
                  message: 'Некорректное значение',
                },
              }}
              register={createUser}
              name='last_name'
              label='Фамилия' />
            <BasicInput
              autocomplete='email'
              forRequired
              errorMessage={errors?.email?.message as string}
              type='text'
              options={{
                required: 'Заполните поле',
                minLength: {
                  value: 6,
                  message: 'Поле должно содержать минимум 6 символов',
                },
                pattern: {
                  value: /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,5})$/,
                  message: 'Некорректное значение',
                },
              }}
              register={createUser}
              name='email'
              label='Email' />
            <BasicInput
              forRequired
              errorMessage={errors?.password?.message as string}
              type='password'
              options={{
                required: 'Заполните поле',
                minLength: {
                  value: 8,
                  message: 'Поле должно содержать минимум 8 символов',
                },
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*\d).+$/,
                  message: 'Некорректное значение',
                },
              }}
              register={createUser}
              name='password'
              label='Пароль' />
            <BasicInput
              forRequired
              errorMessage={errors?.re_password?.message as string}
              maxLength={100}
              type='password'
              options={{
                required: 'Заполните поле',
                validate: (value: any) => {
                  if (value !== getValues('password')) {
                    return 'Пароли не совпадают';
                  }
                },
              }}
              register={createUser}
              name='re_password'
              label='Повторите пароль' />
            <ControlBox>
              <Wrapper>
                <Checkbox onChange={(e) => check(e.target.checked)} type='checkbox' id='check' />
                <RegLabel htmlFor='check'>
                  <CheckIcon />
                  {isChecked && <CheckDoneIcon style={{ display: 'block' }} />}
                  {' '}

                </RegLabel>
                <P style={{ marginTop: '0' }}>
                  Я ознакомилась(–ся) с
                  <LiForPdf>
                    <LinkForFileLoad download href={pdf}>
                      соглашением на

                      обработку персональных данных
                    </LinkForFileLoad>
                  </LiForPdf>
                  и принимаю его условия
                </P>
              </Wrapper>
              <UniversalButton
                disabled={!isChecked}
                type='submit'
                textColor={Themes[theme].mainBg}
                backColor={Themes[theme].mainButtonColor}
                borderColor=''
                paddingLeft={40}
                paddingTop={20}>
                Зарегистрироваться
              </UniversalButton>
            </ControlBox>
          </Form>
        </Section>
      )

  );
};

export default Registration;
