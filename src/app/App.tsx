/* eslint-disable import/no-cycle */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Themes from '../themes';
import HeaderElement from '../ui-lib/widgets/Header';
import FooterElement from '../ui-lib/widgets/Footer';
import { routes, routesForPresentation } from '../constants/routes';
import {
  setIsFullFilled, setTheme, setAppSuccess, openCreateProfessionPopup,
} from '../store/allSlice';
import { useLazyNewGetCurrentUserQuery, jwt } from '../api/api';
import { useSelector, useDispatch } from '../store/store.types';
import ProtectedRoute from '../ui-lib/ProtectedRoute';
import Registration from '../pages/Registration';
import Login from '../pages/Login';
import MainLandingPage from '../pages/MainLandingPage';
import Modal from '../ui-lib/Modal';
import ResponseModal from '../ui-lib/ResponseModal';
import BigImageSlider from '../ui-lib/widgets/BigImageSlider';
import DeleteFolderModal from '../ui-lib/DeleteFolderModal';
import RedactFolderModal from '../ui-lib/RedactFolderModal';
import CreateFolderModal from '../ui-lib/CreateFolderModal';
import { UniversalPopupPlateWithCross } from '../ui-lib/Popup';
import CreateProfessionForm from '../ui-lib/widgets/CreateProfessionForm';
import Breadcrumbs from '../ui-lib/widgets/BreadCrumbs';
import defaultAva from '../assets/dedaultAvaImg.png';

const Main = styled.main<{ isChangedColour: boolean }>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-y: auto;
  background-color: ${({ theme: { mainBg, subMainBg }, isChangedColour }) => (isChangedColour ? subMainBg : mainBg)}; 
  width: 100%;
  align-items: center;
  min-height: calc(100vh - 85px);

`;

const App = () => {
  const [colorState, setColorState] = useState(false);
  const location = useLocation();
  const { theme } = useSelector((state) => state.all);
  const dispatch = useDispatch();
  const {
    isExit,
    isFetchSuccess,
    currentFilter,
    isResponsesModalOpen,
    isBigPopupOpen,
    isDeleteFolderModalOpen,
    isRedactFolderPopupOpen,
    isCreateFolderModalOpen,
    isProfessionCreatePopupOpen,
  } = useSelector((state) => state.all);
  const [getCurrentUser, { data }] = useLazyNewGetCurrentUserQuery();
  const { pathname } = useLocation();
  const getUser = async () => {
    if (jwt.test()) {
      try {
        await getCurrentUser();
      } catch (err) {
        console.log(err);
      }
    }
  };
  const changeColor = () => {
    if (pathname === '/responses' || pathname === '/projects' || pathname === '/all-projects' || pathname === '/team-window') {
      setColorState(true);
      return;
    }
    setColorState(false);
  };
  useEffect(() => {
    changeColor();
  }, [pathname]);

  useEffect(() => {
    if (isFetchSuccess) {
      toast('Данные успешно сохранены', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      dispatch(setAppSuccess(false));
    }
  }, [isFetchSuccess]);

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme) {
      dispatch(setTheme(localTheme as 'light' | 'dark'));
    }
  }, []);

  useEffect(() => {
    getUser();
  }, [isExit, jwt.test()]);

  return (
    <ThemeProvider theme={Themes[theme]}>

      <HeaderElement userAvatar={data?.avatar || defaultAva} isColourChange={colorState} />
      <Main id='main' isChangedColour={colorState}>
        <ToastContainer />
        <React.Suspense>

          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/registration' element={<Registration />} />
            <Route path='/' element={<MainLandingPage />} />
            {routesForPresentation.map(({ path, Component }, index) => (
              <Route key={index} path={path} element={Component} />
            ))}
            {routes.map(({ path, Component }, index) => (
              <Route element={<ProtectedRoute />}>
                <Route key={index} path={path} element={Component} />
              </Route>
            ))}

          </Routes>

        </React.Suspense>
        {isDeleteFolderModalOpen && <Modal><DeleteFolderModal /></Modal>}
        {isResponsesModalOpen && <Modal><ResponseModal /></Modal>}
        {isBigPopupOpen && <Modal><BigImageSlider /></Modal>}
        {isRedactFolderPopupOpen && <Modal><RedactFolderModal /></Modal>}
        {isCreateFolderModalOpen && <Modal><CreateFolderModal /></Modal>}
        {isProfessionCreatePopupOpen
          && (
          <Modal>
            <UniversalPopupPlateWithCross close={() => dispatch(openCreateProfessionPopup(false))}>
              <CreateProfessionForm />
            </UniversalPopupPlateWithCross>

          </Modal>
          )}
      </Main>
      {location.pathname === '/' && <FooterElement />}
    </ThemeProvider>
  );
};

export default App;
