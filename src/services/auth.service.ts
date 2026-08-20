import type { AuthUser, LoginForm } from '@/types'
import type { AuthMe } from '@/types/auth.types'
import { client } from '@/lib/http'

const auth = client('/auth')

export const session = async (): Promise<AuthMe> => {
  const res = await auth.get<AuthMe>('/me')
  return res.data
}

export async function login(payload: LoginForm): Promise<AuthUser> {
  return auth.post<AuthUser>('/login', payload).then((res) => res.data)
}
