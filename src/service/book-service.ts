import { Book } from "../types/data-types"

const API_URL = "http://localhost:5000/api/books"

// Fetch all books with pagination
// export const fetchBooks = async (
// page: number, limit: number, searchQuery: string, filterGenre: string, p0: number, p1: number): Promise<Book[]> => {
//   const response = await fetch(`${API_URL}?page=${page}&limit=${limit}`);
//   if (!response.ok) {
//     throw new Error("Failed to fetch books");
//   }
//   return (await response.json()) as Book[];
// };

export const fetchBooks = async (
  page: number,
  limit: number,
  searchQuery: string,
  filterGenre: string,
  priceMin: number,
  priceMax: number,
): Promise<Book[]> => {
  const url = `/api/books?page=${page}&limit=${limit}&searchQuery=${searchQuery}&filterGenre=${filterGenre}&priceMin=${priceMin}&priceMax=${priceMax}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Failed to fetch books")
  }
  return (await response.json()) as Book[]
}

// Fetch a single book by ID
export const fetchBookById = async (id: number): Promise<Book> => {
  const response = await fetch(`${API_URL}/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch book")
  }
  return (await response.json()) as Book
}

// Add a new book
export const addBook = async (book: Book): Promise<Book> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  })
  if (!response.ok) {
    throw new Error("Failed to add book")
  }
  return (await response.json()) as Book
}

export const updateBook = async (
  id: number,
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
export const deleteBook = async (id: number): Promise<Book> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("Failed to delete book")
  }
  return (await response.json()) as Book
}
