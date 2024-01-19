/* eslint-disable react/require-default-props */
import React, { FC } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { DistIcon, CrossIcon } from './icons';

const TextArea = styled.textarea`
     border: none;
      
      display: block;
      font-family: 'TTTravels';
      font-size: 20px;
      line-height: 50px;
      background-attachment: local;
      resize: none;
      height: 100px;
      background: transparent;
      width: 100%;
      background-image: -webkit-linear-gradient(top, transparent, transparent 49px, rgb(218, 218, 218) 0px), -webkit-radial-gradient(0% 46%, circle closest-corner, rgb(245, 245, 245), rgb(245, 245, 245) 0%, transparent 0%), -webkit-radial-gradient(0% -18%, circle closest-corner, rgb(204, 204, 204), rgb(204, 204, 204) 21.5%, transparent 0%);
      font-weight: 500;
      -webkit-background-size:  100% 50px;
      background-size: 100% 50px;
      &:focus {
        border: none;
        outline: none;
      }
`;

const ProjectLink = styled.button`
    text-decoration: none;
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
    cursor: pointer;
    outline: none;
`;

const Container = styled.li`
  height:100px ;
  border-radius: 40px;
  background:  ${({ theme: { mainBg } }) => mainBg};
  box-shadow: 0px 0px 15px 4px rgba(0, 0, 0, 0.10);
  position: relative;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 80px;
  padding-bottom: 20px;
`;

const Hash = styled.span`
    display: flex;
    min-width: 136px;
    height: 37px;
    padding: 20px 44px;
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
    cursor: pointer;
`;

const WhiteTextField: FC<{ id: number | string, index: number, name: string, projectId?: number, description?: string, deleteItem: (index: number) => void }> = ({
  index, name, projectId, description, deleteItem, id,
}) => {
  const navigate = useNavigate();

  return (
    <Container>
      <Hash onClick={() => navigate(`/project/${id}`)} style={{ position: 'absolute', top: '20px', left: '20px' }}>
        {name}
        <DistIcon />
      </Hash>
      <CrossIcon onClick={() => deleteItem(index)} style={{ position: 'absolute', top: '20px', right: '20px' }} />
      <TextArea value={description} />
    </Container>

  );
};

export default WhiteTextField;
