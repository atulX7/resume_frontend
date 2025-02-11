import { useSession } from "next-auth/react"

export type UserRole = 'USER' | 'ADMIN'

export interface User {
  id: string
  email: string
  name?: string | null
  image?: string | null
  role: UserRole
}

export function useUser() {
  const { data: session, status } = useSession()
  
  const user: User | null = session?.user ? {
    id: session.user.id,
    email: session.user.email!,
    name: session.user.name,
    image: session.user.image,
    role: session.user.role as UserRole,
  } : null

  return {
    user,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated"
  }
} 