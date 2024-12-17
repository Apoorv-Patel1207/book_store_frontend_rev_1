import { useEffect, useState } from "react"

import CakeIcon from "@mui/icons-material/Cake"
import EditIcon from "@mui/icons-material/Edit"
import EmailIcon from "@mui/icons-material/Email"
import HomeIcon from "@mui/icons-material/Home"
import ManIcon from "@mui/icons-material/Man"
import PhoneIcon from "@mui/icons-material/Phone"
import {
  Container,
  Typography,
  Avatar,
  Box,
  Stack,
  IconButton,
} from "@mui/material"
import { SubmitHandler } from "react-hook-form"
import { useUserID } from "src/components/auth/userID"
import ProfileForm from "src/components/profile/profile-form"
import { formatDate } from "src/components/utility-components/format-date"
import PageHeading from "src/components/utility-components/page-headings"
import {
  getUserProfile,
  updateUserProfile,
} from "src/service/user-profile-service"
import { ApiResponseUserProfile, ProfileFormValues } from "src/types/data-types"

import Layout from "../components/layout/layout"

const Profile = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [profile, setProfile] = useState<ApiResponseUserProfile | null>(null)
  const [editing, setEditing] = useState<boolean>(false)
  const handleOpenEditingDialog = () => setEditing(true)
  const handleCloseEditingDialog = () => setEditing(false)

  const userID = useUserID()

  useEffect(() => {
    if (!userID) return

    const fetchUserProfile = async () => {
      setLoading(true)
      try {
        const data = await getUserProfile(userID)
        if (data) {
          setProfile(data)
        } else {
          setError("Failed to load user profile.")
        }
      } catch (err) {
        setError("Failed to load user profile.")
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfile().catch((err) =>
      console.error("Error fetching profile:", err),
    )
  }, [userID])

  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    if (!userID) return

    try {
      const updatedProfile = await updateUserProfile(userID, {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        profileImage: data.profileImage,
        dob: data.dob,
        gender: data.gender,
      })

      if (updatedProfile) {
        setProfile(updatedProfile)
        handleCloseEditingDialog()
        setError(null)
      } else {
        setError("Failed to update user profile.")
      }
    } catch {
      setError("Error submitting user profile.")
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <Layout>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#1F2937",
          zIndex: -1,
        }}
      />

      <Container maxWidth='md' sx={{ color: "white" }}>
        <PageHeading>{editing ? "Edit Profile" : "User Profile"}</PageHeading>

        {error && (
          <Typography color='error' sx={{ mb: 2 }} variant='body2'>
            {error}
          </Typography>
        )}

        {!editing ? (
          <Stack alignItems='center'>
            <Box display='flex' flexDirection='row' justifyContent='center'>
              <Stack alignItems='center'>
                <Stack
                  direction='row'
                  justifyContent='center'
                  mb={1}
                  position='relative'
                >
                  <Avatar
                    alt={profile?.name}
                    src={profile?.profile_image}
                    sx={{
                      width: "200px",
                      height: "200px",
                      border: "5px white solid",
                    }}
                  />

                  <IconButton
                    onClick={handleOpenEditingDialog}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      backgroundColor: "crimson",
                      color: "white",
                      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Stack>

                {profile?.name !== profile?.email && (
                  <Typography mb={1}>{profile?.name}</Typography>
                )}
                <Typography>{profile?.email}</Typography>
              </Stack>

              <Stack m={4} spacing={2} width='100%'>
                <Stack alignItems='center' direction='row' spacing={2}>
                  <PhoneIcon sx={{ color: "white" }} />
                  <Typography color='white' variant='body1'>
                    {profile?.phone}
                  </Typography>
                </Stack>
                <Stack alignItems='center' direction='row' spacing={2}>
                  <EmailIcon sx={{ color: "white" }} />
                  <Typography color='white' variant='body1'>
                    {profile?.email}
                  </Typography>
                </Stack>
                <Stack alignItems='center' direction='row' spacing={2}>
                  <CakeIcon sx={{ color: "white" }} />
                  <Typography color='white' variant='body1'>
                    {formatDate(profile?.dob)}
                  </Typography>
                </Stack>
                <Stack alignItems='center' direction='row' spacing={2}>
                  <ManIcon sx={{ color: "white" }} />
                  <Typography color='white' variant='body1'>
                    {profile?.gender}
                  </Typography>
                </Stack>
                <Stack alignItems='center' direction='row' spacing={2}>
                  <HomeIcon sx={{ color: "white" }} />
                  <Typography color='white' variant='body1'>
                    {profile?.address}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        ) : (
          <ProfileForm
            onClose={handleCloseEditingDialog}
            onSubmit={onSubmit}
            open={editing}
            profile={profile}
          />
        )}
      </Container>
    </Layout>
  )
}

export default Profile
