import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';

const Container = styled.div`
    width: 100%;
    height: 46px;

    select {
      width: 100%;
      height: 100%;
      padding: 0 11px;
      border: 1px solid ${palette.gray_eb};
      border-radius: 4px;
      font-size: 16px;
      outline: none;
      -webkit-appearance: none;
      background-image: url("/static/svg/common/select/select_down_arrow.svg");
      background-position: right 11px center;
      background-repeat: no-repeat;
      &:focus {
        border: 2px solid ${palette.black};
      }
    }
`

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: string[];
  value?: string;
}

const Select: React.FC<IProps> = ({ options = [], ...props }) => {
  return (
    <Container>
      <select {...props}>
        <option value={props.defaultValue} disabled>
          {props.defaultValue}
        </option>
        {options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Container>
  );
};

export default Select;