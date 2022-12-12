import React, { useState, useContext } from 'react'
import { Container, Form, Transition } from 'semantic-ui-react'

type  FormProps = {
  visible: boolean
  setVisible: (visible: boolean) => void
}

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]

export const AssetForm  = ({visible, setVisible}: FormProps) => {
  const cancelForm = () => {
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
        <Container >
          <Form>
            <Form.Input label="Name" type='text' />
            <Form.Input label="Value" type='number' />
            <Form.Select 
              fluid
              label="Type" 
              options={options}/>
            <Form.Group>
              <Form.Button type='submit'>Submit</Form.Button> 
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