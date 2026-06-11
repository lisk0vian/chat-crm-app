export type SenderType = 'agent' | 'client'
export type MessageType = 'text' | 'image' | 'document'
export type MessageStatus = 'sent' | 'delivered' | 'read' | 'error'
export type MessageDirection = 'in' | 'out'

export interface WhatsAppTextContent {
  body: string
  preview_url?: boolean
}

export interface WhatsAppMediaContent {
  link?: string // URL public from hosted media
  id?: string // ID uploaded media for meta
  caption?: string // Media caption text
}

export interface WhatsAppDocumentContent extends WhatsAppMediaContent {
  filename?: string
}

export type WhatsAppMessageContent =
  | WhatsAppTextContent
  | WhatsAppDocumentContent
  | WhatsAppMediaContent
