import React, { useEffect, useState } from 'react'
import { AssetFragment, useGetAllAssetsFromUserQuery, AssetTypeFragment, useGetAllAssetTypesFromUserQuery } from '@service/graphql'
import { Loader } from 'semantic-ui-react'
import MainApplication from './MainApplication'

type MainAppProps = {
  id: string
}

const MainAppWrapper = ({id}: MainAppProps) => {
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

  if (assetsQueryResult.loading && assetTypesQueryResult.loading) return <Loader active inline />
  assetsQueryResult.refetch

  return (
    <>
    {assetsQueryResult.data && assetTypesQueryResult.data && <MainApplication id={id} assets={assetsQueryResult.data.assets as AssetFragment[]} assetTypes={assetTypesQueryResult.data.assetTypes as AssetTypeFragment[]} /> }
    </>
  )
}

export default MainAppWrapper