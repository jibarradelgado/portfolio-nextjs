import React from 'react'
import { Segment, Container } from 'semantic-ui-react'

const Footer = () => {
  return (
    <Segment
      as="footer">
      <Container text className='footer-container'>
        <p>&copy; six-pix 2022</p>
      </Container>
      <style jsx global>{`
        .footer-container {
          text-align: center;
        }
      `}</style>
    </Segment>
  )
}

export default Footer