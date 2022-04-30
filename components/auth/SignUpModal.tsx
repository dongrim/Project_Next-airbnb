import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Input from '../common/Input';
import CloseXIcon from '../../public/static/svg/modal/modal_close_x_icon.svg';
import MailIcon from '../../public/static/svg/input/mail.svg';
import PersonIcon from '../../public/static/svg/input/person.svg';
import OpenedEyeIcon from '../../public/static/svg/input/opened_eye.svg';
import ClosedEyeIcon from '../../public/static/svg/input/closed_eye.svg';
import Select from '../common/Select';
import { monthList, dayList, yearList } from '../../lib/staticData';
import palette from '../../styles/palette';
import Button from '../common/Button';
import { signupAPI } from '../../lib/api/user';
import bcrypt from 'bcryptjs';
import { userActions } from '../../redux/store/userSlice';
// import { commonActions } from '../../redux/store/commonSlice'
import useValidateMode from '../hooks/useValidateMode';
import PasswordWarning from './PasswordWarning';
import { authActions } from '../../redux/store/authSlice';

const Container = styled.div`
  padding: 15px 20px;
  width: 568px;
  background-color: white;
  z-index: 1;
  border-radius: 10px;
  .sign-up-header {
    height: 56px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .x-icon-wrapper {
      width: 34px;
      height: 34px;
      left: -5px;
      border-radius: 50%;
      position: absolute;
      z-index: 5;
    }
    .header-close-x-icon {
      cursor: pointer;
      position: absolute;
      left: 0;
      transform: scale(0.6);
      z-index: 6;
      &:hover + .x-icon-wrapper {
        background: rgba(180, 180, 180, 0.1);
      }
    }
    .sign-up-header-title {
      font-size: 18px;
      font-weight: 600;
    }
  }

  .input-wrapper {
    position: relative;
    margin-bottom: 16px;
  }

  .input-mail-icon {
    transform: scale(0.9);
  }

  .input-person-icon {
  }

  .password-input-warpper {
    svg {
      cursor: pointer;
    }
  }

  .sign-up-birthday-label {
    font-size: 16px;
    font-weight: 600;
    margin: 30px 0 8px;
  }
  .sign-up-modal-birthday-info {
    font-size: 15px;
    line-height: 1.4;
    margin-bottom: 16px;
    color: ${palette.charcoal};
  }

  .sign-up-modal-birthday-select-wrapper {
    display: flex;
    margin-bottom: 24px;
    select {
      &:focus {
        border: 2px solid ${palette.black};
      }
    }
    .sign-up-modal-birthday-month-select {
      margin-right: 16px;
      flex: 1;
    }
    .sign-up-modal-birthday-day-select {
      margin-right: 16px;
      flex: 1;
    }
    .sign-up-modal-birthday-year-select {
      flex: 1;
    }
  }

  .sign-up-footer {
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

interface FormElements extends HTMLFormElement {
  email: HTMLInputElement;
}

interface FormTarget extends React.FormEvent<HTMLFormElement> {
  target: FormElements;
}

interface IProps {
  closeModal: () => void;
}

const SignUpModal: React.FC<IProps> = ({ closeModal }) => {
  const [email, setEmail] = useState<string>('');
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [birthMonth, setBirthMonth] = useState<string>('');
  const [birthDay, setBirthDay] = useState<string>('');
  const [birthYear, setBirthYear] = useState<string>('');
  // const [validateMode, setValidateMode] = useState<boolean>(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const dispatch = useDispatch();
  const { setValidateMode } = useValidateMode();

  useEffect(() => {
    return () => {
      console.warn('Unmount#1: signup-modal');
      setValidateMode(false);
    };
  }, []);

  const isPasswordHasNameOrEmail = useMemo(
    () =>
      !(
        !password ||
        !lastname ||
        password.includes(lastname) ||
        password.includes(email.split('@')[0])
      ),
    [password, lastname, email],
  );
  const PASSWORD_MIN_LENGTH = 8;
  const isPasswordOverMinLength = useMemo(() => password.length >= PASSWORD_MIN_LENGTH, [password]);
  const isPasswordHasNumberOrSymbol = useMemo(() => {
    const reg_symbol = /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g;
    const reg_number = /[0-9]/g;
    return reg_symbol.test(password) && reg_number.test(password);
  }, [password]);

  const onFocusPassword = () => {
    setPasswordFocused(true);
  };

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const onChangeFirstname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstname(event.target.value);
  };
  const onChangeLastname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(event.target.value);
  };
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const toggleVisiblePassword = () => {
    setHidePassword(!hidePassword);
  };
  const onChangeBirthMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthMonth(event.target.value);
  };
  const onChangeBirthDay = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthDay(event.target.value);
  };
  const onChangeBirthYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthYear(event.target.value);
  };

  const validateSignUpForm = () => {
    if (!email || !firstname || !lastname || !password) {
      return false;
    }
    if (!isPasswordHasNameOrEmail || !isPasswordOverMinLength || !isPasswordHasNumberOrSymbol) {
      return false;
    }
    if (!birthMonth || !birthDay || !birthYear) {
      return false;
    }
    return true;
  };

  const onSubmitSignUp = async (event: FormTarget) => {
    event.preventDefault();
    // setValidateMode(true);
    // dispatch(commonActions.setValidateMode(true));
    setValidateMode(true);

    if (validateSignUpForm()) {
      try {
        const signUpBody = {
          email,
          firstname,
          lastname,
          birth: new Date(`${birthYear}-${birthMonth}-${birthDay}`).toISOString(),
          password: bcrypt.hashSync(event.target.password.value, 8),
          //      ./public/static/image/user/default_user_profile_image.jpg
          profileImage: '/static/image/user/default_user_profile_image.jpg',
        };
        const { data } = await signupAPI(signUpBody);
        dispatch(userActions.setLoggedUser(data));
      } catch (e) {
        console.error(e);
      }
      closeModal();
    }
  };

  return (
    <Container>
      <div className="sign-up-header">
        <CloseXIcon className="header-close-x-icon" onClick={closeModal} />
        <div className="x-icon-wrapper" />
        <div className="sign-up-header-title">Sign up</div>
      </div>
      <form onSubmit={onSubmitSignUp}>
        <div>
          <div className="input-wrapper">
            <Input
              placeholder="Email Address"
              icon={<MailIcon className="input-mail-icon" />}
              type="email"
              name="email"
              value={email}
              onChange={onChangeEmail}
              // validateMode={validateMode} // hooks > useValidateMode.tsx
              useValidation
              isValid={!!email}
              errorMessage="Email is required"
            />
          </div>
          <div className="input-wrapper">
            <Input
              placeholder="First Name"
              icon={<PersonIcon className="input-person-icon" />}
              type="text"
              name="firstname"
              value={firstname}
              onChange={onChangeFirstname}
              // validateMode={validateMode}
              useValidation
              isValid={!!firstname}
              errorMessage="First Name is required"
            />
          </div>
          <div className="input-wrapper">
            <Input
              placeholder="Last Name"
              icon={<PersonIcon className="input-person-icon" />}
              type="text"
              name="lastname"
              value={lastname}
              onChange={onChangeLastname}
              // validateMode={validateMode}
              useValidation
              isValid={!!lastname}
              errorMessage="Last Name is required"
            />
          </div>
          <div className="input-wrapper password-input-warpper">
            <Input
              placeholder="Password"
              icon={
                hidePassword ? (
                  <ClosedEyeIcon onClick={toggleVisiblePassword} />
                ) : (
                  <OpenedEyeIcon onClick={toggleVisiblePassword} />
                )
              }
              type={`${hidePassword ? 'password' : 'text'}`}
              name="password"
              value={password}
              onChange={onChangePassword}
              // validateMode={validateMode}
              useValidation
              // isValid={!!password}
              isValid={
                isPasswordHasNameOrEmail && isPasswordOverMinLength && isPasswordHasNumberOrSymbol
              }
              errorMessage="Password is required"
              onFocus={onFocusPassword}
            />
            {passwordFocused && (
              <>
                <PasswordWarning
                  isValid={isPasswordHasNameOrEmail}
                  message="Must not contain name or email."
                />
                <PasswordWarning
                  isValid={isPasswordOverMinLength}
                  message="Must be a minimum 8 characters."
                />
                <PasswordWarning
                  isValid={isPasswordHasNumberOrSymbol}
                  message="Must contain letters, numbers and symbols."
                />
              </>
            )}
          </div>
        </div>
        <div>
          <p className="sign-up-birthday-label">Birth Day</p>
          <p className="sign-up-modal-birthday-info">
            By using our Sites, you warrant that you are 18 years of age or older. Other users of
            Airbnb can not see your birthday information.
          </p>
        </div>
        <div className="sign-up-modal-birthday-select-wrapper">
          <div className="sign-up-modal-birthday-month-select">
            <Select
              options={monthList}
              defaultValue="Month"
              onChange={onChangeBirthMonth}
              isValid={!!birthMonth}
            />
          </div>
          <div className="sign-up-modal-birthday-day-select">
            <Select
              options={dayList}
              defaultValue="Day"
              onChange={onChangeBirthDay}
              isValid={!!birthDay}
            />
          </div>
          <div className="sign-up-modal-birthday-year-select">
            <Select
              options={yearList}
              defaultValue="Year"
              onChange={onChangeBirthYear}
              isValid={!!birthYear}
            />
          </div>
        </div>
        <Button type="submit" title="sign up" bgColor="bittersweet" />
      </form>
      <div className="sign-up-footer ">
        Do you have account already?
        <span role="presentation" onClick={() => dispatch(authActions.setAuthModalMode('login'))}>
          Log in
        </span>
      </div>
    </Container>
  );
};

export default SignUpModal;
