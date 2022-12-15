import React, { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import Layout from '@components/Layout/Layout'
import Menu from '@components/Menu/Menu'
import { Total } from '@components/Total/total'
import { Asset } from '@components/Asset/Asset'
import { useGetAllAssetsQuery } from 'service/graphql'

const assetFragment = `
		id
		name
		value
		userId
		assetTypeId
`

const useAssets = () => {
  const query = gql`
    query getAllAssets {
      assets {
        ${assetFragment}
      }
    }
  `
  return useQuery(query)
}

const useAsset = (userId: number | string) => {
  const query = gql`
    query getAsset($where: AssetWhereInput) {
      assets (where: $where) {
        ${assetFragment}
      }
    }
  `

  return useQuery(query, {variables: {where: {userId: userId}}})
}


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