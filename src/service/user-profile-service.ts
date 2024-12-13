import { ApiResponseUserProfile, ProfileFormValues } from "src/types/data-types"

const API_BASE_URL = process.env.REACT_APP_API_URL
const ENDPOINT = "/users/profile"
const API_URL = `${API_BASE_URL}${ENDPOINT}`

export const createUserProfile = async (
  userId: string,
  name: string,
  email: string,
  profileImage?: string,
) => {
  const response = await fetch("http://localhost:5000/api/users/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-user-id": userId,
    },
    body: JSON.stringify({ name, email, profileImage }),
  })

  if (!response.ok) {
    throw new Error("Failed to create user profile")
  }

  return (await response.json()) as ApiResponseUserProfile
}

export const getUserProfile = async (
  userId: string,
): Promise<ApiResponseUserProfile | null> => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: "GET",
      headers: {
        "x-user-id": userId,
      },
    })

    if (response.ok) {
      return (await response.json()) as ApiResponseUserProfile
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
  profileData: ProfileFormValues,
): Promise<ApiResponseUserProfile | null> => {
  try {
    const formData = new FormData()

    for (const [key, value] of Object.entries(profileData)) {
      formData.append(key, value)
    }

    const response = await fetch(`${API_URL}/${userId}`, {
      method: "PUT",
      headers: {
        "x-user-id": userId,
      },
      body: formData,
    })

    if (response.ok) {
      return (await response.json()) as ApiResponseUserProfile
    }
    console.error("Failed to update user profile")
    return null
  } catch (error) {
    console.error("Error updating user profile:", error)
    return null
  }
}
