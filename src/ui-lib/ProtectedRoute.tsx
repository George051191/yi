import React, { FC } from 'react';
import styled from 'styled-components';
import { Navigate, Outlet, useLocation } from 'react-router';
import { jwt } from '../api/api';

const ProtectedRoute: FC = () => {
  const location = useLocation();
  return (
    !jwt.test()
      ? <Navigate to='/login' replace state={location.pathname} />
      : <Outlet />

  );
};

export default ProtectedRoute;
