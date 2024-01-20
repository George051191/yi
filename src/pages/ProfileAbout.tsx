import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { clear } from 'idb-keyval';
import {
  ExtendedBlockHeader,
  RoundTagBlock,
  TagBox,
} from '../ui-lib/FormElements';
import NewBaseSection from '../ui-lib/widgets/NewBaseSection';
import NewAvatarWithText from '../ui-lib/widgets/NewAvatarWithText';
import {
  ArrowIconNew,
  DocumentIcon,
} from '../ui-lib/icons';
import {
  TravelsFontMixixn20,
  TravelsFontMixixn30,
  TravelsFontMixixn24,
} from '../constants/fontsConfigs';
import {
  jwt,
  projectsApi,
  useNewGetCurrentUserQuery,
  userApi,
} from '../api/api';
import { Skeleton1 } from '../ui-lib/widgets/Skeleton';
import avatarDefault from '../assets/dedaultAvaImg.png';
import Themes from '../themes';
import { useSelector, useDispatch } from '../store/store.types';
import { UniversalButton } from '../ui-lib/RestyledButtons';
import { Details, Summary, SummaryColored } from '../ui-lib/widgets/Accordeon';

export const ProfessionsList = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-self: flex-start;
`;
export const P = styled.p`
  ${TravelsFontMixixn20}
  color:${({ theme: { mainTextColor } }) => mainTextColor};
  margin: 0;
`;
export const Header3 = styled.h3`
  ${TravelsFontMixixn24}
  font-size: 20px;
  color:${({ theme: { mainTextColor } }) => mainTextColor};
  margin: 0;
`;
export const StudyList = styled.ul`
    display: grid;
    width: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    row-gap: 15px;
    column-gap: 20px;
    grid-template-columns: repeat(2, minmax(340px, 1fr));
    grid-auto-flow: row;
`;
export const StudyListItem = styled.li`
    display: flex;
    flex-direction: column;
    gap: 15px;

`;
export const LinkContainer = styled.div`
  display: flex ;
  gap:5px ;
`;

export const LinkForFileLoad = styled.a`
    color: ${({ theme: { mainTextColor } }) => mainTextColor};
    ${TravelsFontMixixn20}
    text-decoration-line: underline;
    text-transform: uppercase;
    align-self: center;
    cursor: pointer;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 15px;
  align-self: flex-end;
`;

export const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ProfileAbout: FC = () => {
  const { data, error, isLoading } = useNewGetCurrentUserQuery();
  const { theme } = useSelector((state) => state.all);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  /// выход
  const exitFrom = async () => {
    jwt.remove();
    await clear();
    navigate('/');
    dispatch(userApi.util.resetApiState());
    dispatch(projectsApi.util.resetApiState());
  };
  return (
    isLoading ? <Skeleton1 />
      : (
        <NewBaseSection
          goBackFunc={() => navigate('/')}
          title='Личный кабинет'>
          <NewAvatarWithText
            image={data?.avatar || avatarDefault}
            vkLink={data?.vk || ''}
            tgLink={data?.telegram || ''}
            gitLink={data?.github || ''}
            header={data?.full_name || ''}
            age={data?.age || ''}
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

            </Details>
            <Details open>
              <SummaryColored>Образование</SummaryColored>
              <StudyList>
                {data?.educations?.map((el) => (
                  <StudyListItem>
                    <Header3>{el.organization_name}</Header3>
                    <P>{el.speciality}</P>
                    <P>{el.education_end_year}</P>
                    <LinkContainer>
                      <DocumentIcon />
                      <LinkForFileLoad download href={el.image}>Документ</LinkForFileLoad>
                    </LinkContainer>
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
                <P>{data?.team_work_experience}</P>
              </Div>

            </Details>
            <Details open>
              <SummaryColored>Тесты soft skills</SummaryColored>
              <StudyList>
                {data?.tests?.map((el) => (

                  <StudyListItem>
                    <Header3>{el.test_name}</Header3>
                    <P>{el.result}</P>
                    <LinkContainer>
                      <DocumentIcon />
                      <LinkForFileLoad download href={el.image}>Документ</LinkForFileLoad>
                    </LinkContainer>
                  </StudyListItem>

                ))}

              </StudyList>
            </Details>
            {data?.professions?.map((el) => (
              <Details open>
                <SummaryColored>{el.profession_name}</SummaryColored>
                <Div style={{ marginBottom: '15px' }}>
                  <Header3>Уровень</Header3>
                  <P>{el.level}</P>
                </Div>
                <Div style={{ marginBottom: '15px' }}>
                  <Header3>Hard skills</Header3>
                  <TagBox>
                    {el?.hard_skills?.map((item) => (
                      <RoundTagBlock>
                        {item}
                      </RoundTagBlock>
                    ))}

                  </TagBox>
                </Div>
                <Div style={{ marginBottom: '15px' }}>
                  <Header3>Soft skills</Header3>
                  <TagBox>
                    {el?.soft_skills?.map((item) => (
                      <RoundTagBlock>
                        {item}
                      </RoundTagBlock>
                    ))}
                  </TagBox>
                </Div>
                <Div style={{ marginBottom: '15px' }}>
                  <Header3 style={{ marginTop: '15px' }}>
                    Опыт работы

                  </Header3>
                  <P>
                    {el.experience}
                  </P>
                </Div>

              </Details>

            ))}
            <Details open>
              <SummaryColored>Достижения</SummaryColored>
              <StudyList>
                {data?.achievements?.map((el) => (

                  <StudyListItem>
                    <Header3>{el.achievement_name}</Header3>
                    <P>{el.description}</P>
                    <LinkContainer>
                      <DocumentIcon />
                      <LinkForFileLoad download href={el.image}>Документ</LinkForFileLoad>
                    </LinkContainer>
                  </StudyListItem>

                ))}
              </StudyList>
            </Details>
          </ProfessionsList>
          <ButtonWrapper>
            <UniversalButton
              onClick={() => navigate('/profile')}
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
              onClick={() => exitFrom()}
              style={{ alignSelf: 'end' }}
              type='button'
              textColor={Themes[theme].mainBg}
              backColor='#C94420'
              borderColor=''
              paddingLeft={44}
              paddingTop={20}>
              Выйти
            </UniversalButton>
          </ButtonWrapper>
        </NewBaseSection>
      )
  );
};

export default ProfileAbout;
