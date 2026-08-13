import type {
  MessageType,
  SenderType,
  WhatsAppMessageContent,
} from './message.domain'

// CHAT
export type ChatStatus =
  | 'draft'
  | 'open'
  | 'closed'
  | 'send'
  | 'synced'
  | 'error'

export interface ChatPreview {
  content: string
  datetime: Date
}

export interface ChatMessage {
  id: string
  chatId?: string
  msg: {
    type: MessageType
    mediaUrl?: string
    content: WhatsAppMessageContent
  }
  sender: {
    id: string
    type: SenderType
  }
  timestamp: Date
}

export interface ChatClient {
  id: string
  username: string
  profile: string // Avatar Url
  phone: string
}

export interface Chat {
  id: string
  preview?: ChatPreview
  status: ChatStatus
  client: ChatClient
  createdAt: Date
  updatedAt: Date
  isDraft?: boolean
}

// SENTIMENT
export interface ChatSentiment {
  chatId?: string
  avgPos: number
  avgNeg: number
  avgNeu: number
  totalMessages: number
  dominant: 'POS' | 'NEG' | 'NEU'
}

export interface SentimentData {
  chatId?: string
  avgPos: number
  avgNeg: number
  avgNeu: number
  totalMessages: number
  dominant: 'POS' | 'NEG' | 'NEU'
}

// CLIENT
export type ClientStatus = 'new' | 'lead' | 'prospect' | 'client'
export type ClientSource = 'whatsapp' | 'manual'

export interface Client {
  id: string // UUID
  waId?: string // WhatsApp ID
  username?: string
  profile?: string // URL
  phone: string
  email?: string
  status: ClientStatus // default 'new'
  source: ClientSource // default 'whatsapp'
  tags?: string[]
}
