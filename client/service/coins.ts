import { useState, useEffect } from 'react'
import axios from 'axios'

type CoinsList = {
  id: string
  symbol: string
  name: string
}

export const useFetchAllCoins = () => {
  const [allCoins, setAllCoins] = useState([] as CoinsList[])

  useEffect(() => {
    const getAllCoins = () => {
      axios.get(`https://api.coingecko.com/api/v3/coins/list`)
        .then(res => {
          setAllCoins(res.data as CoinsList[])
        })
        .catch(error => {
          console.log(error)
          setAllCoins([] as CoinsList[])
        })
    }

    getAllCoins()
  }, [])

  return { allCoins }
}