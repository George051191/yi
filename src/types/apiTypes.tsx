export type TEducation = {
  id?: number,
  organization_name?: string,
  speciality?: string,
  education_end_year?: string,
  image?: string,
};

export type TTest = {
  id?: number,
  test_name?: string,
  result?: string,
  image?: string,
};

export type TProfession = {
  id?: 0,
  profession_name?: string,
  level?: string,
  experience?: string,
  hard_skills?: string[],
  soft_skills?: string[],
};

export type TUser = {
  id?: number,
  first_name?: string,
  last_name?: string,
  full_name?: string,
  avatar?: string,
  email?: string,
  birth_date?: string,
  age?: string,
  address?: string,
  vk?: string,
  telegram?: string,
  github?: string,
  hard_skills?: string[],
  soft_skills?: string[],
  team_work_experience?: string,
  educations?: TEducation[],
  tests?: TTest[],
  professions?: TProfession[],
  password?: string,
  re_password?: string,
};

export type TUserCreation = Pick<TUser, 'id' | 'first_name' | 'last_name' | 'password' | 're_password' | 'email'>;

export type TUserLogin = Pick<TUser, 'email' | 'password'>;

export type TProject = {
  id?: string | number;
  ownerId?: number;
  name: string;
  idea: string;
  status: string;
  stage: string;
  achievements: string[];
  year: Date | string;
  division: string;
  images: string[];
  file: string;
  description: string;
  team?: { name: string, speciality: string, id: string | number }[];
  experts: { spec: string, task: string, forMoney: boolean, level: string }[];
  descriptionFullness: number;
  createdAt?: Date;
  isPublished: boolean;
  usersInvitedInProject?: any[]; /// массив айдишников тех юзеров которых ты приглашаешь с витрины спецов
  usersRespondedToProject?: any[]; /// массив айдишников тех юзеров которые сами откликнулись на проект с витрины проектов
};

export type TFolder = {
  id?: string | number;
  name: string;
  achievements: number;
  createsAt?: Date;
};

export type TAchievement = any;
/*  id?: string | number;
  name: string;
  description: string;
  images: string[];
  createsAt?: Date; */
