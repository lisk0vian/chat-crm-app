import { client } from '@/lib/http'
import type { ChatMessage } from '../types/chat.domain'

const chats = client('/chats')

export const getMessagesByChatId = async (
  chatId: string
): Promise<ChatMessage[]> => {
  const response = await chats.get<ChatMessage[]>(`/${chatId}/messages`)
  return response?.data ?? []
}
