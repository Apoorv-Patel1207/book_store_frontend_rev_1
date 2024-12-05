import { useState } from "react"

import { yupResolver } from "@hookform/resolvers/yup"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
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
  CardMedia,
  Divider,
} from "@mui/material"
import { useForm, SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { placeOrder } from "src/service/order-service"
import {
  Order,
  RecipientUserProfile,
  CartItem as CartItemType,
  ApiResponseBook,
} from "src/types/data-types"
import * as Yup from "yup"

import { useUser } from "../context/user-context"
// import { useIsMobile } from "../utility-components/screen-size"

interface CartConfirmPurchaseDialogProps {
  isBulkPurchase: boolean
  isCheckoutModalOpen: boolean
  handleCloseCheckoutModal: () => void
  showSnackbar: (message: string, type?: AlertColor) => void
  cartItems?: CartItemType[]
  totalCost?: number
  handleClearCart?: () => Promise<void>
  book?: ApiResponseBook
  quantity?: number
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string()
    .required("Mobile Number is required")
    .matches(/^\d{10}$/, "Mobile Number must be 10 digits"),
  address: Yup.string().required("Address is required"),
})

const ConfirmPurchaseDialog = (props: CartConfirmPurchaseDialogProps) => {
  const {
    // isBulkPurchase,
    isCheckoutModalOpen,
    handleCloseCheckoutModal,
    totalCost,
    showSnackbar,
    cartItems,
    handleClearCart,
    book,
    quantity,
  } = props

  const navigate = useNavigate()
  const { userData } = useUser()

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

    try {
      const order: Order = {
        items: [],
        total_amount: 0,
        recipient_name: data.name,
        recipient_phone: data.phone,
        shipping_address: data.address,
      }

      if (book && quantity) {
        order.items = [{ ...book, quantity }]
        order.total_amount = book.price * quantity
      } else if (cartItems && totalCost && totalCost !== 0) {
        order.items = cartItems
        order.total_amount = Number(totalCost.toFixed(2))
      } else {
        throw new Error(
          "No items to order. Please add books to cart or select a book.",
        )
      }

      const response = await placeOrder(order, userID)
      showSnackbar("Order placed successfully!", "success")
      handleCloseCheckoutModal()
      if (handleClearCart) {
        handleClearCart().catch((err) => {
          console.error("Error clearing the cart:", err)
        })
      }
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

  // const isMobile = useIsMobile()

  return (
    <Dialog
      fullWidth
      // maxWidth={isMobile ? "xs" : "sm"}
      onClose={handleCloseCheckoutModal}
      open={isCheckoutModalOpen}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
        <CheckCircleOutlineIcon
          color='success'
          sx={{ marginRight: 1, fontSize: 30 }}
        />
        Confirm Purchase
      </DialogTitle>
      <DialogContent>
        {book && quantity ? (
          <Box alignItems='center' display='flex' flexDirection='column'>
            <CardMedia
              alt={book.title}
              component='img'
              height='150'
              image={book.cover_image}
              sx={{ objectFit: "cover", borderRadius: 2, mb: 2 }}
            />
            <Typography fontWeight='bold' variant='h6'>
              {book.title}
            </Typography>
            <Typography color='text.secondary' variant='subtitle1'>
              by {book.author}
            </Typography>
            <Divider sx={{ my: 2, width: "100%" }} />
            <Typography variant='body1'>Quantity: {quantity}</Typography>
            <Typography gutterBottom variant='body1'>
              Total: ₹ {book.price * quantity}
            </Typography>
          </Box>
        ) : (
          <Typography>
            Please confirm your details before proceeding. Your total is ₹{" "}
            {totalCost}.
          </Typography>
        )}
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
            <Button
              color='error'
              onClick={handleCloseCheckoutModal}
              variant='outlined'
            >
              Cancel
            </Button>
            <Button
              color='primary'
              disabled={isPlacingOrder}
              sx={{ ml: 1, bgcolor: "#001F3F" }}
              type='submit'
              variant='contained'
            >
              {isPlacingOrder ? "Buying..." : "Confirm"}
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmPurchaseDialog
