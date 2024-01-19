/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { Input } from './InputComponent';

const TeamContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 23px;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 504px;
`;

const LabelForStatus = styled.label`
    color: ${({ theme: { mainTextColor } }) => mainTextColor};
    font-family: 'TTTravels';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    margin-bottom: 23px;
    `;

const CrewBox: FC<{ crew: any }> = ({ crew }) => {
  const navigate = useNavigate();
  return (

    <TeamContainer>

      <LabelForStatus>Команда</LabelForStatus>
      {crew.map((el: any) => (
        <Input style={{ cursor: 'pointer' }} onClick={() => navigate(`/profile/${el.id}`)} value={`${el.name} - ${el.speciality}`} />
      ))}
    </TeamContainer>

  );
};

export default CrewBox;
