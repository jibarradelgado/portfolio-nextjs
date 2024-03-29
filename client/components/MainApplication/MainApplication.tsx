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
  const [sort, setSort] = useState('value')
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
        let assets = [...res.data.assets] as AssetFragment[]
        sortAssets(assets, sort)
        setAssets(assets)
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

  useEffect(() => {
    sortAssets(assetData, sort)
  }, [sort])

  const sortAssets = (assets: AssetFragment[], sort: String) => {
    console.log(sort)
    if (assets && sort) {
      switch(sort) {
        case 'type' :
          assets.sort((a, b) => a.assetTypeId - b.assetTypeId)
          break
        case 'name':
          assets.sort((a, b) => a.name.localeCompare(b.name))
          break
        case 'value':
          assets.sort((a, b) => b.value - a.value)
          break
      }
      setAssets([...assets])
    }
  }

  return (
      <Layout title='Home'>
        <Menu assetTypes={assetTypeData} setAssetsChanged={setAssetsChanged} setAssetTypesChanged={setAssetTypesChanged}/>
        <Total assets={assetData} />
        <AssetList assets={assetData} assetTypes={assetTypeData} setSort={setSort} setAssetsChanged={setAssetsChanged} />
      </Layout>
  )
}

export default MainApplication