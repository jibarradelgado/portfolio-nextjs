import React, { useState } from 'react'
import { Button, Card, Input, Icon, Select, DropdownProps } from 'semantic-ui-react'
import { AssetFragment, AssetTypeFragment, useDeleteAssetMutation, useUpdateAssetMutation } from 'service/graphql'
import { useInputValue } from 'hooks/useInputValue'
import client from '@service/client'

type AssetProps = {
  asset: AssetFragment
  assetTypes: AssetTypeFragment[]
  percentaje: number
  setAssetsChanged: React.Dispatch<React.SetStateAction<boolean>>
}

export const Asset = ({ asset, assetTypes, percentaje, setAssetsChanged }: AssetProps) => {
  const [ isEditActive, setEditActive ] = useState(false)
  const [ deleteAssetMutation, { data, loading, error }] = useDeleteAssetMutation()
  const [ updateAssetMutation, { loading: loadingUpdate} ] = useUpdateAssetMutation()
  const name = useInputValue(asset.name)
  const value = useInputValue(asset.value)
  const [assetTypeId, setAssetTypeId] = useState(asset.assetTypeId)
  const options = assetTypes.map(assetType => ({
      key: assetType.id,
      text: assetType.name,
      value: assetType.id
    })
  )

  const deleteAsset = async () => {
    client.clearStore()
    await deleteAssetMutation({
      variables: { 
        where: { id: asset.id}
      },
      fetchPolicy: 'network-only'
    })
    .then(res => {
      if (!loading) {
        setAssetsChanged((toggle) => {
          return !toggle
        })
      }
    })
    .catch((err) => {
      console.log(err)
      setAssetsChanged((toggle) => {
          return !toggle
      })
    })
  }

  const updateAsset = async () => {
    await updateAssetMutation({
      variables: {
        where: { id: asset && asset.id},
        data: {
          name: name.value.toString(),
          value:Number(value.value),
          assetTypeId: assetTypeId
        }
      },
      fetchPolicy: 'network-only'
    })
    .then((res) => {
      if(!loadingUpdate) {
        setAssetsChanged((toggle) => {
          return !toggle
        })
        switchEdit()
      }
    })
  }

  const switchEdit = () => {
    setEditActive(!isEditActive)
  };

  const handleChange = (_ : React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps ) => {
    setAssetTypeId(Number(data.value))
  }

  return (
    <Card>
      <Card.Content>
        {isEditActive ? <Input type="text" placeholder={asset.name} value={name.value} onChange={name.onChange} /> : <p>{asset.name}</p> }
        {isEditActive ? <Input type="number" placeholder={asset.value} value={value.value} onChange={value.onChange} /> : <p>{asset.value} </p> }
        {isEditActive ? <Select placeholder="Type" options={options} onChange={handleChange} /> : <p>{asset.type.name}</p> }
        <p>{percentaje.toFixed(2)}%</p>
      </Card.Content>
      <Card.Content>
        <Button onClick={isEditActive ? updateAsset : switchEdit}>{isEditActive ? <Icon name='check' /> : <Icon name='edit' /> }</Button>
        <Button onClick={isEditActive ? switchEdit : deleteAsset}>{isEditActive ? <Icon name='times' /> : <Icon name='trash alternate' /> }</Button>
      </Card.Content>
    </Card>
  )
}