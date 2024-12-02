import { useEffect, useState } from "react"

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
  Grid,
} from "@mui/material"
import { useUserID } from "src/components/auth/userID"
import Loading from "src/components/utility-components/loading"
import NoDataFound from "src/components/utility-components/no-data"
import PageHeading from "src/components/utility-components/page-headings"

import Layout from "../components/layout/layout"
import { fetchOrders } from "../service/order-service"
import { Order } from "../types/data-types"

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  const userID = useUserID()

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
            <Card key={order.orderId} sx={{ mb: 3 }} variant='outlined'>
              <CardContent>
                <Box sx={{ mb: 2 }}>
                  <Typography fontWeight='bold'>
                    Order ID: {order.orderId}
                  </Typography>
                  <Typography color='text.secondary' variant='body2'>
                    Order Date: {order.orderDate}
                  </Typography>
                  <Typography color='text.secondary' variant='body2'>
                    Status: {order.status}
                  </Typography>

                  {order.userProfile && (
                    <>
                      <Typography fontWeight='bold' variant='body2'>
                        Shipping Details:
                      </Typography>

                      <Typography color='text.secondary' variant='body2'>
                        Name: {order.userProfile.name}
                      </Typography>
                      <Typography variant='body2'>
                        Address: {order.userProfile.address}
                      </Typography>
                      <Typography variant='body2'>
                        Phone: {order.userProfile.phone}
                      </Typography>
                    </>
                  )}
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
                        <TableRow key={book.id}>
                          <TableCell>
                            <Avatar
                              alt={book.title}
                              src={book.coverImage}
                              sx={{ width: 56, height: 56 }}
                              variant='rounded'
                            />
                          </TableCell>
                          <TableCell>{book.title}</TableCell>
                          <TableCell>{book.author}</TableCell>
                          <TableCell>₹ {book.price.toFixed(2)}</TableCell>
                          <TableCell>{book.quantity}</TableCell>
                          <TableCell>
                            ₹ {(book.price * book.quantity).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Grid container justifyContent='flex-end' sx={{ mt: 2 }}>
                  <Grid item>
                    <Typography fontWeight='bold'>
                      Total Amount: ₹ {order.totalAmount.toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))
        )}
      </Container>
    </Layout>
  )
}

export default OrderHistoryPage
