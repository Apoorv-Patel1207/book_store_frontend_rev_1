import { ApiResponseBook, BookFormType } from "src/types/data-types"

const API_URL = "http://localhost:5000/api/books/pending-books"

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
  //   const response = await fetch("/api/pending-books");

  const response = await fetch(`${API_URL}`)
  return response.json()
}

export const approveBook = async (bookId: number) => {
  //   const response = await fetch(`/api/pending-books/${bookId}/approve`,
  const response = await fetch(`${API_URL}/${bookId}/approve`, {
    method: "POST",
  })
  return response.json()
}

export const rejectBook = async (bookId: number) => {
  const response = await fetch(`${API_URL}/${bookId}/reject`, {
    method: "DELETE",
  })
  return response.json()
}
