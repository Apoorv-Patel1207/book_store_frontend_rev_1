import { CartItem } from "../types/data-types";

const API_URL = "http://localhost:5000/api/cart";

// Fetch cart items from the server
export const fetchCartItems = async (userId: string): Promise<CartItem[]> => {
  const response = await fetch(API_URL, {
    headers: {
      "x-user-id": userId,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch cart items");
  }
  return (await response.json()) as CartItem[];
};

// Add an item to the cart
export const addToCart = async (
  item: CartItem,
  userId: string
): Promise<CartItem> => {
  const response = await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-user-id": userId,
    },
    body: JSON.stringify(item),
  });
  if (!response.ok) {
    throw new Error("Failed to add item to cart");
  }
  return (await response.json()) as CartItem;
};

// Remove an item from the cart by ID
export const removeFromCart = async (
  userId: string,
  itemId: number
): Promise<CartItem> => {
  const response = await fetch(`${API_URL}/remove/${itemId}`, {
    method: "DELETE",
    headers: {
      "x-user-id": userId,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to remove item from cart");
  }
  return (await response.json()) as CartItem;
};

// Clear the cart
export const clearCart = async (userId: string): Promise<void> => {
  const response = await fetch(`${API_URL}/clear`, {
    method: "DELETE",
    headers: {
      "x-user-id": userId,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to clear cart");
  }
};

// Update cart item quantity
export const updateCartQuantityService = async (
  userId: string,
  itemId: number,
  quantity: number
): Promise<CartItem> => {
  const response = await fetch(`${API_URL}/update/${itemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-user-id": userId,
    },
    body: JSON.stringify({ quantity }),
  });
  if (!response.ok) {
    throw new Error("Failed to update cart item quantity");
  }
  return (await response.json()) as CartItem;
};
