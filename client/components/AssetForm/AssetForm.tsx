import React, { useState } from 'react'
import { Container, DropdownProps, Form, Transition } from 'semantic-ui-react'
import { AssetTypeFragment } from 'service/graphql'
import { useMutation } from '@apollo/client'
import { AddAssetDocument } from 'service/graphql'
import { useInputValue } from 'hooks/useInputValue'
import { useCurrentUser } from '@store/AuthContext'

type  FormProps = {
  visible: boolean
  setVisible: (visible: boolean) => void
  assetTypes: AssetTypeFragment[]
}

export const AssetForm  = ({visible, setVisible, assetTypes}: FormProps) => {
  const [addAsset, {data, loading}] = useMutation(AddAssetDocument)
  const name = useInputValue('')
  const value = useInputValue(0)
  const [assetTypeId, setAssetTypeId] = useState(Number(assetTypes[0].id))
  const { user } = useCurrentUser()

  console.log({ data, loading })

  const createAsset = () => {
    if (user !== null) {
      addAsset({ 
        variables: {
          data: {
            name: name.value,
            value:Number(value.value),
            assetTypeId: assetTypeId,
            userId: Number(user.id)
          }
        }
      })
    } 
  }

  const options = assetTypes.map(assetType => ({
    key: assetType.id,
    text: assetType.name,
    value: assetType.id
  })
  )

  const cancelForm = () => {
    setVisible(!visible)
  }

  const handleChange = (event : React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps ) => {
    setAssetTypeId(Number(data.value))
  }

  const renderForm = () => {
    return (
      <Transition
        visible={visible}
        unmountOnHide
        animation='scale'
        duration={500}
      >
        <Container >
          <Form>
            <Form.Input label="Name" type='text' {...name} />
            <Form.Input label="Value" type='number' {...value} />
            <Form.Select 
              fluid
              label="Type" 
              options={options}
              onChange={handleChange}
              />
            <Form.Group>
              <Form.Button onClick={createAsset}>Submit</Form.Button> 
              <Form.Button onClick={cancelForm}>Cancel</Form.Button>
            </Form.Group>
          </Form>
        </Container>
      </Transition>
    )
  }

  return  (
    renderForm()
  )
}