import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Container, Input, List, ListItemProps, Transition } from 'semantic-ui-react'
import { AssetTypeFragment, AttributeFragment, useUpsertAttributeMutation } from '@service/graphql'
import { useCurrentUser } from '@store/AuthContext'
import { CryptoForm } from './CryptoForm'
import { fetchCrypto } from '@util/coingeckoAPI'
import { useAllCoins } from '@store/CoinContext'

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
  const [ upsertAttribute, { data: upsertData, loading: upsertLoading, error } ] = useUpsertAttributeMutation()
  const [ query, setQuery ] = useState('')
  const [ results, setResults] = useState([] as CoinsList[])
  const { user } = useCurrentUser()
  const [ visibleForm, setVisibleForm ] = useState(false)
  const [ attributesData, setAttributesData ] = useState({} as AttributeFragment)
  const allCoinData = useAllCoins().allCoins

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if(query.length >= 3) {
        let count = 0;
        const filteredResults = allCoinData.filter((result:CoinsList) => {
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
    }, 300)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [query])

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
      .then((data) => {
        if (!upsertLoading) {
          setAttributesData(data.data?.upsertAttribute as AttributeFragment)
          setVisibleForm(true)
        }
      })
    }
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
          <Input icon="search" placeholder='search...' type='text' value={query} onChange={(e) => setQuery(e.target.value)} />
          <List animated divided selection relaxed>
              {
                results.map((result) => (
                  <List.Item id={result.id} key={result.id} onClick={selectCrypto} >
                    <List.Content>
                      {result.name} - {result.symbol}
                    </List.Content>
                  </List.Item>
                ))
              }
            </List>
            {!upsertLoading && <CryptoForm visible={visibleForm} setVisible={setVisibleForm} assetTypes={assetTypes} setAssetsChanged={setAssetsChanged} attributes={attributesData} />}
        </Container>

      </Transition>
    )
  }

  return  (
    renderForm()
  )
}