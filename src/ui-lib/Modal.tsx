import React, { FC, ReactNode, useEffect } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import { useDispatch } from '../store/store.types';
import { openResponsesModal } from '../store/allSlice';

const ModalOverlay = styled.div` 
    z-index: 9999999999;
    background-color: rgba(0, 0, 0, 0.30);;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    box-sizing: border-box;
`;
const Modal: FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const modalRoot = document.getElementById('modal-root');
  const openAndClose = (e: any) => {
    if (e.target.id !== 'popup') { return; }
    dispatch(openResponsesModal(false));
  };

  return ReactDOM.createPortal(
    (
      <ModalOverlay id='popup' onClick={(e) => openAndClose(e)}>
        {/*  <Popup id='popup'> */}
        {children}
        {/*   </Popup> */}
      </ModalOverlay>
    ), modalRoot!,
  );
};

export default Modal;
