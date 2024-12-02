export interface Book {
  id: number
  title: string
  author: string
  genre: string
  price: number
  coverImage: string
  description: string
  publicationDate: string
  ISBN: string
  language: string
  pages: number
  publisher: string
  stockQuantity: number
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

export interface ShippingAddress {
  recipientName: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface Order {
  orderId?: number
  userId: string
  items: CartItem[]
  totalAmount: number
  orderDate: string
  status: "Shipped" | "Delivered" | "Processing"
  userProfile: UserProfile
  address?: string
  shippingAddress?: ShippingAddress
}
