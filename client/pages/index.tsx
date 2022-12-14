import React, { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import Layout from '@components/Layout/Layout'
import Menu from '@components/Menu/Menu'
import { Total } from '@components/Total/total'
import { Asset } from '@components/Asset/Asset'

const assetFragment = `
		id
		name
		value
		userId
		assetTypeId
`
const userId = `
  {
    "where": {
      "userId": 1
    }
  }
`

const baseUrl = process.env.NEXT_PUBLIC_SERVICE_URL || 'http://localhost:4000'

const useAssets = () => {
  const query = gql`
    query {
      assets {
        ${assetFragment}
      }
    }
  `
  return useQuery(query)
}


const HomePage = () => {
  const { data, loading } = useAssets()

  console.log({ data, loading })

  return (
    <Layout title='Home'>
      <Menu />
      <Total />
      <Asset />
    </Layout>
  )
}

export default HomePage