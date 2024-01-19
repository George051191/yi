import React from 'react';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';

const MyToast = styled(ToastContainer)<{ isSuccess:boolean }>`
    .Toastify__toast-container {
        background-color: ${({ isSuccess }) => (isSuccess ? 'green' : 'red')};

}
`;

export default MyToast;
