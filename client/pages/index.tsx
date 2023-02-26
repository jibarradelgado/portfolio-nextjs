import React from 'react'
import { Loader } from 'semantic-ui-react'
import MainAppWrapper from '@components/MainApplication/MainAppWrapper'
import { useCurrentUser } from '@store/AuthContext'
import Login from '@components/Login/Login'
import Layout from '@components/Layout/Layout'

const HomePage = () => {
  const { user, status } = useCurrentUser()

  if (user == null) {
    return <Login />
  }

  if (status == 'loading') {
    return (
      <Layout>
        <Loader active inline="centered" />
      </Layout>
    )
  }
  const id = user.id
  return (
    <MainAppWrapper id={id} />
  )
}

export default HomePage