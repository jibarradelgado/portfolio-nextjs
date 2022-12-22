import React from 'react'
import MainApplication from '@components/MainApplication/MainApplication'
import { useCurrentUser } from '@store/AuthContext'
import Login from '@components/Login/Login'
import { useRouter } from 'next/router'

const HomePage = () => {
  const { user, status } = useCurrentUser()

  if (user == null) {
    return <Login />
  }

  const id = user.id

  return (
    <MainApplication id={id} />
  )
}

export default HomePage