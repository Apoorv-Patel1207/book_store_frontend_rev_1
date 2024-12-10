export interface BookFormType {
  title: string
  author: string
  genre: string
  price: number
  coverImage?: string
  description?: string
  publicationDate?: string
  ISBN?: string
  language?: string
  pages?: number
  publisher?: string
  stockQuantity: number
}

export interface ApiResponseBook {
  book_id: string
  title: string
  author: string
  genre: string
  price: number
  cover_image: string
  description: string
  publication_date: string
  ISBN: string
  language: string
  pages: number
  publisher: string
  stock_quantity: number
  status?: "pending" | "approved" | "rejected"
}

export interface PaginatedBook {
  books: ApiResponseBook[]
  pagination: {
    totalCount: number
    totalPages: number
    currentPage: number
    pageSize: number
  }
}

export interface CartItem extends ApiResponseBook {
  quantity: number
}

export interface UserProfile {
  name: string
  email: string
  phone: string
  address: string
  profileImage: string
  dob: string
  gender: string
  role?: "admin" | "salesman" | "customer"
}

export interface ApiResponseUserProfile {
  user_id: string
  name: string
  email: string
  phone: string
  address: string
  profile_image: string
  dob: string
  gender: string
  role: "admin" | "salesman" | "customer"
  created_at: string
  updated_at: string
}

export interface ProfileFormValues {
  name: string
  email: string
  phone: string
  address?: string
  profileImage?: string
  dob?: string
  gender?: string
}

export interface RecipientUserProfile {
  name: string
  phone: string
  address: string
}

export interface Order {
  total_amount: number
  recipient_name: string
  recipient_phone: string
  shipping_address: string
  items: CartItem[]
}

export interface ApiResponseOrder {
  order_id: string
  user_id: string
  order_amount: number
  order_date: string
  status: "Shipped" | "Delivered" | "Processing"
  recipient_name?: string
  recipient_phone?: string
  shipping_address?: string
  items: CartItem[]
}
