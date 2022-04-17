import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../styles/palette';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../redux/store/index';
import useValidateMode from '../hooks/useValidateMode';

type InputContainerProps = {
  iconExist: boolean;
  useValidation: boolean;
  isValid: boolean;
};

const Container = styled.div<InputContainerProps>`
  label {
    span {
      display: block;
      margin-bottom: 8px;
    }
  }
  input {
    position: relative;
    width: 100%;
    height: 46px;
    padding: ${({ iconExist }) => (iconExist ? '0 44px 0 11px' : '0 11px')};
    border: 1px solid ${palette.gray_eb};
    border-radius: 4px;
    font-size: 16px;
    outline: none;
    margin-bottom: 15px;
    &::placeholder {
      color: ${palette.gray_76};
    }
    &:focus {
      border: 2px solid ${palette.black};
    }
  }
  .input-icon-wrapper {
    position: absolute;
    top: 11px;
    right: 13px;
  }
  .input-error-message {
    margin-left: 4px;
    font-weight: 600;
    font-size: 14px;
    color: ${palette.tawny};
    position: absolute;
    top: 48px;
  }
  ${({ useValidation, isValid }) =>
    useValidation &&
    !isValid &&
    css`
      input {
        background-color: ${palette.snow};
        border: 2px solid ${palette.orange};
      }
    `};
  ${({ useValidation, isValid }) =>
    useValidation &&
    isValid &&
    css`
      input {
        border: 2px solid ${palette.dark_cyan};
      }
    `};
`;

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: JSX.Element;
  // validateMode: boolean;
  useValidation: boolean;
  isValid: boolean;
  errorMessage: string;
}

const Input: React.FC<IProps> = ({
  icon,
  // validateMode,
  useValidation,
  isValid,
  errorMessage,
  ...props
}) => {
  // const validateMode = useSelector((state: RootState) => state.common.validateMode);
  const { validateMode } = useValidateMode();

  return (
    <Container iconExist={!!icon} useValidation={validateMode && useValidation} isValid={isValid}>
      <input {...props} />
      <div className="input-icon-wrapper">{icon}</div>
      {useValidation && validateMode && !isValid && errorMessage && (
        <p className="input-error-message">{errorMessage}</p>
      )}
    </Container>
  );
};

export default Input;
