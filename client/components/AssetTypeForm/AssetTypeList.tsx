import React from 'react'
import { AssetTypeRow } from './AssetTypeRow'
import { AssetTypeFragment } from '@service/graphql'
import { Table } from 'semantic-ui-react'

type AssetTypeProps = {
  assetTypes: AssetTypeFragment[]
  setAssetTypesChanged: React.Dispatch<React.SetStateAction<boolean>>
}

export const AssetTypeList = ({assetTypes, setAssetTypesChanged}: AssetTypeProps) => {

  return (
    <Table celled padded >
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell singleLine>Name</Table.HeaderCell>
          <Table.HeaderCell singleLine>Target Percentage</Table.HeaderCell>
          <Table.HeaderCell singleLine>Edit</Table.HeaderCell>
          <Table.HeaderCell singleLine>Delete</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {
          assetTypes.map(assetType => <AssetTypeRow key={assetType.id} assetType={assetType} setAssetTypesChanged={setAssetTypesChanged} />)
        }
      </Table.Body>
    </Table>
  )
}