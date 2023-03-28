import Layout1 from '@/components/Layout1'
import DarkLightProvider from '@/context/darkLight'
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic';
import { NotificationsProvider } from 'reapop';
import {SessionProvider} from 'next-auth/react';
import AuthWrapper from '@/components/AuthWrapper';

const MyClientNotification = dynamic(() => import('../components/Notifcations'), {
  ssr: false
})

export default function App({ Component, pageProps:{session, ...pageProps} }: AppProps) {


  return (
    <DarkLightProvider>
      <NotificationsProvider>
        <MyClientNotification />
        <SessionProvider session={session}>
          <Layout1>
            {
              (Component as any)?.myAuthInfo ? <AuthWrapper authInfo={(Component as any).myAuthInfo}><Component {...pageProps} /></AuthWrapper> : <Component {...pageProps} />
            }
          </Layout1>
        </SessionProvider>
      </NotificationsProvider>
    </DarkLightProvider>
  )
}
