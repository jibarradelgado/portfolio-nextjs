import React, { useState } from 'react'
import { Container, DropdownProps, Form, Label, Transition } from 'semantic-ui-react'
import { AssetTypeFragment, AttributeFragment, useAddAssetMutation} from 'service/graphql'
import { useInputValue } from 'hooks/useInputValue'
import { useCurrentUser } from '@store/AuthContext'

type  FormProps = {
  visible: boolean
  setVisible: (visible: boolean) => void
  assetTypes: AssetTypeFragment[]
  setAssetsChanged: React.Dispatch<React.SetStateAction<boolean>>
  attributes: AttributeFragment 
}

export const CryptoForm = ({visible, setVisible, assetTypes, setAssetsChanged, attributes}: FormProps) => {
  const [addAsset, {data, loading, error}] = useAddAssetMutation()
  const name = useInputValue('')
  const value = useInputValue(0)
  const quantity = useInputValue(0)
  const [assetTypeId, setAssetTypeId] = useState(0)
  const { user } = useCurrentUser()

  const createAsset = () => {
    if (user !== null) {
      addAsset({
        variables: {
          data: {
            name: name.value.toString(),
            quantity: Number(quantity.value),
            value: Number(value.value),
            assetTypeId: assetTypeId,
            userId: Number(user.id),
            attributeId: Number(attributes.id)
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
    quantity.setValue(0)
    value.setValue(0)
    setVisible(!visible)
  }

  const updateValue = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    quantity.setValue(target.value)
    const totalValue = Number(quantity.value) * attributes.lastValue!
    value.setValue(totalValue)
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
            <Form.Input label="Quantity" type='number' value={quantity.value} onChange={updateValue} />
            <Form.Select 
              fluid
              label="Type" 
              options={options}
              onChange={handleChange}
              />
            <Label.Group>
              <Label>Value: <Label.Detail>{value.value} MXN</Label.Detail></Label>
              <Label>Cryptocurrency: <Label.Detail>{attributes.name}</Label.Detail></Label>
              <Label>Symbol: <Label.Detail>{attributes.symbol}</Label.Detail></Label>
              <Label>Market Price: <Label.Detail>{attributes.lastValue} MXN</Label.Detail></Label>
            </Label.Group>
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