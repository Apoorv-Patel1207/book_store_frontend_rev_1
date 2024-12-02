import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
} from "@mui/material"

interface ConfirmPurchaseDialogProps {
  isClearCartModalOpen: boolean
  handleCloseClearCartModal: () => void
  handleConfirmClearCart: () => void
}

const ClearCartDialog = (props: ConfirmPurchaseDialogProps) => {
  const {
    isClearCartModalOpen,
    handleCloseClearCartModal,
    handleConfirmClearCart,
  } = props
  return (
    <Dialog onClose={handleCloseClearCartModal} open={isClearCartModalOpen}>
      <DialogTitle>Clear Cart</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to clear the cart?</Typography>
      </DialogContent>
      <DialogActions>
        <Button color='primary' onClick={handleCloseClearCartModal}>
          Cancel
        </Button>
        <Button color='secondary' onClick={handleConfirmClearCart}>
          Clear
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ClearCartDialog
