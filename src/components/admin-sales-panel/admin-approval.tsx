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
} from "src/service/pending-book-service"
import { Book } from "src/types/data-types"

import NoDataFound from "../utility-components/no-data"

const AdminApproval = () => {
  const [pendingBooks, setPendingBooks] = useState<Book[]>([])
  const [approvedBooks, setApprovedBooks] = useState<Book[]>([])
  const [rejectedBooks, setRejectedBooks] = useState<Book[]>([])

  const loadPendingBooks = async () => {
    const books = (await fetchPendingBooks()) as Book[]
    setPendingBooks(books.filter((book: Book) => book.status === "pending"))
    setApprovedBooks(books.filter((book: Book) => book.status === "approved"))
    setRejectedBooks(books.filter((book: Book) => book.status === "rejected"))
  }

  useEffect(() => {
    loadPendingBooks().catch((err) => {
      console.error("Error loading pending book details:", err)
    })
  }, [])

  const handleApprove = async (bookId: number) => {
    await approveBook(bookId)
    setPendingBooks(pendingBooks.filter((book) => book.id !== bookId))
    const approvedBook = pendingBooks.find((book) => book.id === bookId)
    if (approvedBook) {
      setApprovedBooks([
        ...approvedBooks,
        { ...approvedBook, status: "approved" },
      ])
    }
  }

  const handleReject = async (bookId: number) => {
    await rejectBook(bookId)
    setPendingBooks(pendingBooks.filter((book) => book.id !== bookId))
    const rejectedBook = pendingBooks.find((book) => book.id === bookId)
    if (rejectedBook) {
      setRejectedBooks([
        ...rejectedBooks,
        { ...rejectedBook, status: "rejected" },
      ])
    }
  }

  const renderTable = (title: string, books: Book[], actions = false) => (
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
                <TableRow key={book.id}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.genre}</TableCell>
                  <TableCell>{book.price}</TableCell>
                  {actions && (
                    <TableCell align='center'>
                      <Button
                        color='success'
                        onClick={() => handleApprove(book.id)}
                        sx={{ mr: 1 }}
                        variant='contained'
                      >
                        Approve
                      </Button>
                      <Button
                        color='error'
                        onClick={() => handleReject(book.id)}
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
