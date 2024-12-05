import { useEffect, useState } from "react"

import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material"
import {
  approveBook,
  fetchPendingBooks,
  rejectBook,
} from "src/service/book-requests-service"
import { ApiResponseBook } from "src/types/data-types"

import NoDataFound from "../utility-components/no-data"

const AdminApproval = () => {
  const [pendingBooks, setPendingBooks] = useState<ApiResponseBook[]>([])
  const [approvedBooks, setApprovedBooks] = useState<ApiResponseBook[]>([])
  const [rejectedBooks, setRejectedBooks] = useState<ApiResponseBook[]>([])

  const loadPendingBooks = async () => {
    const books = (await fetchPendingBooks()) as ApiResponseBook[]
    setPendingBooks(
      books.filter((book: ApiResponseBook) => book.status === "pending"),
    )
    setApprovedBooks(
      books.filter((book: ApiResponseBook) => book.status === "approved"),
    )
    setRejectedBooks(
      books.filter((book: ApiResponseBook) => book.status === "rejected"),
    )
  }

  useEffect(() => {
    loadPendingBooks().catch((err) => {
      console.error("Error loading pending book details:", err)
    })
  }, [])

  const handleApprove = async (bookId: string) => {
    await approveBook(bookId)
    setPendingBooks(pendingBooks.filter((book) => book.book_id !== bookId))
    const approvedBook = pendingBooks.find((book) => book.book_id === bookId)
    if (approvedBook) {
      setApprovedBooks([
        ...approvedBooks,
        { ...approvedBook, status: "approved" },
      ])
    }
  }

  const handleReject = async (bookId: string) => {
    await rejectBook(bookId)
    setPendingBooks(pendingBooks.filter((book) => book.book_id !== bookId))
    const rejectedBook = pendingBooks.find((book) => book.book_id === bookId)
    if (rejectedBook) {
      setRejectedBooks([
        ...rejectedBooks,
        { ...rejectedBook, status: "rejected" },
      ])
    }
  }

  const renderTable = (
    title: string,
    books: ApiResponseBook[],
    actions = false,
  ) => (
    <Container maxWidth='lg' sx={{ mt: 4 }}>
      <Typography gutterBottom variant='h6'>
        {title}
      </Typography>
      {books.length === 0 ? (
        <NoDataFound description={`No books in ${title} list.`} />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Title</strong>
                </TableCell>
                <TableCell>
                  <strong>Author</strong>
                </TableCell>
                <TableCell>
                  <strong>Genre</strong>
                </TableCell>
                <TableCell>
                  <strong>Price (₹)</strong>
                </TableCell>
                {actions && (
                  <TableCell align='center'>
                    <strong>Actions</strong>
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.book_id}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.genre}</TableCell>
                  <TableCell>{book.price}</TableCell>
                  {actions && (
                    <TableCell align='center'>
                      <Button
                        color='success'
                        onClick={() => handleApprove(book.book_id)}
                        sx={{ mr: 1 }}
                        variant='contained'
                      >
                        Approve
                      </Button>
                      <Button
                        color='error'
                        onClick={() => handleReject(book.book_id)}
                        variant='outlined'
                      >
                        Reject
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  )

  return (
    <Container maxWidth='lg' sx={{ mt: 4 }}>
      <Typography gutterBottom textAlign='center' variant='h5'>
        Admin Book Approval
      </Typography>

      {renderTable("Pending Books", pendingBooks, true)}
      {renderTable("Approved Books", approvedBooks)}
      {renderTable("Rejected Books", rejectedBooks)}
    </Container>
  )
}

export default AdminApproval
