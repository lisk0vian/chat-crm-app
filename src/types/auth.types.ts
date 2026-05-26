export interface LoginForm {
  username: string
  password: string
}

export interface AuthUser {
  id: string
  address: string
  status: string
  username: string
  fistName: string
  lastName: string
  avatar: string | undefined
  email: string
  role: string
}

export interface AuthState {
  auth: {
    user: AuthUser | null
    setUser: (user: AuthUser | null) => void
    accessToken: string
    setAccessToken: (accessToken: string) => void
    resetAccessToken: () => void
    reset: () => void
  }
}
