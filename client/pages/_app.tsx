import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import 'semantic-ui-css/semantic.min.css'
import client from '@service/client'
import '../globals.css'

import AuthProvider from '@store/AuthContext'
import CoinProvider from '@store/CoinContext'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider.AuthProvider>
        <CoinProvider.CoinProvider>
          <Component {...pageProps} />
        </CoinProvider.CoinProvider>
      </AuthProvider.AuthProvider>
    </ApolloProvider>
  )
}

export default MyApp