import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import 'semantic-ui-css/semantic.min.css'
import client from '@service/client'
import '../globals.css'

import AuthProvider from '@store/AuthContext'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider.AuthProvider>
        <Component {...pageProps} />
      </AuthProvider.AuthProvider>
    </ApolloProvider>
  )
}

export default MyApp