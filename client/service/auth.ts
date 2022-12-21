import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'

import { baseUrl, TOKEN_KEY } from './config'

export const useLogin = ({ onDone }: { onDone: () => void }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const username = event.currentTarget.username.value
    const password = event.currentTarget.password.value

    try {
      setIsLoading(true)
      setMessage('')
      const response = await fetch(`${baseUrl}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password
        })
      })

      if (!response.ok) {
        throw new Error(
          `Failed authenticating with HTTP status ${response.status}`
        )
      }

      const data = await response.json()
      if (data && typeof data.token === 'string') {
        await saveToken(data.token)
        onDone()
        return
      }

      throw new Error(`No token found in the response`)
    } catch (e) {
      console.log(e)
      setIsLoading(false)
      setMessage('Invalid Username or Password')
    }
  }

  return {
    isLoading,
    message,
    login
  }
}

const saveToken = (token: string) => {
  return new Promise<string>((resolve) => {
    try {
      window.sessionStorage.setItem(TOKEN_KEY, token)
      resolve(token)
    } catch (e) {
      throw new Error(
        'Token was not saved. Are you in incognito mode? – Make sure that SessionStorage is enabled for this page'
      )
    }
  })
}

export function retrieveToken() {
  return new Promise<string | null>((resolve) => {
    const token = window.sessionStorage.getItem(TOKEN_KEY)
    resolve(token)
  })
}

export function removeToken() {
  return new Promise<void>((resolve) => {
    window.sessionStorage.removeItem(TOKEN_KEY)
    resolve()
  })
}

export type User = { username: string; id: string }

export function useFetchCurrentUser() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const validateAsync = async () => {
      try {
        setStatus('loading')

        // Check token first
        const token = await retrieveToken()
        if (!token) {
          throw new Error('Please log in first')
        }

        const response = await fetch(`${baseUrl}/api/user/current`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error(`Unauthorized request`)
        }

        const data = await response.json()
        if (data && typeof data.username === 'string') {
          setStatus('success')
          setUser({ username: data.username, id: data.id })
          return
        }

        throw new Error('Unexpected data format')
      } catch (e) {
        setStatus('success')
        setUser(null)
      }
    }

    validateAsync()
  }, [])

  return { status, user }
}
