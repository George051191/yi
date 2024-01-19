import React, { FC } from 'react';
import styled from 'styled-components';
import { Navigate, useLocation, useNavigate } from 'react-router';
import {
  ImageDiv, BackImage, MainImage,
} from './MyProjects';
import cloud from '../assets/blueCloud.png';
import image from '../assets/projectImage.png';
import WindowTextBlock from '../ui-lib/WindowTextBlock';
import { jwt } from '../api/api';

export const Section = styled.section`
  box-sizing: border-box;
  padding-inline: 40px;
  max-width: 1362px;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 100px;
  margin-top: 40px;
`;

const Window: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (

    <Section style={{ flexDirection: 'row' }}>
      <WindowTextBlock />
      <ImageDiv>
        <MainImage src={image} />
        <BackImage src={cloud} />
      </ImageDiv>
    </Section>
  );
};

export default Window;
