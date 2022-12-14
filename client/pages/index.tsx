import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import Layout from '@components/Layout/Layout'
import Menu from '@components/Menu/Menu'
import { Total } from '@components/Total/total'
import { Asset } from '@components/Asset/Asset'

const query = `
query asset($where: AssetWhereInput) {
	assets(where: $where) {
		id
		name
		value
		userId
		assetTypeId
	}
}
`
const userId = `
  {
    "where": {
      "userId": 1
    }
  }
`

const baseUrl = process.env.NEXT_PUBLIC_SERVICE_URL || 'http://localhost:4000'

const requester = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },

})

const useAssets = () => {
  return useQuery(['assets', userId], async () => {
    const response = await requester.post<{data: any}>('/graphql', {  
      query: query,
      variables: userId
    })
    return response.data.data
  })
}


const HomePage = () => {
  const { data, status } = useAssets()

  console.log({ data, status })

  return (
    <Layout title='Home'>
      <Menu />
      <Total />
      <Asset />
    </Layout>
  )
}

export default HomePage