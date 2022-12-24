import React, { useEffect, useState } from 'react'
import Layout from '@components/Layout/Layout'
import Menu from '@components/Menu/Menu'
import { Total } from '@components/Total/total'
import { AssetList } from '@components/AssetList/AssetList'
import { AssetFragment, GetAllAssetsFromUserDocument, AssetTypeFragment, useGetAllAssetTypesFromUserQuery } from '@service/graphql'
import client from '@service/client'

type UserProps = {
  id: string
  assets: AssetFragment[]
  assetTypes: AssetTypeFragment[]
}

const MainApplication = ({ id, assets, assetTypes }: UserProps) => {
  const [assetData, setAssets] = useState(assets)
  const [isAssetsChanged, setAssetsChanged] = useState(false)

  useEffect(() => {
    console.log("I was activated biatch!")
    client.query({
      query: GetAllAssetsFromUserDocument,
      variables: {
        where: {userId: Number(id)}
      },
      fetchPolicy: 'network-only'
    }).then ( res => {
      if (res.data) {
        console.log("I was activated inside!")
        setAssets(res.data.assets)
      }
    })
  }, [isAssetsChanged])

  return (
      <Layout title='Home'>
        <Menu assetTypes={assetTypes} setAssetsChanged={setAssetsChanged}/>
        <Total assets={assetData} />
        <AssetList assets={assetData} assetTypes={assetTypes} setAssetsChanged={setAssetsChanged} />
      </Layout>
  )
}

export default MainApplication