import { useEffect, useState } from "react"

import { yupResolver } from "@hookform/resolvers/yup"
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material"
import Grid from "@mui/material/Grid2"
import { useForm, SubmitHandler } from "react-hook-form"
import { ApiResponseUserProfile, ProfileFormValues } from "src/types/data-types"
import * as Yup from "yup"

import FileDropzone from "../utility-components/file-dropzone"

interface ProfileFormProps {
  profile: ApiResponseUserProfile | null
  onSubmit: SubmitHandler<ProfileFormValues>
  open: boolean
  onClose: () => void
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  address: Yup.string().optional(),
  profileImage: Yup.mixed<File>().optional(),
  dob: Yup.string().optional(),
  gender: Yup.string().optional(),
})

const ProfileForm = ({
  onSubmit,
  profile,
  open,
  onClose,
}: ProfileFormProps) => {
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null,
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: profile?.name,
      email: profile?.email,
      phone: profile?.phone,
      address: profile?.address,
      dob: profile?.dob,
      gender: profile?.gender,
    },
  })

  useEffect(() => {
    if (profile?.profile_image) {
      setProfileImagePreview(profile.profile_image)
    }
  }, [profile])

  const submitHandler: SubmitHandler<ProfileFormValues> = async (data) => {
    await onSubmit(data)
    setProfileImagePreview(null)
  }

  const handleFileSelect = (file: File) => {
    setValue("profileImage", file)
    const previewUrl = URL.createObjectURL(file)
    setProfileImagePreview(previewUrl)
  }

  return (
    <Dialog fullWidth maxWidth='md' onClose={onClose} open={open}>
      <DialogTitle>Edit Profile</DialogTitle>
      <form onSubmit={handleSubmit(submitHandler)}>
        <DialogContent>
          <Grid container spacing={2} sx={{ color: "white" }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label='Name'
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label='Email'
                type='email'
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label='Phone'
                {...register("phone")}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label='Address'
                {...register("address")}
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label='Date of Birth'
                type='date'
                {...register("dob")}
                defaultValue={profile?.dob ? profile.dob : ""}
                error={!!errors.dob}
                helperText={errors.dob?.message}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl error={!!errors.gender} fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  {...register("gender")}
                  MenuProps={{
                    PaperProps: {
                      sx: { maxHeight: 250 },
                    },
                  }}
                  defaultValue={profile?.gender || ""}
                  label='Gender'
                >
                  <MenuItem value=''>Select Gender</MenuItem>
                  <MenuItem value='male'>Male</MenuItem>
                  <MenuItem value='female'>Female</MenuItem>
                  <MenuItem value='other'>Other</MenuItem>
                </Select>
                {errors.gender && (
                  <Typography color='error'>{errors.gender.message}</Typography>
                )}
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FileDropzone
                errorMessage={errors.profileImage?.message}
                label='Upload Cover Image'
                onFileSelect={handleFileSelect}
              />

              {profileImagePreview && (
                <img
                  alt='Cover Preview'
                  src={profileImagePreview}
                  style={{
                    width: "100%",
                    maxWidth: "300px",
                    marginTop: "10px",
                    borderRadius: "8px",
                  }}
                />
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={onClose} variant='outlined'>
            Cancel
          </Button>
          <Button
            color='primary'
            sx={{ bgcolor: "#001F3F" }}
            type='submit'
            variant='contained'
          >
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default ProfileForm
