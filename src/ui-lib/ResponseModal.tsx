import React, { FC } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { useDispatch } from '../store/store.types';
import { openResponsesModal } from '../store/allSlice';

const Plate = styled.div`
    border-radius: 50px;
    background: rgba(212, 221, 253, 0.80);
    width: 459px;
    height: 155px;
    backdrop-filter: blur(4px);
    display: flex;
    flex-direction: column;
    padding: 30px 54px;
    justify-content: center;
    gap: 30px;
    align-items: center;
`;
const Div = styled.div`
    display: flex;
    gap: 20px;
`;

const Text = styled.p`
    color: ${({ theme: { mainTextColor } }) => mainTextColor};
    font-family: 'TTTravels';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;

const ResponseModal: FC = () => {
  const dispatch = useDispatch();
  return (
    <Plate>
      <Text>Вы уверены, что хотите отказать ?</Text>
      <Div>
        <Button onClick={() => console.log(123)} isColored={false} type='button' text='Отказать' />
        <Button onClick={() => dispatch(openResponsesModal(false))} isColored type='button' text='Закрыть' />
      </Div>
    </Plate>
  );
};

export default ResponseModal;
