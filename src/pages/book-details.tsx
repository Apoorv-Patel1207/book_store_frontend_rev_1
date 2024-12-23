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
import ConfirmPurchaseDialog from "src/components/order/confirm-purchase-dialog"
import { useIsMobile } from "src/components/utility-components/screen-size"
import SnackbarAlert from "src/components/utility-components/snackbar"

import Layout from "../components/layout/layout"
import { addToCart } from "../service/cart-service"
import { ApiResponseBook, CartItem } from "../types/data-types"

const BookDetails = () => {
  const { id } = useParams<{ id: string }>()
  const [book, setBook] = useState<ApiResponseBook | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)

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
          const data = (await response.json()) as ApiResponseBook
          setBook(data)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchBookDetails().catch((err) => {
      console.error("Error loading book details:", err)
    })
  }, [id])

  const handleBuyNow = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
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
      setQuantityError("Quantity is required at least 1.")
      return
    }

    if (book && newQuantity > book?.stock_quantity) {
      setQuantityError(`Available stock of ${book?.stock_quantity}.`)
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
                sx={{ mt: 2, height: "50px" }}
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
                  color='success'
                  disabled={!!quantityError}
                  onClick={handleAddToCart}
                  variant='outlined'
                >
                  Add to Cart
                </Button>
                <Button
                  disabled={!!quantityError}
                  onClick={handleBuyNow}
                  sx={{ bgcolor: "#001F3F" }}
                  variant='contained'
                >
                  Buy Now
                </Button>
              </Box>
            )}
          </Box>

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
        handleCloseCheckoutModal={handleCloseModal}
        isBulkPurchase={false}
        isCheckoutModalOpen={isModalOpen}
        quantity={quantity}
        showSnackbar={showSnackbar}
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
