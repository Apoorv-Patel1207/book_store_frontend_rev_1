import { useEffect } from "react"

import { useAuth0 } from "@auth0/auth0-react"
import LogoutIcon from "@mui/icons-material/Logout"
import { Button, Typography, Box, IconButton, Avatar } from "@mui/material"
import { useNavigate } from "react-router-dom"
import {
  getUserProfile,
  createUserProfile,
} from "src/service/user-profile-service"

import { useUser } from "../context/user-context"

const LoginButton = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } =
    useAuth0()
  const navigate = useNavigate()

  const navigateToProfile = () => {
    navigate("/profile")
  }

  const { userData, setUserData } = useUser()

  useEffect(() => {
    const checkOrCreateUser = async () => {
      if (isAuthenticated && user?.sub && !userData) {
        try {
          const existingUser = await getUserProfile(user.sub)
          if (existingUser) {
            setUserData(existingUser)
          } else {
            const newUser = await createUserProfile(
              user.sub,
              user.nickname || "",
              user.email || "",
              user.picture,
            )
            setUserData(newUser)
          }
        } catch (err) {
          console.error("Error creating or fetching user profile:", err)
        }
      }
    }

    checkOrCreateUser().catch((err) =>
      console.error("Error while creating or fetching the user:", err),
    )
  }, [isAuthenticated, user, userData, setUserData])

  if (isLoading) {
    return <Typography>Loading...</Typography>
  }

  return (
    <Box alignItems='center' display='flex' gap={1}>
      {isAuthenticated ? (
        <>
          <IconButton color='inherit' onClick={navigateToProfile}>
            <Avatar
              alt={userData?.name}
              src={userData?.profile_image}
              sx={{ width: 30, height: 30 }}
            >
              {userData?.name?.[0]}
            </Avatar>
          </IconButton>

          <IconButton
            color='inherit'
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            <LogoutIcon />
          </IconButton>
        </>
      ) : (
        <Button
          onClick={() => loginWithRedirect()}
          sx={{ color: "white", textTransform: "none" }}
          variant='text'
        >
          Log In
        </Button>
      )}
    </Box>
  )
}

export default LoginButton
