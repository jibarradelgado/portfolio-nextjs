import React, { useEffect, useState } from 'react'
import Layout from '@components/Layout/Layout'
import Menu from '@components/Menu/Menu'
import { Total } from '@components/Total/total'
import { Asset } from '@components/Asset/Asset'

const query = `
query {
	assets {
		id
		name
		value
		userId
		assetTypeId
	}
}
`

const baseUrl = process.env.NEXT_PUBLIC_SERVICE_URL || 'http://localhost:4000'

const requester = (endpoint?:string, data?: Record<string, number | string>) =>
fetch(
  `${baseUrl}${endpoint}`, 
  {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})

const useAssets = () => {
  const [data, setData] = useState([])
  const [status, setStatus] = useState<
    'success' | 'loading' | 'error' | 'idle'
  >('idle')

  useEffect(() => {
    const fetchData = async () => {
      setStatus('loading')
      try {
        const response = await requester('/graphql', {query})
        const { data } = (await response.json()) as { data: any }
        setData(data)
        setStatus('success')
      } catch (e) {
        setStatus('error')
        console.log('Something went wrong', e)
      }
    }
    fetchData()
  }, [])

  return {
    data,
    status,
  }
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