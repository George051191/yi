/* eslint-disable react/require-default-props */
/* eslint-disable arrow-body-style */
import React, {
  FC, ReactNode, useEffect, useState,
} from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router';
import Filter from '../Filter';
import { RoundBackButton } from '../Buttons';
import { ArrowIcon, FilterIcon } from '../icons';
import { useDispatch } from '../../store/store.types';
import { setDirectionsForFilter, setProfessionsForFilter } from '../../store/allSlice';
import Breadcrumbs from './BreadCrumbs';
import { ComfortaFontMixixn39 } from '../../constants/fontsConfigs';

const Section = styled.section`
    box-sizing: border-box;
    padding-inline: 20px;
    max-width: 1400px;
    display: flex;
    padding-bottom: 90px;
    flex-direction: column;
    position: relative;
    width: 100%;
    gap: 66px;
    align-items: center;
    margin-top: 60px;
`;
const BreadWrapper = styled.div`
    position: absolute;
    top: 63px;
    left: 20px;
`;

const IconWrapper = styled.div`
  position: absolute;
  cursor: pointer;
  top: 0px;
  right: 20px;
`;
const CustomRoundButton = styled(RoundBackButton)`

`;
const SectionPlateWithFilter: FC<{ withButton?: boolean, children: ReactNode, path: string, withOneSelect: boolean, forDates?: boolean, routeArr?: any }> = ({
  children, path, withOneSelect, forDates = false, withButton = true, routeArr,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isFilterOpen, openFilter] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(setDirectionsForFilter([]));
      dispatch(setProfessionsForFilter([]));
    };
  }, []);
  return (
    <Section>
      <IconWrapper>
        <FilterIcon onClick={() => openFilter(!isFilterOpen)} />
        {isFilterOpen && <Filter forDates={forDates} withOneSelect={withOneSelect} close={() => openFilter(false)} />}
      </IconWrapper>
      {withButton && <CustomRoundButton top={0} left={20} onClick={() => navigate(path)}><ArrowIcon /></CustomRoundButton>}
      {location.pathname !== '/responses-experts' && location.pathname !== '/my-responses' && location.pathname !== '/responses-projects' && (
        <BreadWrapper>
          <Breadcrumbs dynamicRoutes={routeArr} />
        </BreadWrapper>
      )}
      {children}
    </Section>
  );
};

export default SectionPlateWithFilter;
