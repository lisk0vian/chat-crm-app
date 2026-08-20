export interface LoginForm {
  username: string
  password: string
}

export type AuthMe = {
  user: AuthUser
  company: {
    id: string
  }
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
    company: {
      id: string | null
    }
    setCompany: (company: { id: string }) => void
    user: AuthUser | null
    setUser: (user: AuthUser | null) => void
    reset: () => void
  }
}
