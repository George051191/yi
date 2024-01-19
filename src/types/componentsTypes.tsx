import {
  ChangeEvent, Dispatch, ReactNode, RefObject, SetStateAction,
} from 'react';
import { TProject, TUser } from './apiTypes';

export type TAvatar = {
  setAvatar: Dispatch<SetStateAction<File>>;
  userAvatar: string | ArrayBuffer | null;
  forProfile?: boolean;
};

export type TInputComponent = {
  errorMessage?: string;
  label?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>, index?: number) => void;
  withArrow?: boolean;
  open?: (key: boolean) => void;
  isOpen?: boolean;
  idx?: number;
  name: string;
  type?: string;
  isSubmited?: boolean;
  disabled?: boolean;
  marginTop?: number;
  value?: any;
  inputValue?: any;
  length?: number;
  forHash?: boolean;
  addHash?: () => void;
  withCross?: boolean;
  toShowCross?: boolean;
  deleteFunc?: (key: number) => void;
  withInput?: boolean;
  changeForEdu?: Dispatch<SetStateAction<boolean>>;
};

export type THiddenContainer = {
  isOpen: boolean;
  errorMessage: string;
  setIndex: Dispatch<SetStateAction<any>>;
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>, index?: number) => void;
  setFile: Dispatch<SetStateAction<File>>;
  calendareHandler: (dateString: any, index: number, date?: any) => void;
  name: string;
  fileInputName: string;
  marginTop?: number;
  dateStart: string;
  dateEnd: string;
  inputValue: string;
  index: number;
  disabled?: boolean;
  withCross?: boolean;
  toShowCross?: boolean;
  deleteFunc?: (key: number) => void;
  addOption?: (item: string, index: number) => void;
  imageFile?: any;
};

export type FormObject = {
  firstName?: string;
  patronym?: string;
  lastName?: string;
  fact?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
  dateOfBirth?: Date;
  avatar?: string;
  interests?: string;
  hobbies?: string;
  about?: string;
};

export type TButton = {
  isShown?: boolean,
  disabled?: boolean,
  onClick?: () => void,
  isColored: boolean,
  text: string,
  type: 'button' | 'submit' | 'reset',
  withList?: boolean;
  listItems?: string[];
  showYellow?: boolean;
};

export type TBigTextField = {
  label: string;
  onChange?: (key: string, name?: string, smt?: any) => void;
  name: string;
  value?: string | string[];
  marginTop?: number;
  length?: number;
  disabled?: boolean;
  error?: string;
  specGap?: boolean;
  isSubmited?: boolean;
  idx?: number;
  forProfile?: boolean;
  onChangeForProfile?: (e: ChangeEvent<HTMLTextAreaElement>) => void
};

export type TPlateWithImage = {
  gap?: number;
  isReversed: boolean;
  height: number;
  image: any;
  children: ReactNode;
  padding?: number;
  imageHeight: number;
  align?: string;
  width: number;
  isInView?: boolean;
  isRight?: boolean;
  withBackImage?: boolean;
};

export type TTextBlock = {
  isCenter?: boolean;
  mainText: string;
  paragraphsArray: string[];
  linksArray: string[];
  pathsArray: string[];
  left: number;
  top: number;
  align?: string;
  deg?: string;
  widthButton: boolean;
  buttonText: string
  buttonAlligin: string;
  isInView?: boolean;
  path?: string;
  setScreenState: Dispatch<SetStateAction<boolean>>;
};

export type TEducationObject = {
  organizationName: string;
  educationDates: string[];
  image: string | ArrayBuffer | null;
};

export type TProjectCreateForm = {
  workStatus: boolean;
  setWorkStatus: React.Dispatch<React.SetStateAction<boolean>>;
  doneStatus: boolean;
  setDoneStatus: React.Dispatch<React.SetStateAction<boolean>>;
  projectName: string;
  setProjectName: React.Dispatch<React.SetStateAction<string>>;
  projectDate: Date | string;
  setProjectDate: React.Dispatch<React.SetStateAction<string | Date>>;
  hashArray: string[];
  setHash: React.Dispatch<React.SetStateAction<string>>;
  setHashToArray: () => void;
  about: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setFile: Dispatch<SetStateAction<File>>;
  submit: (e: React.FormEvent<HTMLFormElement>) => void;
  value: string;
  getValue: React.Dispatch<React.SetStateAction<string>>;
  idea: string;
  setIdea: React.Dispatch<React.SetStateAction<string>>;
  stageValue: string;
  getStageValue: React.Dispatch<React.SetStateAction<string>>;
  getAchieveValue: React.Dispatch<React.SetStateAction<string>>;
  achieveValue: string;
};

export type TProjectPlate = {
  isPublished: boolean;
  name: string;
  idea: string;
  description?: any;
  direction?: any;
  conception?: any;
  stage?: any;
  status: string;
  experts: any;
  fullnessPercentage: number;
  id: number | string;
  images: string[];
  isSmall?: boolean;
  createdAt?: Date;
};

export type TProjectWindowPlate = {
  isMine?: boolean;
  imagesArray: string[];
  name: string;
  direction: string;
  stage: string;
  achieve: string[];
  teamMateArray: any[];
  idea: string;
  team: any;
  link: string;
  fileName: string;
  forMoney: boolean;
  withButtons?: boolean;
  id: string | number;
  owner?: number;
  isSmall?: boolean;
  createdAt?: Date;
  forMyRsponses?: boolean;
};

export type TTeamMateWindowPlate = {
  projectsArray?: TProject[];
  image: string | ArrayBuffer;
  name: string;
  professions: string;
  directions: string[];
  forResponses?: boolean;
  id?: string | number;
  projectId?: any;
  moveFromExperts?: () => void;
};

export type TEduObject = {
  educationName: string,
  speciality: string,
  educationEnd: string,
  diplomaName: string,
  diplomaImg: string,
};

export type TSoftSkillTest = {
  testName: string;
  result: string;
  diplomaName: string;
  diplomaImg: string;
};
