export type SenderType = 'agent' | 'user'
export type MessageType = 'text' | 'image' | 'file'
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

export interface TextMessage {
  body: string
}

export interface OutgoingMessage {
  type: MessageType
  content: TextMessage
}

export interface Sender {
  id: string
  type: SenderType
}

/**
 * @interface
 * @param room Chat-Id
 * @param to Phone Destination
 * @param sender agent | user
 * @param msg message content
 */
export interface SendMessageRequest {
  room: string
  to: string
  sender: Sender
  msg: OutgoingMessage
}
