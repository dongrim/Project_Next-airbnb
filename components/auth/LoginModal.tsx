import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import palette from '../../styles/palette';
import Input from '../common/Input';
import Button from '../common/Button';
import CloseXIcon from '../../public/static/svg/modal/modal_close_x_icon.svg';
import MailIcon from '../../public/static/svg/input/mail.svg';
import OpenedEyeIcon from '../../public/static/svg/input/opened_eye.svg';
import ClosedEyeIcon from '../../public/static/svg/input/closed_eye.svg';
import { authActions } from '../../redux/store/authSlice';
import { loginAPI } from '../../lib/api/user';
import { userActions } from '../../redux/store/userSlice';
import useValidateMode from '../hooks/useValidateMode';

const Container = styled.div`
  padding: 15px 20px;
  width: 568px;
  background-color: white;
  z-index: 1;
  border-radius: 10px;
  .login-header {
    height: 56px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .close-x-icon-wrapper {
      transform: scale(0.6);
      width: 55px;
      height: 55px;
      position: absolute;
      left: -15px;
      border-radius: 50%;
      cursor: pointer;
      &:hover {
        background: rgba(180, 180, 180, 0.1);
      }
      .header-close-x-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .login-header-title {
      font-size: 18px;
      font-weight: 600;
    }
  }
  .input-wrapper {
    position: relative;
    margin-bottom: 5px;
  }
  .input-wrapper:nth-child(3) {
    margin-bottom: 10px;
  }
  .input-mail-icon {
    transform: scale(0.9);
  }
  .login-footer {
    border-top: 1px solid ${palette.gray_dd};
    margin-top: 16px;
    margin-bottom: 20px;
    padding-top: 10px;
    font-size: 17px;
    span {
      padding-left: 13px;
      color: ${palette.dark_cyan};
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

interface IProps {
  closeModal: () => void;
}

const LoginModal: React.FC<IProps> = ({ closeModal }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const dispatch = useDispatch();
  const { setValidateMode } = useValidateMode();

  useEffect(() => {
    return () => {
      console.warn('Unmount#2: login-modal');
      setValidateMode(false);
    };
  }, []);

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handlehidePassword = () => {
    setHidePassword(!hidePassword);
  };

  const onSubmitLogin = async (event) => {
    event.preventDefault();
    setValidateMode(true);
    if (email && password) {
      const loginBody = { email, password };
      try {
        const { data } = await loginAPI(loginBody);
        dispatch(userActions.setLoggedUser(data));
        console.log(data);
      } catch (e) {
        console.error(e);
      }
      closeModal();
    }
  };

  return (
    <Container>
      <div className="login-header">
        <div className="close-x-icon-wrapper">
          <CloseXIcon className="header-close-x-icon" onClick={closeModal} />
        </div>
        <div className="login-header-title">Login</div>
      </div>
      <form onSubmit={onSubmitLogin}>
        <div className="input-wrapper">
          <Input
            placeholder="Email Address"
            icon={<MailIcon className="input-mail-icon" />}
            type="email"
            name="email"
            onChange={onChangeEmail}
            value={email}
            useValidation
            isValid={!!email}
            errorMessage="Email is required"
          />
        </div>
        <div className="input-wrapper">
          <Input
            placeholder="Password"
            icon={
              hidePassword ? (
                <ClosedEyeIcon onClick={handlehidePassword} />
              ) : (
                <OpenedEyeIcon onClick={handlehidePassword} />
              )
            }
            type={hidePassword ? 'password' : 'text'}
            name="password"
            onChange={onChangePassword}
            value={password}
            useValidation
            isValid={!!password}
            errorMessage="Password is required"
          />
        </div>
        <Button type="submit" title="Login" bgColor="bittersweet" />
      </form>
      <div className="login-footer">
        Don&apos;t have an account?
        <span role="presentation" onClick={() => dispatch(authActions.setAuthModalMode('signup'))}>
          Sign up
        </span>
      </div>
    </Container>
  );
};

export default LoginModal;
