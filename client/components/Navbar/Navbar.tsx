import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Menu, Container, Image } from 'semantic-ui-react'
import { MdPersonOutline} from 'react-icons/md'

const SIZE = '32px'

const Navbar = () => {
  const { pathname } = useRouter()

  return (
    <Menu size='small' borderless pointing as="header">
      <Container text>
        <Link href="/" passHref>
          <Menu.Item title="Home" >
            <Image alt='Assety logo' src='/logo-light.png' size='small' className='logo'/>
          </Menu.Item>
        </Link>
        <Menu.Menu position='right'>
          <Link href='/' passHref>
            <Menu.Item>
              <MdPersonOutline size={SIZE} />
            </Menu.Item>
          </Link>
          <Link href='/' passHref >
            <Menu.Item>
              Logout
            </Menu.Item>
          </Link>
        </Menu.Menu>
      </Container>
      <style jsx global>{`
        .logo {
          max-height: 50px;
          object-fit: cover;
        }
      `}</style>
    </Menu>
  )
}

export default Navbar