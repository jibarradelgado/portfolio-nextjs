import { ApolloClient, InMemoryCache } from '@apollo/client'
import { baseUrl } from './config'

const client = new ApolloClient({
  uri: `${baseUrl}/graphql`,
  cache: new InMemoryCache(
    {
      typePolicies: {
        Query: {
          fields: {
            asset: {
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

export default client