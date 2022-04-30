import App, { AppInitialProps } from 'next/app';
import React from 'react';
import GlobalStyle from '../styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import { wrapper } from '../redux/store';
import { cookieStringToObject } from '../lib/utils';
import axios from '../lib/api';
import { meAPI } from '../lib/api/auth';
import { userActions } from '../redux/store/userSlice';

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

class MyApp extends App<AppInitialProps> {
  static getInitialProps = wrapper.getInitialAppProps((store: any) => async (context) => {
    const { isLogged } = store.getState().user; // isLogged: false
    const cookieObject: any = cookieStringToObject(context.ctx.req?.headers.cookie);
    const accessToken = cookieObject.Authorization?.split(' ')[1];

    // sustain login status if verified token exists
    try {
      if (!isLogged && cookieObject.Authorization) {
        axios.defaults.headers.common['Authorization'] = accessToken;
        const { data } = await meAPI();
        console.log('token(getInitialProps): ', data);
        store.dispatch(userActions.setLoggedUser(data)); // isLogged: true
      }
    } catch (e) {
      console.error(e);
    }

    return {
      pageProps: {
        ...(await App.getInitialProps(context)).pageProps,
        pathname: context.ctx.pathname,
      },
    };
  });

  render() {
    const { Component, pageProps } = this.props;

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
}

export default wrapper.withRedux(MyApp);
