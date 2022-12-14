import { AppProps } from 'next/app'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { ReactQueryDevtools } from 'react-query/devtools'
import 'semantic-ui-css/semantic.min.css'
import '../globals.css'

const baseUrl = process.env.NEXT_PUBLIC_SERVICE_URL || 'http://localhost:4000'

const client = new ApolloClient({
  uri: `${baseUrl}\graphql`,
  cache: new InMemoryCache(),
})

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </ApolloProvider>
  )
}

export default MyApp