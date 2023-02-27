import { Segment, Header, Form, Message, Container } from 'semantic-ui-react'

import { useLogin } from '@service/auth'
import Layout from '@components/Layout/Layout'

const Login = () => {
  const { login, message, isLoading } = useLogin({
    onDone: () => window.location.replace('/')
  })

  return (
    <Layout title='Login'>
      <Header as="h2" size='huge'>
        Login
      </Header>
      {message && <Message error content={message} />}
      <Container className='loginContainer'>
        <Segment>
          <Form loading={isLoading} onSubmit={login} >
            <Form.Input id='form-username' type='text' placeholder='username' label='Username' name='username' autoFocus required />
            <Form.Input id='form-password' type='password' placeholder='password' label='Password' name='password' required/>
            <Form.Button type='submit' positive >Login</Form.Button>
          </Form>
        </Segment>
      </Container>
      <style>

      </style>
    </Layout>
  )
}

export default Login
