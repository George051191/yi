import React, { FC } from 'react';
import styled from 'styled-components';
import { Navigate, useLocation, useNavigate } from 'react-router';
import image from '../assets/projectImage.png';
import MyProjectTextBlock from '../ui-lib/MyProjectTextBlock';
import cloud from '../assets/blueCloud.png';
import { jwt, useGetCurrentUserProjectsQuery } from '../api/api';

export const Section = styled.section`
  box-sizing: border-box;
  padding-inline: 40px;
  max-width: 1362px; ///
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 100px;
  & button {
    align-self: center;
    margin-top: 35px;
  }
`;
export const ImageDiv = styled.div`
  position:relative ;
  width: 88%;
  height: 100%;
  margin-left: -80px;
  align-self: center;
`;

export const MainImage = styled.img`
  width: 100%;
  height: 100%;
  z-index: 15;
  position: relative;
`;

export const BackImage = styled.img`
  width: 108%;
  height: 100%;
  position: absolute;
  z-index: 0;
  top: 107px;
  left: -63px;
`;

const MyProjects: FC = () => {
  const navigate = useNavigate();
  const { data, error } = useGetCurrentUserProjectsQuery();

  return (
    data?.length !== 0 && data?.length ? <Navigate to='/projects-list' />
      : (
        <Section style={{ flexDirection: 'row', marginTop: '40px' }}>
          <MyProjectTextBlock />
          <ImageDiv>
            <MainImage src={image} />
            <BackImage src={cloud} />
          </ImageDiv>
        </Section>
      )
  );
};

export default MyProjects;
