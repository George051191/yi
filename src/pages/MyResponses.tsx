/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import SectionPlateWithFilter from '../ui-lib/widgets/SectionPlateWithFilter';
import { ArrowIcon } from '../ui-lib/icons';
import NewSpecPlate from '../ui-lib/widgets/NewSpecPlate';
import ProjectWindowPlate from '../ui-lib/widgets/ProjectWindowPlate';
import { useGetAllMyResponsesQuery, useGetAllClosedProjectsQuery, useGetCurrentUserProjectsQuery } from '../api/api';
import { Skeleton4 } from '../ui-lib/widgets/Skeleton';

const Div = styled.div`
    border-radius: 82.183px;
    background: #EAEEFF;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-inline: 50px;
    box-sizing: border-box;
    padding-top: 40px;
    padding-bottom: 40px;
    gap: 40px;

`;

const Direction = styled.div`
  display: flex;
  gap: 45px;
  align-items: baseline;
  cursor: pointer;
& path {
    stroke: ${({ theme: { mainButtonColor } }) => mainButtonColor};
}
`;

const P = styled.p`
    font-family: 'Comforta';
    font-size: 31px;
    font-style: normal;
    font-weight: 400;
    margin: 0;
    line-height: normal;
    color:${({ theme: { mainButtonColor } }) => mainButtonColor};
`;

const SpecList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    flex-wrap: wrap;
    width: 100%;
    gap: 40px;
    display: flex;
    @media screen and (max-width:1450px) {
      justify-content: space-between;
    max-width: 1000px;
    align-self: center;
    }
`;

const ProjectsList = styled.ul`
     list-style: none;
    margin: 0;
    display: flex;
    padding: 0;
    flex-direction: column;
    width: 100%;
    gap: 40px;
`;

export const Link = styled(NavLink)`
    text-decoration: none;
    color: #D8D7D7;
    text-align: center;
    font-family: 'Comforta';
    font-size: 31px;
    font-style: normal;
    font-weight: 400;
    display: flex;
    flex-direction: column;
    line-height: normal;
    &.active {
        color:${({ theme: { mainButtonColor } }) => mainButtonColor};
    }
`;

export const NavigationContainer = styled.nav`
    width: 100%;
    display: flex;
    justify-content: center;
`;

export const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 90px;
`;
export const Li = styled.li`
    
`;
export const BigP = styled.p`
    margin: 0;
    font-size: 39px;
`;
export const SmallP = styled.p`
  margin: 0;
  font-size: 31px;
`;
const MyResponses: FC = () => {
  const [isOpenSpec, openSpec] = useState<boolean>(false);
  const [isProjectsOpen, openProjects] = useState<boolean>(false);
  const { data, isLoading } = useGetAllMyResponsesQuery();
  const { data: projects } = useGetCurrentUserProjectsQuery();
  /* const { data: projects } = useGetAllClosedProjectsQuery(); */

  /*   console.log(projects); */
  const justForNowArr = (arr1:any, arr2:any) => arr1.filter((el: any) => !arr2.some((item: any) => item.id === el.id));

  return (
    <SectionPlateWithFilter withButton={false} path='' withOneSelect>
      <NavigationContainer>
        <Ul>
          <Li>
            <Link to='/responses-projects'>
              <BigP>Отклики</BigP>
              <SmallP>проектов</SmallP>
            </Link>
          </Li>
          <Li>
            <Link state='active' to='/my-responses'>
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
      <Div>
        <Direction onClick={() => openSpec(!isOpenSpec)}>
          <P>Специалисты</P>
          <ArrowIcon style={{ width: '22px', height: '18px' }} isOpen={isOpenSpec} />
        </Direction>
        {isOpenSpec
          && (
          <SpecList>
            {isLoading ? <Skeleton4 />
              : data?.experts.map((el) => (
                <NewSpecPlate forMyResponses image={el.avatar!} fullName='gggg' level='ggg' id='5' />
              ))}

          </SpecList>
          )}
        <Direction onClick={() => openProjects(!isProjectsOpen)}>
          <P>Проекты</P>
          <ArrowIcon style={{ width: '22px', height: '18px' }} isOpen={isProjectsOpen} />
        </Direction>
        {isProjectsOpen
          && (
          <ProjectsList>
            {isLoading ? <Skeleton4 />
              : data && projects && justForNowArr(data.projects, projects).map((el: any) => (
                <ProjectWindowPlate
                  createdAt={el.createdAt}
                  id={el.id!}
                  withButtons
                  isSmall
                  forMyRsponses
                  imagesArray={el.images}
                  name={el.name}
                  direction={el.division}
                  stage={el.stage}
                  achieve={el.achievements}
                  idea={el.description}
                  teamMateArray={el.experts}
                  team={el.team}
                  link={el.file}
                  fileName='Документ'
                  forMoney={false} />
              ))}

          </ProjectsList>
          )}
      </Div>
    </SectionPlateWithFilter>
  );
};

export default MyResponses;
