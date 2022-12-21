import React from 'react'
import { Asset } from '@components/Asset/Asset'
import { AssetFragment, AssetTypeFragment } from 'service/graphql'
import { Card } from 'semantic-ui-react'

type AssetProps = {
  assets: AssetFragment[],
  assetTypes: AssetTypeFragment[]
}

export const AssetList = ( { assets, assetTypes }: AssetProps ) => {

  const renderList = () => {
    let sum = 0
    if (!assets)
      return (<Card.Group></Card.Group>)

    assets.forEach(asset => sum = asset.value + sum)

    return (
      <Card.Group>
        {
          assets.map(asset => <Asset key={asset.id} asset={asset} assetTypes={assetTypes} percentaje={(asset.value * 100 / sum)} />)
        }
      </Card.Group>
    )
  }

  return (
    renderList()
  )
}