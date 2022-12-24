import React from 'react'
import { Asset } from '@components/Asset/Asset'
import { AssetFragment, AssetTypeFragment } from 'service/graphql'
import { Card } from 'semantic-ui-react'

type AssetProps = {
  assets: AssetFragment[]
  assetTypes: AssetTypeFragment[]
  setAssetsChanged: React.Dispatch<React.SetStateAction<boolean>>
}

export const AssetList = ( { assets, assetTypes, setAssetsChanged }: AssetProps ) => {

  const renderList = () => {
    let sum = 0
    if (!assets)
      return (<Card.Group></Card.Group>)

    assets.forEach(asset => sum = asset.value + sum)

    return (
      <Card.Group>
        {
          assets.map(asset => <Asset key={asset && asset.id} asset={asset} assetTypes={assetTypes} percentaje={(asset.value * 100 / sum)} setAssetsChanged={setAssetsChanged} />)
        }
      </Card.Group>
    )
  }

  return (
    renderList()
  )
}