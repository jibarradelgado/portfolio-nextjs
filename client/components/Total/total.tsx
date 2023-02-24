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
    <Container>
      <Header className='total' textAlign='center'>Total: { Number(sum).toFixed(2) } MXN</Header>
    </Container>
  )
}