import { useState } from "react"

import { Container } from "@mui/material"
import BookForm from "src/components/admin-sales-panel/add-book-form"
import PageHeading from "src/components/utility-components/page-headings"
import SnackbarAlert from "src/components/utility-components/snackbar"

import { BookFormType } from "./add-book"
import Layout from "../components/layout/layout"

const SalesPanel = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarType, setSnackbarType] = useState<"success" | "error">(
    "success",
  )

  const handleFormSubmit = async (data: BookFormType) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/books/pending-books",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      )

      if (response.ok) {
        console.log("Book submitted for approval:", data)
        setSnackbarMessage("Book added successfully!")
        setSnackbarType("success")
      } else {
        console.error("Failed to submit book:", response.statusText)
        setSnackbarMessage("Failed to add book!")
        setSnackbarType("error")
      }
    } catch (error) {
      console.error("Error submitting book:", error)
      setSnackbarMessage("Error submitting book details.")
      setSnackbarType("error")
    }
    setSnackbarOpen(true)
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  return (
    <Layout>
      <Container maxWidth='md'>
        <PageHeading>Sales Panel - Add a New Book</PageHeading>

        <BookForm isAdmin={false} onSubmit={handleFormSubmit} />
      </Container>

      <SnackbarAlert
        message={snackbarMessage}
        onClose={handleSnackbarClose}
        open={snackbarOpen}
        type={snackbarType}
      />
    </Layout>
  )
}

export default SalesPanel
