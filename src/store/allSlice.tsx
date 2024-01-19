import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TState = {
  isFullFilled: boolean;
  isColoured: boolean;
  isExit: Date | null;
  isOpenDatalist: boolean;
  theme: 'light' | 'dark';
  isFetchError: boolean;
  isFetchSuccess: boolean;
  filterProfessionValues: string[];
  filterDirectionsValues: string[];
  filterNewFirst: boolean;
  currentFilter: string[];
  isResponsesModalOpen: boolean;
  isBigPopupOpen: boolean;
  currentImages: string[];
  isProfessionCreatePopupOpen: boolean;
  isDeleteFolderModalOpen: boolean;
  isRedactFolderPopupOpen: boolean;
  isCreateFolderModalOpen: boolean;
  folderId: number | null;
  randomArr: any;
};

const initialState: TState = {
  isFullFilled: false,
  isColoured: false,
  isOpenDatalist: false,
  theme: 'light',
  isExit: null,
  isFetchError: false,
  isFetchSuccess: false,
  currentFilter: [],
  filterProfessionValues: [],
  filterDirectionsValues: [],
  filterNewFirst: true,
  isResponsesModalOpen: false,
  isBigPopupOpen: false,
  currentImages: [],
  isDeleteFolderModalOpen: false,
  isProfessionCreatePopupOpen: false,
  isRedactFolderPopupOpen: false,
  folderId: null,
  isCreateFolderModalOpen: false,
  randomArr: [1, 2, 3],
};

const allSlice = createSlice({
  name: 'allSlice',
  initialState,
  reducers: {
    openCreateProfessionPopup: (state, action: PayloadAction<boolean>) => ({
      ...state, isProfessionCreatePopupOpen: action.payload,
    }),
    openFolderCreatePopup: (state, action: PayloadAction<boolean>) => ({
      ...state, isCreateFolderModalOpen: action.payload,
    }),
    openFolderRedactPopup: (state, action: PayloadAction<boolean>) => ({
      ...state, isRedactFolderPopupOpen: action.payload,
    }),
    setFolderId: (state, action: PayloadAction<number>) => ({
      ...state, folderId: action.payload,
    }),
    openFolderDeletePopup: (state, action: PayloadAction<boolean>) => ({
      ...state, isDeleteFolderModalOpen: action.payload,
    }),
    setImgesToSlider: (state, action: PayloadAction<string[]>) => ({
      ...state, currentImages: action.payload,
    }),
    openBigPopup: (state, action: PayloadAction<boolean>) => ({
      ...state, isBigPopupOpen: action.payload,
    }),
    openResponsesModal: (state, action: PayloadAction<boolean>) => ({
      ...state, isResponsesModalOpen: action.payload,
    }),
    setIsFullFilled: (state, action: PayloadAction<boolean>) => ({
      ...state, isFullFilled: action.payload,
    }),
    setButtonColour: (state, action: PayloadAction<boolean>) => ({
      ...state, isColoured: action.payload,
    }),
    closeAllDatalists: (state, action: PayloadAction<boolean>) => ({
      ...state, isColoured: action.payload,
    }),
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => ({
      ...state, theme: action.payload,
    }),
    setDateOfExit: (state, action: PayloadAction<Date>) => ({
      ...state, isExit: action.payload,
    }),
    setAppSuccess: (state, action: PayloadAction<boolean>) => ({
      ...state, isFetchSuccess: action.payload,
    }),
    setAppError: (state, action: PayloadAction<boolean>) => ({
      ...state, isFetchError: action.payload,
    }),
    setDirectionsForFilter: (state, action: PayloadAction<string[]>) => ({
      ...state, filterDirectionsValues: action.payload,
    }),
    setProfessionsForFilter: (state, action: PayloadAction<string[]>) => ({
      ...state, filterProfessionValues: action.payload,
    }),
    setFiltervalue: (state, action: PayloadAction<string[]>) => ({
      ...state, currentFilter: action.payload,
    }),
    setFilteForDates: (state, action: PayloadAction<boolean>) => ({
      ...state, filterNewFirst: action.payload,
    }),
  },
});

const allReducer = allSlice.reducer;
export const {
  setIsFullFilled,
  setButtonColour,
  closeAllDatalists,
  setTheme,
  setDateOfExit,
  setAppSuccess,
  setAppError,
  setFiltervalue,
  openFolderCreatePopup,
  setDirectionsForFilter,
  setProfessionsForFilter,
  setFilteForDates,
  openResponsesModal,
  openBigPopup,
  setImgesToSlider,
  setFolderId,
  openCreateProfessionPopup,
  openFolderRedactPopup,
  openFolderDeletePopup,
} = allSlice.actions;

export default allReducer;
