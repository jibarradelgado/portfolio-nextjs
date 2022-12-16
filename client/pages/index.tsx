import React, { useEffect, useState } from 'react'
import Layout from '@components/Layout/Layout'
import Menu from '@components/Menu/Menu'
import { Total } from '@components/Total/total'
import { Asset } from '@components/Asset/Asset'
import { useGetAllAssetsQuery } from 'service/graphql'

const HomePage = () => {
  const {data, loading} = useGetAllAssetsQuery()

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