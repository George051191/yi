/* eslint-disable no-nested-ternary */
import React, { FC, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import styled from 'styled-components';
import toast, { Toaster } from 'react-hot-toast';
import ProjectPlate from '../ui-lib/widgets/ProjectPlate';
import { AddIcon } from '../ui-lib/icons';
import SectionPlateWithFilter from '../ui-lib/widgets/SectionPlateWithFilter';
import { jwt, useGetCurrentUserProjectsQuery, useGetCurrentUserQuery } from '../api/api';
import { makeToast } from '../helpers/promts';
import { useSelector } from '../store/store.types';
import EmptyDefault from '../ui-lib/EmptyImage';
import { SectionHeader } from '../ui-lib/TextBlocks';
import { Skeleton3 } from '../ui-lib/widgets/Skeleton';

export const ProjectList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 101px;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
`;

export const AddButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: ${({ theme: { mainTextColor } }) => `1px solid ${mainTextColor}`};
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
`;
/// проверить обработку ошибок
const MyProjectsList: FC = () => {
  const navigate = useNavigate();
  const {
    data, error, status, isLoading,
  } = useGetCurrentUserProjectsQuery();
  const { data: user, error: userError, status: userStatus } = useGetCurrentUserQuery();
  const { filterDirectionsValues, filterProfessionValues } = useSelector((state) => state.all);
  useEffect(() => {
    makeToast(error, status);
  }, [error, status]);
  useEffect(() => {
    makeToast(userError, userStatus);
  }, [userError, userStatus]);

  const filterWithDirectionsAndProfessions = () => {
    const firstStepFiltration = data?.filter((item) => (filterDirectionsValues.length === 0 ? item : filterDirectionsValues.includes(item.division)));
    const secondStepFiltration = firstStepFiltration?.filter((el) => {
      const expertsArr = el.experts;
      const hasExpert = expertsArr.some((item) => filterProfessionValues.includes(item.spec));
      return filterProfessionValues.length === 0 ? el : hasExpert;
    });
    return secondStepFiltration;
  };

  return (

    <SectionPlateWithFilter withOneSelect={false} path='/'>
      <Toaster position='bottom-right' />
      <SectionHeader>Мои проекты</SectionHeader>
      {isLoading
        ? <Skeleton3 />
        // eslint-disable-next-line ternary/nesting
        : data?.length === 0 ? <Navigate to='/projects' />
          : (
            <ProjectList>
              {filterWithDirectionsAndProfessions()?.length === 0
                ? <EmptyDefault />
                : filterWithDirectionsAndProfessions()?.map((el) => (
                  <ProjectPlate
                    createdAt={el.year as Date}
                    isSmall
                    images={el.images}
                    id={el.id!}
                    isPublished={el.isPublished}
                    name={el.name}
                    idea={el.idea}
                    status={el.status}
                    experts={el.experts}
                    fullnessPercentage={el.descriptionFullness} />
                ))}

            </ProjectList>
          )}
      <AddButton onClick={() => navigate('/project-create')} type='button'>
        <AddIcon />
      </AddButton>
    </SectionPlateWithFilter>

  );
};

export default MyProjectsList;
/// добавь второй фильтр
