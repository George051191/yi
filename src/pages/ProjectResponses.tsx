/* eslint-disable import/no-cycle */
import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { Toaster } from 'react-hot-toast';
import { ProjectList } from './MyProjectsList';
import {
  NavigationContainer, Li, Ul, BigP, SmallP, Link,
} from './MyResponses';
import ProjectWindowPlate from '../ui-lib/widgets/ProjectWindowPlate';
import SectionPlateWithFilter from '../ui-lib/widgets/SectionPlateWithFilter';
import { jwt, useGetInvitedProjectsQuery } from '../api/api';
import EmptyDefault from '../ui-lib/EmptyImage';
import { makeToast } from '../helpers/promts';
import { useSelector } from '../store/store.types';

export const P = styled.p`
    color: ${({ theme: { mainButtonColor } }) => mainButtonColor};
    text-align: center;
    font-family: 'Comforta';
    font-size: 31px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin: 0;
`;

const ProjectResponses: FC = () => {
  const { data, error, status } = useGetInvitedProjectsQuery();
  const { filterDirectionsValues, filterProfessionValues } = useSelector((state) => state.all);
  useEffect(() => {
    makeToast(error, status);
  }, [error, status]);
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

    <SectionPlateWithFilter withButton={false} withOneSelect={false} path='/responses'>
      <Toaster position='bottom-right' />
      {/* <Header>
        Отклики
        <br />
        <P>проектов</P>
      </Header> */}
      <NavigationContainer>
        <Ul>
          <Li>
            <Link state='active' to='/responses-projects'>
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
            <Link to='/responses-experts'>
              <BigP>Отклики</BigP>
              <SmallP>специалистов</SmallP>
              {' '}
            </Link>
          </Li>
        </Ul>
      </NavigationContainer>
      {!data && <EmptyDefault />}
      {data?.length === 0 ? <EmptyDefault />
        : (
          <ProjectList style={{ gap: '60px' }}>
            {filterWithDirectionsAndProfessions()?.length === 0
              ? <EmptyDefault />
              : filterWithDirectionsAndProfessions()?.map((el) => (
                <ProjectWindowPlate
                  owner={el.ownerId}
                  id={el.id!}
                  withButtons
                  imagesArray={el.images}
                  name={el.name}
                  direction={el.division}
                  stage={el.stage}
                  achieve={el.achievements}
                  teamMateArray={el.experts}
                  idea={el.idea}
                  team={[]}
                  link={el.file}
                  fileName={el.file}
                  forMoney />
              ))}

          </ProjectList>
        )}
    </SectionPlateWithFilter>
  );
};

export default ProjectResponses;
