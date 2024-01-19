import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { SectionHeader } from '../ui-lib/TextBlocks';
import { RegularInput } from '../ui-lib/Inputs';
import Button from '../ui-lib/Button';
import { Section } from './MyProjects';
import { useChangePasswordMutation } from '../api/api';
import { makeToast } from '../helpers/promts';

const SettingsSection = styled(Section)`
    align-items: center;
    padding-top: 90px;
    gap: 50px;
    
`;

const SwitcherPanel = styled.div`
    display: flex;
    gap: 45px;
    align-self: flex-start;
`;

const SwitcherDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  cursor: pointer;
`;

const P = styled.p`
  margin:0;
  font-family: 'TTTravels';
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  color:${({ theme: { mainTextColor } }) => mainTextColor};
`;

const Span = styled.span<{ isCurrent: boolean }>`
  height: 1px;
  background-color: ${({ theme: { mainButtonColor } }) => mainButtonColor} ;
  width:${({ isCurrent }) => (isCurrent ? '100%' : '0%')};
  transition: all ease .3s;
`;

const Plate = styled.div`
    max-width: 1362px;
    width: 100%;
    min-height: 537px;
    border-radius: 91px;
    background: #F1F4FF;
    display: flex;
    flex-direction: column;
    gap: 60px;
    align-items: center;
    justify-content: flex-start;
    padding-left: 100px;
    padding-right: 100px;
    padding-top: 38px;
    box-sizing: border-box;
`;
const ResetForm = styled.form`
  max-width: 550px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 60px;
  align-self: flex-start;
  & button {
        margin-top: 0;
        align-self: flex-start;
    }
`;

const MailForm = styled.form`
    padding-bottom: 30px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 60px;
    align-self: flex-start;
     & button {
        margin-top: 0;
        align-self: flex-end;
    }
`;

const MailAddress = styled.div`
    display: flex;
    width: fit-content;
    padding: 20px 44px;
    border-radius: 36px;
    background-color: ${({ theme: { buttonSubcolor } }) => (buttonSubcolor)};
    color: ${({ theme: { mainTextColor } }) => (mainTextColor)};
    font-family: 'TTTravels';
    border: ${({ theme: { mainButtonColor } }) => (`1px solid ${mainButtonColor}`)};
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 80%; /* 20px */
    letter-spacing: -0.625px;
    z-index: 0;
    text-align: center;
    z-index: 9999999;
    position: relative;
`;
const AreaWrapper = styled.div`
    border-radius: 40px;
    background: #EAEEFF;
    box-shadow: 0px 0px 20px 4px rgba(0, 0, 0, 0.10);
    padding: 20px;
`;
const MailArea = styled.textarea`
    background: #EAEEFF;
    width: 100%;
    border: none;
    color:${({ theme: { mainTextColor } }) => mainTextColor};
    display: block;
    font-family: 'TTTravels';
    font-size: 20px;
    font-weight: 500;
    line-height: 50px;
    background-attachment: local;
    resize: none;
    box-sizing: border-box;
    height: 240px;
    background: transparent;
    width: 100%;
    background-image: -webkit-linear-gradient(top, transparent, transparent 49px, rgb(218, 218, 218) 0px), -webkit-radial-gradient(0% 46%, circle closest-corner, rgb(245, 245, 245), rgb(245, 245, 245) 0%, transparent 0%), -webkit-radial-gradient(0% -18%, circle closest-corner, rgb(204, 204, 204), rgb(204, 204, 204) 21.5%, transparent 0%);
    z-index: 2;
    -webkit-background-size:  100% 50px;
     background-size: 100% 50px;
     &:focus {
        border: none;
        outline: none;

        }
`;

const Settings: FC = () => {
  const [isResetShown, showReset] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');
  const [update, { status }] = useChangePasswordMutation();
  const [isSubmited, setSubmit] = useState<boolean>(false);
  const {
    register, formState: { errors }, reset, handleSubmit,
  } = useForm();
  const changePassword = async (data: any) => {
    try {
      await update(data);
      setSubmit(true);
    } catch (err) {
      console.log('mistake');
    }
  };
  useEffect(() => {
    status === 'rejected' && toast.error('Старый пароль не совпадает');
  }, [status]);
  const openMail = () => {
    window.location.href = `mailto:contact@проектим.рф?subject=Служба поддержки&body=${message}`;
  };
  return (
    <SettingsSection>
      <Toaster position='bottom-right' />
      <SectionHeader>Настройки</SectionHeader>
      <Plate>

        <SwitcherPanel>
          <SwitcherDiv onClick={() => { showReset(true); }}>
            <P>Пароль</P>
            <Span isCurrent={isResetShown} />
          </SwitcherDiv>
          <SwitcherDiv onClick={() => { showReset(false); }}>
            <P>Служба поддержки</P>
            <Span isCurrent={!isResetShown} />
          </SwitcherDiv>
        </SwitcherPanel>
        {isResetShown ? (
          <ResetForm onSubmit={(handleSubmit(changePassword))}>
            <RegularInput
              errorMessage={errors?.oldPassword?.message as string}
              maxLength={100}
              type='password'
              options={{
                required: 'Заполните поле',
                minLength: {
                  value: 8,
                  message: 'Поле должно содержать минимум 8 символов',
                },
                maxLength: {
                  value: 100,
                  message: 'Поле должно содержать маскимум 100 символов',
                },
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*\d).+$/,
                  message: 'Некорректное значение',
                },
              }}
              register={register}
              name='oldPassword'
              label='Старый пароль :' />
            <RegularInput
              errorMessage={errors?.newPassword?.message as string}
              maxLength={100}
              type='password'
              options={{
                required: 'Заполните поле',
                minLength: {
                  value: 8,
                  message: 'Поле должно содержать минимум 8 символов',
                },
                maxLength: {
                  value: 100,
                  message: 'Поле должно содержать маскимум 100 символов',
                },
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*\d).+$/,
                  message: 'Некорректное значение',
                },
              }}
              register={register}
              name='newPassword'
              label='Новый пароль : ' />
            <Button isColored={isSubmited} text={isSubmited ? 'Сохранено' : 'Изменить'} type='submit' />
          </ResetForm>
        )
          : (
            <MailForm>
              <MailAddress>contact@проектим.рф</MailAddress>
              <AreaWrapper>
                <MailArea onChange={(e) => setMessage(e.target.value)} />
              </AreaWrapper>
              <Button onClick={openMail} type='button' isColored={false} text='Отправить' />
            </MailForm>
          )}
      </Plate>
    </SettingsSection>
  );
};

export default Settings;
