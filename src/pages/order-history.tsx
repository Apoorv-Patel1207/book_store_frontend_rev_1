import { useEffect, useState } from "react"

import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import {
  Container,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Box,
  Button,
} from "@mui/material"
import Grid from "@mui/material/Grid2"
import { useNavigate } from "react-router-dom"
import { useUserID } from "src/components/auth/userID"
import { formatDate } from "src/components/utility-components/format-date"
import Loading from "src/components/utility-components/loading"
import NoDataFound from "src/components/utility-components/no-data"
import PageHeading from "src/components/utility-components/page-headings"

import Layout from "../components/layout/layout"
import { fetchOrders } from "../service/order-service"
import { ApiResponseOrder } from "../types/data-types"

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState<ApiResponseOrder[]>([])
  const [loading, setLoading] = useState(true)

  const userID = useUserID()
  const navigate = useNavigate()

  useEffect(() => {
    if (userID) {
      const loadOrders = async () => {
        try {
          const fetchedOrders = await fetchOrders(userID)
          setOrders(fetchedOrders)
        } catch (error) {
          console.error("Failed to load orders", error)
        } finally {
          setLoading(false)
        }
      }
      loadOrders().catch((err) => {
        console.error("Error loading the order details:", err)
      })
    }
  }, [userID])

  if (loading) {
    return (
      <Layout>
        <Box className='container mx-auto my-10 text-center'>
          <Loading />
        </Box>
      </Layout>
    )
  }

  return (
    <Layout>
      <Container maxWidth='lg'>
        <PageHeading>Order History</PageHeading>
        {orders.length === 0 ? (
          <NoDataFound description=' You have not placed any orders yet.' />
        ) : (
          orders.map((order) => (
            <Card key={order.order_id} sx={{ mb: 3 }} variant='outlined'>
              <CardContent>
                <Box sx={{ mb: 2 }}>
                  <Typography fontWeight='bold'>
                    Order ID: {order.order_id}
                  </Typography>
                  <Typography color='text.secondary' variant='body2'>
                    {/* Order Date: {order.order_date}
                     */}
                    Order Date: {formatDate(order.order_date)}
                  </Typography>
                  <Typography color='text.secondary' variant='body2'>
                    Status: {order.status}
                  </Typography>

                  <Typography fontWeight='bold' mt={2} variant='body2'>
                    Shipping Details:
                  </Typography>

                  <Typography color='text.secondary' variant='body2'>
                    Name: {order.recipient_name}
                  </Typography>

                  <Typography variant='body2'>
                    Address: {order.shipping_address}
                  </Typography>
                  <Typography variant='body2'>
                    Phone: {order.recipient_phone}
                  </Typography>
                </Box>

                <Typography fontWeight='bold' sx={{ mt: 2 }}>
                  Books Ordered:
                </Typography>
                <TableContainer component={Paper} sx={{ mt: 2 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Book</TableCell>
                        <TableCell sx={{ minWidth: "150px" }}>Title</TableCell>
                        <TableCell>Author</TableCell>
                        <TableCell sx={{ minWidth: "100px" }}>Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell sx={{ minWidth: "100px" }}>Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {order.items.map((book) => (
                        <TableRow key={book.book_id}>
                          <TableCell>
                            <Avatar
                              alt={book.title}
                              src={book.cover_image}
                              sx={{ width: 56, height: 56 }}
                              variant='rounded'
                            />
                          </TableCell>
                          <TableCell>{book.title}</TableCell>
                          <TableCell>{book.author}</TableCell>
                          <TableCell>₹ {book.price}</TableCell>
                          <TableCell>{book.quantity}</TableCell>
                          <TableCell>₹ {book.price * book.quantity}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Grid container justifyContent='flex-end' sx={{ mt: 2 }}>
                  <Grid>
                    <Typography fontWeight='bold'>
                      Total Amount: ₹ {order.order_amount}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))
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
      </Container>
    </Layout>
  )
}

export default OrderHistoryPage
