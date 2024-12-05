import { useEffect, useState } from "react"

import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import {
  Typography,
  Button,
  Container,
  Paper,
  Box,
  AlertColor,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import ClearCartDialog from "src/components/cart/clear-cart-dialog"
import { useUser } from "src/components/context/user-context"
import ConfirmPurchaseDialog from "src/components/order/confirm-purchase-dialog"
import Loading from "src/components/utility-components/loading"
import NoDataFound from "src/components/utility-components/no-data"
import PageHeading from "src/components/utility-components/page-headings"
import SnackbarAlert from "src/components/utility-components/snackbar"

import CartItem from "../components/cart/cart-item"
import Layout from "../components/layout/layout"
import {
  fetchCartItems,
  removeFromCart,
  clearCart,
  updateCartQuantityService,
} from "../service/cart-service"
import { CartItem as CartItemType } from "../types/data-types"

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false)
  const [isClearCartModalOpen, setIsClearCartModalOpen] = useState(false)

  const navigate = useNavigate()

  const { userData } = useUser()
  const userID = userData?.user_id

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success" as AlertColor,
  })

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }))
  }

  const showSnackbar = (message: string, type: AlertColor = "success") => {
    setSnackbar({ open: true, message, type })
  }

  useEffect(() => {
    const getCartItems = async () => {
      if (!userID) {
        showSnackbar("Please login to continue", "error")
        return
      }

      try {
        const items = await fetchCartItems(userID)
        setCartItems(items)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    if (userID) {
      getCartItems().catch((err) => {
        console.error("Error loading book details:", err)
      })
    }
  }, [userID])

  const handleRemove = async (id: string) => {
    if (!userID) return
    try {
      console.log("userID", userID, "id", id)
      await removeFromCart(userID, id)
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.book_id !== id),
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove item")
    }
  }

  const updateCartQuantity = async (id: string, quantity: number) => {
    if (!userID) return

    try {
      await updateCartQuantityService(userID, id, quantity)
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.book_id === id ? { ...item, quantity } : item,
        ),
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update quantity")
    }
  }

  const handleClearCart = async () => {
    if (!userID) return

    try {
      await clearCart(userID)
      setCartItems([])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to clear cart")
    }
  }

  const handleOpenCheckoutModal = () => setIsCheckoutModalOpen(true)
  const handleCloseCheckoutModal = () => setIsCheckoutModalOpen(false)
  const handleOpenClearCartModal = () => setIsClearCartModalOpen(true)
  const handleCloseClearCartModal = () => setIsClearCartModalOpen(false)

  const totalCost = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )

  const handleConfirmClearCart = () => {
    handleClearCart().catch((err) => {
      console.error("Error clearing the cart:", err)
    })
    handleCloseClearCartModal()
  }

  const isCheckoutDisabled =
    cartItems.length === 0 ||
    cartItems.some((item) => item.quantity > item.stock_quantity)

  if (loading) {
    return (
      <Layout>
        <Container maxWidth='lg' sx={{ marginTop: 4 }}>
          <Loading />
        </Container>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <Container maxWidth='lg' sx={{ marginTop: 4 }}>
          <Typography color='error' textAlign='center'>
            {error}
          </Typography>
        </Container>
      </Layout>
    )
  }

  return (
    <Layout>
      <Container maxWidth='lg'>
        <PageHeading>Shopping Cart</PageHeading>

        {cartItems.length === 0 ? (
          <NoDataFound description=' You have not added anything on card yet.' />
        ) : (
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Box style={{ marginBottom: "16px" }}>
              {cartItems.map((item) => (
                <CartItem
                  author={item.author}
                  handleRemove={handleRemove}
                  id={item.book_id}
                  key={item.book_id}
                  price={item.price}
                  quantity={item.quantity}
                  stock_quantity={item.stock_quantity}
                  title={item.title}
                  updateCartQuantity={updateCartQuantity}
                />
              ))}
            </Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography component='h2' variant='h6'>
                Total: Rs {totalCost.toFixed(2)}
              </Typography>
              <Box>
                <Button
                  color='error'
                  disabled={cartItems.length === 0}
                  onClick={handleOpenClearCartModal}
                  variant='outlined'
                >
                  Clear Cart
                </Button>
                <Button
                  color='primary'
                  disabled={isCheckoutDisabled}
                  onClick={handleOpenCheckoutModal}
                  sx={{ marginLeft: "8px", bgcolor: "#001F3F" }}
                  variant='contained'
                >
                  Proceed to Checkout
                </Button>
              </Box>
            </Box>
          </Paper>
        )}

        <Button
          onClick={() => navigate("/")}
          startIcon={<ArrowBackIcon />}
          sx={{
            color: "#001F3F",
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "14px",
            mt: 2,
          }}
          variant='text'
        >
          Back to Books
        </Button>

        <ConfirmPurchaseDialog
          cartItems={cartItems}
          handleClearCart={handleClearCart}
          handleCloseCheckoutModal={handleCloseCheckoutModal}
          isBulkPurchase={true}
          isCheckoutModalOpen={isCheckoutModalOpen}
          showSnackbar={showSnackbar}
          totalCost={totalCost}
        />

        <ClearCartDialog
          handleCloseClearCartModal={handleCloseClearCartModal}
          handleConfirmClearCart={handleConfirmClearCart}
          isClearCartModalOpen={isClearCartModalOpen}
        />

        <SnackbarAlert
          message={snackbar.message}
          onClose={handleSnackbarClose}
          open={snackbar.open}
          type={snackbar.type}
        />
      </Container>
    </Layout>
  )
}

export default Cart
