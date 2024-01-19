/* eslint-disable react/require-default-props */
/* eslint-disable no-nested-ternary */
/* eslint-disable ternary/nesting */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable radix */
/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
import Button from '../ui-lib/Button';
import SliderComponent from '../ui-lib/widgets/Slider';
import { RoundBackButton } from '../ui-lib/Buttons';
import { ArrowIcon, OrangeDelIcon } from '../ui-lib/icons';
import {
  RegularInput,
  RegularTextarea,
} from '../ui-lib/Inputs';
import { FileInput, Label as FileLabel, ButtonForFileAdd } from '../ui-lib/widgets/HiddenContainer';
import {
  useCreateAchievementMutation, useGetCurrentFolderAchievementsQuery, useUpdateAchievementMutation, useLazyGetCurrentFolderAchievementsQuery, useGetAchievementsFoldersQuery,
} from '../api/api';
import { makeToast } from '../helpers/promts';
import { Skeleton2 } from '../ui-lib/widgets/Skeleton';
import BaseSection from '../ui-lib/widgets/BaseSection';
import { SectionHeader } from '../ui-lib/TextBlocks';

const NewForm = styled.form`
  width:100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const FileAddButton = styled(ButtonForFileAdd)`
  justify-content: center;
  background-color: ${({ theme: { mainButtonColor } }) => mainButtonColor};
  color: ${({ theme: { mainBg } }) => mainBg};
  margin-bottom: 30px;
`;
const GrPlate = styled.li`
    max-width: 1370px;
    width: 100%;
    background-color: ${({ theme: { plateColor } }) => plateColor};
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    border-radius: 91px;
    box-sizing: border-box;
    gap:72px;
    padding-right:140px;
    min-height: 453px;
    position: relative;
    box-sizing: border-box;
  margin-bottom: 70px;
`;

const Form = styled.div`
    display: flex;
    flex-direction: column;
    gap: 60px;
    flex: auto;
    padding-bottom: 34px;
    padding-top: 34px;
    margin-left: 549px;
    & textarea {
      height: 100px;
    }
`;
export const CustomPropsBreadcrumb: FC<{ text: string, text2?: string }> = ({ text, text2 }) => (
  <>
    {!text2 && <span>{text}</span>}
    <span>{text2}</span>
  </>
);

const LeftControlColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width:490px;
  justify-content: center;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 39px;
  padding-bottom: 39px;
`;
const CreateDiploma: FC = () => {
  const {
    register, handleSubmit, formState: { errors }, setValue,
  } = useForm();
  const { id, achId } = useParams();
  // const [currentPageId, setCurrentPageId] = useState<any>(0);
  const {
    data: folders, error: folderError, status: folderStatus,
  } = useGetAchievementsFoldersQuery();
  const [updateAchievement, { status: updateStatus, isLoading: updateLoading }] = useUpdateAchievementMutation();
  const {
    data: achieves, status: achStatus, error: achError, isLoading: loading,
  } = useGetCurrentFolderAchievementsQuery(id!);
  // const [getAchievements, {
  //   data: achieves, error: achError, status: achStatus, isLoading: loading,
  // }] = useLazyGetCurrentFolderAchievementsQuery();
  const [createAchievement, { error, status, isLoading }] = useCreateAchievementMutation();
  const [imagesArray, setImageToArray] = useState<any>([]);
  const [file, setFile] = useState<File | any>('');
  const [keyCheck, setKeyCheck] = useState<number>(0);
  const [imageIndex, setIndex] = useState<number>(0);
  const navigate = useNavigate();
  // const calculateIdForAchieve = async () => {
  //   try {
  //     const currentPageAchieveId = (folders || []).find((el) => el.name === id)?.id;
  //     currentPageAchieveId && await getAchievements(currentPageAchieveId);
  //     currentPageAchieveId && setCurrentPageId(currentPageAchieveId);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // useEffect(() => {
  //   calculateIdForAchieve();
  // }, [folders]);
  const onSubmit = async (data: any) => {
    /* const newForm = new FormData();
    newForm.append('name', JSON.stringify(data.name));
    newForm.append('description', JSON.stringify(data.description));
    newForm.append('files', imagesArray);
    newForm.append('date', JSON.stringify(data.date));
    newForm.append('id', achId!);
    const achievement = newForm; */
    /*  if (permission) {
      givePermission(false);
      return;
    } */
    // { path: '/achieves/:id/create', breadcrumb: 'Создание достижения' },
    try {
      achId
        ? await updateAchievement({ achievement: { ...data, files: imagesArray }, folderId: parseInt(id!), achieveId: achId })
        : await createAchievement({ achievement: { ...data, files: imagesArray }, folderId: parseInt(id!) });
      navigate(`/achieves/${id}`);
    } catch (err) {
      console.log('mistake');
    }
  };
  const setFileToArray = () => {
    if (file) {
      const reader = new FileReader();
      if (/\.(jpe?g|png)$/i.test(file.name)) {
        reader.readAsDataURL(file);
        reader.addEventListener('load', () => {
          const arrCopy = [...imagesArray];
          arrCopy.push(reader.result);
          setImageToArray(arrCopy);
        });
      } else {
        toast.error('Необходим jpg или png файл');
        setFile('');
      }
    }
  };
  const deleteImage = () => {
    if (imagesArray.length === 1) {
      const copyArr = [...imagesArray];
      copyArr.splice(0, 1);
      setImageToArray(copyArr);
      return;
    }
    const copyArr = [...imagesArray];
    copyArr.splice(imageIndex, 1);
    setImageToArray(copyArr);
    setKeyCheck(keyCheck + 1);
  };

  useEffect(() => {
    setFileToArray();
  }, [file]);
  useEffect(() => {
    makeToast(null, status);
  }, [status]);
  useEffect(() => {
    makeToast(achError, achStatus);
  }, [achError, achStatus]);
  useEffect(() => {
    makeToast(null, updateStatus);
  }, [updateStatus]);
  useEffect(() => {
    console.log(achieves);
    if (achId && achieves) {
      const currentSelectedAchieve = achieves?.find((el) => el.id === parseInt(achId));
      console.log(currentSelectedAchieve);
      setValue('name', currentSelectedAchieve.name);
      setValue('date', currentSelectedAchieve.date);
      setValue('description', currentSelectedAchieve.description);
      setImageToArray(currentSelectedAchieve.files);
    }
  }, [achieves]);
  const findPathName = () => {
    const pathName = folders?.find((el) => el.id === parseInt(id!))?.name || '';
    const subPathName = achId ? achieves?.find((el) => el.id === parseInt(achId)).name : '';
    console.log(subPathName);
    return [
      { path: '/achieves/:id', breadcrumb: CustomPropsBreadcrumb, props: { text: (pathName || '') } },
      { path: '/achieves/:id/create', breadcrumb: 'Создание достижения' },
      { path: '/achieves/:id/:anchId', breadcrumb: CustomPropsBreadcrumb, props: { text: (pathName || ''), text2: (subPathName || '') } },

    ];
  };
  return (
    loading
      ? <Skeleton2 />
      : (
        <BaseSection routes={findPathName()}>
          <RoundBackButton top={0} left={40} onClick={() => navigate(`/achieves/${id}`)}><ArrowIcon /></RoundBackButton>
          <SectionHeader>Достижение</SectionHeader>
          <NewForm onSubmit={handleSubmit(onSubmit)}>
            <GrPlate>
              {/* <SliderComponent forAchieve imagesArray={imagesArray} width={270} height={330} /> */}
              <LeftControlColumn>
                <SliderComponent key={keyCheck} setIndexToParent={setIndex} forAchieve imagesArray={imagesArray} width={270} height={330} />
                {imagesArray.length !== 0 && <OrangeDelIcon onClick={deleteImage} />}
              </LeftControlColumn>
              <Form>
                <RegularInput
                  type='text'
                  label='Название'
                  maxLength={15}
                  options={{
                    required: 'Заполните поле',
                    minLength: {
                      value: 5,
                      message: 'Название должно быть длиннее 5 символов',
                    },
                  }}
                  register={register}
                  name='name'
                  errorMessage={errors?.name?.message as string} />
                <RegularInput
                  type='date'
                  placeholder=''
                  options={{
                    required: 'Заполните поле',
                  }}
                  register={register}
                  name='date'
                  errorMessage={errors?.date?.message as string}
                  label='Год' />
                <RegularTextarea
                  height={180}
                  options={{
                    minLength: {
                      value: 30,
                      message: 'Описание должно содержать не менее 30 символов',
                    },
                  }}
                  register={register}
                  name='description'
                  errorMessage={errors?.description?.message as string}
                  label='Описание' />

              </Form>
            </GrPlate>
            <FileAddButton type='button'>
              Добавить файл с устройства
              <FileLabel htmlFor='file' />
              <FileInput
                type='file'
                onChange={(e) => { e.preventDefault(); setFile(e.target.files![0]); }}
                id='file'
                name='aboutfile' />
            </FileAddButton>
            <Button isColored={isLoading || updateLoading} type='submit' text={isLoading || updateLoading ? 'Сохранение...' : 'Сохранить'} />

          </NewForm>

        </BaseSection>
      )
  );
};

export default CreateDiploma;
