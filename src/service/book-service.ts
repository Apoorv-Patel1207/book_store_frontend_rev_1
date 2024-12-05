import { ApiResponseBook, BookFormType } from "../types/data-types"

const API_BASE_URL = process.env.REACT_APP_API_URL // http://localhost:5000/api
const ENDPOINT = "/books"
const API_URL = `${API_BASE_URL}${ENDPOINT}`

export const fetchBooks = async (
  page: number,
  limit: number,
  searchQuery: string,
  filterGenre: string,
  priceMin: number,
  priceMax: number,
): Promise<ApiResponseBook[]> => {
  const url = `/api/books?page=${page}&limit=${limit}&searchQuery=${searchQuery}&filterGenre=${filterGenre}&priceMin=${priceMin}&priceMax=${priceMax}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Failed to fetch books")
  }
  return (await response.json()) as ApiResponseBook[]
}

// Fetch a single book by ID
export const fetchBookById = async (id: number): Promise<ApiResponseBook> => {
  const response = await fetch(`${API_URL}/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch book")
  }
  return (await response.json()) as ApiResponseBook
}

// Add a new book
export const addBook = async (
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
    throw new Error("Failed to add book")
  }
  return (await response.json()) as ApiResponseBook
}

export const updateBook = async (
  id: string,
  data: { price: number; stock_quantity: number },
) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Failed to update the book")
  }

  return response.json()
}

// Delete a book by ID
export const deleteBook = async (id: string): Promise<ApiResponseBook> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("Failed to delete book")
  }
  return (await response.json()) as ApiResponseBook
}
