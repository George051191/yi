import React, { FC } from 'react';
import styled from 'styled-components';
import empty from '../assets/emptypavuk.png';

const EmptyImage = styled.img`
  width: 700px;
  height: 700px;
  align-self: center;
`;

const EmptyDefault: FC = () => (
  <EmptyImage src={empty} />
);

export default EmptyDefault;
