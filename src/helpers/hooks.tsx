/* eslint-disable import/prefer-default-export */
import React, { useEffect, useRef, useState } from 'react';
import {
  setMany,
} from 'idb-keyval';

/// используй на лендинге для выплывающих анимаций блоков
export function useOnScreen(ref: any) {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting), { threshold: 0.2 });

  useEffect(() => {
    console.log(ref);
    if (ref.current !== null) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return isIntersecting;
}

// const setUserData = async (obj: any) => {
//   const [lastName, firstName, email, hobbies, about, fact, avatar, firstEdu, secondEdu, socialNetworks] = id ? [] : await getMany([
//     'lastName',
//     'firstName',
//     'email',
//     'hobbies',
//     'about',
//     'fact',
//     'avatar',
//     'firstEdu',
//     'secondEdu',
//     'socialNetworks']);
//   setValue('lastName', obj?.lastName || lastName);
//   setValue('firstName', obj?.firstName || firstName);
//   setValue('dateOfBirth', obj?.dateOfBirth);
//   setValue('email', obj?.email || email);
//   setValue('hobbies', obj?.hobbies || hobbies);
//   setValue('about', obj?.about || about);
//   setValue('fact', obj?.fact || fact);
//   setSocialArr(obj?.socialNetworks || (socialNetworks || ['']));
//   setAvatar(obj?.avatar || avatar);
//   if (!jwt.test()) {
//     setEducationValue(firstEdu || [{ image: '', organizationName: '', educationDates: ['', ''] }]);
//     setSecondaryObject(secondEdu || [{ image: '', organizationName: '', educationDates: ['', ''] }]);
//     return;
//   }
//   setEducationValue(obj?.education?.firstEducation?.length === 0 ? (firstEdu || [{ image: '', organizationName: '', educationDates: ['', ''] }]) : obj?.education?.firstEducation!);
//   setSecondaryObject(obj?.education?.secondaryEducation?.length === 0 ? (secondEdu || [{ image: '', organizationName: '', educationDates: ['', ''] }]) : obj?.education?.secondaryEducation!);
// };

// useEffect(() => {
//   const asyncGet = async (index: string | number) => {
//     try {
//       const newUser = await getUserById(index).unwrap();
//       newUser && setUserData(newUser);
//     } catch (err: any) {
//       console.log('');
//     }
//   };
//   id ? asyncGet(id) : setUserData(data);
// }, [id, data]);

// const timer = useRef<string | number | NodeJS.Timeout | undefined>();
// useEffect(() => {
//   clearTimeout(timer.current);

//   timer.current = setTimeout(setDataToDB, 1000, userAvatar, educationObject, secondaryEducationObject, socialArr);
// }, [userAvatar, educationObject, secondaryEducationObject, socialArr]);
type TObjectForSave = {
  lastName: null | string;
  firstName: null | string;
  email:null | string;
  hobbies: null | string;
  about: null | string;
  fact: null | string;
  avatar: null | string;
  firstEdu: null | any;
  secondEdu: null | any;
  socialNetworks: null | string;
};

export const useAutoSaveForms = (): [TObjectForSave, React.Dispatch<React.SetStateAction<TObjectForSave>>] => {
  const [objectForSave, setValuesForSaveOject] = useState<TObjectForSave>({
    lastName: null,
    firstName: null,
    email: null,
    hobbies: null,
    about: null,
    fact: null,
    avatar: null,
    firstEdu: null,
    secondEdu: null,
    socialNetworks: null,
  });

  const setDataToDB = async ({
    lastName,
    firstName,
    email,
    hobbies,
    about,
    fact,
    avatar,
    firstEdu,
    secondEdu,
    socialNetworks,
  }: TObjectForSave) => {
    // if (id) { return; }
    await setMany([
      ['avatar', avatar],
      ['firstEdu', firstEdu],
      ['secondEdu', secondEdu],
      ['socialNetworks', socialNetworks],
      ['lastName', lastName],
      ['firstName', firstName],
      ['fact', fact],
      ['email', email],
      ['hobbies', hobbies],
      ['about', about],
    ]);
  };

  const timer = useRef<string | number | NodeJS.Timeout | undefined>();
  useEffect(() => {
    clearTimeout(timer.current);

    timer.current = setTimeout(setDataToDB, 1000, objectForSave);
  }, [objectForSave]);

  return [objectForSave, setValuesForSaveOject];
};

export const onChange = (e: any, index: any, setFunc: any, arr: any) => {
  const coyarr = [...arr];
  const Object = coyarr[index];
  const copyobject = { ...Object };
  const lue = e.target.value;
  copyobject.hardSkills = lue;
  coyarr[index] = copyobject;
  setFunc(coyarr);
};
