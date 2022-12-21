import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button, Menu, Container, Image } from 'semantic-ui-react'
import { MdPersonOutline} from 'react-icons/md'
import { useCurrentUser } from '@store/AuthContext'
import { removeToken } from '@service/auth'

const SIZE = '32px'

const Navbar = () => {
  const { pathname } = useRouter()
  const { user } = useCurrentUser()
  
  const logout = async () => {
    await removeToken()
    window.location.reload()
  }

  return (
    <Menu size='small' borderless pointing as="header">
      <Container text>
        <Link href="/" passHref>
          <Menu.Item title="Home" >
            <Image alt='Assety logo' src='/logo-light.png' size='small' className='logo'/>
          </Menu.Item>
        </Link>
        <Menu.Menu position='right'>
          {/* <Link href='/' passHref>
            <Menu.Item>
              <MdPersonOutline size={SIZE} />
            </Menu.Item>
          </Link> */}
          <Link href='/' passHref >
            <Menu.Item>
              { (user && user!=null) && <Button type="button" basic color="red" onClick={logout}>Logout</Button>}
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