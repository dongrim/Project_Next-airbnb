import App, { AppProps, AppContext } from 'next/app';
import GlobalStyle from '../styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import Header from '../components/Header';
import { wrapper } from '../redux/store';
import { cookieStringToObject } from '../lib/utils';
import axios from '../lib/api';

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

function MyApp({ Component, pageProps }: AppProps) {
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

// causing every page in your app to be server-side rendered.
MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const cookieObject: any = cookieStringToObject(appContext.ctx.req?.headers.cookie);
  const accessToken = cookieObject.Authorization.split(' ')[1];
  axios.defaults.headers.common['Authorization'] = accessToken;

  return { ...appProps };
};

export default wrapper.withRedux(MyApp);
