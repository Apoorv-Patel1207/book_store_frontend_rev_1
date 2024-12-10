import { useEffect, useState } from "react"

import { Container, Button, Typography } from "@mui/material"
import Grid from "@mui/material/Grid2"
import { SubmitHandler } from "react-hook-form"
import { useUserID } from "src/components/auth/userID"
import ProfileForm from "src/components/profile/profile-form"
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
  const [editing, setEditing] = useState<boolean>(false)
  const [profile, setProfile] = useState<ApiResponseUserProfile | null>(null)

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
        address: data.address || "",
        profileImage: data.profileImage || "",
        dob: data.dob || "",
        gender: data.gender || "",
      })

      if (updatedProfile) {
        setProfile(updatedProfile)
        setEditing(false)
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
      <Container maxWidth='md'>
        <PageHeading>{editing ? "Edit Profile" : "User Profile"}</PageHeading>

        {error && <Typography color='error'>{error}</Typography>}

        {!editing ? (
          <div>
            <Grid container spacing={2}>
              {[
                { label: "Name", value: profile?.name },
                { label: "Email", value: profile?.email },
                { label: "Phone", value: profile?.phone },
                { label: "Address", value: profile?.address },
                { label: "DOB", value: profile?.dob },
                { label: "Gender", value: profile?.gender },
              ].map((item) => (
                <Grid key={item.value}>
                  <Typography variant='h6'>
                    {item.label}: {item.value || "N/A"}
                  </Typography>
                </Grid>
              ))}
              <Grid>
                <Typography variant='h6'>Profile Image:</Typography>
                {profile?.profile_image && (
                  <img
                    alt='profile'
                    src={profile.profile_image}
                    style={{ maxWidth: "100px" }}
                  />
                )}
              </Grid>
            </Grid>
            <Button
              color='primary'
              onClick={() => setEditing(true)}
              sx={{ mt: 2 }}
              variant='contained'
            >
              Edit Profile
            </Button>
          </div>
        ) : (
          <ProfileForm onSubmit={onSubmit} profile={profile} />
        )}
      </Container>
    </Layout>
  )
}

export default Profile
