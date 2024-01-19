import React, { FC } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { SectionHeader } from '../TextBlocks';
import {
  Container, Li,
} from '../MyProjectTextBlock';
import Button from '../Button';
import { RoundArrowIcon, BlueQuestionIcon, OrangeQuestionIcon } from '../icons';

const P = styled.p`
  position: relative;
  max-width: 524px;
  width: 100%;
  color: ${({ theme: { mainTextColor } }) => mainTextColor};
  text-align: center;
  font-family: 'TTTravels';
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: center;
  margin: 0;
  margin-top: 60px;
`;
const TeamList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 36px;
  align-self: center;
  max-width: 684px;
  width: 100%;
  margin: 0;
  margin-bottom: 60px;
  margin-top: 30px;
  position: relative;
`;

const IconWrapper = styled.div<{ width: number, height: number, top: number, right: number }>`
  position:absolute;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;  
  top: ${({ top }) => top}px; 
  right: ${({ right }) => right}px; 
`;

const ArrowWrapper = styled.div`
      transform: rotate(36deg);
      top: 151px;
      left: 30px;
      position: absolute;
`;

const TeamWindowTextBlock: FC = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <SectionHeader>Витрина специалистов</SectionHeader>
      <P>

        Ты крутой специалист, но не знаешь, где применить свои навыки ?
        <IconWrapper top={-5} right={-24} width={40} height={80}><BlueQuestionIcon /></IconWrapper>
        <IconWrapper top={16} right={-40} width={30} height={60}><OrangeQuestionIcon /></IconWrapper>
      </P>
      <TeamList>
        <ArrowWrapper><RoundArrowIcon /></ArrowWrapper>
        <Li>Расскажи о себе в витрине специалистов и жди, когда лидеры проектов тебя заметят.</Li>
        <Li>Если же ты сам лидер команды, то нужные специалисты уже под рукой – осталось выбрать самого подходящего.</Li>
      </TeamList>
      <Button onClick={() => navigate('/team-window/expert-create')} type='button' isColored text='Выдвинуть свою кандидатуру ' />
      <Button onClick={() => navigate('/team-window/team-list')} type='button' isColored text='Найти специалиста' />
    </Container>
  );
};

export default TeamWindowTextBlock;
