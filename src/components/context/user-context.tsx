// /src/context/UserContext.tsx
import { createContext, useContext, useState, ReactNode, useMemo } from "react"

import { ApiResponseUserProfile } from "src/types/data-types"

interface UserContextType {
  userData: ApiResponseUserProfile | null
  setUserData: (data: ApiResponseUserProfile | null) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userData, setUserData] = useState<ApiResponseUserProfile | null>(null)

  const value = useMemo(() => ({ userData, setUserData }), [userData])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
