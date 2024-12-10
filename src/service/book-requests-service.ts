import { ApiResponseBook, BookFormType } from "src/types/data-types"

const API_BASE_URL = process.env.REACT_APP_API_URL
const ENDPOINT = "/books/pending-books"
const API_URL = `${API_BASE_URL}${ENDPOINT}`

export const createBookRequest = async (
  book: BookFormType,
  userId: string,
): Promise<ApiResponseBook> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-user-id": userId,
    },
    body: JSON.stringify(book),
  })

  if (!response.ok) {
    throw new Error(`Failed to submit book: ${response.statusText}`)
  }

  return (await response.json()) as ApiResponseBook
}

export const fetchPendingBooks = async () => {
  const response = await fetch(`${API_URL}`)
  return response.json()
}

export const approveBook = async (bookId: string) => {
  const response = await fetch(`${API_URL}/${bookId}/approve`, {
    method: "POST",
  })
  return response.json()
}

export const rejectBook = async (bookId: string) => {
  const response = await fetch(`${API_URL}/${bookId}/reject`, {
    method: "DELETE",
  })
  return response.json()
}
