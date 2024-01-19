import React, { FC } from 'react';
import styled from 'styled-components';

const HiddenPrompt = styled.div<{ width: string, top: number, left: number }>`
  width:${({ width }) => width};
  background-color: transparent;
  color: #A0616A;
  font-family: 'BlueCurve';
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
`;

const PromptHidden: FC<{ text: string, width: string, top: number, left: number }> = ({
  text, width, top, left,
}) => (
  <HiddenPrompt width={width} top={top} left={left}>
    {text}
  </HiddenPrompt>
);

export default PromptHidden;
