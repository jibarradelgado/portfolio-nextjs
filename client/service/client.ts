import { ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { baseUrl } from './config'
import { retrieveToken } from './auth'

const apiLink = createHttpLink({uri: `${baseUrl}/graphql`})

const authLink = setContext(async(_, { headers }) => {
  let extraHeaders = {}

  if (typeof window !== 'undefined') {
    const token = await retrieveToken()
    extraHeaders = {
      Authorization: `Bearer ${token}`
    }
  }

  return {
    headers: {
      ...headers,
      ...extraHeaders
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(apiLink),
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