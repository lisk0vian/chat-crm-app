import { client } from '@/lib/http'
import type { Message } from '../types/message.api'

const chats = client('/chats')

export const getMessagesByChatId = async (
  chatId: string
): Promise<Message[]> => {
  const response = await chats.get<Message[]>(`/${chatId}/messages`)
  return response?.data ?? []
}
