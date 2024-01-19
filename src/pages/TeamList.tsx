/* eslint-disable no-nested-ternary */
/* eslint-disable ternary/nesting */
import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { Toaster } from 'react-hot-toast';
import { SectionHeader } from '../ui-lib/TextBlocks';
import Button from '../ui-lib/Button';
import SectionPlateWithFilter from '../ui-lib/widgets/SectionPlateWithFilter';
import {
  jwt,
  useGetAllExpertsQuery,
  useGetCurrentUserProjectsQuery,
  useGetCurrentUserQuery,
  useCreateExpertMutation,
  useGetUsersQuery,
} from '../api/api';
import { openCreateProfessionPopup } from '../store/allSlice';
import EmptyDefault from '../ui-lib/EmptyImage';
import { makeToast } from '../helpers/promts';
import { useSelector, useDispatch } from '../store/store.types';
import NewPlateForSpec from '../ui-lib/NewPlateForSpec';
import { UniversalButton } from '../ui-lib/RestyledButtons';
import { Skeleton4 } from '../ui-lib/widgets/Skeleton';
import avatarDefault from '../assets/dedaultAvaImg.png';
import { ComfortaFontMixixn39 } from '../constants/fontsConfigs';
import Themes from '../themes';
import { TUser } from '../types/apiTypes';

export const SpecList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
    row-gap: 20px;
    column-gap: 20px;
    display: grid;
    grid-template-columns: repeat(2, minmax(340px, 1fr));
    grid-auto-flow: row;
`;

const Header2 = styled.h2`
  color: ${({ theme: { mainButtonColor } }) => mainButtonColor};
  ${ComfortaFontMixixn39}
  margin: 0;
`;

const TeamList: FC = () => {
  const navigate = useNavigate();
  const {
    data, error, isLoading: loading,
  } = useGetUsersQuery();
  const [createExpert, { error: createError, status, isLoading }] = useCreateExpertMutation();
  const { data: user } = useGetCurrentUserQuery();
  const { data: projects, error: projectError } = useGetCurrentUserProjectsQuery();
  const { filterProfessionValues, theme } = useSelector((state) => state.all);
  const dispatch = useDispatch();
  const deleteFromExpertsList = async () => {
    try {
      await createExpert({ ...user, projectsToShow: [], isExpert: false });
    } catch (err) {
      console.log(err);
    }
  };
  const filteredUserWithProfessions = () => data?.reduce((accum: TUser[], el, index) => {
    if (el.professions!.length !== 0) {
      el.professions!.forEach((item: any, idx: number) => {
        accum.push({ ...el, professions: [item] });
      });
      return accum;
    }
    return accum;
  }, []);
  useEffect(() => {
    makeToast(error, undefined);
  }, [error]);
  useEffect(() => {
    makeToast(projectError, undefined);
  }, [projectError]);
  console.log(filteredUserWithProfessions());
  const filterExpertsWithProfessions = () => data?.filter((el) => (filterProfessionValues?.length === 0 ? el : filterProfessionValues.includes(el.address!)));
  return (

    <SectionPlateWithFilter withOneSelect path='/team-window'>
      <Toaster position='bottom-right' />
      <Header2>
        Витрина специалистов

      </Header2>
      <UniversalButton
        onClick={() => navigate('/create-spec')}
        type='button'
        textColor={Themes[theme].mainTextColor}
        backColor={Themes[theme].sliderColor}
        borderColor=''
        paddingLeft={40}
        paddingTop={20}>
        Добавить себя, как специалиста
      </UniversalButton>
      {!data ? <Skeleton4 />
        /* : data?.length === 0 ? <EmptyDefault /> */
        : (
          <SpecList style={{ alignItems: 'center' }}>
            {filteredUserWithProfessions()?.map((el) => (
              <NewPlateForSpec
                onClick={() => navigate(`/resume/${el.professions![0].id}/${el.id}`)}
                image={el.avatar || avatarDefault}
                name={el.full_name || ''}
                level={el?.professions![0].level || ''}
                specislity={el.professions![0].profession_name || ''} />
            ))}
          </SpecList>
        )}
    </SectionPlateWithFilter>
  );
};

export default TeamList;
