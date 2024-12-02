// import { yupResolver } from "@hookform/resolvers/yup";
// import {
//   TextField,
//   Button,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   Typography,
// } from "@mui/material";
// import Grid from "@mui/material/Grid2";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { GENRES } from "src/constant/genres";
// import * as Yup from "yup";

// interface BookFormProps {
//   onSubmit: SubmitHandler<any>;
//   isAdmin?: boolean;
// }

// interface BookFormType {
//   id: number;
//   title: string;
//   author: string;
//   genre: string;
//   price: number;
//   coverImage: string;
//   description: string;
//   publicationDate: string;
//   ISBN: string;
//   language: string;
//   pages: number;
//   publisher: string;
//   stockQuantity: number;
// }

// const validationSchema = Yup.object().shape({
//   title: Yup.string().required("Title is required"),
//   author: Yup.string().required("Author is required"),
//   genre: Yup.string().required("Genre is required"),
//   price: Yup.number()
//     .required("Price is required")
//     .min(0, "Price must be a positive number"),
//   coverImage: Yup.string().url("Must be a valid URL").optional(),
//   description: Yup.string().optional(),
//   publicationDate: Yup.string().optional(),
//   language: Yup.string().optional(),
//   pages: Yup.number().min(1, "Pages must be at least 1").optional(),
//   publisher: Yup.string().optional(),
//   ISBN: Yup.string().optional(),
//   stockQuantity: Yup.number()
//     .required("Stock Quantity is required")
//     .min(0, "Stock quantity must be a positive number"),
// });

// const BookForm = ({ onSubmit, isAdmin }: BookFormProps) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({
//     resolver: yupResolver(validationSchema),
//     defaultValues: {
//       price: 0,
//       coverImage:
//         "https://media.istockphoto.com/id/1460007178/photo/library-books-on-table-and-background-for-studying-learning-and-research-in-education-school.jpg?s=1024x1024&w=is&k=20&c=cuzIXmvKHLpoGxGIft9zCiTw-jeL0Gjp7UNZau0MNkk=",
//       description: "",
//       publicationDate: new Date().toISOString().split("T")[0],
//       language: "English",
//       pages: 0,
//       publisher: "Unknown",
//       ISBN: "",
//       stockQuantity: 0,
//     },
//   });

//   const submitHandler = async (data: any) => {
//     await onSubmit(data);
//     reset();
//   };

//   return (
//     <form onSubmit={handleSubmit(submitHandler)}>
//       <Grid container spacing={2}>
//         <Grid size={{ xs: 12, sm: 6 }}>
//           <TextField
//             fullWidth
//             label="Title"
//             {...register("title")}
//             error={!!errors.title}
//             helperText={errors.title?.message}
//           />
//         </Grid>

//         <Grid size={{ xs: 12, sm: 6 }}>
//           <TextField
//             fullWidth
//             label="Author"
//             {...register("author")}
//             error={!!errors.author}
//             helperText={errors.author?.message}
//           />
//         </Grid>

//         <Grid size={{ xs: 12, sm: 6 }}>
//           <FormControl error={!!errors.genre} fullWidth>
//             <InputLabel>Genre</InputLabel>
//             <Select {...register("genre")}>
//               {GENRES.map((genre) => (
//                 <MenuItem key={genre.value} value={genre.value}>
//                   {genre.label}
//                 </MenuItem>
//               ))}
//             </Select>
//             {errors.genre && (
//               <Typography color="error">{errors.genre.message}</Typography>
//             )}
//           </FormControl>
//         </Grid>

//         <Grid size={{ xs: 12, sm: 6 }}>
//           <TextField
//             fullWidth
//             label="Price"
//             type="number"
//             {...register("price")}
//             error={!!errors.price}
//             helperText={errors.price?.message}
//           />
//         </Grid>

//         <Grid size={{ xs: 12, sm: 6 }}>
//           <TextField
//             fullWidth
//             label="Cover Image URL"
//             {...register("coverImage")}
//             error={!!errors.coverImage}
//             helperText={errors.coverImage?.message}
//           />
//         </Grid>

//         <Grid size={{ xs: 12 }}>
//           <TextField
//             fullWidth
//             label="Description"
//             multiline
//             rows={4}
//             {...register("description")}
//           />
//         </Grid>

//         <Grid size={{ xs: 12, sm: 6 }}>
//           <TextField
//             fullWidth
//             label="Publication Date"
//             type="date"
//             {...register("publicationDate")}
//           />
//         </Grid>

//         <Grid size={{ xs: 12, sm: 6 }}>
//           <TextField fullWidth label="Language" {...register("language")} />
//         </Grid>

//         <Grid size={{ xs: 12, sm: 6 }}>
//           <TextField
//             fullWidth
//             label="Pages"
//             type="number"
//             {...register("pages")}
//             error={!!errors.pages}
//             helperText={errors.pages?.message}
//           />
//         </Grid>

//         <Grid size={{ xs: 12, sm: 6 }}>
//           <TextField fullWidth label="Publisher" {...register("publisher")} />
//         </Grid>

//         <Grid size={{ xs: 12, sm: 6 }}>
//           <TextField
//             fullWidth
//             label="ISBN"
//             {...register("ISBN")}
//             error={!!errors.ISBN}
//             helperText={errors.ISBN?.message}
//           />
//         </Grid>

//         <Grid size={{ xs: 12, sm: 6 }}>
//           <TextField
//             fullWidth
//             label="Stock Quantity"
//             type="number"
//             {...register("stockQuantity")}
//             error={!!errors.stockQuantity}
//             helperText={errors.stockQuantity?.message}
//           />
//         </Grid>

//         <Grid size={{ xs: 12 }}>
//           <Button
//             sx={{ mt: 2, bgcolor: isAdmin ? "blue" : "#1F2937" }}
//             type="submit"
//             variant="contained"
//           >
//             {isAdmin ? "Approve Book" : "Add Book"}
//           </Button>
//         </Grid>
//       </Grid>
//     </form>
//   );
// };

// export default BookForm;

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
import { BookFormType } from "src/pages/add-book"
import * as Yup from "yup"



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
  coverImage: Yup.string().url("Must be a valid URL").optional(),
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookFormType>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      price: 0,
      coverImage:
        "https://media.istockphoto.com/id/1460007178/photo/library-books-on-table-and-background-for-studying-learning-and-research-in-education-school.jpg?s=1024x1024&w=is&k=20&c=cuzIXmvKHLpoGxGIft9zCiTw-jeL0Gjp7UNZau0MNkk=",
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

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label='Cover Image URL'
            {...register("coverImage")}
            error={!!errors.coverImage}
            helperText={errors.coverImage?.message}
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
