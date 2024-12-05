import { useState, useCallback } from "react"

import AddIcon from "@mui/icons-material/Add"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import RemoveIcon from "@mui/icons-material/Remove"
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  FormHelperText,
} from "@mui/material"
import debounce from "lodash.debounce"
interface CartItemProps {
  id: string
  title: string
  author: string
  price: number
  quantity: number
  stock_quantity: number
  handleRemove: (id: string) => void
  updateCartQuantity: (id: string, quantity: number) => void
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
}: CartItemProps) => {
  const [itemQuantity, setItemQuantity] = useState(quantity)
  const [error, setError] = useState<string>("")

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
      setError("")
    } else {
      setError(`Maximum available stock is ${stock_quantity}`)
    }
  }

  const handleDecrement = () => {
    if (itemQuantity > 1) {
      const newQuantity = itemQuantity - 1
      setItemQuantity(newQuantity)
      debouncedUpdateQuantity(id, newQuantity)
      setError("")
    } else {
      setError("Minimum quantity is 1.")
    }
  }

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        marginBottom: 2,
      }}
      variant='outlined'
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography fontWeight='bold' variant='h6'>
          {title}
        </Typography>
        <Typography variant='body2'>Author: {author}</Typography>
        <Typography variant='body2'>Price: Rs {price}</Typography>
      </CardContent>
      <Box>
        <Box style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <IconButton disabled={itemQuantity <= 1} onClick={handleDecrement}>
            <RemoveIcon />
          </IconButton>
          <Typography>{itemQuantity}</Typography>
          <IconButton
            disabled={itemQuantity >= stock_quantity}
            onClick={handleIncrement}
          >
            <AddIcon />
          </IconButton>

          <IconButton color='error' onClick={() => handleRemove(id)}>
            <DeleteForeverIcon />
          </IconButton>
        </Box>

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

        {error && (
          <FormHelperText error sx={{ marginTop: 1 }}>
            {error}
          </FormHelperText>
        )}
      </Box>
    </Card>
  )
}

export default CartItem
