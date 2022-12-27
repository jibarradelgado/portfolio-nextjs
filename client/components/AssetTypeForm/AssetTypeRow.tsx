import React, { useState } from 'react'
import { AssetTypeFragment, useUpdateAssetTypeMutation, useDeleteAssetTypeMutation } from '@service/graphql'
import { Button, Icon, Input, Table } from 'semantic-ui-react'
import { useInputValue } from 'hooks/useInputValue'

type AssetTypeProps = {
  assetType: AssetTypeFragment
  setAssetTypesChanged: React.Dispatch<React.SetStateAction<boolean>>
}

export const AssetTypeRow = ({assetType, setAssetTypesChanged}: AssetTypeProps) => {
  const [ isEditActive, setEditActive ] = useState(false)
  const [ updateAssetTypeMutation ] = useUpdateAssetTypeMutation()
  const [ deleteAssetTypeMutation ] = useDeleteAssetTypeMutation()
  const name = useInputValue('')
  const targetPercentage = useInputValue(0)

  const deleteAssetType = async() => {
    await deleteAssetTypeMutation({
      variables: {
        where: { id: assetType.id}
      }
    })
    .then (() => {
      setAssetTypesChanged((toggle) => {
        return !toggle
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const updateAssetType = async() => { 
    await updateAssetTypeMutation({
      variables: {
        where: { id: assetType.id },
        data: {
          name: name.value.toString(),
          targetPercentage: Number(targetPercentage.value)
        }
      }
    })
    .then(() => {
      setAssetTypesChanged((toggle) => {
        return !toggle
      })
      switchEdit()
    })
  }

  const switchEdit = () => {
    setEditActive(!isEditActive)
  };

  return (
    <Table.Row>
      <Table.Cell>
        {isEditActive ? <Input type='text' placeholder={assetType.name} value={name.value} onChange={name.onChange} /> : <p>{assetType.name}</p>}
      </Table.Cell>
      <Table.Cell>
        {isEditActive ? <Input type='number' placeholder={assetType.targetPercentage} value={targetPercentage.value} onChange={targetPercentage.onChange} /> : <p>{assetType.targetPercentage}</p> }
      </Table.Cell>
      <Table.Cell>
        <Button onClick={isEditActive ? updateAssetType : switchEdit}>{isEditActive ? <Icon name='check' /> : <Icon name='edit' /> }</Button>
      </Table.Cell>
      <Table.Cell>
      <Button onClick={isEditActive ? switchEdit : deleteAssetType}>{isEditActive ? <Icon name='times' /> : <Icon name='trash alternate' /> }</Button>
      </Table.Cell>
    </Table.Row>
  )
}