import React, { FC } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from '../store/store.types';
import { useDeleteFolderMutation } from '../api/api';
import { setFolderId, openFolderDeletePopup } from '../store/allSlice';
import { ControlContainer, Form } from '../pages/Achieves';
import Button from './Button';

const ApproveText = styled.p`
    color: ${({ theme: { mainTextColor } }) => mainTextColor};
    font-family: 'TTTravels';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    align-self: center;
    margin-bottom: 23px;
    gap: 40px;
    display: flex;
    align-items: center;
    margin: 0;
`;

const DeleteFolderModal: FC = () => {
  const dispatch = useDispatch();
  const [deleteFolder] = useDeleteFolderMutation();
  const { folderId } = useSelector((state) => state.all);
  const deleteFunc = async (id: any) => {
    try {
      await deleteFolder(id);
      dispatch(openFolderDeletePopup(false));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Form>
      <ApproveText>Вы уверены, что хотите удалить папку ?</ApproveText>
      <ControlContainer>
        <Button onClick={() => deleteFunc(folderId)} type='button' text='Удалить' isColored />
        <Button onClick={() => { dispatch(setFolderId(0)); dispatch(openFolderDeletePopup(false)); }} type='button' text='Закрыть' isColored={false} />
      </ControlContainer>
    </Form>
  );
};

export default DeleteFolderModal;
