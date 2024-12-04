import { SetStateAction } from "react"

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  CardMedia,
  Divider,
  TextField,
  Typography,
} from "@mui/material"
import { ApiResponseBook, ApiResponseUserProfile } from "src/types/data-types"

interface ConfirmPurchaseDialogProps {
  isModalOpen: boolean
  handleCloseModal: () => void
  book: ApiResponseBook
  quantity: number
  userProfile: ApiResponseUserProfile | null
  isPlacingOrder: boolean
  handleConfirmBuy: () => Promise<void>
  setUserProfile: (value: SetStateAction<ApiResponseUserProfile | null>) => void
}

const ConfirmPurchaseDialog = ({
  isModalOpen,
  handleCloseModal,
  book,
  quantity,
  userProfile,
  isPlacingOrder,
  handleConfirmBuy,
  setUserProfile,
}: ConfirmPurchaseDialogProps) => (
  <Dialog fullWidth maxWidth='xs' onClose={handleCloseModal} open={isModalOpen}>
    <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
      <CheckCircleOutlineIcon
        color='success'
        sx={{ marginRight: 1, fontSize: 30 }}
      />
      Confirm Purchase
    </DialogTitle>
    <DialogContent>
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
    <DialogActions sx={{ justifyContent: "center", mb: 2 }}>
      <Button color='error' onClick={handleCloseModal} variant='outlined'>
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

export default ConfirmPurchaseDialog
