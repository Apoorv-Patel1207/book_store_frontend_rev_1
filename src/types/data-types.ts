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
  order_date: string
  order_id?: number
  status: "Shipped" | "Delivered" | "Processing"
  total_amount: number
  user_address?: string
  user_email?: string
  user_id: string
  user_name?: string
  user_phone?: string
  items: CartItem[]
  userProfile: UserProfile
}
