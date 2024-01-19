import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import {
  Container, Li,
} from './MyProjectTextBlock';
import Button from './Button';
import { SectionHeader } from './TextBlocks';
import { RoundArrowIcon } from './icons';

const Span = styled.span`
  color:${({ theme: { mainButtonColor } }) => mainButtonColor};
  font-family: 'TTTravels';
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;  
`;

const WindowList = styled.ul`
    list-style: none;
    position: relative;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-self: center;
    max-width: 708px;
    width: 100%;
    margin: 0;
    margin-top: 60px;
    margin-bottom:60px;
    & + button {
      margin-bottom: 30px;
    }
`;
const IconWrapper = styled.div`
    position: absolute;
    top: 204px;
    left: 80px;
    transform: rotate(46deg);
`;

const WindowTextBlock: FC = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <SectionHeader>Витрина проектов</SectionHeader>
      <WindowList>
        <IconWrapper><RoundArrowIcon /></IconWrapper>
        <Li gap={0} display='inline'>
          Если ты
          {' '}
          <Span>специалист</Span>
          {' '}
          – выбирай проект, к

          которому хочешь присоединиться
        </Li>
        <Li gap={0} display='inline'>
          Если ты
          {' '}
          <Span>лидер проекта</Span>
          {' '}
          или инвестор – ищи

          партнёра для дальнейшего сотрудничества
        </Li>
        <Li gap={0} display='inline'>
          Не забудь воспользоваться фильтрами для

          более быстрого поиска
        </Li>
      </WindowList>
      <Button onClick={() => navigate('/projects')} isColored type='button' text='Разместить проект' />
      <Button onClick={() => navigate('/projects-window')} isColored type='button' text='Смотреть проекты' />
    </Container>
  );
};

export default WindowTextBlock;
