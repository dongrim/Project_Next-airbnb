import { AppProps } from 'next/app';
import GlobalStyle from '../styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import Header from '../components/Header';
import { wrapper } from '../redux/store';

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Header />
        <Component {...pageProps} />
        <div id="root-modal" />
      </ThemeProvider>
    </>
  );
}

export default wrapper.withRedux(App);

// causing every page in your app to be server-side rendered.
// MyApp.getInitialProps = async (appContext) => {
//   const appProps = await App.getInitialProps(appContext);
//   console.log('getInitailProps!')
//   return { ...appProps }
// }
