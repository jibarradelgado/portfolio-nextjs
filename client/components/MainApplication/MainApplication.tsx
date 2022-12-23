import React, { useEffect, useState } from 'react'
import Layout from '@components/Layout/Layout'
import Menu from '@components/Menu/Menu'
import { Total } from '@components/Total/total'
import { AssetList } from '@components/AssetList/AssetList'
import { AssetFragment, useGetAllAssetsFromUserQuery, AssetTypeFragment, useGetAllAssetTypesFromUserQuery } from '@service/graphql'

type UserProps = {
  id: string
  assets: AssetFragment[]
  assetTypes: AssetTypeFragment[]
}

const MainApplication = ({ id, assets, assetTypes }: UserProps) => {
  const [assetData, setAssets] = useState(assets)
  return (
      <Layout title='Home'>
        <Menu assetTypes={assetTypes}/>
        <Total assets={assetData} />
        <AssetList assets={assetData} assetTypes={assetTypes} />
      </Layout>
  )
}

export default MainApplication