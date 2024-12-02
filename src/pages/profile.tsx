"use client"

import { useEffect, useState } from "react"

import { yupResolver } from "@hookform/resolvers/yup"
import { Container, TextField, Button, Typography, Grid } from "@mui/material"
import {
  useForm,
  Controller,
  SubmitHandler,
  UseFormProps,
} from "react-hook-form"
import { useUserID } from "src/components/auth/userID"
import PageHeading from "src/components/utility-components/page-headings"
import {
  getUserProfile,
  updateUserProfile,
} from "src/service/user-profile-service"
import { UserProfile } from "src/types/data-types"
import * as Yup from "yup"

import Layout from "../components/layout/layout"

// Form value types
interface ProfileFormValues {
  name: string
  email: string
  phone: string
  address?: string
  profileImage?: string
  dob?: string
  gender?: string
}

// Validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  address: Yup.string().optional(),
  profileImage: Yup.string().url("Must be a valid URL").optional(),
  dob: Yup.string().optional(),
  gender: Yup.string().optional(),
})

const Profile = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [editing, setEditing] = useState<boolean>(false)
  const [profile, setProfile] = useState<UserProfile | null>(null)

  const userID = useUserID()

  // React Hook Form configuration
  const formConfig: UseFormProps<ProfileFormValues> = {
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      profileImage: "",
      dob: "",
      gender: "",
    },
    resolver: yupResolver(validationSchema),
    mode: "all",
  }

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileFormValues>(formConfig)

  // Fetch user profile
  useEffect(() => {
    if (!userID) return

    const fetchUserProfile = async () => {
      setLoading(true)
      try {
        const data = await getUserProfile(userID)
        if (data) {
          setProfile(data)
          reset(data) // Populate form with fetched data
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
  }, [userID, reset])

  // Form submission handler
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
                <Grid item key={item.value} xs={12}>
                  <Typography variant='h6'>
                    {item.label}: {item.value || "N/A"}
                  </Typography>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Typography variant='h6'>Profile Image:</Typography>
                {profile?.profileImage && (
                  <img
                    alt='profile'
                    src={profile.profileImage}
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
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {[
                { name: "name", label: "Name", type: "text" },
                { name: "email", label: "Email", type: "email" },
                { name: "phone", label: "Phone", type: "text" },
                { name: "address", label: "Address", type: "text" },
                {
                  name: "profileImage",
                  label: "Profile Image URL",
                  type: "text",
                },
                { name: "dob", label: "Date of Birth", type: "date" },
                { name: "gender", label: "Gender", type: "text" },
              ].map((field) => (
                <Grid item key={field.name} xs={12}>
                  <Controller
                    control={control}
                    name={field.name as keyof ProfileFormValues}
                    render={({ field: controllerField }) => (
                      <TextField
                        {...controllerField}
                        error={!!errors[field.name as keyof ProfileFormValues]}
                        fullWidth
                        helperText={
                          errors[field.name as keyof ProfileFormValues]?.message
                        }
                        label={field.label}
                        type={field.type}
                      />
                    )}
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <Button
                  color='primary'
                  disabled={isSubmitting}
                  sx={{ mt: 2 }}
                  type='submit'
                  variant='contained'
                >
                  Save Changes
                </Button>
                <Button
                  onClick={() => setEditing(false)}
                  sx={{ mt: 2, ml: 2 }}
                  variant='outlined'
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Container>
    </Layout>
  )
}

export default Profile
