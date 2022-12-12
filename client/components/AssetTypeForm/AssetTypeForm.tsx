import React, { useContext } from 'react'
import { Container, Form, Transition } from 'semantic-ui-react'

type  FormProps = {
  visible: boolean
  setVisible: (visible: boolean) => void
}

export const AssetTypeForm  = ({visible, setVisible}: FormProps) => {
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
        <Container>
          <Form>
            <Form.Input label="Name" type='text' />
            <Form.Input label="Target Percentage" type='number' min='0' max='100' />
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