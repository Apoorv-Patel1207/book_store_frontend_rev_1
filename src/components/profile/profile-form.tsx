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
  profileImage: Yup.string().url("Must be a valid URL").optional(),
  dob: Yup.string().optional(),
  gender: Yup.string().optional(),
})

const ProfileForm = ({
  onSubmit,
  profile,
  open,
  onClose,
}: ProfileFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: profile?.name,
      email: profile?.email,
      phone: profile?.phone,
      address: profile?.address,
      profileImage: profile?.profile_image,
      dob: profile?.dob,
      gender: profile?.gender || "",
    },
  })

  return (
    <Dialog fullWidth maxWidth='md' onClose={onClose} open={open}>
      <DialogTitle>Edit Profile</DialogTitle>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
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
                label='Profile Image URL'
                {...register("profileImage")}
                error={!!errors.profileImage}
                helperText={errors.profileImage?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label='Date of Birth'
                type='date'
                {...register("dob")}
                error={!!errors.dob}
                helperText={errors.dob?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl error={!!errors.gender} fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select {...register("gender")} defaultValue=''>
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
