/* eslint-disable import/no-cycle */
/* eslint-disable  @typescript-eslint/no-unnecessary-type-assertion */
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router';
import { LeftControlColumn } from './ProjectPlate';
import Button from '../Button';
import SliderComponent from './Slider';
import InputComponent from '../InputComponent';
import TeamMatePlate, { RoundDiv } from '../TeamMatePlate';
import { ArrowIcon, RubIcon } from '../icons';
import BigTextField from '../BigTextField';
import { LinkForFileLoad } from '../../pages/CreateProject';
import { TProjectWindowPlate } from '../../types/componentsTypes';
import PromptHidden from '../HiddenPrompt';
import {
  useRespondToProjectMutation, useAllowToShowContactsMutation, jwt, useDeleteMyContactsMutation,
} from '../../api/api';
import CrewBox from '../CrewBox';
import { makeToast } from '../../helpers/promts';

const Div = styled.div`
    gap: 40px;
    display: flex;
    max-width: 676px;
    width: 100%;
    & textarea {
      height: 91px;
    }
`;
const TestForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 60px;
    flex: auto;
    margin-left: 40%;
    padding-bottom: 36px;
    padding-top: 36px;
    & input,textarea {
      max-width: 676px;
    }
  
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
    padding-right : 10px;
    box-sizing: border-box;
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

const ButtonContainer = styled.div`
  gap: 30px;
  display: inline-flex;
  flex-direction: column;
  width: 100%;
  max-width: 370px;
  & button:last-of-type {
    align-self: center;
  }
`;

const ProjectWindowPlate: FC<TProjectWindowPlate> = ({
  imagesArray,
  name,
  direction,
  stage,
  achieve,
  teamMateArray,
  idea,
  id,
  team,
  link,
  fileName,
  forMoney,
  withButtons = false,
  owner,
  isSmall = false,
  isMine = false,
  createdAt,
  forMyRsponses = false,
}) => {
  const [isOpen, open] = useState(false);
  const location = useLocation();
  const [isShownSpecButton, showButton] = useState<boolean>(false);
  const navigate = useNavigate();
  const [isAboutOpen, openAbout] = useState(false);
  const [deleteMyContacts] = useDeleteMyContactsMutation();
  const [respondToProject, { data, error, status }] = useRespondToProjectMutation();
  const [allowToShowContacts, { status: showStatus }] = useAllowToShowContactsMutation();
  const showContacts = async (key: boolean, idx: number | string) => {
    if (!jwt.test()) {
      navigate('/registration');
    }
    try {
      await allowToShowContacts({ shown: key, projectId: idx });
      showButton(true);
    } catch (err: any) {
      console.log('');
    }
  };

  const deleteContacts = async (key: boolean, idx:any) => {
    if (!jwt.test()) {
      navigate('/registration');
    }
    try {
      await deleteMyContacts({ shown: key, projectId: idx });
      showButton(false);
    } catch (err: any) {
      console.log('');
    }
  };

  const respond = async (index: number | string) => {
    if (!jwt.test()) {
      navigate('/registration');
    }
    try {
      await respondToProject({ projectId: index });
    } catch (err: any) {
      console.log('');
    }
  };

  useEffect(() => {
    makeToast(undefined, status);
  }, [status]);
  useEffect(() => {
    makeToast(undefined, showStatus);
  }, [showStatus]);
  const countMonth = (createdDate: Date) => Math.round((Date.now() - new Date(createdDate || 0).getTime()) / 2629800000);
  return (
    <GreyPlate>

      {forMoney
        && (
          <RoundDiv
            onMouseLeave={() => openAbout(false)}
            onMouseOver={() => openAbout(true)}
            style={{
              position: 'absolute', top: '36px', right: '50px', cursor: 'help',
            }}>
            {isAboutOpen
              && (
                <PromptHidden
                  width='300px'
                  top={0}
                  text='В этом проекте работа специалиста будет оплачиваться'
                  left={-250} />
              )}
            <RubIcon />
          </RoundDiv>
        )}
      <LeftControlColumn style={{ height: '100%' }}>
        <SliderComponent imagesArray={imagesArray || []} width={275} height={330} />
        {!withButtons && !isMine && <Button disabled={!!data} showYellow={!data} onClick={() => respond(id)} isColored={!data} type='button' text={data ? 'Отклик отправлен' : 'Откликнуться'} />}
        {withButtons && (
          <ButtonContainer>
            {forMyRsponses ? <Button type='button' onClick={() => deleteContacts(false, id!)} isColored={false} text='Отозвать запрос' /> : (
              <>
                {isShownSpecButton ? <Button onClick={() => navigate(`/profile/${owner}`, { state: { haveRights: true } })} isColored showYellow type='button' text='Личный кабинет лидера' /> : <Button showYellow isColored onClick={() => showContacts(true, id!)} type='button' text='Поделиться контактом' />}
                <Button isColored={false} onClick={() => deleteContacts(false, id!)} type='button' text='Отказаться' />
              </>
            )}
          </ButtonContainer>
        )}
      </LeftControlColumn>
      <TestForm style={{ marginLeft: '40%' }}>
        <InputComponent inputValue={name || ''} disabled label='Название' name='projectName' />
        <InputComponent inputValue={direction || ''} disabled label='Направление' name='direction' />
        <Div>
          <InputComponent inputValue={stage || ''} disabled label='Стадия' name='stage' />
          {/* {achieve !== undefined && achieve.length !== 0 && achieve[0] !== '' && (
            <HashContainer>
              <LabelForStatus>Достижения</LabelForStatus>
              {achieve.map((el) => (
                <Hash>{el}</Hash>
              ))}
            </HashContainer>
          )} */}
          {achieve !== undefined && achieve.length !== 0 && achieve[0] !== ''
            && <BigTextField disabled value={achieve.map((el, index) => (index === 0 ? `${el}` : `  ${el}`))} label='Достижения' name='achieve' />}
        </Div>
        {teamMateArray.length !== 0 && (
          <>
            <TeamHeader>Требуемые специалисты</TeamHeader>
            <TeamContainer style={{ gap: '10px' }}>
              {teamMateArray && teamMateArray.map((el) => (
                <TeamMatePlate width={location.pathname === '/responses-projects' ? 175 : 125} spec={el.spec || 'proger'} isSmall={isSmall} disabled value1={el.task} value2={el.forMoney} value3={el.level} index={0} />
              ))}

            </TeamContainer>
          </>
        )}
        <TeamHeader style={{ cursor: 'pointer' }} onClick={() => open(!isOpen)}>
          О проекте
          <ArrowIcon isOpen={isOpen} />
        </TeamHeader>

        {isOpen && <BigTextField disabled value={idea || ''} label='Идея проекта' name='idea' />}
        {isOpen && <InputComponent inputValue={countMonth(createdAt!) === 0 ? 1 : countMonth(createdAt!)} disabled label='Над проектом работают (месяцев)' name='projectInWork' />}
        {isOpen && team.length !== 0 && <CrewBox crew={team || []} />}
        {isOpen && link && <LinkForFileLoad download href={link || ''}>{fileName || 'Дополнительный файл'}</LinkForFileLoad>}
      </TestForm>

    </GreyPlate>
  );
};

export default ProjectWindowPlate;
