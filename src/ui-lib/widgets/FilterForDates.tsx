import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { ArrowIcon, CheckDoneIcon, CheckIputIcon } from '../icons';
import {
  P, IconWrapper, Wrapper, Li, Icon,
} from '../SelectWithPlural';
import { useDispatch, useSelector } from '../../store/store.types';
import { setFilteForDates } from '../../store/allSlice';

const Div = styled.div<{ height: string }>`
    width: 100%;
    height:${({ height }) => height};
    position: relative;
    display: flex;
    flex-direction: column;
`;

const DirectionsList = styled.ul<{ positioned: boolean }>`
    list-style: none;
    padding: 0;
    margin: 0;
    max-width: 560px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    border-radius: 50px;
    border: none;
    background: transparent;
    position: relative;
    
    z-index: 99999;
`;

const InputName = styled.label`
    color: ${({ theme: { mainTextColor } }) => mainTextColor};
    font-family: 'TTTravels';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
`;

const FilterForDates: FC = () => {
  const [isOpen, open] = useState<boolean>(false);
  const { filterNewFirst } = useSelector((state) => state.all);
  const dispatch = useDispatch();
  return (
    <Div height='auto'>
      <InputName onClick={() => open(!isOpen)}>
        По дате
        <ArrowIcon style={{ marginLeft: '20px' }} isOpen={isOpen} />
      </InputName>
      {isOpen
                && (
                <DirectionsList positioned={false}>
                  <Li>
                    <Wrapper onClick={() => (filterNewFirst ? dispatch(setFilteForDates(false)) : dispatch(setFilteForDates(true)))}>
                      <Icon style={{ top: '6px' }} isShown={filterNewFirst} />
                      <CheckIputIcon style={{ flexShrink: '0' }} />
                      <P style={{ textDecoration: 'none' }}>сначала новые</P>
                    </Wrapper>
                  </Li>
                  <Li>
                    <Wrapper onClick={() => (!filterNewFirst ? dispatch(setFilteForDates(true)) : dispatch(setFilteForDates(false)))}>
                      <Icon style={{ top: '6px' }} isShown={!filterNewFirst} />
                      <CheckIputIcon style={{ flexShrink: '0' }} />
                      <P style={{ textDecoration: 'none' }}>сначала старые</P>
                    </Wrapper>
                  </Li>
                </DirectionsList>
                )}
    </Div>
  );
};

export default FilterForDates;
