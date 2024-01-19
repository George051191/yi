/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable consistent-return */
/* eslint-disable radix */
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from '../store/store.types';
import SectionPlateWithFilter from '../ui-lib/widgets/SectionPlateWithFilter';
import Button from '../ui-lib/Button';
import AchievePlate from '../ui-lib/widgets/AchievePlate';
import { useGetAchievementsFoldersQuery, useGetCurrentFolderAchievementsQuery, useLazyGetCurrentFolderAchievementsQuery } from '../api/api';
import EmptyDefault from '../ui-lib/EmptyImage';
import { makeToast } from '../helpers/promts';
import { AddIcon } from '../ui-lib/icons';
import { SectionHeader } from '../ui-lib/TextBlocks';
import { Skeleton3 } from '../ui-lib/widgets/Skeleton';

const CustomPropsBreadcrumb:FC<{ text:string }> = ({ text }) => <span>{text}</span>;

const DiplomsList = styled.ul`
    list-style: none;
    margin: 0;
    padding:0;
    gap: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
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
  position: relative;
`;
const AchieveDiplomsList: FC = () => {
  const { id } = useParams();
  const { data, error, status } = useGetCurrentFolderAchievementsQuery(id!);
  // const [getAchievements, { data, error, status }] = useLazyGetCurrentFolderAchievementsQuery();
  const {
    data: folders, error: folderError, status: folderStatus, isLoading: loading,
  } = useGetAchievementsFoldersQuery();
  const { filterNewFirst } = useSelector((state) => state.all);
  const navigate = useNavigate();
  // const calculateIdForAchieve = async () => {
  //   try {
  //     const currentPageAchieveId = (folders || []).find((el) => el.name === id)?.id;
  //     currentPageAchieveId && await getAchievements(currentPageAchieveId);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  useEffect(() => {
    makeToast(error, status);
  }, [error, status]);
  useEffect(() => {
    makeToast(folderError, folderStatus);
  }, [folderError, folderStatus]);
  // useEffect(() => {
  //   if (folders && !folders?.find((el) => el.id === id)) {
  //     navigate('/achieves');
  //   }
  // }, [folders]);
  const filterForDates = () => {
    if (filterNewFirst && data) {
      const copyArr = [...data];
      const arr = copyArr.sort((a, b) => (new Date(a.createdAt).getSeconds() > new Date(b.createdAt).getSeconds() ? 1 : -1));
      return arr;
    }
    if (!filterNewFirst && data) {
      const copyArr = [...data];
      const arr = copyArr.sort((a, b) => (new Date(a.createdAt).getSeconds() > new Date(b.createdAt).getSeconds() ? -1 : 1));
      return arr;
    }
  };
  const findPathName = () => {
    const pathName = folders?.find((el) => el.id === parseInt(id!))?.name;
    return [{ path: '/achieves/:id', breadcrumb: CustomPropsBreadcrumb, props: { text: pathName } }];
  };
  return (

    <SectionPlateWithFilter routeArr={findPathName()} forDates withOneSelect path='/achieves'>
      <SectionHeader>{folders?.find((el) => el.id === parseInt(id!))?.name || ''}</SectionHeader>

      {data?.length === 0 && <Button onClick={() => navigate(`/achieves/${id}/create`)} type='button' text='Добавить достижение' isColored />}
      {loading
        ? <Skeleton3 />
        : (
          <DiplomsList>
            {data?.length === 0 ? <EmptyDefault /> : filterForDates()?.map((el) => (
              <AchievePlate urlId={id} id={el.id} name={el.name} year={el.date as Date} description={el.description} images={el.files} />
            ))}
            {data?.length! > 0
              && (
                <AddButton type='button' onClick={() => navigate(`/achieves/${id}/create`)}>
                  <AddIcon />
                </AddButton>
              )}
          </DiplomsList>
        )}
    </SectionPlateWithFilter>

  );
};

export default AchieveDiplomsList;
