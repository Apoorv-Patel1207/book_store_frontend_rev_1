import { SetStateAction } from "react"

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
import { UserProfile } from "src/types/data-types"

interface CartConfirmPurchaseDailogProps {
  isCheckoutModalOpen: boolean
  handleCloseCheckoutModal: () => void
  totalCost: number
  userProfile: UserProfile | null
  setUserProfile: (value: SetStateAction<UserProfile | null>) => void
  handleConfirmBuy: () => Promise<void>
  isPlacingOrder: boolean
}

const CartConfirmPurchaseDailog = (props: CartConfirmPurchaseDailogProps) => {
  const {
    isCheckoutModalOpen,
    handleCloseCheckoutModal,
    totalCost,
    userProfile,
    setUserProfile,
    handleConfirmBuy,
    isPlacingOrder,
  } = props
  return (
    <Dialog onClose={handleCloseCheckoutModal} open={isCheckoutModalOpen}>
      <DialogTitle>Confirm Checkout</DialogTitle>
      <DialogContent>
        <Typography>
          Please confirm your details before proceeding. Your total is Rs{" "}
          {totalCost.toFixed(2)}.
        </Typography>
        <Box
          component='form'
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
            onChange={(e) =>
              setUserProfile((prev) =>
                prev ? { ...prev, name: e.target.value } : null,
              )
            }
            value={userProfile?.name || ""}
            variant='outlined'
          />
          <TextField
            fullWidth
            label='Mobile Number'
            onChange={(e) =>
              setUserProfile((prev) =>
                prev ? { ...prev, phone: e.target.value } : null,
              )
            }
            value={userProfile?.phone || ""}
            variant='outlined'
          />
          <TextField
            fullWidth
            label='Address'
            multiline
            onChange={(e) =>
              setUserProfile((prev) =>
                prev ? { ...prev, address: e.target.value } : null,
              )
            }
            rows={3}
            value={userProfile?.address || ""}
            variant='outlined'
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color='primary' onClick={handleCloseCheckoutModal}>
          Cancel
        </Button>
        <Button
          color='primary'
          disabled={isPlacingOrder}
          onClick={handleConfirmBuy}
          sx={{ ml: 1 }}
          variant='contained'
        >
          {isPlacingOrder ? "Placing Order..." : "Confirm Buy"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CartConfirmPurchaseDailog
