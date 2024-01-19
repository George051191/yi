import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import SliderComponent from './Slider';
import Button from '../Button';
import { DisabledInput, DisabledTextArea } from '../Inputs';
import { useDeleteAchievementMutation } from '../../api/api';
import { AddIcon, BlueDeleteIcon } from '../icons';
import Breadcrumbs from './BreadCrumbs';

const GreyPlate = styled.li`
    max-width: 1370px;
    width: 100%;
    background-color: ${({ theme: { plateColor } }) => plateColor};
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    border-radius: 91px;
    box-sizing: border-box;
    gap:72px;
    padding-right:140px;
    min-height: 453px;
    position: relative;
    box-sizing: border-box;
 
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 60px;
    flex: auto;
    padding-bottom: 34px;
    padding-top: 34px;
    margin-left: 549px;
    & textarea {
      height: 100px;
    }
`;

const LeftControlColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width:490px;
  justify-content: space-between ;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 39px;
  padding-bottom: 39px;
`;
const DeleteButton = styled.button`
 width: 50px;
  height: 50px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -19px;
  right: 18px;
  background-color: ${({ theme: { mainButtonColor } }) => mainButtonColor};
  border: none;
  transform: rotate(45deg);
  & svg path {
    stroke: ${({ theme: { mainBg } }) => mainBg};
  }
`;
const ApprovementPlate = styled.div`
  border-radius: 50px;
  position: absolute;
  top: -77px;
  right: 78px;
  border:${({ theme: { mainButtonColor } }) => `1px solid ${mainButtonColor}`};
  background: rgba(241, 244, 255, 0.60);
  backdrop-filter: blur(4px);
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  z-index: 99999;
  padding:20px;
`;

const ApproveText = styled.p`
    color: ${({ theme: { mainTextColor } }) => mainTextColor};
    font-family: 'TTTravels';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    align-self: center;
    margin-bottom: 23px;
    gap: 40px;
    display: flex;
    align-items: center;
    margin: 0;
`;

const AchievePlate: FC<{
  name: string,
  year: Date,
  description: string,
  images: string[],
  id: any,
  urlId: any,
}> = ({
  name,
  year,
  description,
  images,
  id,
  urlId,
}) => {
  const navigate = useNavigate();
  const [deleteAchievement] = useDeleteAchievementMutation();
  const [isOpenApprovement, openApprovement] = useState<boolean>(false);
  return (
    <GreyPlate>
      {isOpenApprovement
        && (
        <ApprovementPlate>
          <ApproveText>Точно удалаяем?</ApproveText>
          <Button onClick={() => deleteAchievement({ achievementId: id, folderId: urlId })} type='button' text='Удалить' isColored />
          <Button onClick={() => openApprovement(false)} type='button' text='Закрыть' isColored={false} />
        </ApprovementPlate>
        )}
      <BlueDeleteIcon onClick={() => openApprovement(true)}><AddIcon /></BlueDeleteIcon>
      <LeftControlColumn>
        <SliderComponent forAchieve imagesArray={images} width={275} height={330} />
        <Button onClick={() => navigate(`/achieves/${urlId}/${id}`)} isColored={false} type='button' text='Редактировать' />
      </LeftControlColumn>
      <Form>
        <DisabledInput name='Название' value={name} />
        <DisabledInput name='Год' value={year} />
        <DisabledTextArea name='Описание достижения' value={description} />
      </Form>
    </GreyPlate>

  );
};

export default AchievePlate;
