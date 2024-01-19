/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { FC, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router';
import PlateWithImage from '../PlateWithImage';
import image from '../../assets/aboutImage.png';
import Button from '../Button';
import { jwt } from '../../api/api';
import cloud from '../../assets/cloudsMain.png';
import mobileAbout from '../../assets/mobileAbout.png';

const H1 = styled.h1`
    color: ${({ theme: { mainButtonColor } }) => mainButtonColor};
    font-family: 'Comforta';
    font-size: 48px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin: 0;
    margin-bottom: 20px;
    z-index: 9999999;
    @media screen and (max-width:760px) {
      font-size: 50px;
    }
    @media screen and (max-width:560px) {
      font-size: 25px;
    }
    @media screen and (max-width: 440px) {
      margin-bottom: 10px;
  }
`;

const P = styled.p`
    margin: 0;
    color: ${({ theme: { mainTextColor } }) => mainTextColor};
    font-family: 'TTTravels';
    font-size: 25px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.9px;
    margin-bottom: 45px;
    z-index: 999999999;
    @media screen and (max-width: 760px) {
      font-size: 20px;
    }
    @media screen and (max-width:560px) {
      font-size: 14px;
      margin-bottom: 20px;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 22px;
    @media screen and (max-width: 760px) {
      flex-direction: column;
      max-width: 310px;
      
      & button {
        font-size: 25px;
        justify-content: center;
      }
      & button:last-of-type {
        width: 160px;
      }
    }
    @media screen and (max-width: 560px) {
      max-width: 200px;
      & button {
        font-size: 15px;
        justify-content: center;
      }
      & button:last-of-type {
        width: 80px;
      }
    }
    @media screen and (max-width: 400px) {
      gap: 15px;
    } 
`;

const Div = styled.div`
    display: flex;
    flex-direction: column;
    flex: auto;
    z-index: 5000;
    width: 100%;
    margin-right: -196px;
    @media screen and (max-width:760px) {
      margin-right: 0;
  
    

    }
`;

const Section = styled.section`
  padding-left: 40px;
  padding-right: 40px;
  box-sizing: border-box;
  margin-top:24px;
  position: relative;
  max-width: 1540px;
  width: 100%;
  @media screen and (max-width: 760px) {
    background-image: url(${mobileAbout});
    min-height: 100vw;
    background-repeat: no-repeat;
    background-size: 100%;
    background-position-y: center;
    display: flex;
    padding-left: 75px;
    padding-right: 75px;
  }
  @media screen and (max-width: 440px) {
    padding-left: 40px;
    padding-right: 40px;
    background-position-y: 35%;
  }

  
`;
const float = keyframes`
  0%, 100% {
    transform: translateY(-2%) translateX(0);
  }
  50% {
    transform: translateY(2%) translateX(20px);
  }
`;

const BackPlate = styled.div`
    position: absolute;
    top: -281px;
    left: -394px;
    background: url(${cloud});
    background-repeat: no-repeat;
    width: 2475px;
    height: 1284px;
    z-index: 0;
    animation: ${float} 3s infinite linear;
    @media screen and (max-width:1200px) {
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-size: contain;
    }
    @media screen and (max-width: 760px) {
      display: none;
    }
`;

const AboutSection: FC = () => {
  const navigate = useNavigate();
  return (
    <Section>
      <BackPlate />
      <PlateWithImage
        withBackImage
        isInView
        width={58}
        align='end'
        imageHeight={76}
        image={image}
        isReversed={false}
        height={820}>
        <Div>
          <H1>
            Мы знаем, что для тебя
            <br />
            {' '}
            важно, и мы это ПроекТим
          </H1>
          <P>
            ПроекТим– ресурс для формирования
            <br />
            {' '}
            проектных команд и хранения портфолио
          </P>
          {!jwt.test() && (
            <ButtonContainer>
              <Button
                text='Зарегистрироваться'
                isColored
                type='button'
                onClick={() => navigate('/registration')} />
              <Button
                text='Войти'
                isColored={false}
                type='button'
                onClick={() => navigate('/login')} />
            </ButtonContainer>
          )}
        </Div>
      </PlateWithImage>
    </Section>
  );
};

export default AboutSection;
