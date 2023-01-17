import React, { SyntheticEvent, useContext, useEffect, useState } from 'react'
import { Button, Container, Form, Input, List, ListItemProps, Transition } from 'semantic-ui-react'
import CoinGecko from 'coingecko-api'
import axios from 'axios'
import { AssetTypeFragment, AttributeFragment, useUpsertAttributeMutation } from '@service/graphql'
import { useCurrentUser } from '@store/AuthContext'
import { CryptoForm } from './CryptoForm'

type  FormProps = {
  visible: boolean
  setVisible: (visible: boolean) => void
  assetTypes: AssetTypeFragment[]
  setAssetsChanged: React.Dispatch<React.SetStateAction<boolean>>
}

type CoinsList = {
  id: string
  symbol: string
  name: string
}

export const CryptoSection  = ({visible, setVisible, assetTypes, setAssetsChanged}: FormProps) => {
  const [ upsertAttribute, { data: upsertData, loading, error } ] = useUpsertAttributeMutation()
  const [ query, setQuery ] = useState('')
  const [ results, setResults] = useState([] as CoinsList[])
  const [ allCoins, setAllCoins ] = useState([] as CoinsList[])
  const { user } = useCurrentUser()
  const [ visibleForm, setVisibleForm ] = useState(false)
  const [ attributesData, setAttributesData ] = useState({} as AttributeFragment)
  const coinGeckoClient = new CoinGecko()

  const filterCoins = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    if (allCoins.length == 0) {
      axios.get(`https://api.coingecko.com/api/v3/coins/list`)
      .then(res => {
        setAllCoins(res.data)
      })
    }

    const value = target.value
    setQuery(value)
    if (value.length >= 3) {
      let count = 0;
      const filteredResults = allCoins.filter((result:CoinsList) => {
        if(count > 10) 
          return false
        if (result.symbol.toLowerCase().startsWith(query.toLowerCase()) || result.name.toLowerCase().startsWith(query.toLowerCase())) {
          count++
          return true
        }
      })
      setResults(filteredResults)
    } else {
      setResults([])
    }
  }

  const fetchCrypto = async(id:string) => {
    const data = await coinGeckoClient.coins.fetch(id, {})
      .then(res => {
        if(res.success) {
          return res.data
        }
      })
    return data
  }

  const selectCrypto = async (event: SyntheticEvent, data: ListItemProps) => {
    const { id } = data
    setQuery('')
    setResults([])
    const cryptoData = await fetchCrypto(id)
    if (user !== null && cryptoData) {
      upsertAttribute({
        variables: {
          where: { symbol: cryptoData.symbol },
          data: {
            type: 'cryptocurrency',
            name: cryptoData.name,
            symbol: cryptoData.symbol,
            lastValue: Number(cryptoData.market_data.current_price.mxn)
          }
        },
        fetchPolicy: 'network-only'
      })
      .then(() => {
        if (!loading) {
          if (upsertData)
            setAttributesData(upsertData.upsertAttribute)
          setVisibleForm(true)
        }
      })
    }
    console.log(cryptoData)
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
          <Input icon="search" placeholder='search...' type='text' value={query} onChange={filterCoins} />
          <List animated divided selection relaxed>
              {
                results.map((result, index) => (
                  <List.Item id={result.id} key={result.id} onClick={selectCrypto} >
                    <List.Content>
                      {result.name} - {result.symbol}
                    </List.Content>
                  </List.Item>
                ))
              }
            </List>
            <CryptoForm visible={visibleForm} setVisible={setVisibleForm} assetTypes={assetTypes} setAssetsChanged={setAssetsChanged} attributes={attributesData} />
          {/* <Button onClick={cancelForm}>Cancel</Button> */}
        </Container>

      </Transition>
    )
  }

  return  (
    renderForm()
  )
}