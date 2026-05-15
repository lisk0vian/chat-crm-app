import type { Chat } from "@/features/chats/data/schema";
import type { ChatMessage } from "@/features/chats/types";
import { client } from "@/lib/http";

const chats = client('/chats')

export const getChatList = async () => {
  try {
    const response = await chats.get<ChatMessage[]>('/list')

    return response?.data ?? []

  } catch (error) {
    console.error('Error al obtener la lista de chats:', error)
    return []
  }
}

export const createChat = async (agentId: string, contactId: string) => {
  const res = await chats.post<Chat>('', {
    title: 'new chat',
    contactId,
    agentId
  });

  return res?.data ?? []
}

export const assignedUser = async (chatId: string, agentId: string) => {
  const res = await chats.get(`/${chatId}/assigned/${agentId}`);
  return res.data
}
type MessageContent = {
  id: string
  senderType: string
  senderId: string
  content: string
  type: string
  status: string
  direction: string
  createdAt: string
  updatedAt: string
  mediaUrl: string | null
  deletedAt: string | null
  chat: string
}

export const getMessagesByChatId = async (chatId: string): Promise<MessageContent[]> => {
  const response = await chats.get<MessageContent[]>(`/${chatId}/messages`)
  return response?.data ?? []
}