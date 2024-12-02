import React, { useState, useRef } from "react"

import {
  TextField,
  List,
  ListItemText,
  Paper,
  Box,
  Divider,
  Stack,
  Button,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import { Book } from "src/types/data-types"

interface SearchProps {
  isMobile: boolean
}

const Search = (props: SearchProps) => {
  const { isMobile } = props
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  const navigate = useNavigate()
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)

  const fetchBooks = async (query: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/books/search-books?searchQuery=${query}`,
      )
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data = (await response.json()) as Book[]
      setFilteredBooks(data)
    } catch (error) {
      console.error("Error fetching books:", error)
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }

    debounceTimeout.current = setTimeout(() => {
      if (query) {
        fetchBooks(query).catch((err) => {
          console.error("Error fetching book details:", err)
        })
      } else {
        setFilteredBooks([])
      }
    }, 1000)
  }

  const handleBookClick = (bookId: number, bookTitle: string) => {
    setSearchQuery(bookTitle)
    setFilteredBooks([])
    navigate(`/book-details/${bookId}`)
  }

  return (
    <Box style={{ position: "relative" }}>
      <TextField
        autoComplete='off'
        onChange={handleSearchChange}
        placeholder='Search by title or author'
        sx={{
          backgroundColor: "white",
          width: { md: "250px", lg: "500px" },
          borderRadius: 2,
          "& .MuiOutlinedInput-root": {
            height: "40px",
            borderRadius: 2,
            "& input": {
              padding: "8px",
            },
          },
        }}
        value={searchQuery}
        variant='outlined'
      />
      {filteredBooks.length > 0 && (
        <Paper
          sx={{
            position: isMobile ? "relative" : "absolute",
            width: { md: "250px", lg: "500px" },
            zIndex: 10,
            borderRadius: "none",
            paddingX: "8px",
            maxHeight: "300px",
            overflowY: "auto",
          }}
        >
          <List>
            {filteredBooks.map((book, index) => (
              <Stack key={book.id}>
                <Button onClick={() => handleBookClick(book.id, book.title)}>
                  <li style={{ cursor: "pointer" }}>
                    <ListItemText primary={`${book.title} by ${book.author}`} />
                  </li>
                </Button>
                {index < filteredBooks.length - 1 && <Divider />}
              </Stack>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  )
}

export default Search
