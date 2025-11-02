export interface ApiResponse<T> {
  data?: T
  error?: string
  status: number
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.example.com"

export const apiClient = {
  async get<T>(path: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${path}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        return { error: "API Error", status: response.status }
      }

      const data = await response.json()
      return { data, status: 200 }
    } catch (error) {
      console.log("[v0] API call failed, using mock data")
      return { error: "Network error", status: 0 }
    }
  },

  async post<T>(path: string, body: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        return { error: "API Error", status: response.status }
      }

      const data = await response.json()
      return { data, status: 200 }
    } catch (error) {
      console.log("[v0] API post failed, using mock data")
      return { error: "Network error", status: 0 }
    }
  },
}
