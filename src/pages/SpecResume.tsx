/* eslint-disable radix */
import React, { FC, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router';
import NewAvatarWithText from '../ui-lib/widgets/NewAvatarWithText';
import NewBaseSection from '../ui-lib/widgets/NewBaseSection';
import { Skeleton1 } from '../ui-lib/widgets/Skeleton';
import { useSelector } from '../store/store.types';
import {
  useNewGetCurrentUserQuery,
  useGetUsersQuery,
  useGetProfessionWithIdQuery,
  useNewGetUserByIdQuery,
  useDeleteProfessionMutation,
} from '../api/api';
import {
  ButtonWrapper,
  Div,
  Header3,
  LinkContainer,
  LinkForFileLoad,
  ProfessionsList,
  StudyList,
  StudyListItem,
  P,
} from './ProfileAbout';
import { Details, SummaryColored } from '../ui-lib/widgets/Accordeon';
import { RoundTagBlock, TagBox } from '../ui-lib/FormElements';
import { DocumentIcon } from '../ui-lib/icons';
import { UniversalButton, ButtonWithDropBox } from '../ui-lib/RestyledButtons';
import Themes from '../themes';
import avatarDefault from '../assets/dedaultAvaImg.png';

const SpecResume: FC = () => {
  const { profId, userId } = useParams();
  const { data: user, error, isLoading } = useNewGetCurrentUserQuery();
  const { data } = useNewGetUserByIdQuery(parseInt(userId!));
  const [deleteProfession] = useDeleteProfessionMutation();
  const { theme } = useSelector((state) => state.all);
  const navigate = useNavigate();
  const deleteProf = useCallback(async () => {
    try {
      await deleteProfession({ userId: parseInt(userId!), professionId: parseInt(profId!) });
    } catch (err: any) {
      console.log(err);
    }
  }, []);
  return (
    !data && !user ? <Skeleton1 />
      : (
        <NewBaseSection
          goBackFunc={() => navigate('/team-window/team-list')}
          title='Анкета'>
          <ButtonWithDropBox />
          <NewAvatarWithText
            image={data?.avatar || avatarDefault}
            header={data?.full_name || ''}
            proffessionName={data?.professions?.find((el) => el.id === parseInt(profId!))?.profession_name}
            age={data?.age || '0'}
            address={data?.address || ''} />
          <ProfessionsList>
            <Details open>
              <SummaryColored>Hard skills</SummaryColored>
              <Div>
                <Header3>Hard skills</Header3>
                <TagBox>
                  {data?.hard_skills?.map((el) => (
                    <RoundTagBlock>
                      {el}
                    </RoundTagBlock>
                  ))}
                </TagBox>
              </Div>
              <Div>
                <Header3 style={{ marginTop: '15px' }}>
                  Опыт
                </Header3>
                <P>
                  {data?.professions?.find((el) => el.id === parseInt(profId!))?.experience}
                </P>
              </Div>

            </Details>
            <Details open>
              <SummaryColored>Образование/курсы hard skills</SummaryColored>
              <StudyList>
                {data?.educations?.map((el) => (
                  <StudyListItem>
                    <Header3>{el.organization_name || ''}</Header3>
                    <P>{el.speciality || ''}</P>
                    <P>{el.education_end_year || ''}</P>
                    {el.image && (
                      <LinkContainer>
                        <DocumentIcon />
                        <LinkForFileLoad download href={el.image}>Документ</LinkForFileLoad>
                      </LinkContainer>
                    )}
                  </StudyListItem>
                ))}

              </StudyList>
            </Details>
            <Details open>
              <SummaryColored>Soft skills</SummaryColored>
              <Div>
                <Header3>Soft skills</Header3>
                <TagBox>
                  {data?.soft_skills?.map((el) => (
                    <RoundTagBlock>
                      {el}
                    </RoundTagBlock>
                  ))}

                </TagBox>
              </Div>
              <Div>
                <Header3 style={{ marginTop: '15px' }}>
                  Опыт взаимодействия в команде
                </Header3>
                <P>
                  {data?.team_work_experience || ''}
                </P>
              </Div>
            </Details>
            <Details open>
              <SummaryColored>Тесты soft skills</SummaryColored>
              <StudyList>
                {data?.tests?.map((el) => (
                  <StudyListItem>
                    <Header3>{el.test_name || ''}</Header3>
                    <P>{el.result || ''}</P>
                    {el.image && (
                      <LinkContainer>
                        <DocumentIcon />
                        <LinkForFileLoad download href={el.image}>Документ</LinkForFileLoad>
                      </LinkContainer>
                    )}
                  </StudyListItem>
                ))}

              </StudyList>
            </Details>
          </ProfessionsList>
          {userId === user?.id && (
            <ButtonWrapper>
              <UniversalButton
                onClick={() => navigate(`/create-spec/${profId}`)}
                style={{ alignSelf: 'end' }}
                type='button'
                textColor={Themes[theme].mainTextColor}
                backColor={Themes[theme].mainBg}
                borderColor={Themes[theme].mainButtonColor}
                paddingLeft={44}
                paddingTop={20}>
                Редактировать
              </UniversalButton>
              {' '}
              <UniversalButton
                onClick={deleteProf}
                style={{ alignSelf: 'end' }}
                type='button'
                textColor={Themes[theme].mainBg}
                backColor='#C94420'
                borderColor=''
                paddingLeft={44}
                paddingTop={20}>
                Удалить
              </UniversalButton>
            </ButtonWrapper>
          )}
        </NewBaseSection>
      )
  );
};

export default SpecResume;
