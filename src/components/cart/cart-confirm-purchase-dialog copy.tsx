import { useState } from "react"

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
  AlertColor,
} from "@mui/material"
import { useForm, SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { placeOrder } from "src/service/order-service"
import {
  ApiResponseUserProfile,
  Order,
  RecipientUserProfile,
  CartItem as CartItemType,
} from "src/types/data-types"
import * as Yup from "yup"

interface CartConfirmPurchaseDailogProps {
  isCheckoutModalOpen: boolean
  handleCloseCheckoutModal: () => void
  totalCost: number
  userData: ApiResponseUserProfile | null
  showSnackbar: (message: string, type?: AlertColor) => void
  cartItems: CartItemType[]
  handleClearCart: () => Promise<void>
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string()
    .required("Mobile Number is required")
    .matches(/^\d{10}$/, "Mobile Number must be 10 digits"),
  address: Yup.string().required("Address is required"),
})

const CartConfirmPurchaseDialog = (props: CartConfirmPurchaseDailogProps) => {
  const {
    isCheckoutModalOpen,
    handleCloseCheckoutModal,
    totalCost,
    userData,
    showSnackbar,
    cartItems,
    handleClearCart,
  } = props

  const navigate = useNavigate()

  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

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

  const userID = userData?.user_id

  const handleConfirmBuy = async (data: RecipientUserProfile) => {
    if (!userID) {
      showSnackbar(
        "Please login and complete your profile to continue.",
        "error",
      )
      return
    }

    setIsPlacingOrder(true)

    const order: Order = {
      items: cartItems,
      total_amount: Number(totalCost.toFixed(2)),
      recipient_name: data.name,
      recipient_phone: data.phone,
      shipping_address: data.address,
    }

    try {
      const response = await placeOrder(order, userID)
      showSnackbar("Order placed successfully!", "success")
      handleCloseCheckoutModal()
      handleClearCart().catch((err) => {
        console.error("Error clearing the cart:", err)
      })
      if (response.order_id) navigate(`/checkout/${response.order_id}`)
    } catch (err) {
      showSnackbar("Failed to place order. Please try again.", "error")
      console.error(err)
    } finally {
      setIsPlacingOrder(false)
    }
  }

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

export default CartConfirmPurchaseDialog
