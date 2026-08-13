import { client } from '@/lib/http'
import type { Client } from '../types/client.api'

const clients = client('/contacts')

export const searchClient = async (search: string) => {
  const { data } = await clients.get<Client[]>('/search', {
    params: { q: search },
  })
  return data ?? []
}
