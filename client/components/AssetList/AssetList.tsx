import React, { useState, useEffect} from 'react'
import { Asset } from '@components/Asset/Asset'
import { AssetFragment, AssetTypeFragment } from 'service/graphql'
import { Card } from 'semantic-ui-react'

type AssetProps = {
  assets: AssetFragment[]
  assetTypes: AssetTypeFragment[]
  setAssetsChanged: React.Dispatch<React.SetStateAction<boolean>>
}

export const AssetList = ( { assets, assetTypes, setAssetsChanged }: AssetProps ) => {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)

    return () => { window.removeEventListener('resize', handleResize)}
  })

  const renderList = () => {
    let sum = 0
    if (!assets)
      return (<Card.Group></Card.Group>)

    assets.forEach(asset => sum = asset.value + sum)

    return (
      <Card.Group itemsPerRow={width > 1200 ? 4 : width > 750 ? 3 : width > 490 ? 2 : 1}>
        {
          assets.map(asset => <Asset key={asset && asset.id} asset={asset} assetTypes={assetTypes} percentaje={(asset.value * 100 / sum)} setAssetsChanged={setAssetsChanged} />)
        }
        <style jsx global>{`
        .ui.cards{
          margin: 0;
        }
      `}</style>
      </Card.Group>
    )
  }

  return (
    renderList()
  )
}