import { text } from 'node:stream/consumers'
import React, { useState, useContext } from 'react'
import { Button, Card, Input, Icon, Select } from 'semantic-ui-react'
import { AssetFragment, AssetTypeFragment } from 'service/graphql'

type AssetProps = {
  asset: AssetFragment
  assetTypes: AssetTypeFragment[]
  percentaje: number
}

export const Asset = ({ asset, assetTypes, percentaje }: AssetProps) => {
  const [ isEditActive, setEditActive ] = useState(false)

  const options = assetTypes.map(assetType => ({
      key: assetType.id,
      text: assetType.name,
      value: assetType.name
    })
  )

  const deleteAsset = () => {

  }

  const updateAsset = () => {
    switchEdit()
  }

  const switchEdit = () => {
    setEditActive(!isEditActive)
  };

  return (
    <Card>
      <Card.Content>
        {isEditActive ? <Input type="text" placeholder={asset.name} /> : <p>{asset.name}</p> }
        {isEditActive ? <Input type="number" placeholder={asset.value} /> : <p>{asset.value} </p> }
        {isEditActive ? <Select placeholder="Type" options={options} /> : <p>{asset.type.name}</p> }
        <p>{percentaje.toFixed(2)}%</p>
      </Card.Content>
      <Card.Content>
        <Button onClick={isEditActive ? updateAsset : switchEdit}>{isEditActive ? <Icon name='check' /> : <Icon name='edit' /> }</Button>
        <Button onClick={isEditActive ? switchEdit : deleteAsset}>{isEditActive ? <Icon name='times' /> : <Icon name='trash alternate' /> }</Button>
      </Card.Content>
    </Card>
  )
}