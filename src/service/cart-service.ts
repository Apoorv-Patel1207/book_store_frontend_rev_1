import { CartItem } from "../types/data-types"

const API_BASE_URL = process.env.REACT_APP_API_URL 
const ENDPOINT = "/cart"
const API_URL = `${API_BASE_URL}${ENDPOINT}`

export const fetchCartItems = async (userId: string): Promise<CartItem[]> => {
  const response = await fetch(API_URL, {
    headers: {
      "x-user-id": userId,
    },
  })
  if (!response.ok) {
    throw new Error("Failed to fetch cart items")
  }
  return (await response.json()) as CartItem[]
}

export const addToCart = async (
  item: CartItem,
  userId: string,
): Promise<CartItem> => {
  const response = await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-user-id": userId,
    },
    body: JSON.stringify(item),
  })
  if (!response.ok) {
    throw new Error("Failed to add item to cart")
  }
  return (await response.json()) as CartItem
}

export const removeFromCart = async (
  userId: string,
  itemId: string,
): Promise<CartItem> => {
  const response = await fetch(`${API_URL}/remove/${itemId}`, {
    method: "DELETE",
    headers: {
      "x-user-id": userId,
    },
  })
  if (!response.ok) {
    throw new Error("Failed to remove item from cart")
  }
  return (await response.json()) as CartItem
}

export const clearCart = async (userId: string): Promise<void> => {
  const response = await fetch(`${API_URL}/clear`, {
    method: "DELETE",
    headers: {
      "x-user-id": userId,
    },
  })
  if (!response.ok) {
    throw new Error("Failed to clear cart")
  }
}

export const updateCartQuantityService = async (
  userId: string,
  itemId: string,
  quantity: number,
): Promise<CartItem> => {
  const response = await fetch(`${API_URL}/update/${itemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-user-id": userId,
    },
    body: JSON.stringify({ quantity }),
  })
  if (!response.ok) {
    throw new Error("Failed to update cart item quantity")
  }
  return (await response.json()) as CartItem
}
