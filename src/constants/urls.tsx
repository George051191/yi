export const API_ROOT = 'http://51.250.6.53';

export const LOGIN_USER = 'api/auth/token/login/';
export const USER = '/api/users/';
export const VERIFY_EMAIL = '/login/verify-email';
export const GET_USER = '/api/users/me/';
export const ALL_USERS = '/api/users/';
/// новые урлы
export const GET_ALL_EXPERTS = '/user/experts'; /// получение всех экспертов

export const PROJECT = '/projects'; /// получение по айдишнику проектов текущего пользователя
export const PATCH_EXPERT = ''; /// экран добавления себя как эксперта, просто апдейтим юзера
export const GIVE_AGREE = '/projects/shareContacts'; /// экран отклики проектов, когда юзер разрешает просмотр своих контактов другому юзеру
export const CREATE_PROJECT = '/projects/create'; /// создание проекта
export const GET_MY_PROJECTS = '/projects/my'; /// получение всех проектов текущего зареганного пользователя
export const GET_ALL_PROJECTS = '/projects/all'; /// просто получение всех проектов где isPublish:true
export const PUBLISH_PROJECT = '/projects/publish'; /// меняем isPublish
export const RESPOND_TO_PROJECT = '/projects/respond'; /// откликнуться на проект на странице витрина проектов. Добавить айди юзера в поле usersRespondedToProject проекта
export const INVITE_TO_PROJECT = '/projects/invite'; /// пригласить спеца в свои проект на странице витрина специалистов. Добавить его айди в поле  usersInvitedInProject проекта
export const UPDATE_PROJECT = '/projects/update'; /// обновление текущего проекта
export const APPROVE_TO_PROJECT = '/projects/approveExpert'; /// запись эксперта в поле team проекта, на странице отклики специалистов

export const GET_ACHIEVEMENTS = '/achievements/';
export const HARD_SKILLS = '';
export const SOFT_SKILLS = '';
export const TESTS = '';
export const EDUCATION = '';
