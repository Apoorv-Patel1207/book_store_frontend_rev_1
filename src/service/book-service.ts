import { ApiResponseBook, BookFormType } from "../types/data-types"

const API_BASE_URL = process.env.REACT_APP_API_URL
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

export const fetchBookById = async (id: number): Promise<ApiResponseBook> => {
  const response = await fetch(`${API_URL}/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch book")
  }
  return (await response.json()) as ApiResponseBook
}

export const addBook = async (
  book: BookFormType,
  userId: string,
): Promise<ApiResponseBook> => {
  const formData = new FormData()

  for (const [key, value] of Object.entries(book)) {
    formData.append(key, value)
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "x-user-id": userId,
    },
    body: formData,
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

export const deleteBook = async (id: string): Promise<ApiResponseBook> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("Failed to delete book")
  }
  return (await response.json()) as ApiResponseBook
}
