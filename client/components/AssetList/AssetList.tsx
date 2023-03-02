import React, { useState, useEffect} from 'react'
import { Asset } from '@components/Asset/Asset'
import { AssetFragment, AssetTypeFragment } from 'service/graphql'
import { Card, Select, DropdownProps } from 'semantic-ui-react'

type AssetProps = {
  assets: AssetFragment[]
  assetTypes: AssetTypeFragment[]
  setAssetsChanged: React.Dispatch<React.SetStateAction<boolean>>
}

const options = [
  {
    text: 'sort by Type',
    value: 'type'
  },
  {
    text: 'sort by Value',
    value: 'value'
  },
  {
    text: 'sort by Name',
    value: 'name'
  }
]

export const AssetList = ( { assets, assetTypes, setAssetsChanged }: AssetProps ) => {
  const [width, setWidth] = useState(window.innerWidth)
  const [sort, setSort] = useState('type')

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)

    return () => { window.removeEventListener('resize', handleResize)}
  })

  const handleSort = (_ : React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps ) => {
    if (data.value) {
      let sort = data.value.toString()
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
      setSort(sort)
    }
  }

  const renderList = () => {
    let sum = 0
    if (!assets)
      return (<Card.Group></Card.Group>)

    assets.forEach(asset => sum = asset.value + sum)

    return (
      <>
        <Select 
          options={options} 
          defaultValue={options[0].value}
          onChange={handleSort}
         />
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
      </>
    )
  }

  return (
    renderList()
  )
}