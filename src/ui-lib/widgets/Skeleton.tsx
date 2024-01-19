/* eslint-disable import/prefer-default-export */
import React, { FC } from 'react';
import styled, { keyframes } from 'styled-components';
import { useLocation } from 'react-router';
import { AvatarWrapper } from '../Avatar';

const pulse = keyframes`
   to {
    background-position-x: -200%;
  }
  `;

const Section = styled.section`
    box-sizing: border-box;
    padding-inline: 40px;
    max-width:1362px ;
    display: flex;
    margin-top:92px;
    flex-direction: column;
    position: relative;
    width: 100%;
    margin-bottom: 60px;
    align-items: center;
    gap: 60px;
    & button {
      align-self: center;
    }
`;

const SSkeletonPulse = styled.div`
    box-sizing: border-box;
    padding-inline: 40px;
    max-width:1362px ;
    display: flex;
    margin-top:92px;
    flex-direction: column;
    position: relative;
    width: 100%;
    margin-bottom: 60px;
    align-items: center;
    gap: 60px;
    & button {
      align-self: center;
    }
  `;

const AvatarSkeleton = styled(AvatarWrapper)`
    background: #eee;
    background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
    border-radius: 50%;
    border: none;
    background-size: 200% 100%;
    animation: 1.5s ${pulse} linear infinite;
    flex-shrink: 0;
 `;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap:25px;
    width: 100%;
    max-width: 560px;
`;

const SmallSkeletonLabel = styled.span`
    background: #eee;
    background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
    
    background-size: 200% 100%;
    animation: 1.5s ${pulse} linear infinite;
    width: 300px;
    height: 35px;
`;
const SkeletonInput = styled.span`
    background: #eee;
    background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
    
    background-size: 200% 100%;
    animation: 1.5s ${pulse} linear infinite;
    width: 100%;
    height: 35px;
`;

const Column = styled.div`
  width: 100%;
  display: flex;
  gap: 60px;
  flex-direction: column;
  align-items: center;
`;

const BigSkeletonDiv = styled.div`
    display: flex;
    max-width: 1360px;
    width: 100%;
    -webkit-box-align: center;
    align-items: center;
    justify-content: space-around;
    padding-top: 20px;
    padding-bottom: 20px;
    border-radius: 91px;
  
`;

const BigSkeletonDivForSpec = styled.div`
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const Container = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
`;
export const Skeleton4: FC = () => (
  <SSkeletonPulse style={{ flexDirection: 'row' }}>
    <BigSkeletonDivForSpec>
      <AvatarSkeleton style={{ alignSelf: 'center' }} />
      <Wrapper>
        <SmallSkeletonLabel style={{ alignSelf: 'center' }} />
        <SkeletonInput />
        <SkeletonInput />
        <SkeletonInput />
        <SkeletonInput />
        <SkeletonInput />
        <SkeletonInput />
      </Wrapper>
    </BigSkeletonDivForSpec>
    <BigSkeletonDivForSpec>
      <AvatarSkeleton style={{ alignSelf: 'center' }} />
      <Wrapper>
        <SmallSkeletonLabel style={{ alignSelf: 'center' }} />
        <SkeletonInput />
        <SkeletonInput />
        <SkeletonInput />
        <SkeletonInput />
        <SkeletonInput />
        <SkeletonInput />
      </Wrapper>
    </BigSkeletonDivForSpec>
    <BigSkeletonDivForSpec>
      <AvatarSkeleton style={{ alignSelf: 'center' }} />
      <Wrapper>
        <SmallSkeletonLabel style={{ alignSelf: 'center' }} />
        <SkeletonInput />
        <SkeletonInput />
        <SkeletonInput />
        <SkeletonInput />
        <SkeletonInput />
        <SkeletonInput />
      </Wrapper>
    </BigSkeletonDivForSpec>
  </SSkeletonPulse>
);

export const Skeleton3: FC = () => (
  <SSkeletonPulse>
    <BigSkeletonDiv>
      <AvatarSkeleton />
      <Wrapper>
        <SmallSkeletonLabel />
        <SkeletonInput />
        <SkeletonInput />
        <SkeletonInput />
        <SkeletonInput />
        <SkeletonInput />
        <SkeletonInput />
      </Wrapper>
    </BigSkeletonDiv>
    <BigSkeletonDiv>
      <AvatarSkeleton />
      <Wrapper>
        <SmallSkeletonLabel />
        <SkeletonInput />
        <SkeletonInput />
        <SkeletonInput />
        <SkeletonInput />
        <SkeletonInput />
        <SkeletonInput />
      </Wrapper>
    </BigSkeletonDiv>
    <BigSkeletonDiv>
      <AvatarSkeleton />
      <Wrapper>
        <SmallSkeletonLabel />
        <SkeletonInput />
        <SkeletonInput />
        <SkeletonInput />
        <SkeletonInput />
        <SkeletonInput />
        <SkeletonInput />
      </Wrapper>
    </BigSkeletonDiv>
    <BigSkeletonDiv>
      <AvatarSkeleton />
      <Wrapper>
        <SmallSkeletonLabel />
        <SkeletonInput />
        <SkeletonInput />
        <SkeletonInput />
        <SkeletonInput />
        <SkeletonInput />
        <SkeletonInput />
      </Wrapper>
    </BigSkeletonDiv>
  </SSkeletonPulse>
);

export const Skeleton2: FC = () => (
  <Section>
    <Container>
      <AvatarSkeleton />
      <Column>
        <Wrapper>
          <SmallSkeletonLabel />
          <SkeletonInput />
          <SkeletonInput />
          <SkeletonInput />
        </Wrapper>
        <Wrapper>
          <SmallSkeletonLabel />
          <SkeletonInput />
          <SkeletonInput />
          <SkeletonInput />
        </Wrapper>
        <Wrapper>
          <SmallSkeletonLabel />
          <SkeletonInput />
          <SkeletonInput />
          <SkeletonInput />
        </Wrapper>
        <Wrapper>
          <SmallSkeletonLabel />
          <SkeletonInput />
          <SkeletonInput />
          <SkeletonInput />
        </Wrapper>
      </Column>
    </Container>
  </Section>
);

export const Skeleton1: FC = () => {
  const location = useLocation();
  return (

    <Section>
      <AvatarSkeleton />
      <Container>
        <Column>
          <Wrapper>
            <SmallSkeletonLabel />
            <SkeletonInput />
            <SkeletonInput />
            <SkeletonInput />
          </Wrapper>
          <Wrapper>
            <SmallSkeletonLabel />
            <SkeletonInput />
            <SkeletonInput />
            <SkeletonInput />
          </Wrapper>
          <Wrapper>
            <SmallSkeletonLabel />
            <SkeletonInput />
            <SkeletonInput />
            <SkeletonInput />
          </Wrapper>
        </Column>
        <Column>
          <Wrapper>
            <SmallSkeletonLabel />
            <SkeletonInput />
            <SkeletonInput />
            <SkeletonInput />
          </Wrapper>
          <Wrapper>
            <SmallSkeletonLabel />
            <SkeletonInput />
            <SkeletonInput />
            <SkeletonInput />
          </Wrapper>
          <Wrapper>
            <SmallSkeletonLabel />
            <SkeletonInput />
            <SkeletonInput />
            <SkeletonInput />
          </Wrapper>
        </Column>
      </Container>
    </Section>
  );
};
