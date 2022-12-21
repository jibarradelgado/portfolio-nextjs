import React, { useEffect, useState } from 'react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import MainApplication from '@components/MainApplication/MainApplication'
import Layout from '@components/Layout/Layout'
import Menu from '@components/Menu/Menu'
import { Total } from '@components/Total/total'
import { AssetList } from '@components/AssetList/AssetList'
import { AssetFragment, useGetAllAssetsFromUserQuery, AssetTypeFragment, useGetAllAssetTypesFromUserQuery } from '@service/graphql'
import client from '@service/client'
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