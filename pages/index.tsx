import type { NextPage } from 'next';
import styled from 'styled-components';

const Container = styled.div`
  background: rgba(20, 80, 70, 0.6);
  width: 80%;
  height: 120vh;
`;
const Title = styled.h1`
  color: white;
  font-size: 2.2rem;
`;

const Home: NextPage = () => {
  return (
    <Container>
      <Title>hello, nextJS!</Title>
    </Container>
  );
};

export default Home;
