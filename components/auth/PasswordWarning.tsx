import * as React from 'react';
import styled from 'styled-components';
import GreenCheckIcon from '../../public/static/svg/auth/green_check_icon.svg';
import RedXIcon from '../../public/static/svg/auth/red_x_icon.svg';
import palette from '../../styles/palette';

const Container = styled.div<{ isValid: boolean }>`
  color: ${({ isValid }) => (isValid ? palette.davidson_orange : palette.green)};
  line-height: 100%;
  margin-bottom: 6px;
  svg {
    margin: 0 10px 0 5px;
    transform: scale(0.8);
  }
  .sign-up-modal-password-message {
    font-size: 16px;
    display: inline-block;
  }
`;

interface IProps {
  isValid: boolean;
  message: string;
}

const PasswordWarning: React.FC<IProps> = ({ isValid, message }) => {
  return (
    <Container isValid={isValid}>
      {isValid ? <GreenCheckIcon /> : <RedXIcon />}
      <p className="sign-up-modal-password-message">{message}</p>
    </Container>
  );
};

export default PasswordWarning;
