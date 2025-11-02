export interface User {
  id: string
  email: string
  name: string
}

export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null

  const user = localStorage.getItem("user")
  return user ? JSON.parse(user) : null
}

export const logout = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user")
  }
}

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null
}
