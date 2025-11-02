"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true)
      setError(null)

      // Mock authentication - in production, call your API
      if (data.email && data.password) {
        // Store user session (in production use proper auth)
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: "user-123",
            email: data.email,
            name: "User",
          }),
        )

        router.push("/")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Heart className="w-8 h-8 text-accent" />
          <h1 className="text-2xl font-bold">HealSense</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <Input {...register("email")} type="email" placeholder="your@email.com" className="bg-card border-border" />
            {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <Input {...register("password")} type="password" placeholder="••••••••" className="bg-card border-border" />
            {errors.password && <p className="text-destructive text-sm mt-1">{errors.password.message}</p>}
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input {...register("rememberMe")} type="checkbox" className="w-4 h-4 rounded border-border" />
            Remember me
          </label>

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/30 text-destructive rounded-lg text-sm">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        {/* Register Link */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account?{" "}
          <button onClick={() => router.push("/auth/register")} className="text-accent hover:underline font-medium">
            Sign up
          </button>
        </p>

        {/* Demo Notice */}
        <div className="mt-8 p-3 bg-card border border-border rounded-lg text-xs text-muted-foreground">
          <p className="font-medium mb-1">Demo Mode</p>
          <p>Use any email and password to test the app. Data is stored locally.</p>
        </div>
      </div>
    </div>
  )
}
