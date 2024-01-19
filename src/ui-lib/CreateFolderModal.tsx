import React, { FC } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useDispatch } from '../store/store.types';
import { openFolderCreatePopup } from '../store/allSlice';
import { jwt, useCreateFolderMutation } from '../api/api';
import { RegularInput } from './Inputs';
import { ControlContainer, Form } from '../pages/Achieves';
import Button from './Button';

const CreateFolderModal: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createFolder, { status: createStatus }] = useCreateFolderMutation();

  const {
    register, formState: { errors }, reset, handleSubmit,
  } = useForm();

  const create = async (someData: any) => {
    if (!jwt.test()) {
      navigate('/login');
    }
    try {
      await createFolder(someData);
    } catch (err) {
      console.log('mistake');
    }
    reset();
    dispatch(openFolderCreatePopup(false));
  };
  return (
    <Form style={{ padding: '60px', boxSizing: 'border-box' }} onSubmit={handleSubmit(create)}>
      <RegularInput
        errorMessage={errors?.name?.message as string}
        maxLength={20}
        type='text'
        options={{
          required: 'Заполните поле',
          minLength: {
            value: 2,
            message: 'Введите название папки',
          },
        }}
        register={register}
        name='name'
        label='Укажите название папки' />
      <ControlContainer>
        <Button isColored type='submit' text='Создать' />
        <Button onClick={() => { dispatch(openFolderCreatePopup(false)); }} type='button' text='Закрыть' isColored={false} />
      </ControlContainer>

    </Form>
  );
};

export default CreateFolderModal;
