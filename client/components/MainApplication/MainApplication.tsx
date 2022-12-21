import React, { useEffect, useState } from 'react'
import Layout from '@components/Layout/Layout'
import Menu from '@components/Menu/Menu'
import { Total } from '@components/Total/total'
import { AssetList } from '@components/AssetList/AssetList'
import { AssetFragment, useGetAllAssetsFromUserQuery, AssetTypeFragment, useGetAllAssetTypesFromUserQuery } from '@service/graphql'

type UserProps = {
  id: string
}

const MainApplication = ({ id }: UserProps) => {
  const assetsQueryResult = useGetAllAssetsFromUserQuery({
    variables: {
      where: {userId: Number(id)}
    }
  })

  const assetTypesQueryResult = useGetAllAssetTypesFromUserQuery({
    variables: {
      where: {userId: Number(id)}
    }
  })

  if (assetsQueryResult.data && assetTypesQueryResult.data) {
    const assets = assetsQueryResult.data.assets as AssetFragment[]
    const assetTypes = assetTypesQueryResult.data.assetTypes as AssetTypeFragment[]
    return (
      <Layout title='Home'>
        <Menu />
        <Total assets={assets} />
        <AssetList assets={assets} assetTypes={assetTypes} />
      </Layout>
    )
  } else {
    return (
      <Layout title='Home' >
        <Menu />
        There was a problem loading assets
      </Layout>
    )
  }
}

export default MainApplication