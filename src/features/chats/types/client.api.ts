export type ClientStatus = 'new' | 'lead' | 'prospect' | 'client'
export type ClientSource = 'whatsapp' | 'manual'

export interface Client {
  id: string // UUID
  waId?: string // WhatsApp ID
  firstNames?: string
  lastNames?: string
  username: string
  profile: string // URL
  phone: string
  email?: string
  status: ClientStatus
  source: ClientSource
  lastInteractionAt?: Date
  tags: string[]
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date | null
}
