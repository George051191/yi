/* eslint-disable ternary/no-dupe */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect } from 'react';
import {
  Link, Navigate, useNavigate, useLocation,
} from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
import { UniversalButton } from '../ui-lib/RestyledButtons';
import { useLoginUserMutation, jwt } from '../api/api';
import 'react-toastify/dist/ReactToastify.css';
import pavuk from '../assets/bigpavuk.png';
import { makeToast } from '../helpers/promts';
import { TravelsFontMixixn20 } from '../constants/fontsConfigs';
import { BasicInput } from '../ui-lib/FormElements';
import Themes from '../themes';
import { useSelector } from '../store/store.types';

export const Section = styled.section`
    max-width: 710px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
    box-sizing: border-box;
    padding-inline: 20px;
`;

export const Logo = styled.img`
    max-width: 270px;
    width: 100%;
    height: 300px;
    object-fit: cover;
    cursor: pointer;
    align-self: center;
    @media screen and (max-width:560px) {
      object-fit: contain;
    }

`;

const ControlBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 36px;
    max-width: 224px;
    width: 100%;
    align-self: center;
    align-items: center;
    & button {
        width: 164px;
    }
    `;
export const P = styled.p`
    color: ${({ theme: { mainTextColor } }) => mainTextColor};
    ${TravelsFontMixixn20}
    margin: 0;
    margin-top: 30px;
`;
export const CustomLink = styled(Link)`
    color: ${({ theme: { mainButtonColor } }) => mainButtonColor};
    ${TravelsFontMixixn20}
    text-decoration: none;
`;

export const LogoLink = styled(Link)`
    text-decoration: none;
    display: flex;
    justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 35px;
`;

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.all);
  const location = useLocation();
  const [loginUser, { status }] = useLoginUserMutation();
  const {
    register, formState: { errors }, reset, handleSubmit,
  } = useForm();

  const submitForm = async (values: any) => {
    try {
      const token = await loginUser(values).unwrap();
      jwt.set(token.auth_token);
      token.auth_token && navigate(location.state || '/profile');

      reset();
    } catch (err: any) {
      console.log('Попробуйте еще раз');
    }
  };
  useEffect(() => {
    makeToast(null, status);
  }, [status]);

  return (
    jwt.test() ? <Navigate to='/' />
      : (
        <Section>
          <Toaster position='bottom-right' />
          <Form onSubmit={handleSubmit(submitForm)}>
            <LogoLink to='/'>
              <Logo src={pavuk} />
            </LogoLink>

            <BasicInput
              forRequired
              errorMessage={errors?.email?.message as string}
              type='text'
              autocomplete='email'
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
              register={register}
              name='email'
              label='Email' />
            <BasicInput
              forRequired
              errorMessage={errors?.password?.message as string}
              maxLength={100}
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
              register={register}
              name='password'
              label='Пароль' />
            <ControlBox>
              <UniversalButton
                type='submit'
                textColor={Themes[theme].mainTextColor}
                backColor={Themes[theme].mainBg}
                borderColor={Themes[theme].mainButtonColor}
                paddingLeft={40}
                paddingTop={20}>
                Войти
              </UniversalButton>
              <P>
                или

                <CustomLink style={{ marginLeft: '6px' }} to='/registration'>зарегистрируйся</CustomLink>
              </P>
              <P style={{ cursor: 'pointer', marginTop: '6px' }} onClick={() => navigate('/settings')}>забыли пароль?</P>
            </ControlBox>
          </Form>
        </Section>
      )
  );
};

export default LoginPage;
