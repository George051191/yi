import React, { FC } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import Button from '../Button';
import { RoundArrowIcon } from '../icons';
import { SectionHeader, Text } from '../TextBlocks';
import { Container } from '../MyProjectTextBlock';

const H3 = styled.h3`
    color: ${({ theme: { mainButtonColor } }) => mainButtonColor};
    text-align: center;
    font-family: 'Comforta';
    font-size: 31px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin: 0;
    align-self: flex-start;
    margin-bottom: 30px;
    display: flex;
    width: 100%;
    gap: 37px;
`;

const Div = styled.div`
  display:flex ;
  flex-direction: column;
  position: relative;
  width: 100%;
  & button {
    margin: 0;
  }
`;

const IconWrapper = styled.div`
    transform: rotate(36deg);
    position: absolute;
`;

const TextDiv = styled.div`
    max-width:680px;
    width: 100%;
    align-self: end;
    margin-bottom: 60px;
    gap: 30px;
    display: flex;
    flex-direction: column;
`;

const Span = styled.span`
  font-family: 'Comforta';
  font-size: 31px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: ${({ theme: { mainButtonColor } }) => mainButtonColor};
  display: block;
  max-width: 16%;
  @media screen and (max-width: 1290px) {
    font-size: 30px;
    align-self: center;
  }
  @media screen and (max-width: 650px) {
    font-size: 25px;
  }
  @media screen and (max-width: 470px) {
      font-size: 19px;
    }
`;

const ResponseTextBlock: FC = () => {
  const navigate = useNavigate();
  return (
    <Container style={{ paddingRight: '44px' }} gap={60}>
      <SectionHeader>Отклики</SectionHeader>
      <Div>
        <H3>
          <Span>/ 01</Span>
          {' '}
          Отклики специалистов
        </H3>
        <TextDiv>
          <Text>
            Здесь вы увидите специалистов, которых заинтересовал ваш проект, контакты отображаются по ссылке в личном кабинете
          </Text>
          <Text>
            {' '}
            Первыми будут отклики специалистов, которых вы приглашали в команду
          </Text>
        </TextDiv>
        <Button onClick={() => navigate('/responses-experts')} isColored type='button' text='Перейти к специалистам' />
        <IconWrapper style={{ bottom: '47px', right: '82%' }}><RoundArrowIcon /></IconWrapper>
      </Div>
      <Div>
        <H3>
          <Span>/ 02</Span>
          {' '}
          Отклики проектов
        </H3>
        <TextDiv>
          <Text>
            Если вам понравился откликнувшийся проект, вы можете его изучить изъявить желание работать вместе, нажав на
          </Text>
        </TextDiv>
        <Button onClick={() => navigate('/responses-projects')} isColored type='button' text='Перейти к проектам' />
        <IconWrapper style={{ top: '140px', right: '82%' }}><RoundArrowIcon /></IconWrapper>
      </Div>
      <Div>
        <H3>
          <Span>/ 03</Span>
          {' '}
          Мои отклики
        </H3>
        <TextDiv>
          <Text>
            Здесь вы можете увидеть всех специалистов и проекты, на которые вы отправили свой отклик
          </Text>
        </TextDiv>
        <Button onClick={() => navigate('/my-responses')} isColored type='button' text='Перейти к моим откликам' />
        <IconWrapper style={{ top: '140px', right: '82%' }}><RoundArrowIcon /></IconWrapper>
      </Div>
    </Container>
  );
};

export default ResponseTextBlock;
