/* eslint-disable max-len */
import { configureStore } from '@reduxjs/toolkit';

import {
  userApi, projectsApi, foldersApi, achievementsApi,
} from '../api/api';
import allReducer from './allSlice';

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
    [foldersApi.reducerPath]: foldersApi.reducer,
    [achievementsApi.reducerPath]: achievementsApi.reducer,
    all: allReducer,
  },
  middleware:
    (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware).concat(projectsApi.middleware).concat(foldersApi.middleware)
      .concat(achievementsApi.middleware),
});

export default store;
