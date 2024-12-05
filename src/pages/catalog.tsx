import { useState, useEffect, useCallback } from "react"

import FilterListIcon from "@mui/icons-material/FilterList"
import {
  Box,
  CircularProgress,
  debounce,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material"
import Grid from "@mui/material/Grid2"
import Loading from "src/components/utility-components/loading"
import PageHeading from "src/components/utility-components/page-headings"
import { deleteBook } from "src/service/book-service"
import { ApiResponseBook, PaginatedBook } from "src/types/data-types"

import BookCard from "../components/book/book-card"
import Filters from "../components/catalog/filters"
import Layout from "../components/layout/layout"

const Catalog = () => {
  const [books, setBooks] = useState<ApiResponseBook[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterGenre, setFilterGenre] = useState("all")
  const [priceValue, setPriceValue] = useState<number[]>([0, 100])
  const [tempSearchQuery, setTempSearchQuery] = useState("")
  const [tempFilterGenre, setTempFilterGenre] = useState("all")
  const [tempPriceValue, setTempPriceValue] = useState<number[]>([0, 100])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [isFetchingMore, setIsFetchingMore] = useState(false)

  const fetchBooks = useCallback(async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        searchQuery,
        filterGenre,
        priceMin: priceValue[0].toString(),
        priceMax: priceValue[1].toString(),
      })

      const response = await fetch(
        `http://localhost:5000/api/books?${params.toString()}`,
      )

      if (!response.ok) throw new Error("Failed to fetch books")

      const data = (await response.json()) as PaginatedBook
      const { books: paginatedBooks, pagination } = data

      setHasMore(pagination.currentPage < pagination.totalPages)
      setBooks((prevBooks) => [...prevBooks, ...paginatedBooks])
    } catch (error) {
      console.error("Error fetching books:", error)
    } finally {
      setIsLoading(false)
      setIsFetchingMore(false)
    }
  }, [page, searchQuery, filterGenre, priceValue])

  useEffect(() => {
    const loadBooks = async () => {
      await fetchBooks()
    }

    loadBooks().catch((error) => {
      console.error("Error loading books:", error)
    })
  }, [fetchBooks])

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (isFetchingMore || !hasMore) return

      const scrollPosition = window.innerHeight + window.scrollY
      const threshold = document.body.offsetHeight - 200

      if (scrollPosition >= threshold) {
        setPage((prevPage) => prevPage + 1)
        setIsFetchingMore(true)
      }
    }, 300)

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isFetchingMore, hasMore])

  const handleDelete = async (id: string) => {
    try {
      await deleteBook(id)
      setBooks((prevBooks) => prevBooks.filter((book) => book.book_id !== id))
    } catch (error) {
      console.error("Error deleting book:", error)
    }
  }

  const handleUpdateBook = (updatedBook: ApiResponseBook) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.book_id === updatedBook.book_id ? updatedBook : book,
      ),
    )
  }

  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open)
  }

  const handleApplyFilters = () => {
    setSearchQuery(tempSearchQuery)
    setFilterGenre(tempFilterGenre)
    setPriceValue(tempPriceValue)
    setPage(1)
    setBooks([])
    setDrawerOpen(false)
  }

  const handleResetFilters = () => {
    setSearchQuery("")
    setFilterGenre("all")
    setPriceValue([0, 100])

    setTempSearchQuery("")
    setTempFilterGenre("all")
    setTempPriceValue([0, 100])
    setPage(1)
    setBooks([])
    setDrawerOpen(false)
  }

  return (
    <Layout>
      <PageHeading sx={{ mb: -1 }}>
        Turn the Page to Endless Possibilities
      </PageHeading>

      <Box display='flex' justifyContent='end'>
        <IconButton
          onClick={toggleDrawer(true)}
          sx={{
            bgcolor: "#1F2937",
            color: "white",
            mr: 2,
            "&:hover": {
              color: "black",
            },
          }}
        >
          <FilterListIcon />
        </IconButton>
      </Box>

      <Drawer anchor='right' onClose={toggleDrawer(false)} open={drawerOpen}>
        <Filters
          handleApplyFilters={handleApplyFilters}
          handleResetFilters={handleResetFilters}
          setTempFilterGenre={setTempFilterGenre}
          setTempPriceValue={setTempPriceValue}
          setTempSearchQuery={setTempSearchQuery}
          tempFilterGenre={tempFilterGenre}
          tempPriceValue={tempPriceValue}
          tempSearchQuery={tempSearchQuery}
        />
      </Drawer>

      {isLoading && (
        <Box display='flex' justifyContent='center' my={4}>
          <CircularProgress />
        </Box>
      )}

      <Grid container sx={{ marginTop: { md: 2 } }}>
        {books.length > 0
          ? books.map((book) => (
              <Grid
                key={book.book_id}
                size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2.4 }}
              >
                <BookCard
                  book={book}
                  handleDelete={handleDelete}
                  handleUpdateBook={handleUpdateBook}
                />
              </Grid>
            ))
          : !isLoading && (
              <Grid>
                <Typography
                  component='p'
                  sx={{ width: "100%", padding: 2 }}
                  textAlign='center'
                  variant='h6'
                >
                  No books found.
                </Typography>
              </Grid>
            )}
      </Grid>

      {isFetchingMore && (
        <Box sx={{ width: "100%" }}>
          <Loading />
        </Box>
      )}
    </Layout>
  )
}

export default Catalog
