import React, { useState } from 'react';
import styled from 'styled-components';
import NewSelectWithPlural from '../ui-lib/widgets/NewSelectWithPlural';
import ProfileV2 from './Profile_v2';

const Section = styled.section`
  max-width: 1720px ;
  width: 100%;

`;

const Test = () => {
  const [profession, setProfession] = useState<string>('');
  return (
    <ProfileV2 />

  );
};

export default Test;
