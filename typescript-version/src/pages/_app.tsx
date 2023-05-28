import Head from 'next/head'
import { Router } from 'next/router'
import type { AppProps } from 'next/app'

import { useEffect, useState } from 'react';
import NProgress from 'nprogress'

import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'

import themeConfig from 'src/configs/themeConfig'

import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

import 'react-perfect-scrollbar/dist/css/styles.css'

import '../../styles/globals.css'
import LoginPage from './pages/login'

type ExtendedAppProps = AppProps & {
  Component: any
  emotionCache: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()

if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const [isCookieSet, setIsCookieSet] = useState(false);

  useEffect(() => {
    // Perform any necessary client-side initialization or checks here
    setIsCookieSet(document.cookie !== '');
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Do Not Give Up</title>
        <meta
          name='description'
          content='Do Not Give Up'
        />
      </Head>
      <SettingsProvider>
        <SettingsConsumer>
          {({ settings }) => {
            return (
              <ThemeComponent settings={settings}>
                {!isCookieSet ?
                  <LoginPage />
                :
                  <UserLayout>
                    <Component {...pageProps}></Component>
                  </UserLayout>
                }
              </ThemeComponent>
            )
          }}
        </SettingsConsumer>
      </SettingsProvider>

    </CacheProvider>
  )
}

export default App
