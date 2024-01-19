import React, { FC } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import Button from './Button';
import { RoundArrowIcon, CheckedRadio } from './icons';
import { SectionHeader, Text } from './TextBlocks';

export const Container = styled.div<{ gap?: number }>`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    background: rgba(255, 255, 255, 0.40);
    backdrop-filter: blur(4px);
    padding-top: 30px;
    padding-bottom: 30px;
    border-radius: 100px;
    max-width: 870px;
    padding-left: 50px;
    padding-right: 10px;
    height: fit-content;
    margin-top: 120px;
    flex-shrink: 0;
    z-index: 1;
    gap:${({ gap }) => gap}px;
    box-sizing: border-box;
    @media screen and (max-width: 1570px) {
      flex-shrink:1;
    }
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding-left: 30px;
  margin: 0;
`;

export const Li = styled.li<{ gap?: number, display?: string }>`
    color: ${({ theme: { mainTextColor } }) => mainTextColor};
    font-family: 'TTTravels';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin: 0;
    display:${({ display }) => display};
    gap:${({ gap }) => gap}px; 
    align-items: center;
`;

const IconWrapper = styled.div`
    position: absolute;
    top: 68px;
    left: -23px;
    transform: rotate(45deg);
`;

const TextBlock = styled.div`
  display: flex;
  margin-top: 60px;
  margin-bottom: 30px;
  flex-direction: column;
  gap: 60px;
`;

const MyProjectTextBlock: FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <SectionHeader>Мои проекты</SectionHeader>
      <TextBlock>
        <Text style={{ position: 'relative' }}>
          Каждый проект – часть портфолио, твой опыт, поэтому ты можешь добавить информацию о :
          <IconWrapper><RoundArrowIcon /></IconWrapper>
        </Text>
        <List>
          <Li gap={26} display='flex'>
            <CheckedRadio />
            <Text>действующих проектах, которым требуется специалист</Text>
          </Li>
          <Li gap={26} display='flex'>
            <CheckedRadio />
            <Text>действующих успешно-работающих проектах</Text>
          </Li>
          <Li gap={26} display='flex'>
            <CheckedRadio />
            <Text>проектах, завершённых на стадии идеи/разработки</Text>
          </Li>
          <Li gap={26} display='flex'>
            <CheckedRadio />
            <Text>завершённых проектах</Text>
          </Li>
        </List>
      </TextBlock>
      <Button onClick={() => navigate('/project-create')} isColored text='Добавить проект' type='button' />
    </Container>
  );
};

export default MyProjectTextBlock;
