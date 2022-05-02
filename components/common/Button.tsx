import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';

const Container = styled.div<{ bgColor: string }>`
  width: 100%;
  height: 43px;

  button {
    width: 100%;
    height: 100%;
    border: 1px solid ${palette.gray_eb};
    border-radius: 4px;
    background: ${({ bgColor }) => palette[bgColor]};
    text-transform: capitalize;
    font-size: 19px;
    color: white;
    cursor: pointer;
    &:hover {
      filter: grayscale(10%);
    }
  }
`;

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  bgColor: string;
}

const Button: React.FC<IProps> = ({ title, bgColor, ...props }) => {
  return (
    <Container bgColor={bgColor}>
      <button {...props}>{title}</button>
    </Container>
  );
};

// export default Button;
export default React.memo(Button);
