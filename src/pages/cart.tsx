import { useEffect, useState } from "react"

import {
  Typography,
  Button,
  Container,
  Paper,
  Box,
  AlertColor,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import CartConfirmPurchaseDailog from "src/components/cart/cart-confirm-purchase-dailog"
import ClearCartDialog from "src/components/cart/clear-cart-dialog"
import { useUser } from "src/components/context/user-context"
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
import { placeOrder } from "../service/order-service"
import {
  CartItem as CartItemType,
  Order,
  UserProfile,
} from "../types/data-types"

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false)
  const [isClearCartModalOpen, setIsClearCartModalOpen] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  const navigate = useNavigate()

  const { userData } = useUser()
  const userID = userData?.userId

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

  // Update user profile when userData changes
  useEffect(() => {
    if (userData) {
      setUserProfile(userData)
    }
  }, [userData])

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

  // if (!userID) {
  //   showSnackbar("Redirecting as user is not logged in", "error")
  //   navigate("/not-logged-in")
  //   return
  // }

  const handleRemove = async (id: number) => {
    if (!userID) return
    try {
      await removeFromCart(userID, id)
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove item")
    }
  }

  const updateCartQuantity = async (id: number, quantity: number) => {
    if (!userID) return

    try {
      await updateCartQuantityService(userID, id, quantity)
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity } : item,
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

  const handleConfirmBuy = async () => {
    if (!userProfile) {
      showSnackbar(
        "Please login and complete your profile to continue.",
        "error",
      )
      return
    }

    setIsPlacingOrder(true)
    if (!userID) return

    const order: Order = {
      items: cartItems,
      total_amount: Number(totalCost.toFixed(2)),
      userProfile,
    }

    try {
      const response = await placeOrder(order, userID)
      showSnackbar("Order placed successfully!", "success")
      handleCloseCheckoutModal()
      handleClearCart().catch((err) => {
        console.error("Error clearing the cart:", err)
      })
      if (response.order_id) navigate(`/checkout/${response.order_id}`)
    } catch (err) {
      showSnackbar("Failed to place order. Please try again.", "error")
      console.error(err)
    } finally {
      setIsPlacingOrder(false)
    }
  }

  const handleConfirmClearCart = () => {
    handleClearCart().catch((err) => {
      console.error("Error clearing the cart:", err)
    })
    handleCloseClearCartModal()
  }

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
                  key={item.id}
                  {...item}
                  handleRemove={handleRemove}
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
                  color='primary'
                  disabled={cartItems.length === 0}
                  onClick={handleOpenClearCartModal}
                  variant='outlined'
                >
                  Clear Cart
                </Button>
                <Button
                  color='primary'
                  disabled={cartItems.length === 0}
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

        <CartConfirmPurchaseDailog
          handleCloseCheckoutModal={handleCloseCheckoutModal}
          handleConfirmBuy={handleConfirmBuy}
          isCheckoutModalOpen={isCheckoutModalOpen}
          isPlacingOrder={isPlacingOrder}
          setUserProfile={setUserProfile}
          totalCost={totalCost}
          userProfile={userProfile}
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
