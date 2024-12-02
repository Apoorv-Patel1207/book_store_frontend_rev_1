import React, { useState } from "react"

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material"
import { updateBook } from "src/service/book-service"
import { Book } from "src/types/data-types"

interface UpdateBookModalProps {
  book: Book
  open: boolean
  onClose: () => void
  handleUpdateBook: (updatedBook: Book) => void
}

const UpdateBookModal: React.FC<UpdateBookModalProps> = ({
  book,
  open,
  onClose,
  handleUpdateBook,
}) => {
  const [price, setPrice] = useState(book.price)
  const [stockQuantity, setStockQuantity] = useState(book.stockQuantity)
  const [loading, setLoading] = useState(false)

  const handleUpdate = async () => {
    setLoading(true)
    try {
      const updatedBook = (await updateBook(book.id, {
        price,
        stockQuantity,
      })) as Book
      handleUpdateBook(updatedBook)
      onClose() // Close the modal
    } catch (err) {
      alert("Failed to update book.")
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Update Book</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You can update the price and stock quantity of this book.
        </DialogContentText>
        <Box display='flex' flexDirection='column' gap={2} marginTop={2}>
          <TextField
            fullWidth
            label='Price'
            onChange={(e) => setPrice(Number(e.target.value))}
            type='number'
            value={price}
            variant='outlined'
          />
          <TextField
            fullWidth
            label='Stock Quantity'
            onChange={(e) => setStockQuantity(Number(e.target.value))}
            type='number'
            value={stockQuantity}
            variant='outlined'
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color='primary' onClick={onClose}>
          Cancel
        </Button>
        <Button color='primary' disabled={loading} onClick={handleUpdate}>
          {loading ? "Updating..." : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UpdateBookModal
