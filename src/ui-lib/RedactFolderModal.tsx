import React, { FC } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from '../store/store.types';
import { openFolderRedactPopup, setFolderId } from '../store/allSlice';
import { jwt, usePatchFolderMutation } from '../api/api';
import { RegularInput } from './Inputs';
import { ControlContainer, Form } from '../pages/Achieves';
import Button from './Button';

const RedactFolderModal: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { folderId } = useSelector((state) => state.all);
  const [patchFolder] = usePatchFolderMutation();
  const {
    register, formState: { errors }, reset, handleSubmit,
  } = useForm();

  const create = async (someData: any) => {
    if (!jwt.test()) {
      navigate('/login');
    }
    try {
      await patchFolder({ ...someData, id: folderId });

      dispatch(setFolderId(0));
    } catch (err) {
      console.log('mistake');
    }
    reset();
    dispatch(openFolderRedactPopup(false));
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
        <Button isColored type='submit' text='Изменить' />
        <Button onClick={() => { dispatch(setFolderId(0)); dispatch(openFolderRedactPopup(false)); }} type='button' text='Закрыть' isColored={false} />
      </ControlContainer>

    </Form>
  );
};

export default RedactFolderModal;
