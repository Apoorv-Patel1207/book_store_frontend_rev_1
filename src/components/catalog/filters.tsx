import {
  TextField,
  Select,
  MenuItem,
  Slider,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Button,
  SelectChangeEvent,
} from "@mui/material"
import { GENRES } from "src/constant/genres"

interface BookFilterProps {
  tempSearchQuery: string
  tempFilterGenre: string
  tempPriceValue: number[]
  setTempSearchQuery: (query: string) => void
  setTempFilterGenre: (genre: string) => void
  setTempPriceValue: (tempPriceValue: number[]) => void
  handleApplyFilters: () => void
  handleResetFilters: () => void
}

const BookFilter = (props: BookFilterProps) => {
  const {
    tempSearchQuery,
    tempFilterGenre,
    tempPriceValue,
    setTempSearchQuery,
    setTempFilterGenre,
    setTempPriceValue,
    handleApplyFilters,
    handleResetFilters,
  } = props

  return (
    <Box sx={{ p: 2, width: 300 }}>
      <TextField
        fullWidth
        onChange={(e) => setTempSearchQuery(e.target.value.toLowerCase())}
        placeholder='Search by title or author'
        value={tempSearchQuery}
        variant='outlined'
      />

      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Genre</InputLabel>
        <Select
          label='Genre'
          onChange={(e: SelectChangeEvent) =>
            setTempFilterGenre(e.target.value)
          }
          value={tempFilterGenre}
        >
          {GENRES.map((genre) => (
            <MenuItem key={genre.value} value={genre.value}>
              {genre.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ mt: 2, px: 1 }}>
        <Typography gutterBottom variant='subtitle2'>
          Price
        </Typography>
        <Slider
          max={1000}
          onChange={(_, newValue) => setTempPriceValue(newValue as number[])}
          value={tempPriceValue}
          valueLabelDisplay='auto'
        />

        <Box display='flex' justifyContent='space-between'>
          <Typography variant='body2'>Min: {tempPriceValue[0]}</Typography>
          <Typography variant='body2'>Max: {tempPriceValue[1]}</Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
        <Button fullWidth onClick={handleApplyFilters} variant='contained'>
          Apply
        </Button>
        <Button fullWidth onClick={handleResetFilters} variant='outlined'>
          Reset
        </Button>
      </Box>
    </Box>
  )
}

export default BookFilter
