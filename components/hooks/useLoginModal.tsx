import React from 'react';
import styled from 'styled-components';

const Container = styled.div<{ open: boolean }>`
  position: fixed;
  width: 100%;
  height: 100vh;
  border: 2px solid blue;
  top: 0;
  left: 0;
  display: ${({ open }) => (open ? 'block' : 'none')};
  background-color: rgba(0, 0, 0, 0.61);
  .modal {
    text-align: center;
    width: 430px;
    height: 315px;
    border: 3px solid orange;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: red;
  }
`;

export const UseLoginModal: React.FC<any> = ({ handleOpen }) => {
  return (
    <Container open={handleOpen}>
      <div className="modal">Login modal</div>
    </Container>
  );
};
