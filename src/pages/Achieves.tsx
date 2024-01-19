import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
import { AddButton } from './MyProjectsList';
import AchieveImage from '../assets/achieve.svg';
import { SectionHeader } from '../ui-lib/TextBlocks';
import {
  AddIcon, PenIcon, SmallDelete,
} from '../ui-lib/icons';
import {
  useGetAchievementsFoldersQuery, useCreateFolderMutation, jwt, usePatchFolderMutation,
} from '../api/api';
import { makeToast } from '../helpers/promts';
import { Skeleton3 } from '../ui-lib/widgets/Skeleton';
import {
  setFolderId, openFolderDeletePopup, openFolderRedactPopup, openFolderCreatePopup,
} from '../store/allSlice';
import { useDispatch, useSelector } from '../store/store.types';

const Section = styled.section`
  box-sizing: border-box;
  padding-inline: 40px;
  max-width: 1362px;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 100px;
  gap: 60px;
  padding-top: 70px;
  align-items: center;
  position: relative;
`;

export const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  justify-content: center;
`;

const Achieve = styled.div`
    width: 180px; 
    height: 180px;
    border-radius: 20px;
    background-color: ${({ theme: { sliderColor } }) => sliderColor};
    background-image: url(${AchieveImage});
    display: flex;
    background-repeat: no-repeat;
    background-position: center;
    align-items: center;
    justify-content: center;
`;

const AchieveForButton = styled(Achieve)`
  filter: opacity(0.2);
`;

const AchieveWrapper = styled.li`
    display: flex;
    flex-direction: column;
    gap: 23px;
    position: relative;
    cursor: pointer;
    align-items: center;
`;

const AchievesList = styled.ul`
    display: flex;
    gap: 95px;
    flex-wrap: wrap;
    list-style: none;
    margin: 0;
    padding: 0;
    align-self: flex-start;
`;
const AchieveAlbumName = styled.p`
    color: #000;
    font-family: 'TTTravels';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-align: center;
    margin: 0;
`;

export const Form = styled.form`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
  z-index: 99999;
  padding:20px;
  border-radius: 50px;
  background: #FFFEFA;
  width: 459px;
  min-height: 231px;
  flex-shrink: 0;
  backdrop-filter: blur(4px);
`;

const Achieves: FC = () => {
  const dispatch = useDispatch();
  const {
    data, error, status, isLoading,
  } = useGetAchievementsFoldersQuery();
  const navigate = useNavigate();
  useEffect(() => {
    makeToast(error, status);
  }, [error, status]);

  return (
    <Section>
      <Toaster position='bottom-right' />
      <SectionHeader>Достижения</SectionHeader>
      {isLoading
        ? <Skeleton3 />
        : (
          <AchievesList>
            {data?.map((el) => (
              <AchieveWrapper>
                <Achieve onClick={() => navigate(`/achieves/${el.id}`)} />
                <AchieveAlbumName>{el.name}</AchieveAlbumName>

                <SmallDelete onClick={() => { dispatch(openFolderDeletePopup(true)); dispatch(setFolderId(el.id! as number)); }} />
                <PenIcon onClick={(e: any) => { e.preventDefault(); dispatch(openFolderRedactPopup(true)); dispatch(setFolderId(el.id! as number)); }} />

              </AchieveWrapper>
            ))}
            <AchieveWrapper onClick={() => dispatch(openFolderCreatePopup(true))}>
              <AchieveForButton>
                <AddButton style={{ position: 'relative' }}>
                  <AddIcon />
                </AddButton>
              </AchieveForButton>
              <AchieveAlbumName>Создать папку</AchieveAlbumName>
            </AchieveWrapper>
          </AchievesList>
        )}
    </Section>

  );
};

export default Achieves;
