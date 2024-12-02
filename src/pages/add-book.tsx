import { useState } from "react"

import { Container, Button } from "@mui/material"
import BookForm from "src/components/admin-sales-panel/add-book-form"
import AdminApproval from "src/components/admin-sales-panel/admin-approval"
import PageHeading from "src/components/utility-components/page-headings"

import Layout from "../components/layout/layout"

export interface BookFormType {
  id?: number // Optional in case it's auto-generated
  title: string
  author: string
  genre: string
  price: number
  coverImage?: string
  description?: string
  publicationDate?: string
  ISBN?: string
  language?: string
  pages?: number
  publisher?: string
  stockQuantity: number
}

const AdminPanel = () => {
  const [showForm, setShowForm] = useState(false)

  const handleFormSubmit = async (data: BookFormType) => {
    try {
      const response = await fetch("http://localhost:5000/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        console.log("Book approved:", data)
      } else {
        console.error("Failed to approve book:", response.statusText)
      }
    } catch (error) {
      console.error("Error approving book:", error)
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
      </Container>
    </Layout>
  )
}

export default AdminPanel
