/* eslint-disable react/no-array-index-key */
/* eslint-disable react/require-default-props */
/* eslint-disable no-param-reassign */
import React, {
  FC, memo,
} from 'react';
import styled from 'styled-components';
import { Input, Promt, Error } from './InputComponent';
import { ArrowIcon, CrossIcon } from './icons';
import WhiteTextField from './WhiteTextField';
import { setPrompText } from '../helpers/promts';

const Div = styled.div<{ height: string }>`
    width: 100%;
    height:${({ height }) => height};
    position: relative;
    display: flex;
    flex-direction: column;
    
`;

const Label = styled.label`
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
    justify-content: space-between;
`;

const Datalist = styled.datalist<{ isOpen: boolean }>`
    border-radius: 50px;
    background: rgba(241, 244, 255, 0.60);
    backdrop-filter: blur(4px);
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    gap: 15px;
    position: absolute;
    top: 86px;
    padding: 15px;
    z-index: 99999;
`;

const Option = styled.option`
    color: ${({ theme: { mainTextColor } }) => mainTextColor};
    font-family: 'TTTravels';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    white-space: break-spaces;
    cursor: pointer;
    &:hover {
        color: ${({ theme: { mainButtonColor } }) => mainButtonColor};
        font-style: 500;
    }
`;

const HashContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const HashContainerUpdated = styled(HashContainer)`
  flex-wrap: nowrap;
   flex-direction: column;
    gap: 40px;
`;

const Hash = styled.li`
    display: flex;
    min-width: 136px;
    height: 37px;
    padding: 27px 44px;
    justify-content: center;
    align-items: center;
    border-radius: 36px;
    background-color: ${({ theme: { mainButtonColor } }) => mainButtonColor};
    color:${({ theme: { mainBg } }) => mainBg};
    font-family: 'TTTravels';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 80%;
    letter-spacing: -0.5px;
    box-sizing: border-box;
    position: relative;
`;

const Select: FC<{
  optionArr: any,
  deleteOption?: (index: number) => void,
  value: string | string[],
  getValue: any,
  label: string,
  name: string,
  isOpen: boolean,
  openSelect: (idx: number) => void,
  isWithList?: boolean,
  array?: any,
  height?: string,
  isWithBigPlate?: boolean,
  arrayForBigPlates?: any,
  deleteItem?: (index: number) => void,
  error?: string,
  isSubmited?: boolean,
  idx: number,
}> = ({
  deleteOption,
  optionArr,
  value,
  getValue,
  label,
  name,
  idx,
  isOpen,
  openSelect,
  isWithList = false,
  array = [],
  height = '70px',
  isWithBigPlate = false,
  arrayForBigPlates = [],
  deleteItem,
  error,
  isSubmited = false,
}) => (
  <Div height={height}>
    <Label onClick={() => openSelect(idx)}>
      {label}
      <ArrowIcon style={{ marginLeft: '20px' }} isOpen={isOpen} />
    </Label>
    {!isWithList && <Input readOnly type='text' id={name} value={value} onClick={() => openSelect(idx)} />}
    {array?.length > 0
        && (
          <HashContainer>
            {array.map((el: any, index: number) => (
              <Hash key={index}>
                <CrossIcon
                  onClick={() => deleteOption && deleteOption(index)}
                  style={{ position: 'absolute', top: '-11px', right: '-12px' }} />
                {el}
              </Hash>
            ))}
          </HashContainer>
        )}
    {isWithBigPlate
        && (
          <HashContainerUpdated>

            {arrayForBigPlates?.map((el: any, index: number) => (
              <WhiteTextField
                description={el.description}
                id={el.id}
                key={index}
                index={index}
                deleteItem={() => deleteItem !== undefined && deleteItem(index)}
                name={el.name} />
            ))}
          </HashContainerUpdated>
        )}
    {optionArr.length !== 0 && optionArr !== null && (
    <Datalist id='spec' isOpen={isOpen}>
      {optionArr?.map((el: any, index: number) => (
        <Option key={index} onClick={() => { getValue(el); }}>{typeof el === 'string' ? el : el.name}</Option>
      ))}
    </Datalist>
    )}
    {arrayForBigPlates.length === 0 && <Promt>{setPrompText(label)}</Promt>}
    {error && isSubmited && <Error>{error}</Error>}
  </Div>
);

export default memo(Select);
