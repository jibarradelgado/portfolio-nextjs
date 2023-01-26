import React, { createContext, useContext } from "react";
import { useFetchAllCoins } from "@service/coins";

type CoinsList = ReturnType<typeof useFetchAllCoins>

const defaultState: CoinsList = {allCoins: []}

const CoinContext = createContext<CoinsList>(defaultState)

const CoinProvider = ({children}: {children: React.ReactNode}) => {
  const state = useFetchAllCoins()

  return (
    <CoinContext.Provider value={state}>{children}</CoinContext.Provider>
  )
}

export default {
  CoinProvider,
  Consumer: CoinContext.Consumer
}

export const useAllCoins = () => useContext(CoinContext)