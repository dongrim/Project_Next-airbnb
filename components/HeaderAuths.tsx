import React from 'react';
import styled from 'styled-components';
import palette from '../styles/palette';
import AuthModal from './auth/AuthModal';
import useModal from './hooks/useModal';
import { useDispatch } from 'react-redux';
import { authActions } from '../redux/store/authSlice';

const Container = styled.div`
  .header-auth-buttons {
    .header-sign-up-button {
      height: 42px;
      margin-right: 8px;
      padding: 0 16px;
      border: 0;
      border-radius: 21px;
      background-color: white;
      cursor: pointer;
      font-weight: 600;
      &:hover {
        background-color: ${palette.gray_eb};
      }
    }
    .header-login-button {
      height: 42px;
      padding: 0 16px;
      border: 0;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
      border-radius: 21px;
      background-color: white;
      cursor: pointer;
      outline: none;
      font-weight: 600;
      /* check the below */
      &:hover + .header-login-user-dashboard {
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
      }
    }
  }
`;

const HeaderAuths = () => {
  const { openModal, closeModal, ModalPortal } = useModal();
  const dispatch = useDispatch();

  return (
    <Container>
      <div className="header-auth-buttons">
        <button
          type="button"
          className="header-sign-up-button"
          onClick={() => {
            dispatch(authActions.setAuthModalMode('signup'));
            openModal();
          }}>
          Sign up
        </button>
        <button
          type="button"
          className="header-login-button"
          onClick={() => {
            dispatch(authActions.setAuthModalMode('login'));
            openModal();
          }}>
          Log in
        </button>
      </div>
      <ModalPortal>
        <AuthModal closeModal={closeModal} />
      </ModalPortal>
    </Container>
  );
};

export default HeaderAuths;
