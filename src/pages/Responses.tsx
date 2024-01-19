import React, { FC } from 'react';
import styled from 'styled-components';
import { Navigate, useLocation } from 'react-router';
import {
  Section,
  ImageDiv, BackImage, MainImage,
} from './MyProjects';
import ResponseTextBlock from '../ui-lib/widgets/ResponsesTextBlock';
import cloud from '../assets/blueCloud.png';
import image from '../assets/collaboratorsresponse.png';
import { jwt } from '../api/api';

const ResponseMain: FC = () => {
  const location = useLocation();
  return (

    <Section style={{ flexDirection: 'row', marginTop: '40px' }}>
      <ResponseTextBlock />
      <ImageDiv>
        <MainImage src={image} />
        <BackImage style={{ transform: 'rotate(121deg)' }} src={cloud} />
      </ImageDiv>
    </Section>
  );
};

export default ResponseMain;
