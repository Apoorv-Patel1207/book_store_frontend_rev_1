import { useState } from "react"

import { Container, Button, AlertColor } from "@mui/material"
import BookForm from "src/components/admin-sales-panel/add-book-form"
import AdminApproval from "src/components/admin-sales-panel/admin-approval"
import { useUser } from "src/components/context/user-context"
import PageHeading from "src/components/utility-components/page-headings"
import SnackbarAlert from "src/components/utility-components/snackbar"
import { addBook } from "src/service/book-service"
import { BookFormType } from "src/types/data-types"

import Layout from "../components/layout/layout"

const AdminPanel = () => {
  const { userData } = useUser()
  const userID = userData?.user_id

  const [showForm, setShowForm] = useState(false)

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

  const handleFormSubmit = async (data: BookFormType) => {
    if (!userID) {
      showSnackbar("Please login to continue", "error")
      return
    }

    try {
      const addedBook = await addBook(data, userID)
      console.log("Book added to the catalog", addedBook)
      showSnackbar("Book added to the catalog", "success")
      setShowForm(false)
    } catch (error) {
      console.error("Error approving book:", error)
      showSnackbar("error adding book to the catalog", "error")
   
    }
  }

  return (
    <Layout>
      <Container maxWidth='md'>
        <PageHeading>Admin Panel</PageHeading>

        {!showForm ? (
          <Button
            onClick={() => setShowForm(true)}
            sx={{ bgcolor: "#1F2937" }}
            variant='contained'
          >
            Add Book
          </Button>
        ) : (
          <BookForm isAdmin onSubmit={handleFormSubmit} />
        )}
        <AdminApproval />

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

export default AdminPanel
