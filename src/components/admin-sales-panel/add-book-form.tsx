import { useState } from "react"

import { yupResolver } from "@hookform/resolvers/yup"
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material"
import Grid from "@mui/material/Grid2"
import { useForm, SubmitHandler } from "react-hook-form"
import { GENRES } from "src/constant/genres"
import { BookFormType } from "src/types/data-types"
import * as Yup from "yup"

import FileDropzone from "../utility-components/file-dropzone"

interface BookFormProps {
  onSubmit: SubmitHandler<BookFormType>
  isAdmin?: boolean
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  genre: Yup.string().required("Genre is required"),
  price: Yup.number()
    .required("Price is required")
    .min(0, "Price must be a positive number"),
  coverImage: Yup.mixed<File>().required("Cover Image is required"),
  description: Yup.string().optional(),
  publicationDate: Yup.string().optional(),
  language: Yup.string().optional(),
  pages: Yup.number().min(1, "Pages must be at least 1").optional(),
  publisher: Yup.string().optional(),
  ISBN: Yup.string().optional(),
  stockQuantity: Yup.number()
    .required("Stock Quantity is required")
    .min(0, "Stock quantity must be a positive number"),
})

const BookForm = ({ onSubmit, isAdmin }: BookFormProps) => {
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    null,
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<BookFormType>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      price: 0,
      description: "",
      publicationDate: new Date().toISOString().split("T")[0],
      language: "English",
      pages: 0,
      publisher: "Unknown",
      ISBN: "",
      stockQuantity: 0,
    },
  })

  const submitHandler: SubmitHandler<BookFormType> = async (data) => {
    await onSubmit(data)
    reset()
    setCoverImagePreview(null)
  }

  const handleFileSelect = (file: File) => {
    setValue("coverImage", file)
    const previewUrl = URL.createObjectURL(file)
    setCoverImagePreview(previewUrl)
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label='Title'
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label='Author'
            {...register("author")}
            error={!!errors.author}
            helperText={errors.author?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl error={!!errors.genre} fullWidth>
            <InputLabel>Genre</InputLabel>
            <Select {...register("genre")}>
              {GENRES.map((genre) => (
                <MenuItem key={genre.value} value={genre.value}>
                  {genre.label}
                </MenuItem>
              ))}
            </Select>
            {errors.genre && (
              <Typography color='error'>{errors.genre.message}</Typography>
            )}
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label='Price'
            type='number'
            {...register("price")}
            error={!!errors.price}
            helperText={errors.price?.message}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label='Description'
            multiline
            rows={4}
            {...register("description")}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label='Publication Date'
            type='date'
            {...register("publicationDate")}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField fullWidth label='Language' {...register("language")} />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label='Pages'
            type='number'
            {...register("pages")}
            error={!!errors.pages}
            helperText={errors.pages?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField fullWidth label='Publisher' {...register("publisher")} />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label='ISBN'
            {...register("ISBN")}
            error={!!errors.ISBN}
            helperText={errors.ISBN?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label='Stock Quantity'
            type='number'
            {...register("stockQuantity")}
            error={!!errors.stockQuantity}
            helperText={errors.stockQuantity?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <FileDropzone
            errorMessage={errors.coverImage?.message}
            label='Upload Cover Image'
            onFileSelect={handleFileSelect}
          />

          {coverImagePreview && (
            <img
              alt='Cover Preview'
              src={coverImagePreview}
              style={{
                width: "100%",
                maxWidth: "300px",
                marginTop: "10px",
                borderRadius: "8px",
              }}
            />
          )}
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Button
            sx={{ mt: 2, bgcolor: isAdmin ? "blue" : "#1F2937" }}
            type='submit'
            variant='contained'
          >
            {isAdmin ? "Approve Book" : "Add Book"}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default BookForm
