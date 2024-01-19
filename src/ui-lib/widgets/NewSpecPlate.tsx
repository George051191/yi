/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/require-default-props */
import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import Button from '../Button';
import { ExitButton } from '../../pages/Profile';
import { DisabledInput } from '../Inputs';
import avatr from '../../assets/avatarDefault.png';
import { useDispatch } from '../../store/store.types';
import { useApproveExpertMutation, useDeleteMyResponseMutation } from '../../api/api';
import { TProject } from '../../types/apiTypes';
import { Project } from '../TeamMateWindowPlate';

const Plate = styled.li`
  max-width: 394px;
  width: 100%;
  min-height: 800px;
  flex-shrink: 0;  
  border-radius: 61px;
  border:${({ theme: { mainButtonColor } }) => `0.945px solid ${mainButtonColor}`};
  background: #F1F4FF;
  position:relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-inline: 32px;
  box-sizing: border-box;
  padding-bottom: 48px;
   
`;

const ControlBox = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    border-radius: 61px;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    outline:${({ theme: { mainButtonColor } }) => `0.945px solid ${mainButtonColor}`};
    min-height: 350px;
    align-items: center;
    & button {
      z-index: 999999;
    }
`;
const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const AvatarImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0px;
    left: 0px;
`;

const AvatarWrapper = styled.div`
    width: 190px;
    height: 190px;
    overflow: hidden;
    border-radius: 50%;
    border:${({ theme: { mainTextColor } }) => `1px solid ${mainTextColor}`} ;
    position: relative;
`;

const ProjectList = styled.form`
  list-style:none;
  padding: 0;
  margin: 0;
  margin-top: -50px;
  box-sizing: border-box;
  width: 78%;
  z-index: 1;
  border-radius: 25px;
  background: rgba(29, 68, 208, 0.60);
  border:${({ theme: { mainButtonColor } }) => mainButtonColor};
  position: absolute;
  bottom: -81px;
    left: 43px;
  padding-top: 55px;
  padding-left: 13px;
  padding-right: 13px;
  padding-bottom: 9px;
  overflow-x: hidden;
  height: 145px;
  overflow-y: auto; 

 
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 270px;
  width: 100%;
  align-self: center;
  & button {
    width: 100%;
    
  }
`;

const DivCustom = styled(Div)`
     max-width: 290px;
     & button {
    padding: 10px 30px;
   }
`;

const DivForSmall = styled(Div)`
  flex-direction: row;
   align-items:center;
   justify-content: center;
   & button {
    padding: 10px 30px;
   }

`;

const NewSpecPlate: FC<{
  email?: string,
  fullName: string,
  spec?: string,
  level?: string,
  id: any,
  forMyResponses?: boolean,
  forSpecPage?: boolean,
  forResponses?: boolean,
  projectsArray?: TProject[];
  image: string | ArrayBuffer;
  professions?: string;
  directions?: string[];
  projectId?: any;
  moveFromExperts?: () => void;
}> = ({
  email,
  image,
  fullName,
  spec,
  level,
  id,
  forResponses = false,
  forSpecPage = false,
  forMyResponses = false,
  professions,
  projectId,
  projectsArray,
  moveFromExperts,
}) => {
  const dispatch = useDispatch();
  const [isOpen, open] = useState(false);
  const navigate = useNavigate();
  const [approveExpert, { status: approveStatus }] = useApproveExpertMutation();
  const [deleteMyResponse] = useDeleteMyResponseMutation();
  const [isShownSpecButton, showButton] = useState<boolean>(false);
  console.log(projectId, id);
  const openMail = (mail:string) => {
    window.location.href = `mailto:${mail}?subject=Письмо из Проектим.рф`;
  };

  const connectWithUser = async (prosObj:{ userId:any, projectId:any, userName: string, userSpeciality: string }) => {
    await approveExpert(prosObj);
    showButton(true);
    /*  email && openMail(email); */
  };

  return (
    <Plate>
      <ControlBox>
        <AvatarWrapper>
          <AvatarImage src={image || avatr} />
        </AvatarWrapper>
        {forSpecPage && projectId !== id
            && (
              <>
                <ExitButton onClick={() => navigate(`/team-window/team-list/${id}`, { state: { toShow: projectId === id } })}>Анкета</ExitButton>
                <Button isColored type='button' text='Пригласить в команду' onClick={() => open(!isOpen)} />
              </>
            )}
        {forSpecPage && projectId === id
            && (
              <Div>
                <Button type='button' text='Снять заявку' isColored={false} onClick={moveFromExperts} />
                <Button type='button' text='Редактировать' isColored onClick={() => navigate(`/team-window/team-list/${projectId}`, { state: { toShow: projectId === id } })} />
              </Div>
            )}
        {forResponses
           && (
           <DivCustom>
             {isShownSpecButton
               ? <Button type='button' text='Личный кабинет' isColored onClick={() => navigate(`/profile/${id}`, { state: { haveRights: true } })} />
               : (
                 <Button
                   isColored
                   type='button'
                   text='Пригласить в команду'
                   onClick={() => connectWithUser({
                     userId: id, projectId, userName: fullName, userSpeciality: professions!,
                   })} />
               )}
             <DivForSmall style={{ flexDirection: 'row', alignItems: 'center' }}>
               <ExitButton onClick={() => navigate(`/responses-experts/${id}`, { state: { toShow: projectId === id } })}>Анкета</ExitButton>
               <Button isColored={false} onClick={() => { showButton(false); deleteMyResponse({ projectId, userId: id }); }} text='Отказать' type='button' />
             </DivForSmall>

           </DivCustom>
           )}
        {forMyResponses
          && (
          <>
            <ExitButton onClick={() => navigate(`/my-responses/${id}`, { state: { toShow: projectId === id } })}>Посмотреть анкету</ExitButton>
            <Button onClick={() => deleteMyResponse({ projectId, userId: id })} isColored={false} text='Отозвать запрос' type='button' />
          </>
          )}
        {isOpen && projectsArray?.filter((item) => item.isPublished === true).length !== 0 && (
        <ProjectList name={`${id}`}>
          {projectsArray?.filter((item) => item.isPublished === true).map((el, index) => (

            <Project idForCheck={id} userId={id} key={index} projectId={el.id} item={el.name} />

          ))}
        </ProjectList>
        )}
      </ControlBox>
      <InputsContainer>
        <DisabledInput name='Фамилия Имя' value={fullName} />
        <DisabledInput name='Специальность' value={spec} />
        <DisabledInput name='Уровень' value={level} />
      </InputsContainer>
    </Plate>
  );
};

export default NewSpecPlate;
