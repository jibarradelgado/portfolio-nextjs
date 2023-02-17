import React from 'react'
import { Container, Header } from 'semantic-ui-react'
import { AssetFragment } from 'service/graphql'

type TotalProps = {
  assets: AssetFragment[]
}

export const Total = ({ assets }: TotalProps) => {
  let sum = 0;
  if (assets) 
    assets.forEach(asset => sum = asset.value + sum)

  return (
    <Container text>
      <Header textAlign='center'>Total: { sum }</Header>
    </Container>
  )
}