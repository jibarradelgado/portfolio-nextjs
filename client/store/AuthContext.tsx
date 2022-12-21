import { createContext, useContext } from "react"
import { useFetchCurrentUser } from "@service/auth"

type AuthState = ReturnType<typeof useFetchCurrentUser>

const defaultState: AuthState = {
  user: null,
  status: 'idle'
}

const AuthContext = createContext<AuthState>(defaultState)

const AuthProvider = ({ children }: {children: React.ReactNode}) => {
  const state = useFetchCurrentUser()
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}

export default { 
  AuthProvider,
  Consumer: AuthContext.Consumer
}

export const useCurrentUser = () => useContext(AuthContext)