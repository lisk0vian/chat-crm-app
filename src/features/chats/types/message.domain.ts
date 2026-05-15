export type SenderType = 'agent' | 'user'
export type MessageType = 'text' | 'image' | 'video' | 'file'
export type MessageStatus = 'sent' | 'delivered' | 'read' | 'error'
export type MessageDirection = 'in' | 'out'

export interface Message {
  id: string
  senderType: SenderType
  senderId: string
  content: string
  type: MessageType
  mediaUrl?: string | null
  status: MessageStatus
  direction: MessageDirection
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date | null
  chat: string // chatId
}
