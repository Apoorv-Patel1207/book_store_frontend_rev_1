import { useState, useCallback } from "react"

import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import {
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  FormHelperText,
} from "@mui/material"
import debounce from "lodash.debounce"

interface CartItemProps {
  id: number
  title: string
  author: string
  price: number
  quantity: number
  stock_quantity: number
  handleRemove: (id: number) => void
  updateCartQuantity: (id: number, quantity: number) => void
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
  const [itemQuantity, setItemQuantity] = useState(quantity) // Local UI state
  const [error, setError] = useState<string>("")

  // Function to handle API call for updating quantity
  const debouncedUpdateQuantity = useCallback(
    debounce((id: number, newQuantity: number) => {
      updateCartQuantity(id, newQuantity)
    }, 500),
    [updateCartQuantity],
  )

  // Handle increment action
  const handleIncrement = () => {
    if (itemQuantity < stock_quantity) {
      const newQuantity = itemQuantity + 1
      setItemQuantity(newQuantity) // Update UI immediately
      debouncedUpdateQuantity(id, newQuantity) // Debounced API call
      setError("")
    } else {
      setError(`Maximum available stock is ${stock_quantity}`)
    }
  }

  // Handle decrement action
  const handleDecrement = () => {
    if (itemQuantity > 1) {
      const newQuantity = itemQuantity - 1
      setItemQuantity(newQuantity) // Update UI immediately
      debouncedUpdateQuantity(id, newQuantity) // Debounced API call
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
        <Typography variant='body2'>Price: Rs {price.toFixed(2)}</Typography>
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
          <Button
            color='error'
            onClick={() => handleRemove(id)}
            variant='contained'
          >
            Remove
          </Button>
        </Box>
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
