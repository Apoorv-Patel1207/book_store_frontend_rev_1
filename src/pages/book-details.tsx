import { useEffect, useState } from "react"

import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  CircularProgress,
  Box,
  AlertColor,
} from "@mui/material"
import Grid from "@mui/material/Grid2"
import { useParams, useNavigate } from "react-router-dom"
import { useUserID } from "src/components/auth/userID"
import ConfirmPurchaseDialog from "src/components/book-details/confirm-purchase-dialog"
import { useIsMobile } from "src/components/utility-components/screen-size"
import SnackbarAlert from "src/components/utility-components/snackbar"
import { getUserProfile } from "src/service/user-profile-service"

import Layout from "../components/layout/layout"
import { addToCart } from "../service/cart-service"
import { placeOrder } from "../service/order-service"
import {
  Book,
  CartItem,
  Order,
  ApiResponseUserProfile,
} from "../types/data-types"

const BookDetails = () => {
  const { id } = useParams<{ id: string }>()
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userProfile, setUserProfile] = useState<ApiResponseUserProfile | null>(
    null,
  )

  const navigate = useNavigate()
  const userID = useUserID()

  const isMobile = useIsMobile()

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success" as AlertColor,
  })

  const [quantityError, setQuantityError] = useState<string | null>(null)

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }))
  }

  const showSnackbar = (message: string, type: AlertColor = "success") => {
    setSnackbar({ open: true, message, type })
  }

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        if (id) {
          const response = await fetch(`http://localhost:5000/api/books/${id}`)

          if (!response.ok) {
            throw new Error("Failed to fetch book details")
          }
          const data = (await response.json()) as Book
          setBook(data)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    // fetchBookDetails()

    fetchBookDetails().catch((err) => {
      console.error("Error loading book details:", err)
    })
  }, [id])

  useEffect(() => {
    const getProfile = async () => {
      if (!userID) return
      try {
        const profile = await getUserProfile(userID)
        setUserProfile(profile)
      } catch (err) {
        console.error("Failed to fetch user profile:", err)
      }
    }
    getProfile().catch((err) => {
      console.error("Error getting the profile details:", err)
    })
  }, [userID])

  const handleBuyNow = () => {
    setIsModalOpen(true)
  }

  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleConfirmBuy = async () => {
    if (!book) {
      console.error("Book data is missing.")
      return
    }

    if (!userID || !userProfile) {
      showSnackbar(
        "Please login and complete your profile to continue.",
        "error",
      )
      return
    }

    setIsPlacingOrder(true)

    const order: Order = {
      items: [{ ...book, quantity }],
      total_amount: book.price * quantity,
      recipient_name: userProfile.name,
      recipient_phone: userProfile.phone,
      shipping_address: userProfile.address,
    }

    try {
      const response = await placeOrder(order, userID)
      showSnackbar("Order placed successfully!", "success")
      handleCloseModal()
      if (response.order_id) navigate(`/checkout/${response.order_id}`)
    } catch (err) {
      showSnackbar("Failed to place order. Please try again.", "error")
      console.error(err)
    } finally {
      setIsPlacingOrder(false)
    }
  }

  const handleAddToCart = async () => {
    if (!book) return

    if (!userID) {
      showSnackbar(
        "Please login and complete your profile to continue.",
        "error",
      )
      return
    }

    const item: CartItem = {
      ...book,
      quantity,
    }

    try {
      await addToCart(item, userID)
      console.log("Item added to cart:", item)
      navigate("/cart")
    } catch (err) {
      setError((err as Error).message)
      console.error("Error adding item to cart:", err)
    }
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const newQuantity = parseInt(inputValue, 10)

    if (inputValue === "" || newQuantity < 1) {
      setQuantity(0)
      setQuantityError("Quantity is required and must be at least 1.")
      return
    }

    if (book && newQuantity > book?.stock_quantity) {
      setQuantityError(
        `Quantity exceeds the available stock of ${book?.stock_quantity}.`,
      )
      setQuantity(newQuantity)
      return
    }

    setQuantityError(null)
    setQuantity(newQuantity)
  }

  if (loading) {
    return (
      <Layout>
        <Box className='container mx-auto my-10 text-center'>
          <CircularProgress />
        </Box>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <Box className='container mx-auto my-10 text-center'>
          <Typography fontWeight='bold' variant='h4'>
            {error}
          </Typography>
        </Box>
      </Layout>
    )
  }

  if (!book) {
    return (
      <Layout>
        <Box className='container mx-auto my-10 text-center'>
          <Typography fontWeight='bold' variant='h4'>
            Book not found
          </Typography>
        </Box>
      </Layout>
    )
  }

  return (
    <Layout>
      <Card variant='outlined'>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ position: "relative" }}>
              {book.stock_quantity < 1 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1,
                  }}
                >
                  <img
                    alt='Sold Out'
                    src='/images/sold out.png'
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                    }}
                  />
                </Box>
              )}
              <CardMedia
                alt={book.title}
                component='img'
                height='300'
                image={book.cover_image}
                sx={{
                  objectFit: "cover",
                  zIndex: 0,
                }}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <CardContent>
              <Typography fontWeight='bold' variant={isMobile ? "h5" : "h4"}>
                {book.title}
              </Typography>
              <Typography
                color='text.secondary'
                variant={isMobile ? "body1" : "h6"}
              >
                by {book.author}
              </Typography>
              <Typography color='text.secondary' variant='body2'>
                Genre: {book.genre}
              </Typography>
              <Typography fontWeight='bold' marginTop={2} variant='h6'>
                Description
              </Typography>
              <Typography
                color='text.secondary'
                variant={isMobile ? "body2" : "body1"}
              >
                {book.description}
              </Typography>
              <Typography
                fontWeight='bold'
                marginTop={2}
                variant={isMobile ? "h6" : "h5"}
              >
                Price: ₹ {book.price}
              </Typography>

              {book.stock_quantity < 11 && book.stock_quantity > 0 && (
                <Typography
                  sx={{
                    color: "error.main",
                    fontWeight: "bold",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                >
                  Only {book.stock_quantity} left in stock!
                </Typography>
              )}

              <TextField
                error={!!quantityError}
                helperText={quantityError}
                id='quantity'
                label='Quantity'
                onChange={handleQuantityChange}
                sx={{ mt: 2 }}
                value={quantity}
              />
            </CardContent>
          </Grid>
        </Grid>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "end",
              alignItems: isMobile ? "stretch" : "center",
            }}
          >
            {book.stock_quantity < 1 && (
              <Typography color='red'>
                The book is not available currently
              </Typography>
            )}

            {!userID && book.stock_quantity > 1 && (
              <Typography color='red'>
                Please log in to proceed with the purchase.
              </Typography>
            )}

            {userID && book.stock_quantity > 0 && (
              <Box
                sx={{
                  display: "flex",
                  mb: 3,
                  gap: 1,
                }}
              >
                <Button
                  disabled={!!quantityError}
                  onClick={handleAddToCart}
                  sx={{ bgcolor: "#001F3F" }}
                  variant='contained'
                >
                  Add to Cart
                </Button>
                <Button
                  color='success'
                  disabled={!!quantityError}
                  onClick={handleBuyNow}
                  variant='outlined'
                >
                  Buy Now
                </Button>
              </Box>
            )}
          </Box>
          {/* <Button onClick={() => navigate("/")} variant='text'>
            Back to Books
          </Button> */}

          <Button
            onClick={() => navigate("/")}
            startIcon={<ArrowBackIcon />}
            sx={{
              color: "#001F3F",
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "14px",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
            variant='text'
          >
            Back to Books
          </Button>
        </CardContent>
      </Card>

      <ConfirmPurchaseDialog
        book={book}
        handleCloseModal={handleCloseModal}
        handleConfirmBuy={handleConfirmBuy}
        isModalOpen={isModalOpen}
        isPlacingOrder={isPlacingOrder}
        quantity={quantity}
        setUserProfile={setUserProfile}
        userProfile={userProfile}
      />

      <SnackbarAlert
        message={snackbar.message}
        onClose={handleSnackbarClose}
        open={snackbar.open}
        type={snackbar.type}
      />
    </Layout>
  )
}

export default BookDetails
