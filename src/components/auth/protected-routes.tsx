import { useAuth0 } from "@auth0/auth0-react"
import { Box } from "@mui/material"
import { Outlet, Navigate } from "react-router-dom"

import Loading from "../utility-components/loading"

const ProtectedRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return (
      <Box
        alignItems='center'
        display='flex'
        height='100vh'
        justifyContent='center'
        width='100vw'
      >
        <Loading />
      </Box>
    )
  }

  return isAuthenticated ? <Outlet /> : <Navigate to='/not-logged-in' />
}

export default ProtectedRoutes
