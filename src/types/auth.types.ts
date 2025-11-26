export interface LoginForm {
  username: string
  password: string
}

export interface AuthUser {
  sub: string
  username: string
  avatar: string | undefined
  email: string
  role: string
  businessId: string
  companyId: string
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