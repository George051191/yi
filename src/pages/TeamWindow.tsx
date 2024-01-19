import React, { FC } from 'react';
import styled from 'styled-components';
import { Navigate, useLocation } from 'react-router';
import TeamWindowTextBlock from '../ui-lib/widgets/TeamWindowTextBlock';
import {
  ImageDiv, BackImage, MainImage,
} from './MyProjects';
import cloud from '../assets/blueCloud.png';
import image from '../assets/projectImage.png';
import { jwt } from '../api/api';

const Section = styled.section`
  box-sizing: border-box;
  padding-inline: 40px;
  max-width: 1362px;
  display: flex;
  width: 100%;
  padding-bottom: 100px;
  margin-top: 40px;
  & button {
    margin-bottom: 30px;
  }
`;

const TeamWindow: FC = () => {
  const location = useLocation();

  return (

    <Section>

      <TeamWindowTextBlock />
      <ImageDiv>
        <MainImage src={image} />
        <BackImage src={cloud} />
      </ImageDiv>
    </Section>
  );
};

export default TeamWindow;
