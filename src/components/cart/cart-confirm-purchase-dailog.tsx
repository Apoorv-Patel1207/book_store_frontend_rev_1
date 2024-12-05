import { yupResolver } from "@hookform/resolvers/yup"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  TextField,
  DialogActions,
  Button,
} from "@mui/material"
import { useForm, SubmitHandler } from "react-hook-form"
import {
  ApiResponseUserProfile,
  RecipientUserProfile,
} from "src/types/data-types"
import * as Yup from "yup"

interface CartConfirmPurchaseDailogProps {
  isCheckoutModalOpen: boolean
  handleCloseCheckoutModal: () => void
  totalCost: number
  handleConfirmBuy: (data: RecipientUserProfile) => Promise<void>
  isPlacingOrder: boolean
  userData: ApiResponseUserProfile | null
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string()
    .required("Mobile Number is required")
    .matches(/^\d{10}$/, "Mobile Number must be 10 digits"),
  address: Yup.string().required("Address is required"),
})

const CartConfirmPurchaseDailog = (props: CartConfirmPurchaseDailogProps) => {
  const {
    isCheckoutModalOpen,
    handleCloseCheckoutModal,
    totalCost,
    handleConfirmBuy,
    isPlacingOrder,
    userData,
  } = props

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipientUserProfile>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: userData?.name,
      phone: userData?.phone,
      address: userData?.address,
    },
  })

  const onSubmit: SubmitHandler<RecipientUserProfile> = async (data) => {
    await handleConfirmBuy(data)
  }

  return (
    <Dialog onClose={handleCloseCheckoutModal} open={isCheckoutModalOpen}>
      <DialogTitle>Confirm Checkout</DialogTitle>
      <DialogContent>
        <Typography>
          Please confirm your details before proceeding. Your total is ₹{" "}
          {totalCost}.
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
          }}
        >
          <TextField
            fullWidth
            label='Name'
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            variant='outlined'
          />
          <TextField
            fullWidth
            label='Mobile Number'
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            variant='outlined'
          />
          <TextField
            fullWidth
            label='Address'
            multiline
            rows={3}
            {...register("address")}
            error={!!errors.address}
            helperText={errors.address?.message}
            variant='outlined'
          />
          <DialogActions>
            <Button color='primary' onClick={handleCloseCheckoutModal}>
              Cancel
            </Button>
            <Button
              color='primary'
              disabled={isPlacingOrder}
              sx={{ ml: 1 }}
              type='submit'
              variant='contained'
            >
              {isPlacingOrder ? "Placing Order..." : "Confirm Buy"}
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default CartConfirmPurchaseDailog
