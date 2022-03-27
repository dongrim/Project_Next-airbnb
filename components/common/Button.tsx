import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';

const Container = styled.div`
  width: 100%;
  height: 43px;

  button {
    width: 100%;
    height: 100%;
    border: 1px solid ${palette.gray_eb};
    border-radius: 4px;
    background: ${palette.bittersweet};
    text-transform: capitalize;
    font-size: 19px;
    color: white;
    cursor: pointer;
    &:hover {
      filter: grayscale(10%);
    }
  }
`;


const Button: React.FC<any> = ({ title, ...props }) => {
  return (
    <Container>
      <button {...props}>{title}</button>
    </Container>
  );
};

export default Button;