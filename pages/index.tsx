import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: darkcyan;
  width: 80%;
  height: 120vh;
`;
const Title = styled.h1`
  color: white;
  font-size: 2.2rem;
`;

const Home: React.FC = () => {
  return (
    <Container>
      <Title>hello, nextJS!</Title>
    </Container>
  );
};

export default Home;
