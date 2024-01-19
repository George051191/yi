/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import SliderComponent from './Slider';
import InputComponent, { Error } from '../InputComponent';
import Button from '../Button';
import { TProjectPlate } from '../../types/componentsTypes';
import { usePublishProjectMutation, useDeleteProjectMutation } from '../../api/api';
import TeamMatePlate from '../TeamMatePlate';
import { AddIcon, BlueDeleteIcon } from '../icons';

const DeleteButton = styled.button`
 width: 50px;
  height: 50px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -19px;
  right: 18px;
  background-color: ${({ theme: { mainButtonColor } }) => mainButtonColor};
  border: none;
  transform: rotate(45deg);
  & svg path {
    stroke: ${({ theme: { mainBg } }) => mainBg};
  }
`;

const TeamContainer = styled.ul`
  display:flex ;
  gap: 34px;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  list-style: none;
`;

const TeamHeader = styled.p`
    color: ${({ theme: { mainTextColor } }) => mainTextColor};
    font-family: 'TTTravels';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 23px;
    gap: 40px;
    display: flex;
    align-items: center;
    margin: 0;
`;
const GreyPlate = styled.li`
    max-width: 1559px;
    width: 100%;
    background-color: ${({ theme: { plateColor } }) => plateColor};
    border: ${({ theme: { mainButtonColor } }) => `1px solid ${mainButtonColor}`};
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    border-radius: 91px;
    box-sizing: border-box;
    gap:72px;
    min-height: 556px;
    position: relative;
    box-sizing: border-box;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 60px;
    flex: auto;
    margin-left: 40%;
    padding-bottom: 36px;
    padding-top: 36px;
`;
const TestForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 60px;
    flex: auto;
    margin-left: 40%;
    padding-bottom: 36px;
    padding-top: 36px;
    & input {
      max-width: 536px;
    }
`;

export const LeftControlColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius:91px;
  outline: ${({ theme: { mainButtonColor } }) => `1px solid ${mainButtonColor}`};
  height: 100%;
  width:39%;
  padding-top: 36px;
  padding-bottom: 36px;
  justify-content: space-between;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
`;

const PublishButton = styled.button`
  border: none;
  background-color: ${({ theme: { sliderColor } }) => sliderColor};
  padding: 20px 44px;
  color: ${({ theme: { mainTextColor } }) => mainTextColor};
  font-family: 'TTTravels';
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 80%;
  letter-spacing: -0.625px;
  margin-bottom: 24px;
  border-radius: 36px;
  margin-top: 0 !important;
  cursor: pointer;
`;

const ButtonsContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  & button {
    margin-top: 0 !important;
  }
  
`;

const StageBox = styled.span`
  position: absolute;
  top:36px;
  right: 35px;
  border-radius: 24px;
  background-color: rgb(243, 160, 59, 0.4);
  color: #F3A03B;
  width: 81px;
  height: 61px;
  font-family: 'TTTravels';
  font-size: 25px;
  font-style: normal;
  font-weight: 600;
  line-height: 80%;
  letter-spacing: -0.625px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ApprovementPlate = styled.div`
  border-radius: 50px;
  position: absolute;
  top: -77px;
  right: 78px;
  border:${({ theme: { mainButtonColor } }) => `1px solid ${mainButtonColor}`};
  background: rgba(241, 244, 255, 0.60);
  backdrop-filter: blur(4px);
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  z-index: 99999;
  padding:20px;
`;

const ProjectPlate: FC<TProjectPlate> = ({
  isPublished,
  name,
  idea,
  status,
  experts,
  fullnessPercentage,
  id,
  isSmall = false,
  images,
  description,
  direction,
  conception,
  stage,
  createdAt,
}) => {
  const navigate = useNavigate();
  const [publishProject] = usePublishProjectMutation();
  const [deleteProject, { error }] = useDeleteProjectMutation();
  const [convertedStatus, setStatus] = useState<string>('');
  const [publishError, setPublishError] = useState<boolean>(false);
  const [isOpenApprovement, openApprovement] = useState<boolean>(false);
  const convertStatus = () => {
    switch (status) {
      case 'done': {
        setStatus('Завершен');
        break;
      }
      case 'inProcess': {
        setStatus('В работе');
        break;
      }
      default: setStatus('');
    }
  };
  useEffect(() => {
    convertStatus();
  }, [status]);

  const publish = async (key: boolean, index: number | string) => {
    if (experts?.length === 0) {
      setPublishError(true);
      return;
    }
    if (experts?.some((el: any) => {
      const condition1 = el.task === '';
      const condition2 = el.level === '';
      const condition3 = el.spec === '';
      return condition1 || condition2 || condition3;
    })) {
      setPublishError(true);
      return;
    }
    if ([idea, stage, description, direction, conception].some((el) => {
      const condition1 = el === '';
      const condition2 = el === null;
      return condition1 || condition2;
    })) {
      setPublishError(true);
      return;
    }
    try {
      await publishProject({ publish: key, projectId: index });
    } catch (err: any) {
      toast(err.message, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };
  const countMonth = (createdDate: Date) => Math.round((Date.now() - new Date(createdDate || 0).getTime()) / 2629800000);
  return (
    <GreyPlate style={{ paddingRight: '30px' }}>
      {isOpenApprovement
        && (
        <ApprovementPlate>
          <TeamHeader style={{ textDecoration: 'none', alignSelf: 'center' }}>Точно удалаяем?</TeamHeader>
          <Button onClick={() => { deleteProject(+id); openApprovement(false); }} type='button' text='Удалить' isColored />
          <Button onClick={() => openApprovement(false)} type='button' text='Закрыть' isColored={false} />
        </ApprovementPlate>
        )}
      <BlueDeleteIcon onClick={() => openApprovement(true)}><AddIcon /></BlueDeleteIcon>
      <ToastContainer />
      <StageBox>
        {fullnessPercentage || 0}
        %
      </StageBox>
      <LeftControlColumn>
        <SliderComponent imagesArray={images} width={275} height={330} />
        <ButtonsContainer>
          {isPublished && <Button onClick={() => publish(false, id)} isColored={false} type='button' text='Отозвать проект' />}
          {!isPublished && <PublishButton onClick={() => publish(true, id)} type='button'>Опубликовать</PublishButton>}
          {publishError && <Error style={{ marginTop: '-15px', textAlign: 'center' }}>Заполните все поля вашего проекта для публикации и укажите хотя бы одного требуемого специалиста</Error>}
          {!isPublished && <Button onClick={() => navigate(`/projects-list/${id}`)} type='button' text='Редактировать' isColored={false} />}
        </ButtonsContainer>
      </LeftControlColumn>
      <TestForm style={{ marginLeft: '38%' }}>
        <InputComponent inputValue={name || ''} disabled label='Название' name='projectName' />
        <InputComponent inputValue={idea || ''} disabled label='Идея проекта' name='idea' />
        <InputComponent inputValue={convertedStatus} disabled label='Статус' name='status' />
        {createdAt && <InputComponent inputValue={countMonth(createdAt) === 0 ? 1 : countMonth(createdAt)} disabled label='Над проектом работают (месяцев)' name='projectInWork' />}
        {experts && experts.length !== 0 && (
          <>
            <TeamHeader>Требуемые специалисты</TeamHeader>
            <TeamContainer style={{ gap: '10px' }}>

              {experts.map((el: any) => (
                <TeamMatePlate width={125} spec={el.spec || 'ИТ-разработка'} isSmall={isSmall} disabled value1={el.task} value2={el.forMoney} value3={el.level} index={0} />
              ))}

            </TeamContainer>
          </>
        )}
      </TestForm>
    </GreyPlate>
  );
};

export default ProjectPlate;

/// добавить doubleClick для перехода в редактирование
