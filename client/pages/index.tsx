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

const HomePage = () => {
  const [items, setItems] = useState([])

  console.log(items)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVICE_URL}/graphql`, 
          {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query
          }),
        })

        const { data } = (await response.json()) as { data: any }
        setItems(data)
      } catch (e) {
        console.log('Something went wrong', e)
      }
    }
    fetchItems()
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