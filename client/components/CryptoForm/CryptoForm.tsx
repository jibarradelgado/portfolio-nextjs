import React, { useContext, useEffect, useState } from 'react'
import { Container, Form, List, Transition } from 'semantic-ui-react'
import CoinGecko from 'coingecko-api'
import axios from 'axios'
import { stringify } from 'querystring'
import { useInputValue } from 'hooks/useInputValue'

type  FormProps = {
  visible: boolean
  setVisible: (visible: boolean) => void
}

type CoinsList = {
  id: string
  symbol: string
  name: string
}

export const CryptoForm  = ({visible, setVisible}: FormProps) => {
  const [ query, setQuery ] = useState('')
  const [ results, setResults] = useState([] as CoinsList[])
  const [ allCoins, setAllCoins ] = useState([] as CoinsList[])

  // let coinGeckoClient = new CoinGecko()
  // const func = async() => {
  //   let data = await coinGeckoClient.coins.all({per_page: 12674})
  //   console.log(data)
  // }

  // useEffect( () => {
  // }
  // ,[])

  const filterCoins = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    if (allCoins.length == 0) {
      axios.get(`https://api.coingecko.com/api/v3/coins/list`)
      .then(res => {
        setAllCoins(res.data)
        console.log(allCoins)
      })
    }

    console.log(results)

    const value = target.value
    setQuery(value)
    if (value.length >= 3) {
      console.log(value.length)
      let count = 0;
      const filteredResults = allCoins.filter((result:CoinsList) => {
        if(count > 10) 
          return false
        if (result.symbol.toLowerCase().startsWith(query.toLowerCase()) || result.name.toLowerCase().startsWith(query.toLowerCase())) {
          count++
          return true
        }
      })
      console.log(filteredResults)
      setResults(filteredResults)
    } else {
      setResults([])
    }
  }

  const cancelForm = () => {
    setVisible(!visible)
  }

  const renderForm = () => {
    return (
      <Transition
        visible={visible}
        unmountOnHide
        animation='scale'
        duration={500}
      >
        <Container>
          <Form>
            <Form.Input icon="search" placeholder='search...' type='text' value={query} onChange={filterCoins} />
            <List animated divided selection relaxed>
              {
                results.map((result, index) => (
                  <List.Item key={index} >
                    <List.Content>
                      <List.Header>{result.name}</List.Header>
                      <List.Description>Symbol: {result.symbol}</List.Description>
                    </List.Content>
                  </List.Item>
                ))
              }
            </List>
            <Form.Group>
              {/* <Form.Button onClick={filterCoins}>Submit</Form.Button>  */}
              <Form.Button onClick={cancelForm}>Cancel</Form.Button>
            </Form.Group>
          </Form>
        </Container>

      </Transition>
    )
  }

  return  (
    renderForm()
  )
}