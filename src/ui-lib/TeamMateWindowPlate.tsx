/* eslint-disable import/prefer-default-export */
/* eslint-disable object-shorthand */
/* eslint-disable react/no-array-index-key */
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
import { CheckDoneIcon, DistIcon } from './icons';
import Button from './Button';
import { jwt, useInviteToProjectMutation, useApproveExpertMutation } from '../api/api';

const Span = styled.span`
  width: 24px;
  height: 24px;
  margin-right: 23px;
  display: inline-flex;
  border: ${({ theme: { mainTextColor } }) => `2px solid ${mainTextColor}`};
  border-radius: 10px;
`;

const StyledIcon = styled(CheckDoneIcon)`
  position: relative;
  visibility: hidden;
    & path {
        stroke: ${({ theme: { mainBg } }) => mainBg};
    }
`;

const ProjectLabel = styled.label`
  color: ${({ theme: { mainBg } }) => mainBg};
  font-family: 'TTTravels';
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  position: relative;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 18px;
`;
const P = styled.p`
  color: ${({ theme: { mainBg } }) => mainBg};
  font-family: 'TTTravels';
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 197px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre;
  display: inline;
  margin: 0;
`;

const RadioInput = styled.input`
   position: absolute;
   z-index: -10000;
   opacity: 0;
    &:checked + span svg {
       visibility: visible;
    }
`;

/// инвайт дважды
export const Project: FC<{ userId: any, projectId: any, item: string, idForCheck: number | string }> = ({
  item, userId, projectId, idForCheck,
}) => {
  const [inviteToProject, { status }] = useInviteToProjectMutation();
  const navigate = useNavigate();
  const [isChecked, setChecked] = useState<boolean>(false);
  const [submited, setSubmit] = useState<boolean>(false);
  const invite = async (e: any) => {
    if (submited) {
      return;
    }

    if (!jwt.test()) {
      navigate('/registration');
    }
    e.preventDefault();
    setChecked(true);
    try {
      await inviteToProject({ userId, projectId });
      setSubmit(true);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    status === 'rejected' && toast('Специалист уже приглашен');
    status === 'fulfilled' && toast.success('Приглашение отправлено');
  }, [status]);
  return (

    <ProjectLabel onClick={invite} htmlFor={`${item}${idForCheck}${projectId}`}>
      <RadioInput checked={isChecked} type='radio' id={`${item}${idForCheck}${projectId}`} />
      <Span><StyledIcon /></Span>
      <P>{item}</P>

    </ProjectLabel>

  );
};
