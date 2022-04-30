import type { NextPage } from 'next';
import styled from 'styled-components';

const Container = styled.div`
  background: rgba(20, 80, 70, 0.6);
  width: 100vw;
  max-width: 100%;
  height: calc(100vh - 80px);
  max-height: 100%;
  display: flex;
  justify-content: center;
`;
const Title = styled.h1`
  color: white;
  font-size: 2.2rem;
`;

const Home: NextPage = () => {
  return (
    <Container>
      <Title>Hello, nextJS!</Title>
    </Container>
  );
};

// export async function getServerSideProps() {
//   return {
//     props: {},
//   };
// }

export default Home;
