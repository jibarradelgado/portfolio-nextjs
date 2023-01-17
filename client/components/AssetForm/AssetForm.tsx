import React, { useState } from 'react'
import { Container, DropdownProps, Form, Transition } from 'semantic-ui-react'
import { AddAssetDocument, AssetTypeFragment, GetAllAssetsFromUserDocument } from 'service/graphql'
import { useMutation } from '@apollo/client'
import { useInputValue } from 'hooks/useInputValue'
import { useCurrentUser } from '@store/AuthContext'

type  FormProps = {
  visible: boolean
  setVisible: (visible: boolean) => void
  assetTypes: AssetTypeFragment[]
  setAssetsChanged: React.Dispatch<React.SetStateAction<boolean>>
}

export const AssetForm  = ({visible, setVisible, assetTypes, setAssetsChanged}: FormProps) => {
  const [addAsset, {data, loading}] = useMutation(AddAssetDocument, {
    refetchQueries: [
      {query: GetAllAssetsFromUserDocument}
    ]
  })
  const name = useInputValue('')
  const value = useInputValue(0)
  const [assetTypeId, setAssetTypeId] = useState(0)
  const { user } = useCurrentUser()

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
        },
        fetchPolicy: 'network-only'
      }).then(() => {
        cancelForm() 
        setAssetsChanged((toggle) => {
          return !toggle
        })
      })
    }
  }

  const options = assetTypes?.map(assetType => ({
    key: assetType.id,
    text: assetType.name,
    value: assetType.id
  })
  )

  const cancelForm = () => {
    name.setValue('')
    value.setValue(0)
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
            <Form.Input label="Name" type='text' value={name.value} onChange={name.onChange} />
            <Form.Input label="Value" type='number' value={value.value} onChange={value.onChange} />
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