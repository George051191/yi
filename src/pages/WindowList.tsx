/* eslint-disable no-nested-ternary */
/* eslint-disable ternary/nesting */
import React, { FC, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import EmptyDefault from '../ui-lib/EmptyImage';
import { ProjectList } from './MyProjectsList';
import { SectionHeader } from '../ui-lib/TextBlocks';
import ProjectWindowPlate from '../ui-lib/widgets/ProjectWindowPlate';
import SectionPlateWithFilter from '../ui-lib/widgets/SectionPlateWithFilter';
import { jwt, useGetAllProjectsQuery, useGetCurrentUserQuery } from '../api/api';
import { makeToast } from '../helpers/promts';
import { useSelector } from '../store/store.types';
import { Skeleton3 } from '../ui-lib/widgets/Skeleton';

const WindowList: FC = () => {
  const { data: user } = useGetCurrentUserQuery();
  const {
    data, error, status, isLoading,
  } = useGetAllProjectsQuery();
  const { filterDirectionsValues, filterProfessionValues } = useSelector((state) => state.all);
  useEffect(() => {
    makeToast(error, undefined);
  }, [error, status]);

  const filterWithDirectionsAndProfessions = () => {
    const firstStepFiltration = data?.filter((item) => (filterDirectionsValues.length === 0 ? item : filterDirectionsValues.includes(item.division)));
    const secondStepFiltration = firstStepFiltration?.filter((el) => {
      const expertsArr = el.experts;
      const hasExpert = expertsArr.some((item) => filterProfessionValues.includes(item.spec));
      return filterProfessionValues.length === 0 ? el : hasExpert;
    });
    return secondStepFiltration;
  };

  return (

    <SectionPlateWithFilter withOneSelect={false} path='/all-projects'>
      <Toaster position='bottom-right' />
      <SectionHeader>Витрина проектов</SectionHeader>
      {isLoading
        ? <Skeleton3 />
        : data?.length === 0 ? <EmptyDefault />
          : (
            <ProjectList style={{ gap: '60px' }}>
              {filterWithDirectionsAndProfessions()?.length === 0 ? <EmptyDefault /> : filterWithDirectionsAndProfessions()?.map((el) => (
                <ProjectWindowPlate
                  createdAt={el.year as Date}
                  isMine={user?.id === el.ownerId}
                  id={el.id!}
                  isSmall
                  imagesArray={el.images}
                  name={el.name}
                  direction={el.division}
                  stage={el.stage}
                  achieve={el.achievements}
                  idea={el.idea}
                  teamMateArray={el.experts}
                  team={el.team || []}
                  link={el.file}
                  fileName=''
                  forMoney={el.experts.some((item) => item.forMoney === true)} />
              ))}
            </ProjectList>
          )}
    </SectionPlateWithFilter>

  );
};

export default WindowList;
