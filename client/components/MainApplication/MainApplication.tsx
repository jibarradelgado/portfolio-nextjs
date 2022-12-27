import React, { useEffect, useState } from 'react'
import Layout from '@components/Layout/Layout'
import Menu from '@components/Menu/Menu'
import { Total } from '@components/Total/total'
import { AssetList } from '@components/AssetList/AssetList'
import { AssetFragment, GetAllAssetsFromUserDocument, AssetTypeFragment, GetAllAssetTypesFromUserDocument } from '@service/graphql'
import client from '@service/client'

type UserProps = {
  id: string
  assets: AssetFragment[]
  assetTypes: AssetTypeFragment[]
}

const MainApplication = ({ id, assets, assetTypes }: UserProps) => {
  const [assetData, setAssets] = useState(assets)
  const [assetTypeData, setAssetTypes] = useState(assetTypes)
  const [isAssetsChanged, setAssetsChanged] = useState(false)
  const [isAssetTypesChanged, setAssetTypesChanged] = useState(false)

  useEffect(() => {
    client.query({
      query: GetAllAssetsFromUserDocument,
      variables: {
        where: {userId: Number(id)}
      },
      fetchPolicy: 'network-only'
    }).then ( res => {
      if (res.data) {
        setAssets(res.data.assets)
      }
    })
  }, [isAssetsChanged])

  useEffect(() => {
    client.query({
      query: GetAllAssetTypesFromUserDocument,
      variables: {
        where: {userId: Number(id)}
      },
      fetchPolicy: 'network-only'
    }).then ( res => {
      if (res.data) {
        setAssetTypes(res.data.assetTypes)
      }
    })
  }, [isAssetTypesChanged])

  return (
      <Layout title='Home'>
        <Menu assetTypes={assetTypeData} setAssetsChanged={setAssetsChanged} setAssetTypesChanged={setAssetTypesChanged}/>
        <Total assets={assetData} />
        <AssetList assets={assetData} assetTypes={assetTypeData} setAssetsChanged={setAssetsChanged} />
      </Layout>
  )
}

export default MainApplication