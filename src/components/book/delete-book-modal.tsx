// DeleteConfirmationDialog.tsx
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material"

interface DeleteConfirmationDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

const DeleteConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
}: DeleteConfirmationDialogProps) => (
  <Dialog onClose={onClose} open={open}>
    <DialogTitle>Delete Book?</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are you sure you want to delete this book? This action cannot be undone.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button color='primary' onClick={onClose}>
        Cancel
      </Button>
      <Button color='error' onClick={onConfirm}>
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
)

export default DeleteConfirmationDialog
