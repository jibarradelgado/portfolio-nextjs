import React from 'react'
import { Segment, Container } from 'semantic-ui-react'

const Footer = () => {
  return (
    <Segment
      as="footer"
      className='footer-segment'>
      <Container text className='footer-container'>
        <p>Powered by CoinGecko</p>
        <p>&copy; six-pix 2022</p>
      </Container>
      <style jsx global>{`
        .footer-container {
          text-align: center;
        }
        .ui.segment.footer-segment {
          margin-top: auto;
          bottom: 0;
          width: 100%;
        }
      `}</style>
    </Segment>
  )
}

export default Footer