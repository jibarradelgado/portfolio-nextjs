import React, { useState } from 'react'
import { AssetTypeList } from './AssetTypeList'
import { Container, Form, Message, Transition } from 'semantic-ui-react'
import { AssetTypeFragment, useAddAssetTypeMutation } from '@service/graphql'
import { useInputValue } from 'hooks/useInputValue'
import { useCurrentUser } from '@store/AuthContext'

type  FormProps = {
  visible: boolean
  setVisible: (visible: boolean) => void
  assetTypes: AssetTypeFragment[]
  setAssetTypesChanged: React.Dispatch<React.SetStateAction<boolean>>
}

export const AssetTypeForm  = ({visible, setVisible, assetTypes, setAssetTypesChanged}: FormProps) => {
  const [addAssetType, {loading: addTypeLoading}] = useAddAssetTypeMutation()
  const name = useInputValue('')
  const percentage = useInputValue(0)
  const { user } = useCurrentUser()
  const [message, setMessage] = useState('')

  const createAssetType = () => {
    if (user !== null) {
      addAssetType({ 
        variables: {
          data: {
            name: name.value.toString(),
            targetPercentage:Number(percentage.value),
            userId: Number(user.id)
          }
        },
        fetchPolicy: 'network-only'
      }).then(() => {
        cancelForm() 
        setAssetTypesChanged((toggle) => {
          return !toggle
        })
      })
    }
  }

  const cancelForm = () => {
    name.setValue('')
    percentage.setValue(0)
    setVisible(!visible)
  }

  const renderForm = () => {
    return (
      <Transition
        visible={visible}
        unmountOnHide
        animation='scale'
        duration={500}
      >
        <>
        <Container className='assetForm'>
          <Form>
            <Form.Input label="Name" type='text' value={name.value} onChange={name.onChange} />
            <Form.Input label="Target Percentage" type='number' min='0' max='100' value={percentage.value} onChange={percentage.onChange} />
            <Form.Group>
              <Form.Button onClick={createAssetType}>Submit</Form.Button> 
              <Form.Button onClick={cancelForm}>Cancel</Form.Button>
            </Form.Group>
          </Form>
        </Container>
        {message && message != '' && <Message error content={message} />}
        {assetTypes.length > 0 && <AssetTypeList assetTypes={assetTypes} setAssetTypesChanged={setAssetTypesChanged} /> }
        </>
      </Transition>
    )
  }

  return  (
    renderForm()
  )
}