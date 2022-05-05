import React from 'react';
import styled, { css } from 'styled-components';
import WarningIcon from '../../public/static/svg/common/select/warning.svg';
import palette from '../../styles/palette';
import useValidateMode from '../hooks/useValidateMode';

const NormalSelectStyle = css<SelectorContainerProps>`
  width: 100%;
  height: 46px;

  select {
    height: 100%;
    border: 1px solid ${palette.gray_eb};
    border-radius: 4px;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    background-image: url('/static/svg/common/select/select_down_arrow.svg');
    background-position: right 11px center;
    background-repeat: no-repeat;
    font-size: 16px;
    &:focus {
      /* border: 2px solid ${palette.dark_cyan} !important; */
    }
  }
`;

const RegisterSelectStyle = css`
  width: 100%;

  label {
    /* position: relative; */
    margin-bottom: 80px !important;
  }
  span {
    //
  }

  select {
    height: 52px;
    border-radius: 8px;
    /* padding: 0 14px 0 12px; */
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    background-image: url('/static/svg/common/select/register_selector_down_arrow.svg');
    background-position: right 11px center;
    background-repeat: no-repeat;
    font-size: 18px;
  }
`;

interface SelectorContainerProps {
  isValid: boolean;
  validateMode: boolean;
  type: 'normal' | 'register';
}

const Container = styled.div<SelectorContainerProps>`
  ${({ type }) => type === 'normal' && NormalSelectStyle}
  ${({ type }) => type === 'register' && RegisterSelectStyle}

  select {
    // border: ${({ isValid }) => (isValid ? `` : `2px solid ${palette.orange}`)};
    ${({ validateMode, isValid }) => {
      if (validateMode) {
        // @check
        if (!isValid) {
          return css`
            border-color: ${palette.tawny};
            background-color: ${palette.snow};
          `;
        }
        return css`
          border-color: ${palette.dark_cyan};
        `;
      }
      return undefined;
    }}

    width: 100%;
    padding: 0 11px;
    /* border: 1px solid ${palette.gray_eb}; */

    &:disabled {
      background-image: url('/static/svg/common/select/disabled_register_selector_down_arrow.svg');
      background-color: ${palette.gray_f7};
      border-color: ${palette.gray_e5};
      color: ${palette.gray_e5};
      cursor: not-allowed;
    }
  }

  .select-warning {
    margin-top: 6px;
    display: flex;
    align-items: center;
    svg {
      margin-right: 4px;
    }
    p {
      font-size: 12px;
      color: ${palette.davidson_orange};
    }
  }
`;

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: string[];
  isValid?: boolean;
  useValidation?: boolean;
  errorMessage?: string;
  type?: 'normal' | 'register';
  disabledOptions?: string[];
}

const Select: React.FC<IProps> = ({
  label,
  options = [],
  isValid,
  useValidation,
  errorMessage = 'Required',
  type = 'normal',
  disabledOptions = [],
  ...props
}) => {
  const { validateMode } = useValidateMode();
  return (
    // <Container type={type} isValid={isValid || !validateMode}>
    <Container
      isValid={!!isValid}
      // @check !validateMode => validateMode
      validateMode={(useValidation as boolean) && !validateMode}
      type={type}>
      {label && <label htmlFor="mySelect">{label}</label>}
      <select name="mySelect" {...props}>
        {/*   */}
        <option value={props.defaultValue} disabled>
          {props.defaultValue}
        </option>
        {options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
      {useValidation && !isValid && !validateMode && (
        <div className="select-warning">
          <WarningIcon />
          <p>{errorMessage}</p>
        </div>
      )}
    </Container>
  );
};

// export default Select;
export default React.memo(Select);
