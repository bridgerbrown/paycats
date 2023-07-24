import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Noto_Sans_Display } from '@next/font/google'
import { AuthContextProvider } from '@/components/context/AuthContext'

const notoSansDisplay = Noto_Sans_Display({
  subsets: ['cyrillic'],
  weight: ['100', '200', '300', '400', '500'],
  variable: '--font-noto-sans-display',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${notoSansDisplay.variable} font-serif`}>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </main>
  )
}
