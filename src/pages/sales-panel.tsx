import { useState } from "react"

import { AlertColor, Container } from "@mui/material"
import BookForm from "src/components/admin-sales-panel/add-book-form"
import { useUser } from "src/components/context/user-context"
import PageHeading from "src/components/utility-components/page-headings"
import SnackbarAlert from "src/components/utility-components/snackbar"
import { createBookRequest } from "src/service/book-requests-service"
import { BookFormType } from "src/types/data-types"

import Layout from "../components/layout/layout"

const SalesPanel = () => {
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

  const handleFormSubmit = async (data: BookFormType) => {
    if (!userID) {
      showSnackbar("Please login to continue", "error")
      return
    }

    try {
      const response = await createBookRequest(data, userID)

      console.log("Book submitted for approval:", response)
      showSnackbar("Book added successfully!", "success")
    } catch (error) {
      console.error("Error submitting book:", error)
      showSnackbar("error submitting the book request", "error")
    }
  }

  return (
    <Layout>
      <Container maxWidth='md'>
        <PageHeading>Sales Panel - Add a New Book</PageHeading>

        <BookForm isAdmin={false} onSubmit={handleFormSubmit} />
      </Container>

      <SnackbarAlert
        message={snackbar.message}
        onClose={handleSnackbarClose}
        open={snackbar.open}
        type={snackbar.type}
      />
    </Layout>
  )
}

export default SalesPanel
