import { useState, useCallback } from "react"

import AddIcon from "@mui/icons-material/Add"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import RemoveIcon from "@mui/icons-material/Remove"
import {
  Avatar,
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material"
import debounce from "lodash.debounce"
import { useNavigate } from "react-router-dom"

interface CartItemProps {
  id: string
  title: string
  author: string
  price: number
  quantity: number
  stock_quantity: number
  handleRemove: (id: string) => void
  updateCartQuantity: (id: string, quantity: number) => void
  cover_image: string
}

const CartItem = ({
  id,
  title,
  author,
  price,
  quantity,
  stock_quantity,
  handleRemove,
  updateCartQuantity,
  cover_image,
}: CartItemProps) => {
  const [itemQuantity, setItemQuantity] = useState(quantity)

  const debouncedUpdateQuantity = useCallback(
    debounce((id: string, newQuantity: number) => {
      updateCartQuantity(id, newQuantity)
    }, 500),
    [updateCartQuantity],
  )

  const handleIncrement = () => {
    if (itemQuantity < stock_quantity) {
      const newQuantity = itemQuantity + 1
      setItemQuantity(newQuantity)
      debouncedUpdateQuantity(id, newQuantity)
    }
  }

  const handleDecrement = () => {
    if (itemQuantity > 1) {
      const newQuantity = itemQuantity - 1
      setItemQuantity(newQuantity)
      debouncedUpdateQuantity(id, newQuantity)
    }
  }
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(`/book-details/${id}`)
  }

  return (
    <TableRow>
      <TableCell>
        <Avatar
          alt={title}
          onClick={handleCardClick}
          src={cover_image}
          sx={{ width: 56, height: 56, cursor: "pointer" }}
          variant='rounded'
        />
      </TableCell>
      <TableCell onClick={handleCardClick} sx={{ cursor: "pointer" }}>
        <Typography>{title}</Typography> <Typography>{author}</Typography>
      </TableCell>
      <TableCell>₹ {price}</TableCell>
      <TableCell>
        <Stack alignItems='center' direction='row'>
          <IconButton
            color='error'
            disabled={itemQuantity <= 1}
            onClick={handleDecrement}
          >
            <RemoveIcon />
          </IconButton>

          <Typography>{itemQuantity}</Typography>
          <IconButton
            color='success'
            disabled={itemQuantity >= stock_quantity}
            onClick={handleIncrement}
          >
            <AddIcon />
          </IconButton>
        </Stack>
        {itemQuantity > stock_quantity && (
          <Typography
            sx={{
              color: "error.main",
              fontWeight: "bold",
              fontSize: "12px",
            }}
          >
            Only {stock_quantity} left! Please adjust quantity
          </Typography>
        )}
      </TableCell>
      <TableCell>₹ {price * quantity}</TableCell>
      <TableCell>
        {" "}
        <IconButton color='error' onClick={() => handleRemove(id)}>
          <DeleteForeverIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export default CartItem
