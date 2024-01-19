/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import validator from 'validator';

export enum Errors {
  EMAIL_REQUIRED = 'Введите вашу почту или телефон',
  EMAIL_LENGTH = 'Слишком коротко, укажите другое',
  EMAIL_CORRECT = 'Введите корректное значение',

  NAME_REQUIRED = 'Введите ваше имя',
  NAME_LENGTH = 'Имя должно содержать от 3 до 50 символов',

  LASTNAME_REQUIRED = 'Введите вашу фамилию',
  LASTNAME_LENGTH = 'Фамилия должна содержать от 3 до 30 символов',

  PATRONYM_REQUIRED = 'Введите ваше отчество',
  PATRONYM_LENGTH = 'Отчество должно содержать от 3 до 30 символов',

  PASSWORD_REQUIRED = 'Введите пароль',
  PASSWORD_LENGTH = 'Пароль должен содержать от 8 до 100 символов',
  PASSWORD_RULE = 'Пароль должен содержать цифры и латинские буквы',
  PASSWORD_EQUAL = 'Пароли не совпадают',

  SOCIAL_ERROR = 'Введите значение в формате https://...',

  NAME_PROJECT_REQUIRED = 'Введите название проекта',
  NAME_PROJECT_MIN_LENGTH = 'Название должно быть от 3 до 30 символов',

  IDEA_REQUIRED = 'Укажите идею проекта',
  IDEA_MIN_LENGTH = 'Поле должно содержать от 2 до 180 символов',

  CONCEPTION_REQUIRED = 'Укажите концепцию проекта',
  CONCEPTION_MIN_LENGTH = 'Поле должно содержать минимум 10 символов',

  DIRECTION_REQUIRED = 'Укажите направление проекта',

  STAGE_REQUIRED = 'Укажите стадию проекта',
}

export const conditions = (
  name: string,
  inputValue: any,
  nameErrorSetter?: React.Dispatch<React.SetStateAction<string>>,
  lastnameErrorSetter?: React.Dispatch<React.SetStateAction<string>>,
  setEmailError?: React.Dispatch<React.SetStateAction<string>>,
  passwordErrorSetter?: React.Dispatch<React.SetStateAction<string>>,
  confirmErrorSetter?: React.Dispatch<React.SetStateAction<string>>,
  password?: string,
  setProjectNameError?: React.Dispatch<React.SetStateAction<string>>,
  setIdeaError?: React.Dispatch<React.SetStateAction<string>>,
  setConceptionError?: React.Dispatch<React.SetStateAction<string>>,
  setDirectionError?: React.Dispatch<React.SetStateAction<string>>,
  setStageError?: React.Dispatch<React.SetStateAction<string>>,
) => {
  switch (name) {
    case 'email': {
      if (inputValue === '' || inputValue === undefined || inputValue === null) { setEmailError && setEmailError(Errors.EMAIL_REQUIRED); }
      else if (inputValue && !validator.isLength(inputValue, { min: 6, max: 30 })) { setEmailError && setEmailError(Errors.EMAIL_LENGTH); }
      else if (inputValue && !(validator.isEmail(inputValue) || validator.isMobilePhone(inputValue))) { setEmailError && setEmailError(Errors.EMAIL_CORRECT); }
      else setEmailError && setEmailError('');
      break;
    }
    case 'projectName': {
      if (inputValue === '' || inputValue === undefined || inputValue === null) { setProjectNameError && setProjectNameError(Errors.NAME_PROJECT_REQUIRED); }
      else if (inputValue && !validator.isLength(inputValue, { min: 2, max: 30 })) { setProjectNameError && setProjectNameError(Errors.NAME_PROJECT_MIN_LENGTH); }
      else setProjectNameError && setProjectNameError('');
      break;
    }
    case 'idea': {
      if (inputValue === '' || inputValue === undefined || inputValue === null) { setIdeaError && setIdeaError(Errors.IDEA_REQUIRED); }
      else if (inputValue && !validator.isLength(inputValue, { min: 3, max: 180 })) { setIdeaError && setIdeaError(Errors.IDEA_MIN_LENGTH); }
      else setIdeaError && setIdeaError('');
      break;
    }
    case 'conception': {
      if (inputValue === '' || inputValue === undefined || inputValue === null) { setConceptionError && setConceptionError(Errors.CONCEPTION_REQUIRED); }
      else if (inputValue && !validator.isLength(inputValue, { min: 10, max: 10000 })) { setConceptionError && setConceptionError(Errors.CONCEPTION_REQUIRED); }
      else setConceptionError && setConceptionError('');
      break;
    }
    case 'direction': {
      if (inputValue === '' || inputValue === undefined || inputValue === null) { setDirectionError && setDirectionError(Errors.DIRECTION_REQUIRED); }
      else setDirectionError && setDirectionError('');
      break;
    }
    case 'stage': {
      if (inputValue === '' || inputValue === undefined || inputValue === null) { setStageError && setStageError(Errors.STAGE_REQUIRED); }
      else setStageError && setStageError('');
      break;
    }
    case 'firstName': {
      if (inputValue === '' || inputValue === undefined || inputValue === null) { nameErrorSetter && nameErrorSetter(Errors.NAME_REQUIRED); }
      else if (inputValue && !validator.isLength(inputValue, { min: 3, max: 50 })) { nameErrorSetter && nameErrorSetter(Errors.NAME_LENGTH); }
      else nameErrorSetter && nameErrorSetter('');
      break;
    }
    case 'lastName': {
      if (inputValue === '' || inputValue === undefined || inputValue === null) { lastnameErrorSetter && lastnameErrorSetter(Errors.LASTNAME_REQUIRED); }
      else if (inputValue && !validator.isLength(inputValue, { min: 3, max: 30 })) { lastnameErrorSetter && lastnameErrorSetter(Errors.LASTNAME_LENGTH); }
      else lastnameErrorSetter && lastnameErrorSetter('');
      break;
    }
    case 'password': {
      if (inputValue === '' || inputValue === undefined || inputValue === null) { passwordErrorSetter && passwordErrorSetter(Errors.PASSWORD_REQUIRED); }
      else if (!inputValue.match(/^(?=.*[a-zA-Z])(?=.*\d).+$/)) { passwordErrorSetter && passwordErrorSetter(Errors.PASSWORD_RULE); }
      else if (inputValue && !validator.isLength(inputValue, { min: 8, max: 100 })) { passwordErrorSetter && passwordErrorSetter(Errors.PASSWORD_LENGTH); }
      else passwordErrorSetter && passwordErrorSetter('');
      break;
    }
    case 'passwordConfirm': {
      if ((inputValue === '' || inputValue === undefined || inputValue === null) && confirmErrorSetter !== undefined) { confirmErrorSetter && confirmErrorSetter(Errors.PASSWORD_REQUIRED); }
      else if (inputValue && !validator.equals(inputValue, password!)) { confirmErrorSetter && confirmErrorSetter(Errors.PASSWORD_EQUAL); }
      else if (inputValue && !validator.isLength(inputValue, { min: 8, max: 100 })) { confirmErrorSetter && confirmErrorSetter(Errors.PASSWORD_LENGTH); }
      else if (!inputValue.match(/^(?=.*[a-zA-Z])(?=.*\d).+$/)) { confirmErrorSetter && confirmErrorSetter(Errors.PASSWORD_RULE); }
      else confirmErrorSetter && confirmErrorSetter('');
      break;
    }
  }
};
