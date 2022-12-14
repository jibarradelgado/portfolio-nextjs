import { AppProps } from 'next/app'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import 'semantic-ui-css/semantic.min.css'
import '../globals.css'

const baseUrl = process.env.NEXT_PUBLIC_SERVICE_URL || 'http://localhost:4000'

const client = new ApolloClient({
  uri: `${baseUrl}/graphql`,
  cache: new InMemoryCache(
    {
      typePolicies: {
        Query: {
          fields: {
            avo: {
              read(_, { args, toReference }) {
                return toReference({
                  __typename: 'Asset',
                  userId: args?.userId,
                })
              },
            },
          },
        },
      },
    }
  ),
})

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp