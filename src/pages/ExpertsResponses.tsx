/* eslint-disable radix */
/* eslint-disable no-nested-ternary */
/* eslint-disable ternary/nesting */
/* eslint-disable import/no-cycle */
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Toaster } from 'react-hot-toast';
import {
  NavigationContainer, Li, Ul, BigP, SmallP, Link,
} from './MyResponses';
import SectionPlateWithFilter from '../ui-lib/widgets/SectionPlateWithFilter';
import {
  useGetCurrentUserQuery, useGetCurrentUserProjectsQuery, useGetRespondedUsersQuery,
} from '../api/api';
import { TUser } from '../types/apiTypes';
import EmptyDefault from '../ui-lib/EmptyImage';
import { makeToast } from '../helpers/promts';
import { useSelector } from '../store/store.types';
import NewSpecPlate from '../ui-lib/widgets/NewSpecPlate';
import { SpecList } from './TeamList';
import { Skeleton4 } from '../ui-lib/widgets/Skeleton';

const SwitcherContainer = styled.div`
  display: flex;
  gap:60px;
  flex-wrap: wrap;
`;

const SwitchButton = styled.button<{ isCurrent: boolean }>`
    display: flex;
    padding: 27px 44px;
    border-radius: 36px;
    background-color: ${({ isCurrent, theme: { sliderColor, buttonSubcolor } }) => (isCurrent ? sliderColor : buttonSubcolor)};
    color: ${({ isCurrent, theme: { subMainTextColor, mainTextColor } }) => (isCurrent ? subMainTextColor : mainTextColor)};
    font-family: 'TTTravels';
    border: ${({ isCurrent, theme: { mainButtonColor } }) => (isCurrent ? 'none' : `1px solid ${mainButtonColor}`)};
    font-size: 25px;
    font-style: normal;
    font-weight: 500;
    line-height: 80%; /* 20px */
    letter-spacing: -0.625px;
    text-align: center;
    cursor: pointer;
    position: relative;
`;

const ExpertsResponses: FC = () => {
  const { error, status } = useGetCurrentUserQuery();
  const {
    data: projects, error: projectsError, status: projectsStatus, isLoading,
  } = useGetCurrentUserProjectsQuery();
  const [currentExpertsArray, setCurrentExpertArray] = useState<TUser[]>();
  const [projectId, setProjectId] = useState<any>();
  const [currentIndex, setCurrentIndex] = useState(-1);
  const { filterProfessionValues } = useSelector((state) => state.all);
  const { data: experts } = useGetRespondedUsersQuery();

  useEffect(() => {
    makeToast(error, status);
  }, [error, status]);

  useEffect(() => {
    makeToast(projectsError, projectsStatus);
  }, [projectsError, projectsStatus]);

  const showExpertsForProjects = () => {
    const isWithNoExperts = projects?.every((el) => el.usersRespondedToProject?.length === 0);
    return projects?.length === 0 || isWithNoExperts;
  };

  const filterProjectsWithExperts = () => projects?.filter((el) => el.usersRespondedToProject?.length !== 0);

  useEffect(() => {
    const arr = filterProjectsWithExperts();
    if (arr?.length !== 0 && arr !== undefined) {
      setCurrentIndex(0);
      setProjectId(arr[0].id);
      setCurrentExpertArray(arr[0].usersRespondedToProject);
    }
  }, [projects]);
  const findExpertsWidthFilters = () => currentExpertsArray?.filter((el) => (filterProfessionValues?.length === 0 ? el : filterProfessionValues?.includes('1')));
  return (

    <SectionPlateWithFilter withButton={false} withOneSelect path='/responses'>
      <Toaster position='bottom-right' />
      <NavigationContainer>
        <Ul>
          <Li>
            <Link to='/responses-projects'>
              <BigP>Отклики</BigP>
              <SmallP>проектов</SmallP>
            </Link>
          </Li>
          <Li>
            <Link to='/my-responses'>
              <BigP>Мои</BigP>
              <SmallP>отклики</SmallP>
            </Link>
          </Li>
          <Li>
            <Link state='active' to='/responses-experts'>
              <BigP>Отклики</BigP>
              <SmallP>специалистов</SmallP>
              {' '}
            </Link>
          </Li>
        </Ul>
      </NavigationContainer>
      {!projects && <EmptyDefault />}
      {showExpertsForProjects()
        ? <EmptyDefault />
        : (
          <>
            <SwitcherContainer>
              {filterProjectsWithExperts()?.map((el, index) => (
                <SwitchButton
                  onClick={() => { setProjectId(el.id); setCurrentIndex(index); setCurrentExpertArray(el.usersRespondedToProject); }}
                  type='button'
                  isCurrent={index === currentIndex}>
                  {el.name}
                </SwitchButton>
              ))}
            </SwitcherContainer>
            <SpecList>
              {isLoading ? <Skeleton4 />
                : currentExpertsArray?.length === 0 ? <EmptyDefault /> : findExpertsWidthFilters()?.length === 0 ? <EmptyDefault /> : findExpertsWidthFilters()?.map((el) => (
                  <NewSpecPlate
                    id={el.id}
                    projectId={projectId}
                    forResponses
                    email={el.email}
                    image={el.avatar || ''}
                    fullName='ghgh'
                    directions={['ghgfh']}
                    professions='ggfh' />
                ))}

            </SpecList>

          </>
        )}
    </SectionPlateWithFilter>

  );
};

export default ExpertsResponses;
