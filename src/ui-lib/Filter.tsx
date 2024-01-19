/* eslint-disable react/require-default-props */
/* eslint-disable arrow-body-style */
/* eslint-disable react/no-array-index-key */
import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import styled from 'styled-components';
import SelectWithPlural from './SelectWithPlural';
import { professions, projectDirections } from '../constants/textsForLanding';
import Button from './Button';
import { setDirectionsForFilter, setProfessionsForFilter, setFilteForDates } from '../store/allSlice';
import { useDispatch, useSelector } from '../store/store.types';
import FilterForDates from './widgets/FilterForDates';

const FilterPlate = styled.div`
    min-width: 560px;
    display: flex;
    flex-direction: column;
    gap: 27px;
    border-radius: 50px;
    background: #FFFEFA;
    padding: 34px;
    box-shadow: 0px 10px 25px 0px rgba(0, 0, 0, 0.25);

    position: absolute;
    top: 44px;
    right: 24px;
    z-index: 99999999999999;
    box-sizing: border-box;
`;

const P = styled.p`
  color: ${({ theme: { mainTextColor } }) => mainTextColor};
  font-family: 'TTTravels';
  font-size: 25px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0;
  align-self: center;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  align-self: center;
  & button {
    align-items: center;
    height: 37px;
  }
`;

const Filter: FC<{ close: () => void, withOneSelect: boolean, forDates?: boolean }> = ({ close, withOneSelect, forDates = false }) => {
  const dispatch = useDispatch();
  const { filterDirectionsValues, filterProfessionValues } = useSelector((state) => state.all);
  const [currentOpenIndex, setCurrentIndex] = useState(-1);
  const openAndClose = (index: number) => {
    setCurrentIndex(index === currentOpenIndex ? -1 : index);
  };
  const addDirectionToFilterArray = useCallback((name: string, mainName: string, arrItems: string[]) => {
    if (mainName !== undefined && filterDirectionsValues.indexOf(mainName) > -1) {
      const copyArr = [...filterDirectionsValues];
      copyArr.splice(copyArr.indexOf(mainName), 1);
      copyArr.push(name);
      dispatch(setDirectionsForFilter(copyArr));
      return;
    }
    if (filterDirectionsValues.indexOf(name) > -1) {
      const copyArr = [...filterDirectionsValues];
      copyArr.splice(copyArr.indexOf(name), 1);
      dispatch(setDirectionsForFilter(copyArr));
      return;
    }

    const copyArr = [...filterDirectionsValues];
    copyArr.push(name);

    const filteredArr = arrItems !== undefined && copyArr.filter((el) => arrItems?.indexOf(el) < 0);

    dispatch(setDirectionsForFilter(filteredArr || copyArr));
  }, [filterDirectionsValues]);

  const addProfessionToFilterArray = useCallback((name: string, mainName: string, arrItems: string[]) => {
    if (mainName !== undefined && filterProfessionValues.indexOf(mainName) > -1) {
      const copyArr = [...filterProfessionValues];
      copyArr.splice(copyArr.indexOf(mainName), 1);
      copyArr.push(name);
      dispatch(setProfessionsForFilter(copyArr));
      return;
    }
    if (filterProfessionValues.indexOf(name) > -1) {
      const copyArr = [...filterProfessionValues];
      copyArr.splice(copyArr.indexOf(name), 1);
      dispatch(setProfessionsForFilter(copyArr));
      return;
    }

    const copyArr = [...filterProfessionValues];
    copyArr.push(name);
    const filteredArr = arrItems !== undefined && copyArr.filter((el) => arrItems?.indexOf(el) < 0);
    dispatch(setProfessionsForFilter(filteredArr || copyArr));
  }, [filterProfessionValues]);

  return (
    <FilterPlate>
      <P>Фильтр</P>
      {!withOneSelect && !forDates && (
        <>
          <SelectWithPlural
            arr={projectDirections}
            name='directions'
            label='Направления'
            idx={0}
            value={filterDirectionsValues}
            withValueField={false}
            getValue={addDirectionToFilterArray}
            isOpen={currentOpenIndex === 0}
            openSelect={openAndClose} />
          <SelectWithPlural
            arr={professions}
            name='profession'
            label='Специалисты'
            withValueField={false}
            value={filterProfessionValues}
            idx={1}
            getValue={addProfessionToFilterArray}
            isOpen={currentOpenIndex === 1}
            openSelect={openAndClose} />
        </>
      )}
      {withOneSelect && !forDates
        && (
          <SelectWithPlural
            withOnlyFilter
            arr={professions}
            name='profession'
            label='Специалисты'
            withValueField={false}
            value={filterProfessionValues}
            idx={1}
            getValue={addProfessionToFilterArray}
            isOpen
            openSelect={openAndClose} />
        )}
      {forDates
        && (
          <FilterForDates />
        )}
      <Wrapper>
        {!forDates && <Button onClick={() => { dispatch(setDirectionsForFilter([])); dispatch(setProfessionsForFilter([])); }} isColored type='button' text='Удалить все' />}
        <Button onClick={close} isColored={false} type='button' text='Закрыть' />
      </Wrapper>
    </FilterPlate>
  );
};

export default Filter;
