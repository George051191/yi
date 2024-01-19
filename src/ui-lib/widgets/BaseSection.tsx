/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react';
import styled from 'styled-components';
import toast, { Toaster } from 'react-hot-toast';
import Breadcrumbs from './BreadCrumbs';

/// / тащи сюда еще иконку стрелки и делай секцию сразу с header и размер ширины увеличить там по гридам глянь
const Section = styled.section`
    box-sizing: border-box;
    padding-inline: 40px;
    max-width: 1450px ;
    display: flex;
    margin-top: 95px;
    flex-direction: column;
    position: relative;
    width: 100%;
    gap: 60px;
    & button {
      align-self: center;
    }
`;

const BreadWrapper = styled.div`
    position: absolute;
    top: 63px;
`;

const BaseSection: FC<{ children: React.ReactNode, routes?: any[] }> = ({ children, routes }) => (
  <Section>
    <Toaster position='bottom-right' />
    <BreadWrapper>
      <Breadcrumbs dynamicRoutes={routes} />
    </BreadWrapper>
    {children}
  </Section>
);

export default BaseSection;
