import { AppProps } from 'next/app';
import React, { useState } from 'react';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createCache from '@emotion/cache';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import Router from 'next/router';
import Header from '../components/header';
import { AuthProvider } from '../context/auth';
import { UserCredential } from 'firebase/auth';
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
  applicationId: '53127762-1c75-4696-a716-1004f255c18c',
  clientToken: 'pub97f1ad26340522552a121fd0909f9965',
  site: 'datadoghq.com',
  service: 'mussia14-webclient',
  // Specify a version number to identify the deployed version of your application in Datadog
  // version: '1.0.0',
  sampleRate: 100,
  trackInteractions: true,
  defaultPrivacyLevel: 'mask-user-input',
});

datadogRum.startSessionReplayRecording();

export function createEmotionCache() {
  return createCache({ key: 'css' });
}

// Create a theme instance.
export const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});

const clientSideEmotionCache = createEmotionCache();

const queryClient = new QueryClient();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp: React.FC<AppProps> = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [user, setUser] = useState<UserCredential>(null);

  // console.log('pageProps.protected', pageProps);
  // console.log('props', props);
  // console.log('user', user);
  if (pageProps.protected && !user) {
    // return <div>Loading...</div>;
    // Router.push('/login');
  }

  if (
    pageProps.protected &&
    user &&
    pageProps.userTypes
    // pageProps.userTypes.indexOf(user.type) === -1
  ) {
    // return <div>Sorry, you do not have access</div>;
  }

  return (
    <>
      <Head>
        <title>My pages</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <AuthProvider user={user} setUser={setUser}>
            <CacheProvider value={emotionCache}>
              <CssBaseline />
              <Header />
              <Component {...pageProps} />
            </CacheProvider>
          </AuthProvider>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default MyApp;
