import React, { useContext } from 'react'
import { Container, Form, Transition } from 'semantic-ui-react'

type  FormProps = {
  visible: boolean
  setVisible: (visible: boolean) => void
}

export const CryptoForm  = ({visible, setVisible}: FormProps) => {
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
            <Form.Input icon="search" placeholder='search...' type='text' />
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