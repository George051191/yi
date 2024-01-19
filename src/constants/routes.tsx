/* eslint-disable import/prefer-default-export */
import React from 'react';
import Test from '../pages/Test';

const SpecResume = React.lazy(() => import('../pages/SpecResume'));
const CreationForm = React.lazy(() => import('../pages/FakePopupForCreate'));
const Profile = React.lazy(() => import('../pages/Profile_v2'));
const ProfileAbout = React.lazy(() => import('../pages/ProfileAbout'));
const MyProjects = React.lazy(() => import('../pages/MyProjects'));
const MyProjectsList = React.lazy(() => import('../pages/MyProjectsList'));
const CreateProject = React.lazy(() => import('../pages/CreateProject'));
const Window = React.lazy(() => import('../pages/Window'));
const WindowList = React.lazy(() => import('../pages/WindowList'));
const TeamWindow = React.lazy(() => import('../pages/TeamWindow'));
const TeamList = React.lazy(() => import('../pages/TeamList'));
const ResponseMain = React.lazy(() => import('../pages/Responses'));
const ProjectResponses = React.lazy(() => import('../pages/ProjectResponses'));
const ExpertsResponses = React.lazy(() => import('../pages/ExpertsResponses'));
const CreateDiploma = React.lazy(() => import('../pages/CreateDiploma'));
const Achieves = React.lazy(() => import('../pages/Achieves'));
const AchieveDiplomList = React.lazy(() => import('../pages/AchieveDiplomsList'));
const Settings = React.lazy(() => import('../pages/Settings'));
const MyResponses = React.lazy(() => import('../pages/MyResponses'));

export const routesForPresentation = [
  { path: '/profile', Component: <Profile /> },
  { path: '/resume/:profId/:userId', Component: <SpecResume /> },
  { path: '/profile-info', Component: <ProfileAbout /> },
  { path: '/create-spec', Component: <CreationForm /> },
  { path: '/test', Component: <Test /> },
  { path: '/profile/:id', Component: <Profile /> },
  { path: '/projects', Component: <MyProjects /> },
  { path: '/project-create', Component: <CreateProject /> },
  { path: '/all-projects', Component: <Window /> },
  { path: '/projects-window', Component: <WindowList /> },
  { path: '/team-window', Component: <TeamWindow /> },
  /* { path: '/team-list', Component: <TeamList /> }, */
  { path: '/responses-experts', Component: <ExpertsResponses /> },
  { path: '/responses', Component: <ResponseMain /> },
  { path: '/responses-projects', Component: <ProjectResponses /> },
  { path: '/achieves', Component: <Achieves /> },
  { path: '/my-responses', Component: <MyResponses /> },
  { path: '/team-window/team-list', Component: <TeamList /> },
];

export const routes = [
  /*   { path: '/profile', Component: <Profile /> }, */
  /*  { path: '/profile/:id', Component: <Profile withParams /> }, */
  /*   { path: '/projects', Component: <MyProjects /> }, */
  { path: '/projects-list/:id', Component: <CreateProject /> },
  { path: '/projects-list', Component: <MyProjectsList /> },
  { path: '/team-window/team-list', Component: <TeamList /> },

  /* { path: '/project-create', Component: <CreateProject /> }, */
  /* { path: '/all-projects', Component: <Window /> },
  { path: '/projects-window', Component: <WindowList /> }, */
  /*   { path: '/team-window', Component: <TeamWindow /> },
  */
  /*   { path: '/responses-experts', Component: <ExpertsResponses /> },
  { path: '/expert-create', Component: <CreateExpert /> },
  { path: '/responses', Component: <ResponseMain /> },
  { path: '/responses-projects', Component: <ProjectResponses /> }, */
  /*   { path: '/achieves', Component: <Achieves /> }, */
  { path: '/achieves/:id', Component: <AchieveDiplomList /> },
  { path: '/achieves/:id/create', Component: <CreateDiploma /> },
  { path: '/achieves/:id/:achId', Component: <CreateDiploma /> },
  { path: '/settings', Component: <Settings /> },
];

export const navRoutes = [
  { path: 'projects', name: 'Мои проекты' },
  { path: 'all-projects', name: 'Витрина проектов' },
  { path: 'team-window', name: 'Витрина специалистов' },
  { path: 'responses', name: 'Отклики' },
];
