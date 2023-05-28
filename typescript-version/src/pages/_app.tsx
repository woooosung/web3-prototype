import Head from 'next/head'
import { Router } from 'next/router'
import { useRouter } from 'next/router';

import type { AppProps } from 'next/app'

import { useEffect } from 'react';
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
  const router = useRouter()

  useEffect(() => {
    // Perform any necessary client-side initialization or checks here
    if (document.cookie == '') {
      // Redirect to a different page if the cookie is set
      router.push('/pages/login');
    }
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
                <UserLayout>
                    <Component {...pageProps}></Component>
                </UserLayout>
              </ThemeComponent>
            )
          }}
        </SettingsConsumer>
      </SettingsProvider>

    </CacheProvider>
  )
}

export default App
