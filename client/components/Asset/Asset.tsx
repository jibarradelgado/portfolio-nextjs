import React, { Fragment, useState } from 'react'
import { Button, Card, Input, Icon, Select, DropdownProps, InputProps, Label, Popup } from 'semantic-ui-react'
import { AssetFragment, AssetTypeFragment, useDeleteAssetMutation, useUpdateAssetMutation, useUpdateAttributeMutation } from 'service/graphql'
import { useInputValue } from 'hooks/useInputValue'
import client from '@service/client'
import { fetchCrypto } from '@util/coingeckoAPI'
import { useAllCoins } from '@store/CoinContext'

type AssetProps = {
  asset: AssetFragment
  assetTypes: AssetTypeFragment[]
  percentaje: number
  setAssetsChanged: React.Dispatch<React.SetStateAction<boolean>>
}

export const Asset = ({ asset, assetTypes, percentaje, setAssetsChanged }: AssetProps) => {
  const [ updateAttribute, { data: updateAttributeData, loading: updateAttributeLoading, error: updateAttributeError } ] = useUpdateAttributeMutation()
  const [ isEditActive, setEditActive ] = useState(false)
  const [ deleteAssetMutation, { data, loading, error }] = useDeleteAssetMutation()
  const [ updateAssetMutation, { loading: loadingUpdate} ] = useUpdateAssetMutation()
  const name = useInputValue(asset.name)
  const value = useInputValue(asset.value)
  const [ quantity, setQuantity ] = useState(asset.quantity)
  const [ assetTypeId, setAssetTypeId ] = useState(asset.assetTypeId)
  const options = assetTypes.map(assetType => ({
      key: assetType.id,
      text: assetType.name,
      value: assetType.id
    })
  )
  const allCoinData = useAllCoins().allCoins

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

  const updateAssetEvent = () => {
    updateAsset(true)
  }

  const updateAsset = async (isSwitchEdit: boolean) => {
    await updateAssetMutation({
      variables: {
        where: { id: asset && asset.id},
        data: {
          name: name.value.toString(),
          value:Number(value.value),
          quantity: quantity,
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
        if(isSwitchEdit){
          switchEdit()
        }
      }
    })
  }

  const switchEdit = () => {
    setEditActive(!isEditActive)
  };

  const handleChange = (_ : React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps ) => {
    setAssetTypeId(Number(data.value))
  }

  const handleQuantityChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(target.value))
    const newValue = (asset.attribute?.lastValue! * Number(target.value)!).toFixed(2)
    value.setValue(newValue)
  }

  const updateValue = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const coinListData = allCoinData.find((element) => 
      element.symbol.toLowerCase() == asset.attribute?.symbol?.toLowerCase()
    )
    if(coinListData != null){
      const coinSpecificData = await fetchCrypto(coinListData.id)
      if (coinSpecificData) {
        updateAttribute({
          variables: {
            where: { symbol: coinSpecificData.symbol },
            data: {
              type: 'cryptocurrency',
              name: coinSpecificData.name,
              symbol: coinSpecificData.symbol,
              lastValue: Number(coinSpecificData.market_data.current_price.mxn)
            }
          },
          fetchPolicy: 'network-only'
        })
        .then(() => {
          if (!updateAttributeLoading) {
            if (updateAttributeData) {
              const result = quantity! * coinSpecificData.market_data.current_price.mxn
              value.setValue(result)
              updateAsset(false)
            }
          }
        })
      }
    }
  }

  const assetValue = () => {
    if(asset.attribute == null) {
      return isEditActive ? 
        <>
          <Input type="text" placeholder={asset.name} value={name.value} onChange={name.onChange} />
          <Input type="number" placeholder={asset.value} value={value.value} onChange={value.onChange} />
        </>
         :
        <>
          <Card.Header textAlign='center'>{asset.name}</Card.Header>
          <Card.Content><Label>Value: <Label.Detail>{asset.value}</Label.Detail> MXN</Label></Card.Content>
        </>
    }
    else {
      return isEditActive ? 
        <>
          <Input type='number' placeholder={asset.quantity} value={quantity} onChange={handleQuantityChange} /> 
          <Card.Content>
            <Label>Value: <Label.Detail>{value.value}</Label.Detail> MXN</Label>
            <Label>Market Price: <Label.Detail>{asset.attribute.lastValue}</Label.Detail> MXN</Label>
          </Card.Content>
        </>
        : 
        <>
          <Popup content='Update crypto market-price and value' trigger={<Button floated='left' circular icon="redo" onClick={updateValue} />} />
          <Card.Header textAlign='center'>{asset.name}</Card.Header>
          <Card.Content>
            <Label>Quantity: <Label.Detail>{asset.quantity}</Label.Detail></Label>
            <Label>Value: <Label.Detail>{asset.value}</Label.Detail> MXN</Label>
            <Label>Market Price: <Label.Detail>{asset.attribute.lastValue}</Label.Detail> MXN</Label>
          </Card.Content>
        </>
    }
  }

  return (
    <Card>
      <Card.Content>
        {assetValue()}
        {isEditActive ? <Select placeholder="Type" options={options} onChange={handleChange} /> : <p>{asset.type.name}</p> }
        <p>{percentaje.toFixed(2)}%</p>
      </Card.Content>
      <Card.Content>
        <Button onClick={isEditActive ? updateAssetEvent : switchEdit}>{isEditActive ? <Icon name='check' /> : <Icon name='edit' /> }</Button>
        <Button onClick={isEditActive ? switchEdit : deleteAsset}>{isEditActive ? <Icon name='times' /> : <Icon name='trash alternate' /> }</Button>
      </Card.Content>
    </Card>
  )
}