import React, { useState, useContext } from 'react'
import { Button, Card, Input, Icon, Select } from 'semantic-ui-react'

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]

export const Asset = () => {
  const [ isEditActive, setEditActive ] = useState(false)

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
        <Input type="text" readOnly={!isEditActive} placeholder="Name" />
        <Input type="number" readOnly={!isEditActive} placeholder="Value" />
        <Select disabled={!isEditActive} placeholder="Type" options={options} />
        <p>100%</p>
      </Card.Content>
      <Card.Content>
        <Button onClick={isEditActive ? updateAsset : switchEdit}>{isEditActive ? <Icon name='check' /> : <Icon name='edit' /> }</Button>
        <Button onClick={isEditActive ? switchEdit : deleteAsset}>{isEditActive ? <Icon name='times' /> : <Icon name='trash alternate' /> }</Button>
      </Card.Content>
    </Card>
  )
}