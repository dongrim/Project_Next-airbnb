import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import HamburgerIcon from '../public/static/svg/header/hamburger.svg';
import palette from '../styles/palette';
import { logoutAPI } from '../lib/api/user';
import { userActions } from '../redux/store/userSlice';
import { useSelector } from '../redux/store';

const Container = styled.div<{ isUsermenuOpened: boolean }>`
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
  }
`;

const HeaderUserProfile: React.FC = () => {
  const [isUsermenuOpened, setIsUsermenuOpened] = useState(true);

  // useSelector((state: RootState) => state.user)
  const { profileImage } = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
      <div
        className="header-user-profile" /* onClick={() => setIsUsermenuOpened(!isUsermenuOpened)} */
      >
        <div className="header-user-button-wrapper">
          <HamburgerIcon className="header-login-menu-icon" />
          <img src={profileImage} className="header-user-profile-image" alt="user-image" />
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
    </Container>
  );
};

export default HeaderUserProfile;
