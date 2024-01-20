/* eslint-disable radix */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  API_ROOT,
  LOGIN_USER,
  USER,
  VERIFY_EMAIL,
  EDUCATION,
  TESTS,
  SOFT_SKILLS,
  HARD_SKILLS,
  GET_USER,
  PATCH_EXPERT,
  ALL_USERS,
  GIVE_AGREE,
  CREATE_PROJECT,
  GET_MY_PROJECTS,
  GET_ALL_PROJECTS,
  PUBLISH_PROJECT,
  RESPOND_TO_PROJECT,
  INVITE_TO_PROJECT,
  UPDATE_PROJECT,
  APPROVE_TO_PROJECT,
  PROJECT,
  GET_ALL_EXPERTS,
  GET_ACHIEVEMENTS,
} from '../constants/urls';
import {
  TUser,
  TUserCreation,
  TUserLogin,
  TProject,
  TFolder,
  TAchievement,
  TEducation,
  TProfession,
  TTest,
  TAchievementNew,
} from '../types/apiTypes';

/// ///

export const jwt = {
  set: (value: string): void => {
    if (value) {
      localStorage.setItem('JWT', `${value}`);
    } else {
      localStorage.removeItem('JWT');
    }
  },
  get: (): string => {
    const res = localStorage.getItem('JWT');
    return res || '';
  },
  test: (): boolean => !!localStorage.getItem('JWT'),
  remove: (): void => localStorage.removeItem('JWT'),
};

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_ROOT }),
  tagTypes: ['user'],
  endpoints: (build) => ({
    register: build.mutation<TUserCreation, TUserCreation>({
      query: (body) => ({
        url: USER,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['user'],
    }),
    loginUser: build.mutation<{ auth_token: string }, TUserLogin>({
      query: (body) => ({
        url: LOGIN_USER,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['user'],
    }),
    newGetCurrentUser: build.query<TUser, void>({
      query: () => ({
        url: GET_USER,
        method: 'GET',
        headers: {
          Authorization: `Token ${jwt.get()}`,
        },

      }),
      providesTags: ['user'],
    }),
    getUsers: build.query<TUser[], void>({
      query: () => ({
        url: ALL_USERS,
        method: 'GET',
        headers: {
          Authorization: `Token ${jwt.get()}`,
        },

      }),
      providesTags: ['user'],
    }),
    getCurrentUser: build.query<TUser, void>({
      query: () => ({
        url: GET_USER,
        method: 'GET',
        headers: {
          Authorization: `Token ${jwt.get()}`,
        },

      }),
      providesTags: ['user'],
    }),
    newGetUserById: build.query<TUser, number >({
      query: (body) => ({
        url: `/api/users/${body}/`,
        method: 'GET',
        headers: {
          Authorization: `Token ${jwt.get()}`,
        },

      }),
      providesTags: ['user'],
    }),

    /// all education
    createEducation: build.mutation<TEducation, { eduObj: TEducation, userId: number }>({
      query: (body) => ({
        url: `/api/users/${body.userId}/educations/`,
        method: 'POST',
        headers: {
          Authorization: `Token ${jwt.get()}`,
        },
        body: body.eduObj,
      }),
      invalidatesTags: ['user'],
    }),
    updateEducation: build.mutation<TEducation, { eduObj: TEducation, userId: number, eduId: number }>({
      query: (body) => ({
        url: `/api/users/${body.userId}/educations/${body.eduId}/`,
        method: 'PATCH',
        headers: {
          Authorization: `Token ${jwt.get()}`,
        },
        body: body.eduObj,
      }),
    }),
    deleteEducation: build.mutation<void, { userId: number, eduId: number }>({
      query: (body) => ({
        url: `/api/users/${body.userId}/educations/${body.eduId}/`,
        method: 'DELETE',
        headers: {
          Authorization: `Token ${jwt.get()}`,
        },

      }),
      invalidatesTags: ['user'],
    }),
    /// all tests
    createTest: build.mutation<TTest, { eduObj: TTest, userId: number }>({
      query: (body) => ({
        url: `/api/users/${body.userId}/tests/`,
        method: 'POST',
        headers: {
          Authorization: `Token ${jwt.get()}`,
        },
        body: body.eduObj,
      }),
      invalidatesTags: ['user'],
    }),
    updateTest: build.mutation<TTest, { eduObj: TTest, userId: number, eduId: number }>({
      query: (body) => ({
        url: `/api/users/${body.userId}/tests/${body.eduId}/`,
        method: 'PATCH',
        headers: {
          Authorization: `Token ${jwt.get()}`,
        },
        body: body.eduObj,
      }),
      invalidatesTags: ['user'],
    }),
    deleteTest: build.mutation<void, { userId: number, eduId: number }>({
      query: (body) => ({
        url: `/api/users/${body.userId}/tests/${body.eduId}/`,
        method: 'DELETE',
        headers: {
          Authorization: `Token ${jwt.get()}`,
        },

      }),
      invalidatesTags: ['user'],
    }),
    /// all prof
    addProfession: build.mutation<TProfession, { prof:TProfession, userId:number }>({
      query: (body) => ({
        url: `/api/users/${body.userId}/professions/`,
        method: 'POST',
        headers: {
          Authorization: `Token ${jwt.get()}`,
        },
        body: body.prof,
      }),
      invalidatesTags: ['user'],
    }),
    updateProfession: build.mutation<TProfession, { prof:TProfession, userId:number, professionId:number }>({
      query: (body) => ({
        url: `/api/users/${body.userId}/professions/${body.professionId}/`,
        method: 'PATCH',
        headers: {
          Authorization: `Token ${jwt.get()}`,
        },
        body: body.prof,
      }),
      invalidatesTags: ['user'],
    }),
    getProfessionWithId: build.query<TProfession, { userId: number, profId: number }>({
      query: (body) => ({
        url: `/api/users/${body.userId}/professions/${body.profId}/`,
        method: 'GET',
        headers: {
          Authorization: `Token ${jwt.get()}`,
        },

      }),
      providesTags: ['user'],
    }),
    deleteProfession: build.mutation<void, { userId:number, professionId:number }>({
      query: (body) => ({
        url: `/api/users/${body.userId}/professions/${body.professionId}/`,
        method: 'DELETE',
        headers: {
          Authorization: `Token ${jwt.get()}`,
        },
      }),
      invalidatesTags: ['user'],
    }),
    // all achieves
    createAchieve: build.mutation<TAchievementNew, { achieve:TAchievementNew, userId:number }>({
      query: (body) => ({
        url: `/api/users/${body.userId}/achievements/`,
        method: 'POST',
        headers: {
          Authorization: `Token ${jwt.get()}`,
        },
        body: body.achieve,
      }),
      invalidatesTags: ['user'],
    }),
    updateAchieve: build.mutation<TAchievementNew, { achieve:TAchievementNew, userId:number, achieveId:number }>({
      query: (body) => ({
        url: `/api/users/${body.userId}/achievements/${body.achieveId}/`,
        method: 'PATCH',
        headers: {
          Authorization: `Token ${jwt.get()}`,
        },
        body: body.achieve,
      }),
      invalidatesTags: ['user'],
    }),
    deleteAchieve: build.mutation<void, { userId:number, achieveId:number }>({
      query: (body) => ({
        url: `/api/users/${body.userId}/achievements/${body.achieveId}/`,
        method: 'DELETE',
        headers: {
          Authorization: `Token ${jwt.get()}`,
        },
      }),
      invalidatesTags: ['user'],
    }),
    getAllExperts: build.query<TUser[], void>({
      query: () => ({
        url: GET_ALL_EXPERTS,
        method: 'GET',
        headers: {
          Authorization: `Token ${jwt.get()}`,
        },

      }),
      providesTags: ['user'],
    }),
    getUserById: build.query<TUser, number | string>({
      query: (userId) => ({
        url: `${USER}/${userId}`,
        method: 'GET',
        headers: {
          Authorization: `Token ${jwt.get()}`,
        },

      }),
    }),
    changePassword: build.mutation<any, { oldPassword: string, newPassword: string }>({
      query: (body) => ({
        url: 'login/change-password',
        method: 'PATCH',
        headers: {
          Authorization: `Token ${jwt.get()}`,
        },
        body,
      }),
    }),
    updateUser: build.mutation<TUser, TUser>({
      query: (body) => ({
        url: GET_USER,
        method: 'PATCH',
        headers: {
          Authorization: `Token ${jwt.get()}`,
        },
        body,
      }),
      invalidatesTags: ['user'],
    }),
    /// new
    createExpert: build.mutation<TUser, any>({
      query: (body) => ({
        url: GET_USER,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },
        body,
      }),
      invalidatesTags: ['user'],
    }),
    /// отдаю обьект { show: boolean, projectOwnerId: number }
    allowToShowContacts: build.mutation<any, { shown: boolean, projectId: number | string }>({
      query: (body) => ({
        url: GIVE_AGREE,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },
        body,
      }),
    }),
  }),
});

export const foldersApi = createApi({
  reducerPath: 'foldersApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_ROOT }),
  tagTypes: ['folders'],
  endpoints: (build) => ({
    getAchievementsFolders: build.query<TFolder[], void>({
      query: () => ({
        url: GET_ACHIEVEMENTS,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },
      }),
      providesTags: ['folders'],
    }),
    createFolder: build.mutation<TFolder, { name: string }>({
      query: (body) => ({
        url: GET_ACHIEVEMENTS,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },
        body,
      }),
      invalidatesTags: ['folders'],
    }),
    patchFolder: build.mutation<TFolder, { name: string, id: number }>({
      query: (body) => ({
        url: `${GET_ACHIEVEMENTS}${body.id}`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },
        body,
      }),
      invalidatesTags: ['folders'],
    }),
    deleteFolder: build.mutation<TFolder, any>({
      query: (folderId) => ({
        url: `${GET_ACHIEVEMENTS}${folderId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },
      }),
      invalidatesTags: ['folders'],
    }),

  }),
});

export const achievementsApi = createApi({
  reducerPath: 'achievementsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_ROOT }),
  tagTypes: ['achievements'],
  endpoints: (build) => ({
    getCurrentFolderAchievements: build.query<TAchievement[], number | string>({
      query: (id) => ({
        url: `${GET_ACHIEVEMENTS}${id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },
      }),
      providesTags: ['achievements'],
    }),
    getAchievement: build.query<TAchievement, { folderId: number, achievementId: number }>({
      query: (body) => ({
        url: `${GET_ACHIEVEMENTS}${body.folderId}/${body.achievementId}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },
      }),
    }),
    createAchievement: build.mutation<TAchievement, { achievement: any, folderId: number }>({
      query: ({ folderId, ...rest }) => ({
        url: `${GET_ACHIEVEMENTS}${folderId}`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },
        body: rest.achievement,
        /*   formData: true, */
        /* {
          name: rest.achievement.name, files: rest.achievement.images, description: rest.achievement.description, date: rest.achievement.createsAt,
        }, */
      }),
      invalidatesTags: ['achievements'],
    }),
    updateAchievement: build.mutation<TAchievement, { achievement: TAchievement, folderId: number, achieveId: any }>({
      query: (body) => ({
        url: `${GET_ACHIEVEMENTS}${body.folderId}/${parseInt(body.achieveId)}`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },
        body: body.achievement,
        formData: true,
      }),
      invalidatesTags: ['achievements'],
    }),
    deleteAchievement: build.mutation<TAchievement, { achievementId: number, folderId: number }>({
      query: (body) => ({
        url: `${GET_ACHIEVEMENTS}${body.folderId}/${body.achievementId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },
      }),
      invalidatesTags: ['achievements'],
    }),
  }),
});

export const projectsApi = createApi({
  reducerPath: 'projectsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_ROOT }),
  tagTypes: ['project'],
  endpoints: (build) => ({
    createProject: build.mutation<TProject, TProject>({
      query: (body) => ({
        url: CREATE_PROJECT,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },
        body,
      }),
      invalidatesTags: ['project'],
    }),
    updateProject: build.mutation<TProject, TProject>({
      query: (body) => ({
        url: UPDATE_PROJECT,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },
        body,
      }),
      invalidatesTags: ['project'],
    }),
    getAllProjects: build.query<TProject[], void>({
      query: () => ({
        url: GET_ALL_PROJECTS,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },

      }),
      providesTags: ['project'],
    }),
    getAllClosedProjects: build.query<any, void>({
      query: () => ({
        url: '/projects/requestsArchive',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },

      }),
      providesTags: ['project'],
    }),
    getCurrentUserProjects: build.query<TProject[], void>({
      query: () => ({
        url: GET_MY_PROJECTS,
        method: 'GET',
        headers: {
          Authorization: jwt.test() ? `Bearer ${jwt.get()}` : '',
        },

      }),
      providesTags: ['project'],
    }),
    getUserProjectById: build.query<TProject, string | number>({
      query: (id) => ({
        url: `${PROJECT}/${id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },

      }),
      providesTags: ['project'],
    }),
    getInvitedProjects: build.query<TProject[], void>({
      query: () => ({
        url: '/projects/requestsProjects',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },

      }),
      providesTags: ['project'],
    }),
    getAllMyResponses: build.query<{ experts: TUser[], projects: TProject[] }, void>({
      query: () => ({
        url: '/projects/requestsMy',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },

      }),
      providesTags: ['project'],
    }),
    getRespondedUsers: build.query<TProject[], void>({
      query: () => ({
        url: '/projects/requestsExperts',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },

      }),
      providesTags: ['project'],
    }),
    deleteMyResponse: build.mutation<any, { projectId: number, userId: number }>({
      query: (body) => ({
        url: '/projects/denyExpert',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },
        body,
      }),
      invalidatesTags: ['project'],
    }),
    deleteMyContacts: build.mutation<any, { projectId: number, shown: boolean }>({
      query: (body) => ({
        url: '/projects/denyContacts',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },
        body,
      }),
      invalidatesTags: ['project'],
    }),

    deleteProject: build.mutation<any, number>({
      query: (id) => ({
        url: `/projects/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },

      }),
      invalidatesTags: ['project'],
    }),
    getUniversities: build.query<string[], string>({
      query: (name) => ({
        url: `/utils/uni-search?name=${name}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },

      }),
    }),
    /// отдаю обьект { publish: boolean, projectId: number }
    publishProject: build.mutation<any, { publish: boolean, projectId: number | string }>({
      query: (body) => ({
        url: PUBLISH_PROJECT,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },
        body,
      }),
      invalidatesTags: ['project'],
    }),
    /// отдаю обьект { projectId: number }
    respondToProject: build.mutation<any, { projectId: number | string }>({
      query: (body) => ({
        url: RESPOND_TO_PROJECT,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },
        body,
      }),
      invalidatesTags: ['project'],
    }),
    /// отдаю обьект { userId: number, projectId: number }
    inviteToProject: build.mutation<any, { userId: number, projectId: number }>({
      query: (body) => ({
        url: INVITE_TO_PROJECT,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },
        body,
      }),
      invalidatesTags: ['project'],
    }),
    /// отдаю обьект { userId: number, projectId: number, userSpeciality: string, userName: string }
    approveExpert: build.mutation<any, { userId: any, projectId: number, userSpeciality: string, userName: string }>({
      query: (body) => ({
        url: APPROVE_TO_PROJECT,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },
        body,
      }),
      invalidatesTags: ['project'],
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useLoginUserMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useLazyGetCurrentUserQuery,
  useCreateExpertMutation,
  useAllowToShowContactsMutation,
  useLazyGetUserByIdQuery,
  useGetAllExpertsQuery,
  useChangePasswordMutation,
  useNewGetCurrentUserQuery,
  useLazyNewGetCurrentUserQuery,
  useCreateEducationMutation,
  useDeleteEducationMutation,
  useUpdateEducationMutation,
  useCreateTestMutation,
  useUpdateTestMutation,
  useDeleteTestMutation,
  useAddProfessionMutation,
  useUpdateProfessionMutation,
  useGetUsersQuery,
  useGetProfessionWithIdQuery,
  useNewGetUserByIdQuery,
  useDeleteProfessionMutation,
  useCreateAchieveMutation,
  useUpdateAchieveMutation,
  useDeleteAchieveMutation,
} = userApi;

export const {
  useCreateProjectMutation,
  useGetAllProjectsQuery,
  useGetCurrentUserProjectsQuery,
  useApproveExpertMutation,
  useInviteToProjectMutation,
  usePublishProjectMutation,
  useRespondToProjectMutation,
  useUpdateProjectMutation,
  useLazyGetUserProjectByIdQuery,
  useGetInvitedProjectsQuery,
  useLazyGetUniversitiesQuery,
  useDeleteProjectMutation,
  useGetRespondedUsersQuery,
  useGetAllMyResponsesQuery,
  useGetAllClosedProjectsQuery,
  useDeleteMyResponseMutation,
  useDeleteMyContactsMutation,
} = projectsApi;

export const {
  useGetAchievementsFoldersQuery,
  useCreateFolderMutation,
  useDeleteFolderMutation,
  usePatchFolderMutation,
} = foldersApi;

export const {
  useCreateAchievementMutation,
  useDeleteAchievementMutation,
  useGetAchievementQuery,
  useGetCurrentFolderAchievementsQuery,
  useLazyGetCurrentFolderAchievementsQuery,
  useUpdateAchievementMutation,
} = achievementsApi;
