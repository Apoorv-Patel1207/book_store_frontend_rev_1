export interface Book {
  id: number
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
  books: Book[]
  pagination: {
    totalCount: number
    totalPages: number
    currentPage: number
    pageSize: number
  }
}

export interface CartItem extends Book {
  quantity: number
}

export interface UserProfile {
  userId?: string
  name: string
  email: string
  phone: string
  address: string
  profileImage: string
  dob: string
  // gender: "male" | "female" | "other"
  gender: string
  role?: "admin" | "salesman" | "customer"
  createdAt?: string // ISO date string for account creation
}

// export interface ShippingAddress {
//   recipientName: string
//   street: string
//   city: string
//   state: string
//   zipCode: string
//   country: string
// }

export interface Order {
  total_amount: number
  userProfile: UserProfile
  items: CartItem[]
}

export interface ApiResponseOrder {
  order_id: number
  user_id: string
  order_amount: number
  order_date: string
  status: "Shipped" | "Delivered" | "Processing"
  recipient_name?: string
  recipient_phone?: string
  shipping_address?: string
  items: CartItem[]
}
