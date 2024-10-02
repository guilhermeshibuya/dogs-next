'use client'

import logout from '@/actions/logout'
import validateToken from '@/actions/validadte-token'
import { User } from '@/types/user'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'

type IUserContext = {
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
}

const UserContext = createContext<IUserContext | null>(null)

export const useUser = () => {
  const context = useContext(UserContext)

  if (context === null) {
    throw new Error('useContext deve estar dentro do Provider')
  }
  return context
}

export function UserContextProvider({
  children,
  user,
}: {
  children: ReactNode
  user: User | null
}) {
  const [userState, setUser] = useState<User | null>(user)

  useEffect(() => {
    async function validate() {
      const { ok } = await validateToken()
      if (!ok) await logout()
    }
    if (userState) validate()
  }, [userState])

  return (
    <UserContext.Provider value={{ user: userState, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
