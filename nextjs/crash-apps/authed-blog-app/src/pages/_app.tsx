import DarkLightProvider from '@/context/darkLight'
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DarkLightProvider>
      <Component {...pageProps} />
    </DarkLightProvider>
  )
}
