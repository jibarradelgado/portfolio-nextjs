import React, { useEffect, useState } from 'react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Layout from '@components/Layout/Layout'
import Menu from '@components/Menu/Menu'
import { Total } from '@components/Total/total'
import { AssetList } from '@components/AssetList/AssetList' 
import { Asset, GetAllAssetsFromUserDocument, AssetFragment, AssetType, GetAllAssetTypesFromUserDocument, AssetTypeFragment } from 'service/graphql'
import client from 'service/client'

export const getStaticProps: GetStaticProps<{assets: AssetFragment[], assetTypes: AssetTypeFragment[]}> = async () => {
  try {
    const assetResponse = await client.query({
      query: GetAllAssetsFromUserDocument,
      variables: { where: { userId: 1}}
    })

    if (assetResponse.data.assets == null) {
      throw new Error('Failed to request assets')
    }

    const assets = assetResponse.data.assets as Asset[]

    const assetTypeResponse = await client.query({
      query: GetAllAssetTypesFromUserDocument,
      variables: { where: {userId: 1}}
    })

    if (assetTypeResponse.data.assetTypes == null) {
      throw new Error('Failed to request asset types')
    }

    const assetTypes = assetTypeResponse.data.assetTypes as AssetType[]

    return {
      props: {
        assets,
        assetTypes
      }
    }
  }
  catch (e) {
    console.log(e)
    return {
      props: {
        assets: [],
        assetTypes: []
      }
    }
  }
}

const HomePage = ({assets, assetTypes}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout title='Home'>
      <Menu />
      <Total assets={assets} />
      <AssetList assets={assets} assetTypes={assetTypes} />
    </Layout>
  )
}

export default HomePage