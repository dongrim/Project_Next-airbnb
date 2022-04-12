import React, { useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { userActions } from '../../redux/store/userSlice'
import { commonActions } from '../../redux/store/commonSlice'
import useValidateMode from '../hooks/useValidateMode';

const Container = styled.div`
  padding: 15px 20px;
  width: 568px;
  background-color: white;
  z-index: 11;
  border-radius: 10px;
  .sign-up-header {
    height: 56px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .x-icon-wrapper {
      width: 34px;
      height: 34px;
      left: -5px;
      border-radius: 50%;
      position: absolute;
      z-index: 5;
    }
    .mordal-close-x-icon {
      font-size: 15px;
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

  .input-person-icon {}

  .password-input-warpper {
    svg {
      cursor: pointer;
    }
  }

  .sign-up-birthday-label {
    font-size: 16px;
    font-weight: 600;
    margin: 16px 0 8px;
  }
  .sign-up-modal-birthday-info {
    font-size: 15px;
    line-height: 1.4;
    margin-bottom: 16px;
    color: ${palette.charcoal}
  }

  .sign-up-modal-birthday-select-wrapper{
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
    a {
      padding-left: 5px;
      color: ${palette.dark_cyan};
      text-decoration: underline;
    }
  }
`;

interface FormElements extends HTMLFormElement {
  email: HTMLInputElement;
}
interface FormTarget extends React.FormEvent<HTMLFormElement> {
  target: FormElements;
}

const SignUpModal: React.FC<any> = ({ closeModal }) => {
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

  const onFocusPassword = () => {
    setPasswordFocused(true);
    console.log('onFocusPassword: ', passwordFocused);
  }

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

  const onSubmitSignUp = async (event: FormTarget) => {
    event.preventDefault();
    // setValidateMode(true);
    // dispatch(commonActions.setValidateMode(true));
    setValidateMode(true);
    if (!email || !firstname || !lastname || !password) {
      console.log('form validation invoked!');
      return;
    }
    try {
      const signUpBody = {
        email,
        firstname,
        lastname,
        birth: new Date(`${birthYear}-${birthMonth}-${birthDay}`).toISOString(),
        password: bcrypt.hashSync(event.target.password.value, 8),
        //      ./public/static/image/user/default_user_profile_image.jpg
        profileImage: "/static/image/user/default_user_profile_image.jpg"
      }
      console.log(signUpBody);
      const { data } = await signupAPI(signUpBody);
      dispatch(userActions.setLoggedUser(data));
      closeModal();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Container>
      <div className='sign-up-header'>
        <CloseXIcon className="mordal-close-x-icon" onClick={closeModal} />
        <div className="x-icon-wrapper" />
        <div className='sign-up-header-title'>Sign up</div>
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
              // validateMode={validateMode}
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
                hidePassword ?
                  <ClosedEyeIcon onClick={toggleVisiblePassword} />
                  :
                  <OpenedEyeIcon onClick={toggleVisiblePassword} />
              }
              type={`${hidePassword ? 'password' : 'text'}`}
              name="password"
              value={password}
              onChange={onChangePassword}
              onFocus={onFocusPassword}
              // validateMode={validateMode}
              useValidation
              isValid={!!password}
              errorMessage="Password is required"
            />
            <div>
              <ul>
                <li>
                  <p>Password can not include your name nor email address.</p>
                </li>
                <li>
                  <p>Minimum 8 character at least.</p>
                </li>
                <li>
                  <p>Password must include charactor, number and symbol.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <p className='sign-up-birthday-label'>Birth Day</p>
          <p className='sign-up-modal-birthday-info'>
            By using our Sites, you warrant that you are 18 years of age or older.
            Other users of Airbnb can not see your birthday information.
          </p>
        </div>
        <div className='sign-up-modal-birthday-select-wrapper'>
          <div className='sign-up-modal-birthday-month-select'>
            <Select options={monthList} defaultValue="Month" onChange={onChangeBirthMonth} />
          </div>
          <div className='sign-up-modal-birthday-day-select'>
            <Select options={dayList} defaultValue="Day" onChange={onChangeBirthDay} />
          </div>
          <div className='sign-up-modal-birthday-year-select'>
            <Select options={yearList} defaultValue="Year" onChange={onChangeBirthYear} />
          </div>
        </div>
        <Button title="sign up" />
      </form>
      <div className='sign-up-footer '>
        Do you have account already? <a href="/">Log in</a>
      </div>
    </Container>
  );
};

export default SignUpModal;
