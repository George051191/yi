/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react';
import styled from 'styled-components';
import toast, { Toaster } from 'react-hot-toast';
import Breadcrumbs from './BreadCrumbs';
import { ArrowIcon } from '../icons';
import { RoundBackButton } from '../Buttons';
import { ComfortaFontMixixn39 } from '../../constants/fontsConfigs';
/// / тащи сюда еще иконку стрелки и делай секцию сразу с header и размер ширины увеличить там по гридам глянь
const Section = styled.section`
    box-sizing: border-box;
    padding-inline: 20px;
    max-width: 1400px ;
    display: flex;
    padding-top: 35px;
    padding-bottom: 90px;
    flex-direction: column;
    position: relative;
    width: 100%;
    gap: 66px;
    align-items: center;
`;

const BreadWrapper = styled.div`
    position: absolute;
    top: 93px;
    left: 20px;
`;
const H2 = styled.h2`
  color: ${({ theme: { mainButtonColor } }) => mainButtonColor};
  ${ComfortaFontMixixn39}
`;

const NewBaseSection: FC<{
  children: React.ReactNode,
  routes?: any[],
  title: string,
  goBackFunc: () => void,
}> = ({
  children,
  routes,
  title,
  goBackFunc,
}) => (
  <Section>
    <Toaster position='bottom-right' />
    <BreadWrapper>
      <Breadcrumbs dynamicRoutes={routes} />
    </BreadWrapper>
    <RoundBackButton onClick={goBackFunc} top={36} left={20}>
      <ArrowIcon />
    </RoundBackButton>
    <H2>{title}</H2>
    {children}
  </Section>
);

export default NewBaseSection;
