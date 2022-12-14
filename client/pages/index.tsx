import React, { useEffect } from 'react'
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

const HomePage = () => {
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVICE_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query
      })
    })
  }, [])

  return (
    <Layout title='Home'>
      <Menu />
      <Total />
      <Asset />
    </Layout>
  )
}

export default HomePage