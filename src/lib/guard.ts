import type { QueryClient } from '@tanstack/react-query'
import { session } from '@/services/auth.service'
import { useAuthStore } from '@/stores/auth-store'

export async function guard(queryClient: QueryClient) {
  const auth = await queryClient.ensureQueryData({
    queryKey: ['auth', 'me'],
    queryFn: session,
    staleTime: 5 * 60 * 1000,
  })

  if (auth) {
    useAuthStore.getState().auth.setUser(auth.user)
    useAuthStore.getState().auth.setCompany(auth.company)
  }
}
