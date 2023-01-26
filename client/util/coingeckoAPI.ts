import CoinGecko from 'coingecko-api'

const coinGeckoClient = new CoinGecko()

export const fetchCrypto = async(id:string) => {
  const data = await coinGeckoClient.coins.fetch(id, {})
    .then(res => {
      if(res.success) {
        return res.data
      }
    })
  return data
}