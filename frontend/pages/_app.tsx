import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        src="https://scripts.simpleanalyticscdn.com/latest.js"
        data-collect-dnt="true"
        strategy="afterInteractive"
      />
      <Component {...pageProps} />
    </>
  )
}
