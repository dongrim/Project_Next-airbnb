import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import styled from 'styled-components';
import AirbnbLogoIcon from '../public/static/svg/logo/logo.svg';
import AirbnbLogoText from '../public/static/svg/logo/logo_text.svg';
import HamburgerIcon from '../public/static/svg/header/hamburger.svg';
import palette from '../styles/palette';
import useModal from './hooks/useModal';
import AuthModal from '../components/auth/AuthModal';
import { useSelector } from '../redux/store';
import { authActions } from '../redux/store/authSlice';
import { logoutAPI } from '../lib/api/user';
import { userActions } from '../redux/store/userSlice';

const Container = styled.div<{ isUsermenuOpened: boolean }>`
  position: sticky;
  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
  z-index: 10;
  .header-logo-wrapper {
    display: flex;
    align-items: center;
    .header-logo {
      margin-right: 6px;
    }
  }
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

  .header-user-profile {
    .header-user-button-wrapper {
      line-height: 100%;
    }
    svg {
      height: 18px;
      user-select: none;
    }
    position: relative;
    display: flex;
    align-items: center;
    height: 42px;
    padding: 0 6px 0 16px;
    border: 0;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
    border-radius: 21px;
    background-color: white;
    cursor: pointer;
    &:hover {
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
    }
    .header-user-profile-image {
      margin-left: 8px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    /* check the below */
    &:hover .header-login-user-dashboard {
      display: block;
    }
  }

  /** react-ouside-click-handler div */
  .header-logo-wrapper + div {
    position: relative;
  }

  .header-usermenu-bridge {
    position: absolute;
    top: 20px;
    left: 10px;
    width: 50px;
    height: 30px;
  }

  .header-usermenu {
    display: none;
    position: absolute;
    top: 40px;
    right: 0px;
    width: 220px;
    padding: 20px 0 10px;
    box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.35);
    border-radius: 6px;
    background-color: white;
    margin-top: 10px;
    color: rgba(0, 0, 0, 0.8);
    li {
      color: ${palette.black};
      width: 100%;
      padding: 10px 0 10px 27px;
      &:hover {
        background-color: ${palette.gray_f7};
        /* text-decoration: underline; */
        color: red;
      }
      &:hover a {
        color: red !important;
      }
    }
    .header-usermenu-divider {
      width: 100%;
      height: 1px;
      margin: 5px 0;
      background-color: ${palette.gray_dd};
    }
  }

  .header-user-profile:hover .header-usermenu {
    /* display: block; */
    display: ${({ isUsermenuOpened }) => (isUsermenuOpened ? 'block' : 'none')};
  }
`;

const Header = () => {
  const { openModal, closeModal, ModalPortal } = useModal();
  const [isUsermenuOpened, setIsUsermenuOpened] = useState(true);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // const authMode = useSelector((state) => state.auth.authMode);

  const handleLogout = async () => {
    try {
      await logoutAPI(); // clear cookie
      dispatch(userActions.initUser());
      setIsUsermenuOpened(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container isUsermenuOpened={isUsermenuOpened}>
      <Link href="/">
        <a className="header-logo-wrapper">
          <AirbnbLogoIcon className="header-logo" />
          <AirbnbLogoText />
        </a>
      </Link>
      {!user.isLogged ? (
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
      ) : (
        <div
          className="header-user-profile" /* onClick={() => setIsUsermenuOpened(!isUsermenuOpened)} */
        >
          <div className="header-user-button-wrapper">
            <HamburgerIcon className="header-login-menu-icon" />
            <img src={user.profileImage} className="header-user-profile-image" alt="user-image" />
          </div>
          {/* {isUsermenuOpened && ( */}
          <>
            <div className="header-usermenu-bridge" />
            <div className="header-usermenu">
              <ul>
                <li>Manage Host</li>
                <li>
                  <Link href="/room/register/building">
                    <a role="presentation" onClick={() => setIsUsermenuOpened(false)}>
                      Add Host
                    </a>
                  </Link>
                </li>
                <div className="header-usermenu-divider" />
                <li role="presentation" onClick={handleLogout}>
                  Logout
                </li>
              </ul>
            </div>
          </>
          {/* )} */}
        </div>
      )}
      <ModalPortal>
        <AuthModal closeModal={closeModal} />
      </ModalPortal>
    </Container>
  );
};

export default Header;
