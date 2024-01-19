/* eslint-disable no-console */
/* eslint-disable react/require-default-props */
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { BreadArrow } from '../icons';
import Arrow from '../../assets/BreadArrow.svg';

// { path: '/profile', Component: <Profile /> },
// { path: '/profile/:id', Component: <Profile withParams /> },
// { path: '/projects', Component: <MyProjects /> },
// { path: '/project-create', Component: <CreateProject /> },
// { path: '/all-projects', Component: <Window /> },
// { path: '/projects-window', Component: <WindowList /> },
// { path: '/team-window', Component: <TeamWindow /> },
// /* { path: '/team-list', Component: <TeamList /> }, */
// { path: '/responses-experts', Component: <ExpertsResponses /> },
// { path: '/expert-create', Component: <CreateExpert /> },
// { path: '/responses', Component: <ResponseMain /> },
// { path: '/responses-projects', Component: <ProjectResponses /> },
// { path: '/achieves', Component: <Achieves /> },
// { path: '/my-responses', Component: <MyResponses /> },

const routes = [
  { path: '/', breadcrumb: 'Главная' },
  { path: '/profile', breadcrumb: 'Профиль' },
  { path: '/profile-info', breadcrumb: 'Просмотр анкеты' },
  { path: '/projects', breadcrumb: 'Мои проекты' },
  { path: '/project-create', breadcrumb: 'Создание проекта' },
  { path: '/all-projects', breadcrumb: 'Все проекты' },
  { path: '/projects-window', breadcrumb: 'Витрина проектов' },
  { path: '/team-window', breadcrumb: 'Все специалисты(главная)' },
  { path: '/team-list', breadcrumb: 'Витрина специалистов' },
  { path: '/responses-experts', breadcrumb: 'Отклики экспертов' },
  { path: '/responses', breadcrumb: 'Все отклики' },
  { path: '/responses-projects', breadcrumb: 'Отклики проектов' },
  { path: '/my-responses', breadcrumb: 'Мои отклики' },
  { path: '/achieves', breadcrumb: 'Достижения' },
  { path: '/team-window/expert-create', breadcrumb: 'Анкета' },
  { path: '/team-window/team-list', breadcrumb: 'Все доступные специалисты' },
  { path: '/projects-list', breadcrumb: 'Мои проекты' },

];

export const CustomBreadLink = styled(NavLink)`
  text-decoration: none;
  color: #9D9797;
  font-family: 'TTTravels';
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  display: flex;
  gap: 10px;
  align-items: center;
  &::after {
    display: block;
    content: '';
    width: 12px;
    height: 12px;
    background-image: url(${Arrow});
  }
  &:last-of-type::after {
    display: none;
  }

`;
const BreadContainer = styled.nav`
  display: flex;
  gap: 10px;
`;

const Breadcrumbs: FC<{ dynamicRoutes?:{ path: string, breadcrumb: string }[] }> = ({ dynamicRoutes }) => {
  const breadcrumbs = useBreadcrumbs(dynamicRoutes ? [...dynamicRoutes, ...routes] : routes);
  console.log(breadcrumbs);
  return (
    <BreadContainer>
      {breadcrumbs.map(({ match, breadcrumb }) => (
        <CustomBreadLink key={match.pathname} to={match.pathname}>
          {breadcrumb}
        </CustomBreadLink>
      ))}
    </BreadContainer>
  );
};

export default Breadcrumbs;
