import { UserProfile } from "src/types/data-types"

const API_BASE_URL = "http://localhost:5000/api/users/profile"

export const getUserProfile = async (
  userId: string,
): Promise<UserProfile | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: "GET",
      headers: {
        "x-user-id": userId,
      },
    })

    if (response.ok) {
      return (await response.json()) as UserProfile
    }
    console.error("Failed to fetch user profile")
    return null
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return null
  }
}

export const updateUserProfile = async (
  userId: string,
  profileData: UserProfile,
): Promise<UserProfile | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": userId,
      },
      body: JSON.stringify(profileData),
    })

    if (response.ok) {
      return (await response.json()) as UserProfile
    }
    console.error("Failed to update user profile")
    return null
  } catch (error) {
    console.error("Error updating user profile:", error)
    return null
  }
}

export const createUserProfile = async (
  userId: string,
  name: string,
  email: string,
) => {
  const response = await fetch("http://localhost:5000/api/users/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-user-id": userId,
    },
    body: JSON.stringify({ name, email }),
  })

  if (!response.ok) {
    throw new Error("Failed to create user profile")
  }

  return (await response.json()) as UserProfile
}
